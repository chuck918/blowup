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

export const metadata: Metadata = {
  title: "The BlowUp",
  description: "Showcase your ideas, and gain national visibility.",
  keywords: ["innovation", "challenge", "startup", "competition", "national visibility"],
  openGraph: {
    title: "The BlowUp",
    description: "Showcase your ideas, and gain national visibility.",
    images: [
      {
        url: "https://theblowup.vercel.app/",
        width: 1200,
        height: 630,
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
    description: "Showcase your ideas, and gain national visibility.",
    site: "@theblowup",
  },
  icons: {
    icon: "/images/coloured 4.png",
     shortcut: '/images/coloured 4.png',
    apple: '/images/coloured 4.png',
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${dancingScript.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
