import Link from "next/link";
import PageHeader from "@/components/admin/PageHeader";
import StatusBadge, { APPLICATION_STATUS_LABELS } from "@/components/dashboard/StatusBadge";
import { setApplicationStatus } from "@/app/admin/actions";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMME_SEASON } from "@/lib/env";
import { CATEGORIES, categoryTitle } from "@/lib/content";
import { formatDate } from "@/lib/format";
import type { Application, ApplicationStatus } from "@/lib/types";

export const metadata = { title: "Registrations" };

const PAGE = 50;

export default async function AdminRegistrations({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; category?: string; q?: string; page?: string }>;
}) {
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  let query = createAdminClient()
    .from("applications")
    .select("*", { count: "exact" })
    .eq("season", PROGRAMME_SEASON)
    .order("paid_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE, page * PAGE - 1);
  if (sp.status && sp.status in APPLICATION_STATUS_LABELS) query = query.eq("status", sp.status);
  if (sp.category && CATEGORIES.some((c) => c.id === sp.category)) query = query.eq("category", sp.category);
  if (sp.q) {
    const q = sp.q.replace(/[%,()]/g, " ").trim();
    if (q) query = query.or(`full_name.ilike.%${q}%,stage_name.ilike.%${q}%,phone.ilike.%${q}%`);
  }
  const { data, count } = await query;
  const apps = (data ?? []) as Application[];
  const qs = new URLSearchParams(Object.entries(sp).filter(([k, v]) => v && k !== "page") as [string, string][]);

  return (
    <>
      <PageHeader
        title="Registrations"
        subtitle={`${count ?? 0} masterclass registrations · season ${PROGRAMME_SEASON}`}
        actions={<a href={`/admin/registrations/export?${qs}`} className="btn btn-outline btn-sm">Export CSV</a>}
      />

      <form className="mb-5 grid gap-3 sm:grid-cols-[1fr_12rem_14rem_auto]" role="search">
        <input name="q" defaultValue={sp.q} className="input" placeholder="Search name, stage name or phone" aria-label="Search" />
        <select name="status" defaultValue={sp.status ?? ""} className="input" aria-label="Status">
          <option value="">All statuses</option>
          {Object.entries(APPLICATION_STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <select name="category" defaultValue={sp.category ?? ""} className="input" aria-label="Track">
          <option value="">All tracks</option>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
        </select>
        <button className="btn btn-primary">Filter</button>
      </form>

      <div className="grid gap-3">
        {apps.length === 0 && <div className="card p-10 text-center text-muted">No registrations match.</div>}
        {apps.map((a) => (
          <details key={a.id} className="card group">
            <summary className="grid cursor-pointer list-none gap-3 p-5 sm:grid-cols-[1.5fr_1fr_auto] sm:items-center [&::-webkit-details-marker]:hidden">
              <span className="min-w-0">
                <span className="block truncate font-bold">{a.full_name}{a.stage_name ? <span className="text-muted font-normal"> · {a.stage_name}</span> : null}</span>
                <span className="text-sm text-muted">{a.phone}{a.city ? ` · ${a.city}` : ""}</span>
              </span>
              <span className="text-sm">
                <span className="block font-semibold">{categoryTitle(a.category)}</span>
                <span className="text-muted">{a.paid_at ? `Paid ${formatDate(a.paid_at)}` : "Not paid"}</span>
              </span>
              <StatusBadge status={a.status} />
            </summary>
            <div className="grid gap-5 border-t border-line p-5 lg:grid-cols-[1fr_16rem]">
              <div>
                <p className="whitespace-pre-line text-sm leading-relaxed text-white/85">{a.bio}</p>
                {a.portfolio_url && (
                  <a href={a.portfolio_url} target="_blank" rel="noopener noreferrer nofollow" className="mt-3 inline-block break-all text-sm font-semibold text-brand-yellow hover:underline">
                    {a.portfolio_url} ↗
                  </a>
                )}
                <p className="mt-3 font-mono text-xs text-subtle">{a.payment_reference}</p>
              </div>
              <form action={setApplicationStatus} className="grid content-start gap-2">
                <input type="hidden" name="id" value={a.id} />
                <label className="label" htmlFor={`st-${a.id}`}>Set status</label>
                <select id={`st-${a.id}`} name="status" defaultValue={a.status} className="input">
                  {(Object.keys(APPLICATION_STATUS_LABELS) as ApplicationStatus[])
                    .filter((s) => a.paid_at || s === "pending_payment" || s === "cancelled")
                    .map((s) => <option key={s} value={s}>{APPLICATION_STATUS_LABELS[s]}</option>)}
                </select>
                <button className="btn btn-primary btn-sm">Update</button>
              </form>
            </div>
          </details>
        ))}
      </div>

      {(count ?? 0) > PAGE && (
        <nav className="mt-6 flex items-center justify-between text-sm" aria-label="Pagination">
          {page > 1 ? <Link className="btn btn-outline btn-sm" href={`?${qs}&page=${page - 1}`}>← Previous</Link> : <span />}
          <span className="text-muted">Page {page} of {Math.ceil((count ?? 0) / PAGE)}</span>
          {page * PAGE < (count ?? 0) ? <Link className="btn btn-outline btn-sm" href={`?${qs}&page=${page + 1}`}>Next →</Link> : <span />}
        </nav>
      )}
    </>
  );
}
