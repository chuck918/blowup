"use client";

import { useActionState } from "react";
import { requestPasswordReset, updatePassword } from "@/app/(auth)/actions";
import { Field, FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";

export function ForgotPasswordForm() {
  const [state, action] = useActionState<FormState, FormData>(requestPasswordReset, {});
  return (
    <form action={action} className="grid gap-4">
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" autoComplete="email" className="input" required />
      </div>
      <FormMessage state={state} />
      <SubmitButton pendingText="Sending…">Send reset link</SubmitButton>
    </form>
  );
}

export function ResetPasswordForm() {
  const [state, action] = useActionState<FormState, FormData>(updatePassword, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-4">
      <Field label="New password" name="password" error={fe.password} hint="At least 8 characters.">
        <input id="password" name="password" type="password" autoComplete="new-password" className="input" required />
      </Field>
      <Field label="Confirm password" name="confirm" error={fe.confirm}>
        <input id="confirm" name="confirm" type="password" autoComplete="new-password" className="input" required />
      </Field>
      <FormMessage state={state} />
      <SubmitButton pendingText="Saving…">Update password</SubmitButton>
    </form>
  );
}
