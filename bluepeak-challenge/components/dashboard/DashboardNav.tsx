"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/app/(auth)/actions";

const TABS = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/tickets", label: "My tickets" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function DashboardNav() {
  const path = usePathname();
  return (
    <nav className="mt-8 flex items-center gap-2 overflow-x-auto border-b border-line" aria-label="Dashboard">
      {TABS.map((t) => {
        const active = t.href === "/dashboard" ? path === t.href : path.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            aria-current={active ? "page" : undefined}
            className={`-mb-px whitespace-nowrap border-b-2 px-4 py-3 text-sm font-bold transition-colors ${
              active ? "border-brand-yellow text-white" : "border-transparent text-muted hover:text-white"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
      <form action={signOut} className="ml-auto">
        <button className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-subtle hover:text-white">Sign out</button>
      </form>
    </nav>
  );
}
