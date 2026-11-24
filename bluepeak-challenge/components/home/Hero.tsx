import Link from "next/link";
import Image from "next/image";
import Countdown from "./Countdown";
import { DEADLINE, DEADLINE_SHORT, registrationOpen } from "@/lib/content";

export default function Hero() {
  const open = registrationOpen();
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">
      {/* Stage photo, spotlit on the right; text sits on the dark left half. */}
      <Image
        src="/images/hero-stage.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_center] opacity-80 md:opacity-100"
      />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/80 to-ink/10" />
      <div className="absolute inset-0 bg-linear-to-t from-ink via-transparent to-ink/60" />
      <div className="glow glow-orange left-[-10%] top-[30%] size-[32rem]" />

      <div className="container relative z-10 flex flex-1 flex-col justify-center pt-32 pb-16">
        <p className="eyebrow mb-7">The BlowUp Masterclass · Season 2027</p>

        <h1 className="display text-[clamp(4rem,13vw,11.5rem)]">
          <span className="block">Learn.</span>
          <span className="block text-outline">Create.</span>
          <span className="block text-gradient">Blow up.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg sm:text-xl text-white/75 leading-relaxed">
          A hands-on masterclass for filmmakers, musicians and sound engineers in Ghana. Learn from
          industry pros, sharpen your craft, and catch every BlowUp event.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          {open ? (
            <Link href="/register" className="btn btn-primary btn-lg">
              Register for the masterclass <span aria-hidden>→</span>
            </Link>
          ) : (
            <span className="btn btn-outline btn-lg" aria-disabled>Registration closed</span>
          )}
          <Link href="/events" className="btn btn-outline btn-lg">
            Get event tickets
          </Link>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="relative z-10 border-t border-line bg-ink/60 backdrop-blur-md">
        <div className="container grid gap-6 py-6 md:grid-cols-[1fr_auto] md:items-center">
          <dl className="flex flex-wrap gap-x-10 gap-y-4">
            {[
              ["3", "Tracks"],
              [DEADLINE_SHORT, "Registration deadline"],
              ["Hands-on", "Learn by doing"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd className="display text-3xl text-white">{value}</dd>
                <dd className="text-[0.65rem] font-extrabold uppercase tracking-[0.2em] text-subtle mt-1">{label}</dd>
              </div>
            ))}
          </dl>
          {open && (
            <div className="w-full md:w-[22rem]">
              <Countdown target={DEADLINE.toISOString()} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
