import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyTransaction } from "@/lib/paystack";

export type FulfilResult =
  | "paid"
  | "already_paid"
  | "amount_mismatch"
  | "not_found"
  | "needs_refund"
  | "unverified";

export const isValidReference = (r: string) => /^(ORD|APP)_[A-Z0-9_]{6,60}$/.test(r);

/**
 * Verify a Paystack reference with Paystack itself, then record it.
 * Safe to call repeatedly — the callback page and the webhook both call it.
 */
export async function fulfilPayment(reference: string): Promise<FulfilResult> {
  if (!isValidReference(reference)) return "not_found";
  const payment = await verifyTransaction(reference);
  if (!payment.ok) return "unverified";

  const fn = reference.startsWith("APP_") ? "mark_application_paid" : "mark_order_paid";
  const { data, error } = await createAdminClient().rpc(fn, {
    p_reference: reference,
    p_amount_pesewas: payment.amountPesewas,
  });
  if (error) throw error;

  const result = data as FulfilResult;
  if (result === "needs_refund" || result === "amount_mismatch") {
    console.error(`[payments] ${reference}: ${result} — review in Paystack and refund if needed.`);
  }
  return result;
}
