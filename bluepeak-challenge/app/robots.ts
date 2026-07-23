import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Claude-Web",
          "ClaudeBot",
          "PerplexityBot",
          "GoogleOther",
          "Bytespider",
          "Meta-ExternalAgent",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://www.theblowupgh.com/sitemap.xml",
  };
}
