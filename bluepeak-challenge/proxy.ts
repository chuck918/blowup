import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    // Everything except static assets, images and the Paystack webhook.
    "/((?!_next/static|_next/image|api/paystack/webhook|favicon.ico|images/|.*\.(?:png|jpg|jpeg|svg|webp|ico|txt|webmanifest)$).*)",
  ],
};
