import { NextResponse, type NextRequest } from "next/server";
import { fulfilPayment, isValidReference } from "@/lib/payments";

/**
 * Paystack sends the buyer here after checkout (?reference=…). We verify the
 * payment with Paystack, record it, and send them to the right dashboard page.
 * The webhook does the same thing in the background in case they close the tab.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const reference = (searchParams.get("reference") ?? searchParams.get("trxref") ?? "").toUpperCase();
  const isApp = reference.startsWith("APP_");
  const go = (path: string) => NextResponse.redirect(new URL(path, origin));

  if (!isValidReference(reference)) return go("/dashboard");

  let result;
  try {
    result = await fulfilPayment(reference);
  } catch (e) {
    console.error("[payments/callback]", e);
    result = "error";
  }

  const ok = result === "paid" || result === "already_paid";
  if (isApp) return go(`/dashboard?payment=${ok ? "registered" : "failed"}`);
  if (ok) return go(`/dashboard/tickets?order=${encodeURIComponent(reference)}`);
  return go(`/dashboard?payment=${result === "needs_refund" ? "refund" : "failed"}&ref=${encodeURIComponent(reference)}`);
}
