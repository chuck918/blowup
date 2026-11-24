import "server-only";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { EventWithTickets, TicketType } from "@/lib/types";

const SELECT = "*, ticket_types(*)";

function sortTickets(e: EventWithTickets): EventWithTickets {
  return { ...e, ticket_types: [...(e.ticket_types ?? [])].sort((a, b) => a.sort - b.sort || a.price_pesewas - b.price_pesewas) };
}

/** Published events (RLS hides drafts). `when` splits on end time. */
export async function listEvents(when: "upcoming" | "past" = "upcoming", limit = 50): Promise<EventWithTickets[]> {
  if (!isSupabaseConfigured) return [];
  const supabase = await createClient();
  const now = new Date().toISOString();
  let query = supabase.from("events").select(SELECT).limit(limit);
  query =
    when === "upcoming"
      ? query.or(`ends_at.gte.${now},and(ends_at.is.null,starts_at.gte.${now})`).order("starts_at", { ascending: true })
      : query.or(`ends_at.lt.${now},and(ends_at.is.null,starts_at.lt.${now})`).order("starts_at", { ascending: false });
  const { data, error } = await query;
  if (error) {
    console.error("[events] list failed", error.message);
    return [];
  }
  return (data as EventWithTickets[]).map(sortTickets);
}

export async function getEventBySlug(slug: string): Promise<EventWithTickets | null> {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("events").select(SELECT).eq("slug", slug).maybeSingle();
  return data ? sortTickets(data as EventWithTickets) : null;
}

export function priceRange(types: TicketType[]): { min: number; max: number } | null {
  if (!types.length) return null;
  const prices = types.map((t) => t.price_pesewas);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}

export const remaining = (t: TicketType) => Math.max(0, t.capacity - t.sold);
export const isSoldOut = (e: EventWithTickets) => e.ticket_types.length > 0 && e.ticket_types.every((t) => remaining(t) === 0);

export const eventEnded = (e: EventWithTickets) => new Date(e.ends_at ?? e.starts_at).getTime() < Date.now();

/** Ticket type ids that can't be bought right now (sold out or past sales end). */
export const closedTicketIds = (e: EventWithTickets) =>
  e.ticket_types
    .filter((t) => remaining(t) === 0 || (t.sales_end !== null && new Date(t.sales_end).getTime() < Date.now()))
    .map((t) => t.id);
