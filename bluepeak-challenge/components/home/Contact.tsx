import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { CONTACT } from "@/lib/content";

export default function Contact() {
  const channels = [
    { label: "WhatsApp", value: CONTACT.phoneDisplay, href: CONTACT.whatsapp, external: true },
    { label: "Call", value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phone}` },
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
  ];

  return (
    <section id="contact" className="section scroll-mt-16 border-t border-line">
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-brand-yellow text-black p-8 sm:p-12 lg:p-16">
          <div className="absolute -right-24 -top-24 size-80 rounded-full bg-brand-orange/50 blur-3xl" />
          <div className="relative grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.22em]">Ready when you are</p>
              <h2 className="display mt-5 text-6xl sm:text-7xl lg:text-8xl">
                Blowing up<br />the next hits.
              </h2>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/register" className="btn btn-lg bg-black text-white hover:bg-ink">Register now →</Link>
                <Link href="/events" className="btn btn-lg border border-black/25 hover:bg-black/5">Browse events</Link>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold mb-4">Questions, partnerships or sponsorship — reach us:</p>
              <ul className="divide-y divide-black/15 border-y border-black/15">
                {channels.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="text-xs font-extrabold uppercase tracking-[0.18em] opacity-60">{c.label}</span>
                      <span className="font-bold group-hover:underline underline-offset-4">{c.value}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
