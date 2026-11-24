import type { Metadata } from "next";
import Link from "next/link";
import { ForgotPasswordForm } from "@/components/auth/PasswordForms";

export const metadata: Metadata = { title: "Reset password", robots: { index: false } };

export default function ForgotPasswordPage() {
  return (
    <>
      <p className="eyebrow mb-4">Account help</p>
      <h1 className="display text-5xl sm:text-6xl mb-3">Forgot password</h1>
      <p className="text-muted mb-8">Enter your email and we’ll send you a link to choose a new password.</p>
      <ForgotPasswordForm />
      <p className="mt-6 text-sm text-muted text-center">
        Remembered it? <Link href="/login" className="font-semibold text-brand-yellow hover:underline">Log in</Link>
      </p>
    </>
  );
}
