import type { Metadata } from "next";
import { requireUser } from "@/lib/auth";
import { ResetPasswordForm } from "@/components/auth/PasswordForms";

export const metadata: Metadata = { title: "Choose a new password", robots: { index: false } };

export default async function ResetPasswordPage() {
  await requireUser("/reset-password");
  return (
    <>
      <p className="eyebrow mb-4">Account help</p>
      <h1 className="display text-5xl sm:text-6xl mb-3">New password</h1>
      <p className="text-muted mb-8">Choose a new password for your account.</p>
      <ResetPasswordForm />
    </>
  );
}
