/** Canonical public origin, e.g. https://www.theblowupgh.com (no trailing slash). */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.theblowupgh.com"
).replace(/\/$/, "");
