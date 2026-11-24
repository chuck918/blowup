"use client";

import { useActionState } from "react";
import { updateProfile } from "@/app/dashboard/profile/actions";
import { Field, FormMessage, SubmitButton, type FormState } from "@/components/ui/forms";

export default function ProfileForm({ fullName, phone }: { fullName: string; phone: string }) {
  const [state, action] = useActionState<FormState, FormData>(updateProfile, {});
  const fe = state.fieldErrors ?? {};
  return (
    <form action={action} className="grid gap-5">
      <Field label="Full name" name="full_name" error={fe.full_name}>
        <input id="full_name" name="full_name" className="input" defaultValue={fullName} autoComplete="name" required />
      </Field>
      <Field label="Phone" name="phone" error={fe.phone} hint="Used to contact you about the masterclass and events.">
        <input id="phone" name="phone" type="tel" className="input" defaultValue={phone} autoComplete="tel" />
      </Field>
      <FormMessage state={state} />
      <SubmitButton className="btn btn-primary w-fit" pendingText="Saving…">Save changes</SubmitButton>
    </form>
  );
}
