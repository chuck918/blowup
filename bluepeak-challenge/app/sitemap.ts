import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/links";
import { listEvents } from "@/lib/events";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await listEvents("upcoming", 200);
  return [
    ...["/", "/events", "/register", "/privacy", "/terms"].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() })),
    ...events.map((e) => ({ url: `${SITE_URL}/events/${e.slug}`, lastModified: new Date(e.updated_at) })),
  ];
}
