import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/admin/PageHeader";
import EventForm from "@/components/admin/EventForm";
import TicketTypeForm from "@/components/admin/TicketTypeForm";
import { deleteEvent, deleteTicketType } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatMoney } from "@/lib/format";
import type { EventWithTickets } from "@/lib/types";

export const metadata = { title: "Edit event" };

const ERRORS: Record<string, string> = {
  "has-orders": "This event has orders, so it can’t be deleted. Unpublish it instead.",
  "ticket-in-use": "That ticket type has sales, so it can’t be deleted. Set its sales end date instead.",
};

export default async function EditEventPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ created?: string; error?: string }>;
}) {
  const { id } = await params;
  const { created, error } = await searchParams;
  if (!/^[0-9a-f-]{36}$/.test(id)) notFound();
  const { data } = await createAdminClient().from("events").select("*, ticket_types(*)").eq("id", id).maybeSingle();
  if (!data) notFound();
  const event = data as EventWithTickets;
  const types = [...event.ticket_types].sort((a, b) => a.sort - b.sort || a.price_pesewas - b.price_pesewas);

  return (
    <>
      <Link href="/admin/events" className="text-sm font-semibold text-muted hover:text-white">← Events</Link>
      <div className="mt-3" />
      <PageHeader
        title={event.title}
        subtitle={event.published ? "Published" : "Draft — not visible on the site"}
        actions={event.published ? <Link href={`/events/${event.slug}`} target="_blank" className="btn btn-outline btn-sm">View live ↗</Link> : undefined}
      />
      {created && <p className="alert alert-success mb-6">Event created. Add ticket types below, then publish it.</p>}
      {error && ERRORS[error] && <p className="alert alert-error mb-6">{ERRORS[error]}</p>}

      <div className="grid gap-8 2xl:grid-cols-[1.2fr_1fr]">
        <section className="card p-6 sm:p-8" aria-labelledby="details">
          <h2 id="details" className="mb-6 text-lg font-extrabold">Details</h2>
          <EventForm event={event} />
        </section>

        <section className="grid content-start gap-4" aria-labelledby="tickets">
          <h2 id="tickets" className="text-lg font-extrabold">Ticket types</h2>
          {types.map((t) => (
            <details key={t.id} className="card group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 [&::-webkit-details-marker]:hidden">
                <span>
                  <span className="block font-bold">{t.name}</span>
                  <span className="text-sm text-muted">{formatMoney(t.price_pesewas)} · {t.sold}/{t.capacity} sold</span>
                </span>
                <span className="text-sm font-bold text-brand-yellow group-open:hidden">Edit</span>
              </summary>
              <div className="border-t border-line p-5">
                <TicketTypeForm eventId={event.id} ticket={t} />
                {t.sold === 0 && (
                  <form action={deleteTicketType} className="mt-4 border-t border-line pt-4">
                    <input type="hidden" name="id" value={t.id} />
                    <input type="hidden" name="event_id" value={event.id} />
                    <button className="btn btn-danger btn-sm">Delete ticket type</button>
                  </form>
                )}
              </div>
            </details>
          ))}
          <div className="card border-dashed p-5">
            <p className="mb-4 font-bold">Add a ticket type</p>
            <TicketTypeForm eventId={event.id} />
          </div>

          <form action={deleteEvent} className="mt-6 rounded-2xl border border-danger/30 p-5">
            <input type="hidden" name="id" value={event.id} />
            <p className="font-bold text-danger">Delete event</p>
            <p className="mt-1 text-sm text-muted">Only possible before any orders are placed.</p>
            <button className="btn btn-danger btn-sm mt-4">Delete permanently</button>
          </form>
        </section>
      </div>
    </>
  );
}
