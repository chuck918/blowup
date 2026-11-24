import type { Metadata } from "next";
import SiteHeader from "@/components/site/SiteHeader";
import SiteFooter from "@/components/site/SiteFooter";
import EventCard from "@/components/events/EventCard";
import { listEvents } from "@/lib/events";

export const metadata: Metadata = {
  title: "Events",
  description: "Masterclass sessions, screenings, showcases and live events from The BlowUp. Get your tickets.",
};

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([listEvents("upcoming"), listEvents("past", 6)]);

  return (
    <>
      <SiteHeader />
      <main className="relative overflow-hidden pt-36 pb-24">
        <div className="glow glow-orange right-[-10%] top-0 size-[34rem]" />
        <div className="container relative">
          <p className="eyebrow mb-5">Events</p>
          <h1 className="display text-7xl sm:text-8xl lg:text-9xl">
            Live from <span className="text-gradient">BlowUp.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Masterclass sessions, screenings and showcases. Book in seconds — your tickets live in your dashboard.
          </p>

          <section className="mt-16" aria-labelledby="upcoming-heading">
            <h2 id="upcoming-heading" className="sr-only">Upcoming events</h2>
            {upcoming.length ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {upcoming.map((e, i) => (
                  <EventCard key={e.id} event={e} priority={i < 3} />
                ))}
              </div>
            ) : (
              <div className="panel grid place-items-center px-6 py-20 text-center">
                <span className="display text-6xl text-white/10">Stay tuned</span>
                <p className="mt-4 max-w-sm text-muted">No events are on sale right now. New dates are announced on our socials first.</p>
              </div>
            )}
          </section>

          {past.length > 0 && (
            <section className="mt-24" aria-labelledby="past-heading">
              <h2 id="past-heading" className="display text-4xl mb-8 text-white/60">Past events</h2>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 opacity-70">
                {past.map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
