import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";
import { getUser, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Log in", robots: { index: false } };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next: rawNext, error } = await searchParams;
  const next = safeNext(rawNext);
  if (await getUser()) redirect(next);

  return (
    <>
      <p className="eyebrow mb-4">Welcome back</p>
      <h1 className="display text-5xl sm:text-6xl mb-3">Log in</h1>
      <p className="text-muted mb-8">
        New here?{" "}
        <Link href={`/signup?next=${encodeURIComponent(next)}`} className="font-semibold text-brand-yellow hover:underline">
          Create an account
        </Link>
      </p>
      <LoginForm next={next} notice={error === "link" ? "That link is invalid or has expired. Please try again." : undefined} />
    </>
  );
}
