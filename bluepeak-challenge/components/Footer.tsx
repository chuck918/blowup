import Link from "next/link";
import { PAYSTACK_URL } from "@/lib/links";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#timeline", label: "Timeline" },
  { href: "#faq", label: "FAQ" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-16">
        <div className="grid md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="text-xl font-black mb-4">
              Blow<span className="text-[#1d4ed8]">Up</span>
              <span className="text-amber-400">.</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Showcasing bold ideas and rewarding excellence across Ghana and beyond.
            </p>
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex mt-6 bg-amber-400 text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-amber-300 transition-colors"
            >
              Register
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Info</h4>
            <ul className="space-y-3">
              <li><Link href="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">Terms &amp; Conditions</Link></li>
            </ul>
            {/* <div className="mt-8 pt-8 border-t border-white/10">
              <div className="text-2xl font-black text-amber-400">Oct 15, 2026</div>
              <div className="text-gray-500 text-xs mt-1">Registration deadline</div>
            </div> */}
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-600">
          <span>© {new Date().getFullYear()} BlowUp Innovation Challenge. All rights reserved.</span>
          <span>Designed and Built by <a href="https://www.instagram.com/nazir360_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Nazir</a></span>
        </div>
      </div>
    </footer>
  );
}
