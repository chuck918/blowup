import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { qrSvg, type TicketView } from "@/lib/tickets";
import { formatDate, formatTime } from "@/lib/format";
import PrintButton from "@/components/dashboard/PrintButton";

export const metadata: Metadata = { title: "Ticket", robots: { index: false } };

export default async function TicketPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  if (!/^[A-Z0-9]{6,20}$/.test(code)) notFound();

  const supabase = await createClient();
  const { data } = await supabase
    .from("tickets")
    .select("id, code, order_id, checked_in_at, created_at, event:events(title, slug, starts_at, ends_at, venue, city, cover_url), ticket_type:ticket_types(name), order:orders(reference)")
    .eq("code", code)
    .maybeSingle();
  if (!data) notFound(); // RLS: only the owner can see it
  const t = data as unknown as TicketView;
  const svg = await qrSvg(t.code);
  const e = t.event;

  return (
    <div className="mx-auto max-w-md">
      <Link href="/dashboard/tickets" className="text-sm font-semibold text-muted hover:text-white print:hidden">← My tickets</Link>

      <article className="ticket mt-5 overflow-hidden" style={{ ["--tear" as string]: "44%" }}>
        <div className="bg-linear-to-br from-brand-yellow via-brand-gold to-brand-orange p-6 text-black">
          <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.22em] opacity-70">The BlowUp · Admit one</p>
          <h1 className="display mt-3 text-4xl leading-none">{e?.title ?? "Event"}</h1>
          <p className="mt-3 font-bold">{t.ticket_type?.name}</p>
        </div>
        <dl className="grid grid-cols-2 gap-4 p-6 text-sm">
          <div>
            <dt className="text-subtle text-xs uppercase tracking-widest font-bold">Date</dt>
            <dd className="mt-1 font-bold">{e ? formatDate(e.starts_at) : "TBA"}</dd>
          </div>
          <div>
            <dt className="text-subtle text-xs uppercase tracking-widest font-bold">Time</dt>
            <dd className="mt-1 font-bold">{e ? formatTime(e.starts_at) : "TBA"}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-subtle text-xs uppercase tracking-widest font-bold">Venue</dt>
            <dd className="mt-1 font-bold">{[e?.venue, e?.city].filter(Boolean).join(", ") || "TBA"}</dd>
          </div>
        </dl>
        <div className="ticket-tear" />
        <div className="grid place-items-center p-8">
          {t.checked_in_at ? (
            <div className="grid size-56 place-items-center rounded-2xl border border-success/40 bg-success/10 text-center text-success">
              <div>
                <div className="text-5xl">✓</div>
                <p className="mt-2 font-bold">Checked in</p>
                <p className="text-xs opacity-80">{formatDate(t.checked_in_at)} · {formatTime(t.checked_in_at)}</p>
              </div>
            </div>
          ) : (
            <div className="size-56 rounded-2xl bg-white p-3 [&_svg]:size-full" dangerouslySetInnerHTML={{ __html: svg }} role="img" aria-label={`QR code for ticket ${t.code}`} />
          )}
          <p className="mt-5 font-mono text-xl tracking-[0.3em]">{t.code}</p>
          <p className="mt-1 text-xs text-subtle">Order {t.order?.reference}</p>
        </div>
      </article>

      <div className="mt-6 flex gap-3 print:hidden">
        {e && <Link href={`/events/${e.slug}`} className="btn btn-outline flex-1">Event details</Link>}
        <PrintButton />
      </div>
      <p className="mt-4 text-center text-xs text-subtle print:hidden">Turn your screen brightness up at the door. Each code can be scanned once.</p>
    </div>
  );
}
