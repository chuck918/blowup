import Link from "next/link";
import Image from "next/image";
import type { EventWithTickets } from "@/lib/types";
import { formatDateParts, formatMoney, formatTime } from "@/lib/format";
import { isSoldOut, priceRange } from "@/lib/events";

export default function EventCard({ event, priority = false }: { event: EventWithTickets; priority?: boolean }) {
  const { day, month, weekday } = formatDateParts(event.starts_at);
  const range = priceRange(event.ticket_types);
  const soldOut = isSoldOut(event);

  return (
    <Link href={`/events/${event.slug}`} className="group card card-hover overflow-hidden flex flex-col">
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-2">
        {event.cover_url ? (
          <Image
            src={event.cover_url}
            alt=""
            fill
            priority={priority}
            sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgb(255_230_0/0.25),transparent_55%),radial-gradient(circle_at_20%_90%,rgb(255_94_0/0.3),transparent_50%)]">
            <span className="display absolute bottom-3 left-4 text-5xl text-white/10">BlowUp</span>
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
        <div className="absolute left-4 top-4 rounded-xl bg-ink/85 backdrop-blur px-3 py-2 text-center leading-none border border-line">
          <div className="display text-2xl text-brand-yellow">{day}</div>
          <div className="mt-1 text-[0.62rem] font-extrabold tracking-[0.18em]">{month}</div>
        </div>
        {soldOut && <span className="badge badge-red absolute right-4 top-4 bg-ink/80">Sold out</span>}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold text-muted">
          {weekday} · {formatTime(event.starts_at)}
          {event.city ? ` · ${event.city}` : ""}
        </p>
        <h3 className="mt-2 text-xl font-extrabold leading-snug group-hover:text-brand-yellow transition-colors">{event.title}</h3>
        {event.summary && <p className="mt-2 text-sm text-muted line-clamp-2">{event.summary}</p>}
        <div className="mt-auto pt-5 flex items-center justify-between">
          <span className="text-sm font-bold">
            {range ? (range.min === range.max ? formatMoney(range.min) : `From ${formatMoney(range.min)}`) : "Tickets soon"}
          </span>
          <span className="grid size-9 place-items-center rounded-full border border-line transition-all group-hover:border-brand-yellow group-hover:bg-brand-yellow group-hover:text-black" aria-hidden>
            →
          </span>
        </div>
      </div>
    </Link>
  );
}
