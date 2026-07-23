import type { Metadata } from "next";
import { Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "700"],
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.theblowupgh.com";
const LOGO_URL = `${SITE_URL}/logo.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The BlowUp",
  description: "The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence, and creates meaningful opportunities for participants across Ghana and beyond.",
  keywords: ["innovation", "challenge", "startup", "competition", "national visibility", "Ghana"],
  openGraph: {
    title: "The BlowUp",
    description: "The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence, and creates meaningful opportunities for participants across Ghana and beyond.",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 1200,
        alt: "The BlowUp Logo",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "The BlowUp",
  },
  twitter: {
    card: "summary_large_image",
    title: "The BlowUp",
    description: "The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence, and creates meaningful opportunities for participants across Ghana and beyond.",
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
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      "name": "The BlowUp",
      "url": SITE_URL,
      "logo": LOGO_URL,
      "description": "The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence, and creates meaningful opportunities for participants across Ghana and beyond."
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      "url": SITE_URL,
      "name": "The BlowUp",
      "publisher": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "Event",
      "@id": `${SITE_URL}/#event`,
      "name": "The BlowUp Innovation Challenge 2026",
      "description": "National innovation and creative competition uncovering bold ideas and rewarding excellence across Ghana and beyond.",
      "url": SITE_URL,
      "endDate": "2026-08-23",
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/MixedEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": "Ghana",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "GH"
        }
      },
      "organizer": { "@id": `${SITE_URL}/#organization` }
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}/#faq`,
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Who can apply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Anyone passionate about innovation, creativity, or impact-based projects. Open to individuals and teams."
          }
        },
        {
          "@type": "Question",
          "name": "How are winners selected?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A panel of judges evaluates entries on creativity, impact, presentation, and originality."
          }
        },
        {
          "@type": "Question",
          "name": "Can teams apply?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes — both individuals and teams are welcome. One member should be designated as the primary applicant."
          }
        }
      ]
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
