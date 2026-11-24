import "server-only";
import QRCode from "qrcode";
import { createClient } from "@/lib/supabase/server";

export interface TicketView {
  id: string;
  code: string;
  order_id: string;
  checked_in_at: string | null;
  created_at: string;
  event: { title: string; slug: string; starts_at: string; ends_at: string | null; venue: string | null; city: string | null; cover_url: string | null } | null;
  ticket_type: { name: string } | null;
  order: { reference: string } | null;
}

/** The signed-in user's tickets (RLS limits rows to their own). */
export async function listMyTickets(): Promise<TicketView[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tickets")
    .select(
      "id, code, order_id, checked_in_at, created_at, event:events(title, slug, starts_at, ends_at, venue, city, cover_url), ticket_type:ticket_types(name), order:orders(reference)"
    )
    .order("created_at", { ascending: false });
  if (error) {
    console.error("[tickets]", error.message);
    return [];
  }
  return data as unknown as TicketView[];
}

export function isUpcoming(t: TicketView) {
  const end = t.event ? new Date(t.event.ends_at ?? t.event.starts_at).getTime() + 6 * 3600_000 : 0;
  return end > Date.now();
}

/** QR as inline SVG markup — encodes only the ticket code. */
export function qrSvg(code: string): Promise<string> {
  return QRCode.toString(code, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 1,
    color: { dark: "#000000", light: "#ffffff" },
  });
}
