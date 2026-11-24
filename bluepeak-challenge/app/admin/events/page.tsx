import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatMoney, formatTime } from "@/lib/format";

export const metadata = { title: "Events" };

export default async function AdminEvents() {
  const { data: events } = await createAdminClient()
    .from("events")
    .select("id, title, slug, starts_at, city, published, ticket_types(capacity, sold, price_pesewas)")
    .order("starts_at", { ascending: false });

  return (
    <>
      <PageHeader title="Events" subtitle="Create events and ticket types." actions={<Link href="/admin/events/new" className="btn btn-primary">New event</Link>} />
      <div className="card overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Sold</th>
              <th className="text-right">Gross</th>
            </tr>
          </thead>
          <tbody>
            {events?.length ? (
              events.map((e) => {
                const cap = e.ticket_types.reduce((s, t) => s + t.capacity, 0);
                const sold = e.ticket_types.reduce((s, t) => s + t.sold, 0);
                const gross = e.ticket_types.reduce((s, t) => s + t.sold * t.price_pesewas, 0);
                const past = new Date(e.starts_at) < new Date();
                return (
                  <tr key={e.id}>
                    <td>
                      <Link href={`/admin/events/${e.id}`} className="font-bold hover:text-brand-yellow">{e.title}</Link>
                      <div className="text-xs text-subtle">/{e.slug}{e.city ? ` · ${e.city}` : ""}</div>
                    </td>
                    <td className="whitespace-nowrap text-muted">{formatDate(e.starts_at)} · {formatTime(e.starts_at)}</td>
                    <td>
                      {e.published ? <span className={`badge ${past ? "" : "badge-green"}`}>{past ? "Past" : "Live"}</span> : <span className="badge">Draft</span>}
                    </td>
                    <td className="text-right tabular-nums">{sold}/{cap}</td>
                    <td className="text-right tabular-nums">{gross ? formatMoney(gross) : "—"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted">
                  No events yet. <Link href="/admin/events/new" className="font-semibold text-brand-yellow">Create your first event</Link>.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-subtle">“Sold” includes seats held by unpaid checkouts for up to 30 minutes.</p>
    </>
  );
}
