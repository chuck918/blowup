import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import SignupForm from "@/components/auth/SignupForm";
import { getUser, safeNext } from "@/lib/auth";

export const metadata: Metadata = { title: "Create account" };

export default async function SignupPage({ searchParams }: { searchParams: Promise<{ next?: string }> }) {
  const next = safeNext((await searchParams).next);
  if (await getUser()) redirect(next);

  return (
    <>
      <p className="eyebrow mb-4">Join the movement</p>
      <h1 className="display text-5xl sm:text-6xl mb-3">Create account</h1>
      <p className="text-muted mb-8">
        Already have one?{" "}
        <Link href={`/login?next=${encodeURIComponent(next)}`} className="font-semibold text-brand-yellow hover:underline">
          Log in
        </Link>
      </p>
      <SignupForm next={next} />
    </>
  );
}
