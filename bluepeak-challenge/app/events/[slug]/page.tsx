import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import TicketSelector from "@/components/events/TicketSelector";
import { closedTicketIds, eventEnded, getEventBySlug } from "@/lib/events";
import { getUser } from "@/lib/auth";
import { formatDate, formatTime } from "@/lib/format";
import { SITE_URL } from "@/lib/links";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const event = await getEventBySlug((await params).slug);
  if (!event) return { title: "Event not found" };
  return {
    title: event.title,
    description: event.summary ?? undefined,
    openGraph: { title: event.title, description: event.summary ?? undefined, images: event.cover_url ? [event.cover_url] : undefined },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const [event, user] = await Promise.all([getEventBySlug(slug), getUser()]);
  if (!event) notFound();

  const ended = eventEnded(event);
  const where = [event.venue, event.city].filter(Boolean).join(", ");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary ?? undefined,
    startDate: event.starts_at,
    endDate: event.ends_at ?? undefined,
    image: event.cover_url ?? undefined,
    url: `${SITE_URL}/events/${event.slug}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: event.venue ?? "Ghana", address: { "@type": "PostalAddress", addressLocality: event.city ?? undefined, addressCountry: "GH" } },
    offers: event.ticket_types.map((t) => ({
      "@type": "Offer",
      name: t.name,
      price: (t.price_pesewas / 100).toFixed(2),
      priceCurrency: "GHS",
      availability: t.capacity - t.sold > 0 ? "https://schema.org/InStock" : "https://schema.org/SoldOut",
      url: `${SITE_URL}/events/${event.slug}`,
    })),
  };

  return (
    <>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <main className="pb-24">
        {/* Cover */}
        <div className="relative h-[52vh] min-h-[22rem] overflow-hidden">
          {event.cover_url ? (
            <Image src={event.cover_url} alt="" fill priority sizes="100vw" className="object-cover" />
          ) : (
            <Image src="/images/hero-stage.webp" alt="" fill priority sizes="100vw" className="object-cover object-[72%_center] opacity-70" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/30" />
        </div>

        <div className="container relative -mt-40 grid gap-10 lg:grid-cols-[1fr_24rem] lg:items-start">
          <article>
            <Link href="/events" className="text-sm font-semibold text-muted hover:text-white">← All events</Link>
            <h1 className="display mt-4 text-6xl sm:text-7xl lg:text-8xl">{event.title}</h1>
            {event.summary && <p className="mt-5 max-w-2xl text-xl text-white/80 leading-relaxed">{event.summary}</p>}

            <dl className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="card p-5">
                <dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-subtle">When</dt>
                <dd className="mt-2 font-bold">{formatDate(event.starts_at, { weekday: "long", month: "long" })}</dd>
                <dd className="text-muted text-sm">
                  {formatTime(event.starts_at)}
                  {event.ends_at ? ` – ${formatTime(event.ends_at)}` : ""}
                </dd>
              </div>
              <div className="card p-5">
                <dt className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-subtle">Where</dt>
                <dd className="mt-2 font-bold">{where || "Venue to be announced"}</dd>
                {where && (
                  <dd>
                    <a className="text-sm text-brand-yellow hover:underline" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(where)}`} target="_blank" rel="noopener noreferrer">
                      Open in Maps →
                    </a>
                  </dd>
                )}
              </div>
            </dl>

            {event.description && (
              <div className="prose-dark mt-12 max-w-2xl whitespace-pre-line">{event.description}</div>
            )}
          </article>

          <aside className="panel p-6 lg:sticky lg:top-24" aria-label="Tickets">
            <h2 className="display text-3xl mb-5">{ended ? "Event ended" : "Tickets"}</h2>
            <TicketSelector
              eventId={event.id}
              slug={event.slug}
              types={event.ticket_types}
              signedIn={Boolean(user)}
              needsEmail={Boolean(user && !user.email)}
              ended={ended}
              closedIds={closedTicketIds(event)}
            />
          </aside>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
