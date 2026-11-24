import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import { OrderBadge } from "@/components/dashboard/StatusBadge";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatDate, formatMoney, formatTime } from "@/lib/format";
import type { OrderStatus } from "@/lib/types";

export const metadata = { title: "Orders" };

const STATUSES: OrderStatus[] = ["paid", "pending", "expired", "failed", "refunded"];

export default async function AdminOrders({ searchParams }: { searchParams: Promise<{ status?: string; q?: string }> }) {
  const sp = await searchParams;
  let query = createAdminClient()
    .from("orders")
    .select("id, reference, email, status, total_pesewas, created_at, paid_at, event:events(title, id), profile:profiles(full_name, phone), order_items(quantity, ticket_type:ticket_types(name))")
    .order("created_at", { ascending: false })
    .limit(200);
  if (sp.status && STATUSES.includes(sp.status as OrderStatus)) query = query.eq("status", sp.status);
  if (sp.q) {
    const q = sp.q.replace(/[%,()]/g, " ").trim();
    if (q) query = query.or(`reference.ilike.%${q}%,email.ilike.%${q}%`);
  }
  const { data } = await query;
  type Row = {
    id: string; reference: string; email: string; status: OrderStatus; total_pesewas: number; created_at: string;
    event: { title: string; id: string } | null; profile: { full_name: string | null; phone: string | null } | null;
    order_items: { quantity: number; ticket_type: { name: string } | null }[];
  };
  const orders = (data ?? []) as unknown as Row[];

  return (
    <>
      <PageHeader title="Orders" subtitle="Latest 200 ticket orders. Refunds are issued from your Paystack dashboard." />
      <form className="mb-5 grid gap-3 sm:grid-cols-[1fr_12rem_auto]" role="search">
        <input name="q" defaultValue={sp.q} className="input" placeholder="Search reference or email" aria-label="Search" />
        <select name="status" defaultValue={sp.status ?? ""} className="input" aria-label="Status">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </select>
        <button className="btn btn-primary">Filter</button>
      </form>

      <div className="card overflow-x-auto">
        <table className="table">
          <thead>
            <tr><th>Reference</th><th>Buyer</th><th>Event</th><th>Tickets</th><th>Status</th><th className="text-right">Total</th></tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr><td colSpan={6} className="py-12 text-center text-muted">No orders yet.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <span className="font-mono text-xs">{o.reference}</span>
                    <div className="text-xs text-subtle">{formatDate(o.created_at)} · {formatTime(o.created_at)}</div>
                  </td>
                  <td>
                    <div className="font-semibold">{o.profile?.full_name ?? "—"}</div>
                    <div className="text-xs text-muted">{o.email}</div>
                  </td>
                  <td>{o.event ? <Link href={`/admin/events/${o.event.id}`} className="hover:text-brand-yellow">{o.event.title}</Link> : "—"}</td>
                  <td className="text-sm text-muted">{o.order_items.map((i) => `${i.quantity}× ${i.ticket_type?.name ?? "?"}`).join(", ")}</td>
                  <td><OrderBadge status={o.status} /></td>
                  <td className="text-right tabular-nums font-semibold">{formatMoney(o.total_pesewas)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-subtle">
        “Failed” orders were paid after their seats sold out — refund them in Paystack, then mark them in your records.
      </p>
    </>
  );
}
