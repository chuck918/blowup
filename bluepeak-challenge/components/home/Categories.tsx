import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CATEGORIES } from "@/lib/content";

const ICONS: Record<string, React.ReactNode> = {
  "film-director": <path d="M4 6h16v12H4zM4 10h16M8 6l2 4M13 6l2 4M18 6l2 4" />,
  musician: <path d="M9 18V5l12-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm12-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />,
  "sound-engineer": <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" />,
};

export default function Categories() {
  return (
    <section id="categories" className="section scroll-mt-16">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end mb-16">
          <Reveal>
            <p className="eyebrow mb-5">Masterclass tracks</p>
            <h2 className="display text-6xl sm:text-7xl lg:text-8xl">
              Three tracks.<br />
              <span className="text-gradient">One masterclass.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-lg text-muted leading-relaxed max-w-lg lg:ml-auto">
              Practical, industry-led sessions built around the craft you care about. Learn the techniques
              professionals use, then put them to work. Pick the track that’s yours.
            </p>
          </Reveal>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.id} delay={0.08 * i}>
              <Link
                href={`/register?category=${c.id}`}
                className="group card card-hover relative flex h-full min-h-[22rem] flex-col overflow-hidden p-8"
              >
                <span className="display absolute -right-2 -top-6 text-[9rem] leading-none text-white/[0.04] transition-colors group-hover:text-brand-yellow/10">
                  {c.num}
                </span>
                <span className="grid size-14 place-items-center rounded-2xl border border-line bg-white/[0.03] text-brand-yellow transition-colors group-hover:bg-brand-yellow group-hover:text-black">
                  <svg className="size-6" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" aria-hidden>
                    {ICONS[c.id]}
                  </svg>
                </span>
                <h3 className="display mt-auto pt-12 text-4xl">{c.title}</h3>
                <p className="mt-3 text-muted leading-relaxed">{c.desc}</p>
                <span className="mt-6 text-sm font-bold text-brand-yellow">
                  Register for this track <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
