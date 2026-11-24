"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { signIn } from "@/app/(auth)/actions";
import { FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";
import { GoogleButton, PhoneForm } from "./SocialAndPhone";

export default function LoginForm({ next, notice }: { next: string; notice?: string }) {
  const [tab, setTab] = useState<"email" | "phone">("email");
  const [state, action] = useActionState<FormState, FormData>(signIn, {});

  return (
    <div className="grid gap-6">
      {notice && <p className="alert alert-error">{notice}</p>}
      <GoogleButton next={next} />

      <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-subtle">
        <span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" />
      </div>

      <div role="tablist" aria-label="Sign-in method" className="grid grid-cols-2 rounded-full border border-line p-1">
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
        <form action={action} className="grid gap-4">
          <input type="hidden" name="next" value={next} />
          <div>
            <label htmlFor="email" className="label">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" className="input" placeholder="you@example.com" required />
          </div>
          <div>
            <div className="flex items-baseline justify-between">
              <label htmlFor="password" className="label">Password</label>
              <Link href="/forgot-password" className="text-xs font-semibold text-brand-yellow hover:underline">Forgot?</Link>
            </div>
            <input id="password" name="password" type="password" autoComplete="current-password" className="input" required />
          </div>
          <FormMessage state={state} />
          <SubmitButton pendingText="Signing in…">Log in</SubmitButton>
        </form>
      ) : (
        <PhoneForm next={next} />
      )}
    </div>
  );
}
