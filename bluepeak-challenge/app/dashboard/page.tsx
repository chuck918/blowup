import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/dashboard/StatusBadge";
import TicketCard from "@/components/dashboard/TicketCard";
import { requireUser } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { isUpcoming, listMyTickets } from "@/lib/tickets";
import { PROGRAMME_SEASON } from "@/lib/env";
import { categoryTitle, DEADLINE_LONG, registrationOpen } from "@/lib/content";
import { formatDate, formatMoney } from "@/lib/format";
import type { Application, ApplicationStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Dashboard", robots: { index: false } };

const FLASH: Record<string, { cls: string; text: string }> = {
  registered: { cls: "alert-success", text: "Payment received — you’re enrolled in the masterclass! Session details will appear here and we’ll message you before it starts." },
  failed: { cls: "alert-error", text: "We couldn’t confirm that payment. If you were charged, contact us with your reference and we’ll sort it out." },
  refund: { cls: "alert-error", text: "Your payment went through but the tickets sold out while you were paying. We’ll refund you — contact us with your reference." },
};

const NEXT_STEP: Record<ApplicationStatus, string> = {
  pending_payment: "Complete your payment to confirm your seat.",
  enrolled: "You’re in! We’ll send session dates, venue and what to bring to your phone and email.",
  completed: "You’ve completed the masterclass — well done. Keep creating, and see you at the next BlowUp event.",
  cancelled: "This registration was cancelled. Contact us if you think this is a mistake.",
};

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ payment?: string; ref?: string; password?: string }> }) {
  const user = await requireUser();
  const { payment, ref, password } = await searchParams;
  const supabase = await createClient();
  const [{ data: application }, tickets] = await Promise.all([
    supabase.from("applications").select("*").eq("user_id", user.id).eq("season", PROGRAMME_SEASON).maybeSingle<Application>(),
    listMyTickets(),
  ]);
  const upcoming = tickets.filter(isUpcoming).slice(0, 4);
  const flash = payment ? FLASH[payment] : null;

  return (
    <div className="grid gap-8">
      {flash && (
        <p role="status" className={`alert ${flash.cls}`}>
          {flash.text}
          {ref && <span className="mt-1 block font-mono text-xs opacity-80">Reference: {ref}</span>}
        </p>
      )}
      {password === "updated" && <p role="status" className="alert alert-success">Your password has been updated.</p>}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        {/* Masterclass registration */}
        <section className="panel relative overflow-hidden p-7" aria-labelledby="app-heading">
          <div className="glow glow-orange -right-20 -top-20 size-64" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <h2 id="app-heading" className="text-xs font-extrabold uppercase tracking-[0.2em] text-subtle">
                Masterclass · Season {PROGRAMME_SEASON}
              </h2>
              {application && <StatusBadge status={application.status} />}
            </div>

            {application ? (
              <>
                <p className="display mt-5 text-4xl">{categoryTitle(application.category)}</p>
                <p className="mt-1 text-muted">{application.stage_name || application.full_name}</p>
                <p className="mt-6 text-white/85">{NEXT_STEP[application.status]}</p>
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-6 text-sm">
                  <div>
                    <dt className="text-subtle">Fee</dt>
                    <dd className="font-bold">{application.paid_at ? `${formatMoney(application.fee_pesewas)} · Paid` : formatMoney(application.fee_pesewas)}</dd>
                  </div>
                  <div>
                    <dt className="text-subtle">{application.paid_at ? "Enrolled" : "Started"}</dt>
                    <dd className="font-bold">{formatDate(application.paid_at ?? application.created_at)}</dd>
                  </div>
                </dl>
                {registrationOpen() && (
                  <Link href="/register" className={`btn mt-6 ${application.paid_at ? "btn-outline" : "btn-primary"}`}>
                    {application.paid_at ? "Edit details" : "Complete payment →"}
                  </Link>
                )}
              </>
            ) : (
              <>
                <p className="display mt-5 text-4xl">Not registered yet</p>
                <p className="mt-3 text-muted">
                  Registration closes on <strong className="text-white">{DEADLINE_LONG}</strong>. It takes about two minutes.
                </p>
                {registrationOpen() && <Link href="/register" className="btn btn-primary mt-6">Register for the masterclass →</Link>}
              </>
            )}
          </div>
        </section>

        {/* Quick links */}
        <section className="grid gap-4" aria-label="Shortcuts">
          <Link href="/events" className="card card-hover flex items-center justify-between p-6">
            <div>
              <p className="font-extrabold text-lg">Browse events</p>
              <p className="text-sm text-muted">Shows, screenings & workshops</p>
            </div>
            <span aria-hidden className="text-2xl">→</span>
          </Link>
          <Link href="/dashboard/tickets" className="card card-hover flex items-center justify-between p-6">
            <div>
              <p className="font-extrabold text-lg">My tickets</p>
              <p className="text-sm text-muted">{tickets.length ? `${tickets.length} ticket${tickets.length > 1 ? "s" : ""}` : "None yet"}</p>
            </div>
            <span aria-hidden className="text-2xl">→</span>
          </Link>
          <Link href="/dashboard/profile" className="card card-hover flex items-center justify-between p-6">
            <div>
              <p className="font-extrabold text-lg">Profile</p>
              <p className="text-sm text-muted truncate">{user.email ?? user.phone}</p>
            </div>
            <span aria-hidden className="text-2xl">→</span>
          </Link>
        </section>
      </div>

      <section aria-labelledby="upcoming-heading">
        <div className="mb-5 flex items-end justify-between">
          <h2 id="upcoming-heading" className="display text-4xl">Upcoming</h2>
          {tickets.length > 0 && <Link href="/dashboard/tickets" className="text-sm font-bold text-brand-yellow hover:underline">All tickets →</Link>}
        </div>
        {upcoming.length ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {upcoming.map((t) => <TicketCard key={t.id} ticket={t} />)}
          </div>
        ) : (
          <div className="card p-8 text-center text-muted">
            No upcoming tickets. <Link href="/events" className="font-semibold text-brand-yellow hover:underline">Find an event</Link>
          </div>
        )}
      </section>
    </div>
  );
}
