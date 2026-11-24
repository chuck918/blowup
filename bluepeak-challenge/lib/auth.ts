import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";

export interface SessionUser {
  id: string;
  email: string | null;
  phone: string | null;
  profile: Profile | null;
}

/** The signed-in user (verified with Supabase Auth), or null. Cached per request. */
export const getUser = cache(async (): Promise<SessionUser | null> => {
  await connection(); // always per-request: depends on the visitor’s session
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.user.id)
    .maybeSingle();
  return {
    id: data.user.id,
    email: data.user.email || null,
    phone: data.user.phone || null,
    profile: (profile as Profile | null) ?? null,
  };
});

export async function requireUser(next = "/dashboard"): Promise<SessionUser> {
  const user = await getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

/** Re-checks the role with the service client so it can't be spoofed. */
export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser("/admin");
  if (!(await isAdmin(user.id))) redirect("/dashboard");
  return user;
}

export async function isAdmin(userId: string): Promise<boolean> {
  const { data } = await createAdminClient()
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .single();
  return data?.role === "admin";
}

/** Only allow same-site relative redirects after login. */
export function safeNext(next: unknown, fallback = "/dashboard"): string {
  return typeof next === "string" &&
    next.startsWith("/") &&
    !next.startsWith("//") &&
    !next.startsWith("/\\")
    ? next
    : fallback;
}
