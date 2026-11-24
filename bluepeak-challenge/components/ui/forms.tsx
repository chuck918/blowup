"use client";

import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";

/** Result shape every server action returns to a form. */
export interface FormState {
  error?: string;
  success?: string;
  fieldErrors?: Record<string, string>;
}

export function SubmitButton({
  children,
  pendingText = "Please wait…",
  className = "btn btn-primary btn-block",
}: {
  children: ReactNode;
  pendingText?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending} aria-busy={pending}>
      {pending && <Spinner />}
      {pending ? pendingText : children}
    </button>
  );
}

export function Spinner() {
  return (
    <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4" />
      <path d="M22 12a10 10 0 0 0-10-10" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function FormMessage({ state }: { state: FormState | undefined }) {
  if (!state?.error && !state?.success) return null;
  return (
    <p role={state.error ? "alert" : "status"} className={`alert ${state.error ? "alert-error" : "alert-success"}`}>
      {state.error ?? state.success}
    </p>
  );
}

export function Field({
  label,
  name,
  error,
  hint,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="label">
        {label}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-danger" id={`${name}-error`}>
          {error}
        </p>
      ) : hint ? (
        <p className="hint">{hint}</p>
      ) : null}
    </div>
  );
}
