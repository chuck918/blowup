"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/ui/forms";

/** Normalise Ghana numbers: 024 123 4567 → +233241234567. */
export function toE164(raw: string): string | null {
  const digits = raw.replace(/[^\d+]/g, "");
  if (/^\+\d{10,15}$/.test(digits)) return digits;
  if (/^0\d{9}$/.test(digits)) return `+233${digits.slice(1)}`;
  if (/^233\d{9}$/.test(digits)) return `+${digits}`;
  return null;
}

export function GoogleButton({ next, label = "Continue with Google" }: { next: string; label?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function go() {
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}` },
    });
    if (error) {
      setError("Google sign-in isn’t available right now.");
      setLoading(false);
    }
  }

  return (
    <div>
      <button type="button" onClick={go} disabled={loading} className="btn btn-outline btn-block bg-white/[0.03]">
        {loading ? (
          <Spinner />
        ) : (
          <svg className="size-4" viewBox="0 0 24 24" aria-hidden>
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09A6.6 6.6 0 0 1 5.5 12c0-.73.13-1.43.34-2.09V7.07H2.18A11 11 0 0 0 1 12c0 1.78.43 3.45 1.18 4.93l3.66-2.84z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
          </svg>
        )}
        {label}
      </button>
      {error && <p className="mt-2 text-xs text-danger">{error}</p>}
    </div>
  );
}

/** Two-step phone sign-in: send SMS code → verify. Creates the account if new. */
export function PhoneForm({ next }: { next: string }) {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [sentTo, setSentTo] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const e164 = toE164(phone);
    if (!e164) return setError("Enter a valid phone number, e.g. 024 123 4567.");
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.signInWithOtp({ phone: e164 });
    setLoading(false);
    if (error) return setError("We couldn’t send a code to that number. Try again or use email.");
    setSentTo(e164);
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!sentTo) return;
    setLoading(true);
    setError(null);
    const { error } = await createClient().auth.verifyOtp({ phone: sentTo, token: code.trim(), type: "sms" });
    if (error) {
      setLoading(false);
      return setError("That code is incorrect or has expired.");
    }
    router.replace(next);
    router.refresh();
  }

  if (!sentTo) {
    return (
      <form onSubmit={send} className="grid gap-4">
        <div>
          <label htmlFor="phone" className="label">Phone number</label>
          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="024 123 4567" className="input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <p className="hint">We’ll text you a 6-digit code. Standard SMS rates may apply.</p>
        </div>
        {error && <p role="alert" className="alert alert-error">{error}</p>}
        <button className="btn btn-primary btn-block" disabled={loading}>
          {loading && <Spinner />} Send code
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={verify} className="grid gap-4">
      <p className="alert alert-info">Code sent to <strong>{sentTo}</strong>.</p>
      <div>
        <label htmlFor="otp" className="label">6-digit code</label>
        <input id="otp" name="otp" inputMode="numeric" autoComplete="one-time-code" pattern="\d{6}" maxLength={6} className="input text-center text-2xl tracking-[0.5em] font-mono" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} autoFocus required />
      </div>
      {error && <p role="alert" className="alert alert-error">{error}</p>}
      <button className="btn btn-primary btn-block" disabled={loading || code.length !== 6}>
        {loading && <Spinner />} Verify & continue
      </button>
      <button type="button" className="btn btn-ghost btn-sm mx-auto" onClick={() => { setSentTo(null); setCode(""); }}>
        Use a different number
      </button>
    </form>
  );
}
