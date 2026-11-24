"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { localInputToIso, slugify } from "@/lib/format";
import type { FormState } from "@/components/ui/forms";
import type { ApplicationStatus } from "@/lib/types";

const str = (fd: FormData, k: string, max = 500) => String(fd.get(k) ?? "").trim().slice(0, max);
const UUID = /^[0-9a-f-]{36}$/;

function refreshPublic(slug?: string) {
  revalidatePath("/");
  revalidatePath("/events");
  if (slug) revalidatePath(`/events/${slug}`);
  revalidatePath("/admin", "layout");
}

// ─── Events ──────────────────────────────────────────────────────────────

export async function saveEvent(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const db = createAdminClient();
  const id = str(fd, "id");
  const title = str(fd, "title", 140);
  const slug = slugify(str(fd, "slug", 80) || title);
  const starts_at = localInputToIso(str(fd, "starts_at"));
  const ends_at = localInputToIso(str(fd, "ends_at"));

  const fieldErrors: Record<string, string> = {};
  if (title.length < 3) fieldErrors.title = "Add a title.";
  if (!slug) fieldErrors.slug = "Add a URL slug.";
  if (!starts_at) fieldErrors.starts_at = "Set a start date and time.";
  if (starts_at && ends_at && ends_at <= starts_at) fieldErrors.ends_at = "End must be after start.";
  if (Object.keys(fieldErrors).length) return { fieldErrors, error: "Please fix the highlighted fields." };

  // Optional cover upload.
  let cover_url = str(fd, "cover_url") || null;
  const file = fd.get("cover");
  if (file instanceof File && file.size > 0) {
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return { fieldErrors: { cover: "Use a JPG, PNG or WebP image." } };
    if (file.size > 5 * 1024 * 1024) return { fieldErrors: { cover: "Image must be under 5 MB." } };
    const ext = file.type.split("/")[1].replace("jpeg", "jpg");
    const path = `${slug}-${Date.now()}.${ext}`;
    const { error: upErr } = await db.storage.from("event-covers").upload(path, file, { contentType: file.type, upsert: false });
    if (upErr) return { fieldErrors: { cover: `Upload failed: ${upErr.message}` } };
    cover_url = db.storage.from("event-covers").getPublicUrl(path).data.publicUrl;
  }
  if (fd.get("remove_cover") === "on") cover_url = null;

  const row = {
    title,
    slug,
    summary: str(fd, "summary", 300) || null,
    description: str(fd, "description", 10000) || null,
    venue: str(fd, "venue", 140) || null,
    city: str(fd, "city", 80) || null,
    starts_at,
    ends_at,
    cover_url,
    published: fd.get("published") === "on",
    updated_at: new Date().toISOString(),
  };

  const res = id
    ? await db.from("events").update(row).eq("id", id).select("id").single()
    : await db.from("events").insert(row).select("id").single();
  if (res.error) {
    if (res.error.code === "23505") return { fieldErrors: { slug: "Another event already uses this URL." } };
    return { error: res.error.message };
  }
  refreshPublic(slug);
  if (!id) redirect(`/admin/events/${res.data.id}?created=1`);
  return { success: "Event saved." };
}

export async function deleteEvent(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  if (!UUID.test(id)) return;
  const db = createAdminClient();
  const { count } = await db.from("orders").select("id", { count: "exact", head: true }).eq("event_id", id);
  if (count) redirect(`/admin/events/${id}?error=has-orders`);
  await db.from("events").delete().eq("id", id);
  refreshPublic();
  redirect("/admin/events");
}

// ─── Ticket types ────────────────────────────────────────────────────────

export async function saveTicketType(_: FormState, fd: FormData): Promise<FormState> {
  await requireAdmin();
  const db = createAdminClient();
  const id = str(fd, "id");
  const event_id = str(fd, "event_id");
  const name = str(fd, "name", 80);
  const price = Number(str(fd, "price"));
  const capacity = Number(str(fd, "capacity"));
  const max_per_order = Number(str(fd, "max_per_order") || 10);

  const fieldErrors: Record<string, string> = {};
  if (!UUID.test(event_id)) return { error: "Missing event." };
  if (!name) fieldErrors.name = "Name it, e.g. Regular or VIP.";
  if (!Number.isFinite(price) || price < 0) fieldErrors.price = "Price in GHS (0 for free).";
  if (!Number.isInteger(capacity) || capacity < 1) fieldErrors.capacity = "Whole number, at least 1.";
  if (!Number.isInteger(max_per_order) || max_per_order < 1 || max_per_order > 50) fieldErrors.max_per_order = "1–50.";
  if (Object.keys(fieldErrors).length) return { fieldErrors };

  const row = {
    event_id,
    name,
    description: str(fd, "description", 200) || null,
    price_pesewas: Math.round(price * 100),
    capacity,
    max_per_order,
    sales_end: localInputToIso(str(fd, "sales_end")),
    sort: Number(str(fd, "sort")) || 0,
  };

  const res = id ? await db.from("ticket_types").update(row).eq("id", id) : await db.from("ticket_types").insert(row);
  if (res.error) {
    if (res.error.message.includes("ticket_types_not_oversold")) return { fieldErrors: { capacity: "Capacity can’t be below tickets already sold." } };
    return { error: res.error.message };
  }
  const { data: ev } = await db.from("events").select("slug").eq("id", event_id).single();
  refreshPublic(ev?.slug);
  return { success: id ? "Ticket type updated." : "Ticket type added." };
}

export async function deleteTicketType(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const eventId = str(fd, "event_id");
  if (!UUID.test(id)) return;
  const db = createAdminClient();
  const { error } = await db.from("ticket_types").delete().eq("id", id).eq("sold", 0);
  if (error) redirect(`/admin/events/${eventId}?error=ticket-in-use`);
  refreshPublic();
  revalidatePath(`/admin/events/${eventId}`);
}

// ─── Masterclass registrations ────────────────────────────────────────────────────────

const STATUSES: ApplicationStatus[] = ["pending_payment", "enrolled", "completed", "cancelled"];

export async function setApplicationStatus(fd: FormData) {
  await requireAdmin();
  const id = str(fd, "id");
  const status = str(fd, "status") as ApplicationStatus;
  if (!UUID.test(id) || !STATUSES.includes(status)) return;
  const db = createAdminClient();
  // An unpaid registration can't be marked enrolled/completed by mistake.
  const { data } = await db.from("applications").select("paid_at").eq("id", id).single();
  if (!data?.paid_at && status !== "pending_payment" && status !== "cancelled") return;
  await db.from("applications").update({ status, updated_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/admin/registrations");
}

// ─── Check-in ────────────────────────────────────────────────────────────

export interface CheckInResult {
  status: "ok" | "already_checked_in" | "not_found" | "error";
  code?: string;
  event?: string;
  ticket_type?: string;
  holder?: string;
  checked_in_at?: string;
}

export async function checkInTicket(code: string): Promise<CheckInResult> {
  await requireAdmin();
  const clean = code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (!clean) return { status: "not_found" };
  const { data, error } = await createAdminClient().rpc("check_in_ticket", { p_code: clean });
  if (error) return { status: "error" };
  return data as CheckInResult;
}
