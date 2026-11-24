"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/registrations", label: "Registrations" },
  { href: "/admin/events", label: "Events" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/check-in", label: "Check-in" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="flex gap-1 overflow-x-auto lg:flex-col">
      {ITEMS.map((i) => {
        const active = i.href === "/admin" ? path === i.href : path.startsWith(i.href);
        return (
          <Link
            key={i.href}
            href={i.href}
            aria-current={active ? "page" : undefined}
            className={`whitespace-nowrap rounded-xl px-3.5 py-2.5 text-sm font-bold transition-colors ${
              active ? "bg-brand-yellow text-black" : "text-muted hover:bg-white/5 hover:text-white"
            }`}
          >
            {i.label}
          </Link>
        );
      })}
    </nav>
  );
}
