import Link from "next/link";
import { formatDateParts, formatTime } from "@/lib/format";
import type { TicketView } from "@/lib/tickets";

/** Compact ticket stub with perforated edge. */
export default function TicketCard({ ticket, highlight = false }: { ticket: TicketView; highlight?: boolean }) {
  const e = ticket.event;
  const parts = e ? formatDateParts(e.starts_at) : null;

  return (
    <Link
      href={`/dashboard/tickets/${ticket.code}`}
      className={`ticket group block transition-transform hover:-translate-y-1 ${highlight ? "ring-2 ring-brand-yellow" : ""}`}
      style={{ ["--tear" as string]: "68%" }}
    >
      <div className="flex gap-5 p-5 pb-6">
        {parts && (
          <div className="shrink-0 rounded-xl bg-brand-yellow px-3 py-2 text-center text-black leading-none">
            <div className="display text-3xl">{parts.day}</div>
            <div className="mt-1 text-[0.6rem] font-extrabold tracking-[0.18em]">{parts.month}</div>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-xs font-semibold text-muted">
            {e ? `${parts?.weekday} · ${formatTime(e.starts_at)}` : "Event"}
          </p>
          <h3 className="mt-1 truncate text-lg font-extrabold group-hover:text-brand-yellow transition-colors">{e?.title ?? "Event"}</h3>
          <p className="truncate text-sm text-muted">{[e?.venue, e?.city].filter(Boolean).join(", ") || "Venue TBA"}</p>
        </div>
      </div>
      <div className="ticket-tear" />
      <div className="flex items-center justify-between px-5 py-4">
        <span className="badge badge-yellow">{ticket.ticket_type?.name ?? "Ticket"}</span>
        {ticket.checked_in_at ? (
          <span className="text-xs font-bold text-success">Checked in ✓</span>
        ) : (
          <span className="font-mono text-xs tracking-widest text-muted">{ticket.code}</span>
        )}
      </div>
    </Link>
  );
}
