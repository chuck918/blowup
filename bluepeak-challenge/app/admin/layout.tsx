import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import AdminNav from "@/components/admin/AdminNav";
import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/app/(auth)/actions";

export const metadata: Metadata = { title: { default: "Admin", template: "%s · Admin · The BlowUp" }, robots: { index: false } };

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();
  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[15rem_1fr]">
      <aside className="border-b border-line bg-surface lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col gap-6 p-5">
          <div className="flex items-center justify-between">
            <Link href="/admin" aria-label="Admin home">
              <Image src="/images/logo-wordmark.png" alt="The BlowUp" width={916} height={238} className="h-7 w-auto" />
            </Link>
            <span className="badge badge-yellow">Admin</span>
          </div>
          <AdminNav />
          <div className="mt-auto hidden lg:block border-t border-line pt-4 text-sm">
            <p className="truncate font-semibold">{user.profile?.full_name ?? user.email}</p>
            <div className="mt-2 flex gap-3 text-subtle">
              <Link href="/" className="hover:text-white">View site</Link>
              <form action={signOut}><button className="hover:text-white">Sign out</button></form>
            </div>
          </div>
        </div>
      </aside>
      <main className="min-w-0 p-5 sm:p-8 lg:p-10">{children}</main>
    </div>
  );
}
