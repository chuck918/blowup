import type { MetadataRoute } from "next";

const SITE_URL = "https://theblowupgh.com"; // Update to your production domain

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${SITE_URL}/thank-you`,
      lastModified: new Date(),
    },
  ];
}
