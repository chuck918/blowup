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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
