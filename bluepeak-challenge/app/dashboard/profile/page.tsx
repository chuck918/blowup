import type { Metadata } from "next";
import Link from "next/link";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { requireUser } from "@/lib/auth";

export const metadata: Metadata = { title: "Profile", robots: { index: false } };

export default async function ProfilePage() {
  const user = await requireUser("/dashboard/profile");
  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <section className="panel p-7" aria-labelledby="details">
        <h2 id="details" className="text-xl font-extrabold mb-6">Your details</h2>
        <ProfileForm fullName={user.profile?.full_name ?? ""} phone={user.profile?.phone ?? user.phone ?? ""} />
      </section>
      <section className="card p-7 h-fit" aria-labelledby="signin">
        <h2 id="signin" className="text-xl font-extrabold mb-4">Sign-in</h2>
        <dl className="grid gap-3 text-sm">
          {user.email && (
            <div>
              <dt className="text-subtle">Email</dt>
              <dd className="font-semibold">{user.email}</dd>
            </div>
          )}
          {user.phone && (
            <div>
              <dt className="text-subtle">Phone</dt>
              <dd className="font-semibold">+{user.phone.replace(/^\+/, "")}</dd>
            </div>
          )}
        </dl>
        {user.email && (
          <Link href="/forgot-password" className="btn btn-outline btn-sm mt-6">Change password</Link>
        )}
      </section>
    </div>
  );
}
