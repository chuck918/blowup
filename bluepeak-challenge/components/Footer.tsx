import Link from "next/link";
import { PAYSTACK_URL } from "@/lib/links";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/images/coloured 4.png" alt="BlowUp Logo" className="h-38 w-auto object-contain  hover:brightness-100 transition-all duration-300" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs font-medium">
              Showcasing bold ideas and rewarding excellence across Ghana and beyond.
            </p>
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex mt-6 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black font-extrabold text-sm px-6 py-2.5 rounded-full hover:brightness-110 shadow-[0_0_12px_rgba(255,230,0,0.2)] transition-all duration-200"
            >
              Register
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-brand-orange text-xs font-black uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3 text-white">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="link text-sm font-semibold text-gray-400 hover:text-brand-yellow transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-brand-orange text-xs font-black uppercase tracking-widest mb-5">Info</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="link text-sm font-semibold text-gray-400 hover:text-brand-yellow transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="link text-sm font-semibold text-gray-400 hover:text-brand-yellow transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-white/40 font-semibold">
          <span>© {new Date().getFullYear()} BlowUp. All rights reserved.</span>
          <span>Designed and Built by <a href="https://www.instagram.com/nazir360_/" target="_blank" rel="noopener noreferrer" className="link hover:text-brand-yellow transition-colors">Nazir</a></span>
        </div>
      </div>
    </footer>
  );
}
