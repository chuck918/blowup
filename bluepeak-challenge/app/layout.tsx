import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/links";
import { FAQS, SITE_DESCRIPTION } from "@/lib/content";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });

const LOGO_URL = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "The BlowUp", template: "%s · The BlowUp" },
  description: SITE_DESCRIPTION,
  keywords: ["masterclass", "film directing", "music", "sound engineering", "beat production", "workshop", "events", "tickets", "Ghana"],
  openGraph: {
    title: "The BlowUp",
    description: SITE_DESCRIPTION,
    images: [{ url: LOGO_URL, width: 1200, height: 1200, alt: "The BlowUp Logo" }],
    type: "website",
    locale: "en_GH",
    siteName: "The BlowUp",
  },
  twitter: {
    card: "summary_large_image",
    title: "The BlowUp",
    description: SITE_DESCRIPTION,
    site: "@theblowup",
    images: [LOGO_URL],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "The BlowUp",
      url: SITE_URL,
      logo: LOGO_URL,
      description: SITE_DESCRIPTION,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "The BlowUp",
      publisher: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      mainEntity: FAQS.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      </head>
      <body className="grain font-sans antialiased min-h-screen flex flex-col">{children}</body>
    </html>
  );
}
