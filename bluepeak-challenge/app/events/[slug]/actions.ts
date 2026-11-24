"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { getUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { initializeTransaction, isPaystackConfigured, newReference } from "@/lib/paystack";
import type { FormState } from "@/components/ui/forms";
import type { Order } from "@/lib/types";

function friendly(message: string): string {
  const [code, detail] = message.split(":");
  switch (code) {
    case "SOLD_OUT": return `Sorry — not enough “${detail}” tickets left.`;
    case "SALES_ENDED": return `Sales for “${detail}” have ended.`;
    case "TOO_MANY": return detail === "order" ? "You can buy up to 20 tickets per order." : `Too many “${detail}” tickets in one order.`;
    case "EVENT_ENDED": return "This event has already ended.";
    case "NO_ITEMS": return "Choose at least one ticket.";
    default: return "We couldn’t reserve your tickets. Please try again.";
  }
}

export async function checkout(_: FormState, fd: FormData): Promise<FormState> {
  const slug = String(fd.get("slug") ?? "");
  const eventId = String(fd.get("event_id") ?? "");
  const user = await getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(`/events/${slug}`)}`);

  const email = (user.email || String(fd.get("email") ?? "").trim()).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: "Enter an email address for your receipt." };

  const items = [...fd.entries()]
    .filter(([k]) => k.startsWith("qty:"))
    .map(([k, v]) => ({ ticket_type_id: k.slice(4), quantity: Number(v) || 0 }))
    .filter((i) => i.quantity > 0 && /^[0-9a-f-]{36}$/.test(i.ticket_type_id));
  if (!items.length) return { error: "Choose at least one ticket." };

  const reference = newReference("ORD");
  const { data, error } = await createAdminClient().rpc("create_order", {
    p_user_id: user.id,
    p_event_id: eventId,
    p_email: email,
    p_reference: reference,
    p_items: items,
  });
  if (error) return { error: friendly(error.message) };
  const order = data as Order;

  // Free tickets are issued immediately.
  if (order.status === "paid") redirect(`/dashboard/tickets?order=${order.reference}`);

  if (!isPaystackConfigured()) return { error: "Online payments aren’t available yet. Please contact us." };

  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  let url: string;
  try {
    url = await initializeTransaction({
      email,
      amountPesewas: order.total_pesewas,
      reference: order.reference,
      callbackUrl: `${proto}://${host}/payments/callback`,
      metadata: { kind: "tickets", order_id: order.id, event_slug: slug },
    });
  } catch (e) {
    console.error("[checkout]", e);
    return { error: "We couldn’t reach the payment provider. Your seats are held for 30 minutes — please try again." };
  }
  redirect(url);
}
