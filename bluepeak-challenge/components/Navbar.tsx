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
        scrolled ? "bg-white border-b border-gray-100" : "bg-transparent"
      }`}
    >
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className={`text-lg font-black tracking-tight transition-colors ${scrolled ? "text-[#1d4ed8]" : "text-white"}`}>
          Blow<span className={scrolled ? "text-gray-900" : "text-white/70"}>Up</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  scrolled ? "text-gray-600 hover:text-gray-900" : "text-white/80 hover:text-white"
                }`}
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
          className={`hidden md:inline-flex items-center gap-2 text-sm font-semibold px-5 py-2 rounded-full transition-colors ${
            scrolled
              ? "bg-amber-400 text-white hover:bg-amber-300"
              : "bg-white text-gray-900 hover:bg-white/90"
          }`}
        >
          Register
        </a>

        {/* Burger */}
        <button
          className={`md:hidden p-1 transition-colors ${scrolled ? "text-gray-700" : "text-white"}`}
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
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 py-2.5 border-b border-gray-50 last:border-0"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="mt-3 text-center bg-[#1d4ed8] text-white font-semibold text-sm px-5 py-3 rounded-full"
            >
              Register
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
