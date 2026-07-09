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
  metadataBase: new URL("https://www.theblowupgh.com"),
  title: "The BlowUp",
  description: "Showcase your ideas, and gain national visibility.",
  keywords: ["innovation", "challenge", "startup", "competition", "national visibility"],
  openGraph: {
    title: "The BlowUp",
    description: "Showcase your ideas, and gain national visibility.",
    images: [
      {
        url: "/images/coloured%204.png",
        width: 1200,
        height: 630,
        alt: "The BlowUp Logo",
      },
      {
        url: "/images/coloured%204.png",
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
    images: ["/images/coloured%204.png", "/images/coloured%204.png"],
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
