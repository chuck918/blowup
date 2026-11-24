import Link from "next/link";
import Image from "next/image";
import { CONTACT } from "@/lib/content";

const COLUMNS = [
  {
    title: "Masterclass",
    links: [
      { href: "/register", label: "Register" },
      { href: "/#categories", label: "Tracks" },
      { href: "/#how-it-works", label: "How it works" },
      { href: "/#faq", label: "FAQ" },
    ],
  },
  {
    title: "Events",
    links: [
      { href: "/events", label: "Upcoming events" },
      { href: "/dashboard", label: "My tickets" },
      { href: "/#contact", label: "Partner with us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms & Conditions" },
      { href: "/privacy", label: "Privacy Policy" },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-line bg-ink overflow-hidden">
      <div className="container pt-20 pb-10">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Image src="/images/logo-wordmark.png" alt="The BlowUp" width={916} height={238} className="h-11 w-auto" />
            <p className="mt-5 max-w-xs text-muted leading-relaxed">
              Blowing up the next hits. A hands-on masterclass for Ghana’s filmmakers, musicians and sound engineers.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">WhatsApp</a>
              <a href={CONTACT.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">TikTok</a>
              <a href={`mailto:${CONTACT.email}`} className="btn btn-outline btn-sm">Email</a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h3 className="text-[0.7rem] font-extrabold uppercase tracking-[0.2em] text-subtle mb-4">{col.title}</h3>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm font-medium text-white/75 hover:text-brand-yellow transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <p aria-hidden className="display mt-16 select-none text-[22vw] leading-[0.8] text-outline opacity-40 lg:text-[15rem]">
          BlowUp
        </p>

        <div className="mt-8 flex flex-col sm:flex-row justify-between gap-3 border-t border-line pt-6 text-xs text-subtle">
          <span>© {new Date().getFullYear()} The BlowUp. All rights reserved.</span>
          <span>Made in Ghana 🇬🇭</span>
        </div>
      </div>
    </footer>
  );
}
