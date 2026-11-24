import { NextResponse, type NextRequest } from "next/server";
import { isValidWebhookSignature } from "@/lib/paystack";
import { fulfilPayment, isValidReference } from "@/lib/payments";

/**
 * Paystack webhook. Set this URL in Paystack → Settings → API Keys & Webhooks:
 *   https://YOUR_DOMAIN/api/paystack/webhook
 * We never trust the payload's amount: fulfilPayment re-verifies with Paystack.
 */
export async function POST(request: NextRequest) {
  const raw = await request.text();
  if (!isValidWebhookSignature(raw, request.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  let event: { event?: string; data?: { reference?: string } };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }

  const reference = String(event.data?.reference ?? "").toUpperCase();
  if (event.event === "charge.success" && isValidReference(reference)) {
    try {
      const result = await fulfilPayment(reference);
      console.info(`[webhook] ${reference}: ${result}`);
    } catch (e) {
      console.error("[webhook] fulfil failed", e);
      // 500 makes Paystack retry later.
      return NextResponse.json({ error: "retry" }, { status: 500 });
    }
  }
  return NextResponse.json({ received: true });
}
