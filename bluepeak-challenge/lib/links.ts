/**
 * Shared link constants for the BlowUp Innovation Challenge.
 *
 * PAYSTACK_URL – includes a redirect_url so Paystack sends the buyer to
 *                /thank-you immediately after a successful payment, which
 *                then auto-redirects them to the application Google Form.
 *
 * ⚠️  Before going live, replace SITE_ORIGIN with your real domain, e.g.
 *     https://blowupchallenge.com
 *     You can also set it via the NEXT_PUBLIC_SITE_URL environment variable.
 */

const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://blowupchallenge.com";

export const PAYSTACK_URL = `https://paystack.shop/pay/74ysd3qw4-?redirect_url=${encodeURIComponent(
  `${SITE_ORIGIN}/thank-you`
)}`;

export const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScNxrpienMzI_kvFutwZ6gOEpCeo7dKVJwlueoTUQpK0Vxesw/viewform?usp=sharing&ouid=116088014118637590493";
