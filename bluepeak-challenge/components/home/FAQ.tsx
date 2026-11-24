import Reveal from "@/components/ui/Reveal";
import { FAQS } from "@/lib/content";

/** Native <details> accordion: accessible and works without JavaScript. */
export default function FAQ() {
  return (
    <section id="faq" className="section scroll-mt-16 border-t border-line">
      <div className="container grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow mb-5">FAQ</p>
          <h2 className="display text-6xl sm:text-7xl">
            Got <span className="text-gradient">questions?</span>
          </h2>
          <p className="mt-6 text-muted max-w-sm">
            Can’t find what you need? <a href="#contact" className="font-semibold text-brand-yellow hover:underline">Talk to us</a>.
          </p>
        </Reveal>

        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-bold transition-colors hover:text-brand-yellow [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-line transition-all group-open:rotate-45 group-open:border-brand-yellow group-open:bg-brand-yellow group-open:text-black" aria-hidden>
                  +
                </span>
              </summary>
              <p className="pb-6 pr-14 text-muted leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
