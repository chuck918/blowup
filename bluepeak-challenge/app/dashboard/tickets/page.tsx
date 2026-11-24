import type { Metadata } from "next";
import Link from "next/link";
import TicketCard from "@/components/dashboard/TicketCard";
import { isUpcoming, listMyTickets } from "@/lib/tickets";

export const metadata: Metadata = { title: "My tickets", robots: { index: false } };

export default async function MyTicketsPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order } = await searchParams;
  const tickets = await listMyTickets();
  const upcoming = tickets.filter(isUpcoming);
  const past = tickets.filter((t) => !isUpcoming(t));
  const fresh = order ? tickets.filter((t) => t.order?.reference === order) : [];

  return (
    <div className="grid gap-12">
      {order && (
        <p role="status" className={`alert ${fresh.length ? "alert-success" : "alert-info"}`}>
          {fresh.length
            ? `You’re in! ${fresh.length} ticket${fresh.length > 1 ? "s" : ""} added below. Show the QR code at the door.`
            : "We’re confirming your payment — your tickets will appear here in a moment. Refresh if they don’t."}
        </p>
      )}

      <section aria-labelledby="up">
        <h2 id="up" className="display text-4xl mb-5">Upcoming</h2>
        {upcoming.length ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((t) => (
              <TicketCard key={t.id} ticket={t} highlight={t.order?.reference === order} />
            ))}
          </div>
        ) : (
          <div className="card p-10 text-center">
            <p className="text-muted">You don’t have any upcoming tickets.</p>
            <Link href="/events" className="btn btn-primary mt-5">Find an event</Link>
          </div>
        )}
      </section>

      {past.length > 0 && (
        <section aria-labelledby="past">
          <h2 id="past" className="display text-4xl mb-5 text-white/50">Past</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 opacity-60">
            {past.map((t) => <TicketCard key={t.id} ticket={t} />)}
          </div>
        </section>
      )}
    </div>
  );
}
