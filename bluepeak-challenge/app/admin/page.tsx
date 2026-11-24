import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMME_SEASON } from "@/lib/env";
import { CATEGORIES } from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";

export default async function AdminHome() {
  const db = createAdminClient();
  const now = new Date().toISOString();
  const [apps, paidOrders, tickets, upcoming] = await Promise.all([
    db.from("applications").select("category, status, fee_pesewas, paid_at").eq("season", PROGRAMME_SEASON),
    db.from("orders").select("total_pesewas").eq("status", "paid"),
    db.from("tickets").select("id, checked_in_at", { count: "exact" }),
    db.from("events").select("id, title, starts_at, published, ticket_types(capacity, sold)").gte("starts_at", now).order("starts_at").limit(5),
  ]);

  const appRows = apps.data ?? [];
  const paidApps = appRows.filter((a) => a.paid_at);
  const appRevenue = paidApps.reduce((s, a) => s + a.fee_pesewas, 0);
  const ticketRevenue = (paidOrders.data ?? []).reduce((s, o) => s + o.total_pesewas, 0);
  const ticketCount = tickets.count ?? 0;
  const checkedIn = (tickets.data ?? []).filter((t) => t.checked_in_at).length;

  const stats = [
    { label: "Enrolled", value: paidApps.length.toLocaleString(), sub: `${appRows.length - paidApps.length} awaiting payment` },
    { label: "Masterclass revenue", value: formatMoney(appRevenue), sub: `Season ${PROGRAMME_SEASON}` },
    { label: "Tickets issued", value: ticketCount.toLocaleString(), sub: `${checkedIn} checked in` },
    { label: "Ticket revenue", value: formatMoney(ticketRevenue), sub: `${paidOrders.data?.length ?? 0} paid orders` },
  ];

  return (
    <>
      <PageHeader title="Overview" subtitle={`Season ${PROGRAMME_SEASON} at a glance`} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-subtle">{s.label}</p>
            <p className="display mt-3 text-4xl">{s.value === "Free" ? "GHS 0" : s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <section className="card p-6" aria-labelledby="by-cat">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="by-cat" className="font-extrabold">Enrolled by track</h2>
            <Link href="/admin/registrations" className="text-sm font-bold text-brand-yellow hover:underline">View all →</Link>
          </div>
          <ul className="grid gap-4">
            {CATEGORIES.map((c) => {
              const n = paidApps.filter((a) => a.category === c.id).length;
              const pct = paidApps.length ? Math.round((n / paidApps.length) * 100) : 0;
              return (
                <li key={c.id}>
                  <div className="mb-1.5 flex justify-between text-sm">
                    <span className="font-semibold">{c.title}</span>
                    <span className="tabular-nums text-muted">{n}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-surface-3">
                    <div className="h-full rounded-full bg-brand-yellow" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="card p-6" aria-labelledby="up-ev">
          <div className="mb-5 flex items-center justify-between">
            <h2 id="up-ev" className="font-extrabold">Upcoming events</h2>
            <Link href="/admin/events/new" className="btn btn-primary btn-sm">New event</Link>
          </div>
          {upcoming.data?.length ? (
            <ul className="divide-y divide-line">
              {upcoming.data.map((e) => {
                const cap = e.ticket_types.reduce((s, t) => s + t.capacity, 0);
                const sold = e.ticket_types.reduce((s, t) => s + t.sold, 0);
                return (
                  <li key={e.id}>
                    <Link href={`/admin/events/${e.id}`} className="flex items-center justify-between gap-4 py-3 hover:text-brand-yellow">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{e.title}</span>
                        <span className="text-xs text-muted">{formatDate(e.starts_at)}</span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3">
                        {!e.published && <span className="badge">Draft</span>}
                        <span className="text-sm tabular-nums text-muted">{sold}/{cap}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-sm text-muted">No upcoming events.</p>
          )}
        </section>
      </div>
    </>
  );
}
