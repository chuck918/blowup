"use client";

import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { checkout } from "@/app/events/[slug]/actions";
import { FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { formatMoney } from "@/lib/format";
import type { TicketType } from "@/lib/types";

export default function TicketSelector({
  eventId,
  slug,
  types,
  signedIn,
  needsEmail,
  ended,
  closedIds,
}: {
  eventId: string;
  slug: string;
  types: TicketType[];
  signedIn: boolean;
  needsEmail: boolean;
  ended: boolean;
  closedIds: string[];
}) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const [state, action] = useActionState<FormState, FormData>(checkout, {});

  const total = useMemo(() => types.reduce((sum, t) => sum + (qty[t.id] ?? 0) * t.price_pesewas, 0), [qty, types]);
  const count = Object.values(qty).reduce((a, b) => a + b, 0);

  if (!types.length) {
    return <p className="text-muted">Tickets will be available soon.</p>;
  }

  return (
    <form action={action} className="grid gap-4">
      <input type="hidden" name="event_id" value={eventId} />
      <input type="hidden" name="slug" value={slug} />

      <ul className="grid gap-3">
        {types.map((t) => {
          const left = Math.max(0, t.capacity - t.sold);
          const closed = ended || closedIds.includes(t.id);
          const max = Math.min(left, t.max_per_order);
          const n = qty[t.id] ?? 0;
          const set = (v: number) => setQty((q) => ({ ...q, [t.id]: Math.max(0, Math.min(max, v)) }));
          return (
            <li key={t.id} className={`rounded-2xl border p-4 transition-colors ${n > 0 ? "border-brand-yellow/60 bg-brand-yellow/[0.04]" : "border-line"}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-extrabold">{t.name}</p>
                  {t.description && <p className="mt-1 text-sm text-muted">{t.description}</p>}
                  <p className="mt-2 text-sm font-bold text-brand-yellow">{formatMoney(t.price_pesewas)}</p>
                  {!closed && left <= 20 && <p className="mt-1 text-xs font-semibold text-brand-orange">Only {left} left</p>}
                </div>
                {closed ? (
                  <span className="badge">{left === 0 ? "Sold out" : "Unavailable"}</span>
                ) : (
                  <div className="flex items-center gap-1 rounded-full border border-line p-1">
                    <button type="button" onClick={() => set(n - 1)} disabled={n === 0} className="grid size-8 place-items-center rounded-full text-lg hover:bg-white/10 disabled:opacity-30" aria-label={`Remove one ${t.name}`}>−</button>
                    <output className="w-6 text-center font-bold tabular-nums" aria-live="polite">{n}</output>
                    <button type="button" onClick={() => set(n + 1)} disabled={n >= max} className="grid size-8 place-items-center rounded-full text-lg hover:bg-white/10 disabled:opacity-30" aria-label={`Add one ${t.name}`}>+</button>
                  </div>
                )}
              </div>
              {n > 0 && <input type="hidden" name={`qty:${t.id}`} value={n} />}
            </li>
          );
        })}
      </ul>

      {signedIn && needsEmail && count > 0 && (
        <div>
          <label htmlFor="email" className="label">Email for your receipt</label>
          <input id="email" name="email" type="email" required className="input" placeholder="you@example.com" />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-line pt-4">
        <span className="text-sm text-muted">{count > 0 ? `${count} ticket${count > 1 ? "s" : ""}` : "Total"}</span>
        <span className="display text-3xl">{count > 0 ? formatMoney(total) : "—"}</span>
      </div>

      <FormMessage state={state} />

      {signedIn ? (
        <SubmitButton className="btn btn-primary btn-lg btn-block" pendingText="Reserving…">
          {count === 0 ? "Select tickets" : total === 0 ? "Get free tickets" : "Checkout"}
        </SubmitButton>
      ) : (
        <Link href={`/login?next=${encodeURIComponent(`/events/${slug}`)}`} className="btn btn-primary btn-lg btn-block">
          Log in to buy tickets
        </Link>
      )}
      <p className="text-center text-xs text-subtle">Secure payment by Paystack · Mobile Money & cards</p>
    </form>
  );
}
