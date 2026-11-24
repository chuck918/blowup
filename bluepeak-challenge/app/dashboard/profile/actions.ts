"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import type { FormState } from "@/components/ui/forms";

export async function updateProfile(_: FormState, fd: FormData): Promise<FormState> {
  const user = await requireUser("/dashboard/profile");
  const full_name = String(fd.get("full_name") ?? "").trim().slice(0, 120);
  const phone = String(fd.get("phone") ?? "").trim().slice(0, 30) || null;

  const fieldErrors: Record<string, string> = {};
  if (full_name.length < 2) fieldErrors.full_name = "Enter your name.";
  if (phone && !/^\+?[\d\s-]{9,20}$/.test(phone)) fieldErrors.phone = "Enter a valid phone number.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  // Only these two columns are writable; role is never taken from the form.
  const { error } = await createAdminClient().from("profiles").update({ full_name, phone }).eq("id", user.id);
  if (error) return { error: "We couldn’t save your profile. Please try again." };
  revalidatePath("/", "layout");
  return { success: "Profile saved." };
}
