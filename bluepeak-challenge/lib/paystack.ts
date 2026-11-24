import "server-only";
import crypto from "node:crypto";

const API = "https://api.paystack.co";

function secret(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not set");
  return key;
}

export const isPaystackConfigured = () => Boolean(process.env.PAYSTACK_SECRET_KEY);

export function newReference(prefix: "ORD" | "APP"): string {
  return `${prefix}_${Date.now().toString(36)}_${crypto.randomBytes(6).toString("hex")}`.toUpperCase();
}

/** Start a Paystack checkout. Returns the hosted payment page URL. */
export async function initializeTransaction(opts: {
  email: string;
  amountPesewas: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
}): Promise<string> {
  const res = await fetch(`${API}/transaction/initialize`, {
    method: "POST",
    headers: { Authorization: `Bearer ${secret()}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: opts.email,
      amount: opts.amountPesewas,
      currency: "GHS",
      reference: opts.reference,
      callback_url: opts.callbackUrl,
      channels: ["card", "mobile_money"],
      metadata: opts.metadata,
    }),
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.status || !body?.data?.authorization_url) {
    throw new Error(`Paystack initialize failed: ${body?.message ?? res.status}`);
  }
  return body.data.authorization_url as string;
}

export interface VerifiedPayment {
  ok: boolean;
  amountPesewas: number;
}

export async function verifyTransaction(reference: string): Promise<VerifiedPayment> {
  const res = await fetch(`${API}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret()}` },
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);
  const d = body?.data;
  return {
    ok: res.ok && body?.status === true && d?.status === "success" && d?.currency === "GHS",
    amountPesewas: Number(d?.amount ?? 0),
  };
}

/** Constant-time check of x-paystack-signature (HMAC-SHA512 of the raw body). */
export function isValidWebhookSignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !/^[0-9a-f]+$/i.test(signature)) return false;
  const expected = crypto.createHmac("sha512", secret()).update(rawBody).digest();
  const given = Buffer.from(signature, "hex");
  return expected.length === given.length && crypto.timingSafeEqual(expected, given);
}
