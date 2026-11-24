"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

const LINKS = [
  { href: "/events", label: "Events" },
  { href: "/#categories", label: "Tracks" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export interface NavUser {
  name: string | null;
  admin: boolean;
}

export default function NavBar({ user }: { user: NavUser | null }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = (user?.name ?? "?")
    .split(/[\s@]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? "bg-ink/85 backdrop-blur-xl border-b border-line" : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container flex h-18 items-center justify-between gap-6" aria-label="Main">
        <Link href="/" className="flex items-center shrink-0" aria-label="The BlowUp home">
          <Image src="/images/logo-wordmark.png" alt="The BlowUp" width={916} height={238} priority className="h-8 w-auto" />
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = l.href === pathname;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`px-3.5 py-2 rounded-full text-sm font-semibold transition-colors ${
                    active ? "text-brand-yellow" : "text-white/70 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:flex items-center gap-2">
          {user ? (
            <>
              {user.admin && (
                <Link href="/admin" className="btn btn-ghost btn-sm">
                  Admin
                </Link>
              )}
              <Link href="/dashboard" className="flex items-center gap-2.5 rounded-full border border-line pl-1 pr-4 h-10 hover:border-brand-yellow/50 transition-colors">
                <span className="grid place-items-center size-8 rounded-full bg-brand-yellow text-black text-xs font-black">{initials}</span>
                <span className="text-sm font-semibold">Dashboard</span>
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-ghost btn-sm">
                Log in
              </Link>
              <Link href="/register" className="btn btn-primary btn-sm">
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden grid place-items-center size-10 rounded-full border border-line text-white"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg className="size-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden>
            {open ? <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h10" />}
          </svg>
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-line bg-ink">
          <div className="container py-6 flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-2xl display text-white/90 hover:text-brand-yellow">
                {l.label}
              </Link>
            ))}
            <div className="divider my-4" />
            {user ? (
              <div className="grid gap-2">
                <Link href="/dashboard" onClick={() => setOpen(false)} className="btn btn-primary btn-block">Dashboard</Link>
                {user.admin && <Link href="/admin" onClick={() => setOpen(false)} className="btn btn-outline btn-block">Admin</Link>}
                <form action={signOut}>
                  <button className="btn btn-ghost btn-block">Sign out</button>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setOpen(false)} className="btn btn-outline">Log in</Link>
                <Link href="/register" onClick={() => setOpen(false)} className="btn btn-primary">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
