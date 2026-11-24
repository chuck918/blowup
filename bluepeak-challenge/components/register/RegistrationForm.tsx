"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { submitApplication } from "@/app/register/actions";
import { Field, FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { CATEGORIES } from "@/lib/content";
import { formatMoney } from "@/lib/format";
import type { Application } from "@/lib/types";

export default function RegistrationForm({
  existing,
  defaults,
  feePesewas,
  needsEmail,
  initialCategory,
}: {
  existing: Application | null;
  defaults: { full_name: string; phone: string };
  feePesewas: number;
  needsEmail: boolean;
  initialCategory?: string;
}) {
  const [state, action] = useActionState<FormState, FormData>(submitApplication, {});
  const [category, setCategory] = useState(existing?.category ?? initialCategory ?? "");
  const [bio, setBio] = useState(existing?.bio ?? "");
  const fe = state.fieldErrors ?? {};
  const paid = Boolean(existing?.paid_at);

  return (
    <form action={action} className="grid gap-10" noValidate>
      {/* 1. Category */}
      <fieldset>
        <legend className="mb-1 text-xl font-extrabold"><span className="text-brand-yellow">01</span> · Your track</legend>
        <p className="mb-5 text-sm text-muted">Pick the track you want to learn.</p>
        <div className="grid gap-3 sm:grid-cols-3" role="radiogroup">
          {CATEGORIES.map((c) => {
            const on = category === c.id;
            return (
              <label
                key={c.id}
                className={`relative cursor-pointer rounded-2xl border p-5 transition-all ${on ? "border-brand-yellow bg-brand-yellow/[0.06]" : "border-line hover:border-line-strong"}`}
              >
                <input type="radio" name="category" value={c.id} checked={on} onChange={() => setCategory(c.id)} className="sr-only" />
                <span className="display text-4xl text-white/15">{c.num}</span>
                <span className="mt-3 block font-extrabold leading-snug">{c.title}</span>
                <span className={`absolute right-4 top-4 grid size-5 place-items-center rounded-full border ${on ? "border-brand-yellow bg-brand-yellow" : "border-line-strong"}`} aria-hidden>
                  {on && <span className="size-2 rounded-full bg-black" />}
                </span>
              </label>
            );
          })}
        </div>
        {fe.category && <p className="mt-2 text-xs font-medium text-danger">{fe.category}</p>}
      </fieldset>

      {/* 2. About you */}
      <fieldset className="grid gap-5">
        <legend className="mb-1 text-xl font-extrabold"><span className="text-brand-yellow">02</span> · About you</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" name="full_name" error={fe.full_name}>
            <input id="full_name" name="full_name" className="input" autoComplete="name" defaultValue={existing?.full_name ?? defaults.full_name} required />
          </Field>
          <Field label="Stage / brand name" name="stage_name" hint="Optional">
            <input id="stage_name" name="stage_name" className="input" defaultValue={existing?.stage_name ?? ""} />
          </Field>
          <Field label="Phone (WhatsApp preferred)" name="phone" error={fe.phone}>
            <input id="phone" name="phone" type="tel" className="input" autoComplete="tel" placeholder="024 123 4567" defaultValue={existing?.phone ?? defaults.phone} required />
          </Field>
          <Field label="City / town" name="city" hint="Optional">
            <input id="city" name="city" className="input" autoComplete="address-level2" placeholder="Accra" defaultValue={existing?.city ?? ""} />
          </Field>
          {needsEmail && (
            <div className="sm:col-span-2">
              <Field label="Email" name="email" error={fe.email} hint="For your payment receipt and updates.">
                <input id="email" name="email" type="email" className="input" autoComplete="email" required />
              </Field>
            </div>
          )}
        </div>
      </fieldset>

      {/* 3. Your work */}
      <fieldset className="grid gap-5">
        <legend className="mb-1 text-xl font-extrabold"><span className="text-brand-yellow">03</span> · About your work</legend>
        <Field label="Tell us about yourself" name="bio" error={fe.bio} hint={`${bio.length}/2000 · What do you make, where are you in your journey, and what do you want to learn?`}>
          <textarea id="bio" name="bio" className="input" rows={6} maxLength={2000} value={bio} onChange={(e) => setBio(e.target.value)} required />
        </Field>
        <Field label="Portfolio link" name="portfolio_url" error={fe.portfolio_url} hint="Optional — YouTube, SoundCloud, Audiomack, Instagram… helps us tailor the sessions.">
          <input id="portfolio_url" name="portfolio_url" type="url" className="input" placeholder="https://" defaultValue={existing?.portfolio_url ?? ""} />
        </Field>
      </fieldset>

      {/* Submit */}
      <div className="panel p-6 sm:p-8">
        <label className="flex items-start gap-3 text-sm text-muted">
          <input type="checkbox" name="agree" className="mt-0.5" defaultChecked={paid} />
          <span>
            I confirm my details are accurate and I agree to the{" "}
            <Link href="/terms" target="_blank" className="font-semibold text-white underline">Terms & Conditions</Link>.
            Registration fees are non-refundable.
          </span>
        </label>
        {fe.agree && <p className="mt-2 text-xs font-medium text-danger">{fe.agree}</p>}

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-subtle">Masterclass fee</p>
            <p className="display text-4xl">{paid ? "Paid ✓" : formatMoney(feePesewas)}</p>
          </div>
          <SubmitButton className="btn btn-primary btn-lg sm:min-w-64" pendingText={paid ? "Saving…" : "Redirecting to payment…"}>
            {paid ? "Save changes" : feePesewas === 0 ? "Complete registration" : "Continue to payment →"}
          </SubmitButton>
        </div>
        <div className="mt-4">
          <FormMessage state={state} />
        </div>
      </div>
    </form>
  );
}
