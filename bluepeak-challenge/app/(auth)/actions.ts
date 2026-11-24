"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/env";
import { safeNext } from "@/lib/auth";
import type { FormState } from "@/components/ui/forms";

const NOT_CONFIGURED: FormState = { error: "Accounts are not available yet. Please try again soon." };

async function origin() {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

const str = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();
const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

export async function signIn(_: FormState, fd: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  if (!isEmail(email) || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      error: /confirm/i.test(error.message)
        ? "Please confirm your email first — check your inbox for the link."
        : "That email and password don’t match.",
    };
  }
  revalidatePath("/", "layout");
  redirect(safeNext(fd.get("next")));
}

export async function signUp(_: FormState, fd: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const fullName = str(fd, "full_name");
  const email = str(fd, "email");
  const password = String(fd.get("password") ?? "");
  const next = safeNext(fd.get("next"));

  const fieldErrors: Record<string, string> = {};
  if (fullName.length < 2) fieldErrors.full_name = "Tell us your name.";
  if (!isEmail(email)) fieldErrors.email = "Enter a valid email address.";
  if (password.length < 8) fieldErrors.password = "Use at least 8 characters.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${await origin()}/auth/callback?next=${encodeURIComponent(next)}`,
    },
  });
  if (error) return { error: error.message };

  // Email confirmation disabled → signed in straight away.
  if (data.session) {
    revalidatePath("/", "layout");
    redirect(next);
  }
  return { success: `Almost there! We sent a confirmation link to ${email}. Open it to activate your account.` };
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(_: FormState, fd: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const email = str(fd, "email");
  if (!isEmail(email)) return { error: "Enter a valid email address." };
  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${await origin()}/auth/callback?next=/reset-password`,
  });
  // Same message whether or not the account exists.
  return { success: "If that email has an account, a reset link is on its way." };
}

export async function updatePassword(_: FormState, fd: FormData): Promise<FormState> {
  if (!isSupabaseConfigured) return NOT_CONFIGURED;
  const password = String(fd.get("password") ?? "");
  if (password.length < 8) return { fieldErrors: { password: "Use at least 8 characters." } };
  if (password !== String(fd.get("confirm") ?? "")) return { fieldErrors: { confirm: "Passwords don’t match." } };

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: "Your reset link has expired. Request a new one." };
  redirect("/dashboard?password=updated");
}
