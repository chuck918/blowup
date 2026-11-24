"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signUp } from "@/app/(auth)/actions";
import { Field, FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { GoogleButton, PhoneForm } from "./SocialAndPhone";

export default function SignupForm({ next }: { next: string }) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [state, action] = useActionState<FormState, FormData>(signUp, {});
  const fe = state.fieldErrors ?? {};

  if (state.success) {
    return (
      <div className="panel p-8 text-center">
        <div className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-brand-yellow text-black">
          <svg className="size-7" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-extrabold">Check your inbox</h2>
        <p className="mt-2 text-muted">{state.success}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <GoogleButton next={next} label="Sign up with Google" />

      <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-subtle">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>

      <div role="tablist" aria-label="Sign-up method" className="grid grid-cols-2 rounded-full border border-line p-1">
        {(["email", "phone"] as const).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => setTab(t)}
            className={`h-9 rounded-full text-sm font-bold transition-colors ${tab === t ? "bg-white text-black" : "text-muted hover:text-white"}`}
          >
            {t === "email" ? "Email" : "Phone"}
          </button>
        ))}
      </div>

      {tab === "email" ? (
        <form action={action} className="grid gap-4" noValidate>
          <input type="hidden" name="next" value={next} />
          <Field label="Full name" name="full_name" error={fe.full_name}>
            <input id="full_name" name="full_name" autoComplete="name" className="input" placeholder="Ama Mensah" required />
          </Field>
          <Field label="Email" name="email" error={fe.email}>
            <input id="email" name="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" required />
          </Field>
          <Field label="Password" name="password" error={fe.password} hint="At least 8 characters.">
            <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} className="input" required />
          </Field>
          <FormMessage state={state} />
          <SubmitButton pendingText="Creating account…">Create account</SubmitButton>
          <p className="text-xs text-subtle text-center">
            By continuing you agree to our <Link href="/terms" className="underline hover:text-white">Terms</Link> and{" "}
            <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link>.
          </p>
        </form>
      ) : (
        <PhoneForm next={next} />
      )}
    </div>
  );
}
