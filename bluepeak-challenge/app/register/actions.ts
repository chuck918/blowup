"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { PROGRAMME_SEASON, programmeFeePesewas } from "@/lib/env";
import { CATEGORIES, registrationOpen } from "@/lib/content";
import { initializeTransaction, isPaystackConfigured, newReference } from "@/lib/paystack";
import type { FormState } from "@/components/ui/forms";
import type { Application } from "@/lib/types";

const str = (fd: FormData, k: string, max = 200) => String(fd.get(k) ?? "").trim().slice(0, max);

export async function submitApplication(_: FormState, fd: FormData): Promise<FormState> {
  const user = await requireUser("/register");
  if (!registrationOpen()) return { error: "Registration for this season is closed." };

  const fee = programmeFeePesewas();
  if (fee === null) return { error: "Registration isn’t open yet. Please check back soon." };

  const values = {
    category: str(fd, "category"),
    full_name: str(fd, "full_name", 120),
    stage_name: str(fd, "stage_name", 120) || null,
    phone: str(fd, "phone", 30),
    city: str(fd, "city", 80) || null,
    bio: str(fd, "bio", 2000),
    portfolio_url: str(fd, "portfolio_url", 500) || null,
  };
  const email = (user.email || str(fd, "email")).toLowerCase();

  const fieldErrors: Record<string, string> = {};
  if (!CATEGORIES.some((c) => c.id === values.category)) fieldErrors.category = "Choose a track.";
  if (values.full_name.length < 2) fieldErrors.full_name = "Enter your full name.";
  if (!/^\+?[\d\s-]{9,20}$/.test(values.phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (values.bio.length < 20) fieldErrors.bio = "Tell us a little about yourself (at least 20 characters).";
  if (values.portfolio_url && !/^https?:\/\/\S+\.\S+/.test(values.portfolio_url)) fieldErrors.portfolio_url = "Enter a full link starting with https://";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = "Enter an email for your receipt.";
  if (fd.get("agree") !== "on") fieldErrors.agree = "Please accept the Terms to continue.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, error: "Please fix the highlighted fields." };

  const db = createAdminClient();
  const { data: existing } = await db
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .eq("season", PROGRAMME_SEASON)
    .maybeSingle<Application>();

  // Already paid → just update the details.
  if (existing?.paid_at) {
    const { error } = await db
      .from("applications")
      .update({ ...values, updated_at: new Date().toISOString() })
      .eq("id", existing.id);
    if (error) return { error: "We couldn’t save your changes. Please try again." };
    revalidatePath("/dashboard");
    return { success: "Your details have been updated." };
  }

  // New attempt → fresh Paystack reference (Paystack rejects reused references).
  const reference = newReference("APP");
  const row = {
    ...values,
    user_id: user.id,
    season: PROGRAMME_SEASON,
    fee_pesewas: fee,
    status: fee === 0 ? "enrolled" : "pending_payment",
    payment_reference: reference,
    previous_references: existing?.payment_reference
      ? [...(existing.previous_references ?? []), existing.payment_reference].slice(-20)
      : [],
    paid_at: fee === 0 ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  };
  const { error } = await db.from("applications").upsert(row, { onConflict: "user_id,season" });
  if (error) {
    console.error("[register]", error);
    return { error: "We couldn’t save your registration. Please try again." };
  }
  // Keep the phone on the profile too, if it isn't set.
  if (!user.profile?.phone) await db.from("profiles").update({ phone: values.phone }).eq("id", user.id);

  if (fee === 0) {
    revalidatePath("/dashboard");
    redirect("/dashboard?payment=registered");
  }
  if (!isPaystackConfigured()) return { error: "Online payments aren’t available yet. Your details are saved — please contact us." };

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  let url: string;
  try {
    url = await initializeTransaction({
      email,
      amountPesewas: fee,
      reference,
      callbackUrl: `${proto}://${host}/payments/callback`,
      metadata: { kind: "masterclass", season: PROGRAMME_SEASON, category: values.category },
    });
  } catch (e) {
    console.error("[register] paystack", e);
    return { error: "We couldn’t reach the payment provider. Your details are saved — please try again." };
  }
  redirect(url);
}
