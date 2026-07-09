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

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const LOGO_URL = `${SITE_URL}/images/coloured 4.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The BlowUp",
  description: "Showcase your ideas, and gain national visibility.",
  keywords: ["innovation", "challenge", "startup", "competition", "national visibility"],
  openGraph: {
    title: "The BlowUp",
    description: "Showcase your ideas, and gain national visibility.",
    images: [
      {
        url: LOGO_URL,
        width: 1200,
        height: 1230,
        alt: "The BlowUp Logo",
      },
      {
        url: LOGO_URL,
        width: 600,
        height: 600,
        alt: "The BlowUp Logo (mobile)",
      },
    ],
    type: "website",
    locale: "en_US",
    siteName: "The BlowUp",
  },
  twitter: {
    card: "summary_large_image",
    title: "The BlowUp",
    description: "Showcase your ideas, and gain national visibility.",
    site: "@theblowup",
    images: [LOGO_URL],
  },
  icons: {
    icon: "/images/coloured 4.png",
    shortcut: "/images/coloured 4.png",
    apple: "/images/coloured 4.png",
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
