"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { PAYSTACK_URL } from "@/lib/links";

const links = [
  { href: "#about", label: "About" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#050505]/80 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="BlowUp Logo" className="h-38 w-auto object-contain brightness-110" />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none text-white">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link text-sm font-semibold transition-colors text-white/80 hover:text-brand-yellow"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={PAYSTACK_URL}
          target="_blank"
          rel="noopener"
          className="hidden md:inline-flex items-center gap-2 text-sm font-extrabold px-6 py-2.5 rounded-full transition-all bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black hover:brightness-110 shadow-[0_0_15px_rgba(255,230,0,0.25)] hover:shadow-[0_0_25px_rgba(255,230,0,0.45)] hover:-translate-y-0.5 duration-200"
        >
          Register
        </a>

        {/* Burger */}
        <button
          className="md:hidden p-1 transition-colors text-white hover:text-brand-yellow"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg border-t border-white/10">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="link text-sm font-semibold text-white/80 hover:text-brand-yellow py-2.5 border-b border-white/5 last:border-0"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="mt-3 text-center font-extrabold text-sm px-5 py-3 rounded-full bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black shadow-[0_0_15px_rgba(255,230,0,0.25)]"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
