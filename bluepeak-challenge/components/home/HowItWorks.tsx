import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { BENEFITS, STEPS } from "@/lib/content";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section scroll-mt-16 border-t border-line overflow-hidden">
      <div className="glow glow-orange left-[-15%] bottom-0 size-[30rem]" />
      <div className="container relative">
        <Reveal className="mb-16 max-w-3xl">
          <p className="eyebrow mb-5">How to join</p>
          <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
            Three steps <span className="text-outline">to your</span> <span className="text-gradient">seat.</span>
          </h2>
        </Reveal>

        <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.num} className="bg-ink">
              <Reveal delay={0.08 * i} className="flex h-full flex-col p-8 lg:p-10">
                <span className="display text-7xl text-gradient">{s.num}</span>
                <h3 className="mt-8 text-2xl font-extrabold">{s.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{s.desc}</p>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow mb-5">Why join</p>
            <h3 className="display text-5xl sm:text-6xl">
              More than a class.<br />
              <span className="text-gradient">A launchpad.</span>
            </h3>
            <Link href="/register" className="btn btn-fire btn-lg mt-10">Save your seat →</Link>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={0.06 * i} className="card p-6">
                <span className="mb-5 block h-1 w-10 rounded-full bg-linear-to-r from-brand-yellow to-brand-orange" />
                <h4 className="text-lg font-extrabold">{b.title}</h4>
                <p className="mt-2 text-sm text-muted leading-relaxed">{b.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
