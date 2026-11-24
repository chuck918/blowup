import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import EventCard from "@/components/events/EventCard";
import { listEvents } from "@/lib/events";

export default async function UpcomingEvents() {
  const events = await listEvents("upcoming", 3);
  if (events.length === 0) return null;

  return (
    <section id="events" className="section scroll-mt-16 border-t border-line">
      <div className="glow glow-yellow right-[-10%] top-20 size-[28rem]" />
      <div className="container relative">
        <Reveal className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Live events</p>
            <h2 className="display text-6xl sm:text-7xl">
              Be in <span className="text-gradient">the room.</span>
            </h2>
          </div>
          <Link href="/events" className="btn btn-outline">All events →</Link>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((e, i) => (
            <Reveal key={e.id} delay={0.06 * i}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
