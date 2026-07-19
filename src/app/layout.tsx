import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { SiteNav } from "@/components/layout/SiteNav";
import { SiteFooter } from "@/components/layout/SiteFooter";

/**
 * Type system:
 *  - PP Eiko (Regular only) -> display serif (headlines, logo, quotes)
 *  - ABC Diatype Italic (trial) -> italic accents inside display copy
 *  - Inter -> body/UI grotesque until an upright ABC Diatype cut is licensed
 */
const eiko = localFont({
  src: "../../public/fonts/PPEiko-Regular.otf",
  variable: "--font-display",
  display: "swap",
  weight: "400",
});

const diatypeItalic = localFont({
  src: "../../public/fonts/ABCDiatype-RegularItalic-Trial.otf",
  variable: "--font-accent",
  display: "swap",
  weight: "400",
  style: "italic",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://userise.co"),
  title: {
    default: "Rise — Make it unreal",
    template: "%s — Rise",
  },
  description:
    "Rise is a team of technical and design specialists HQ'd in sunny Lisbon. We build intelligently to rise you beyond the ordinary — design, development, AI & agents, growth & GEO.",
  keywords: [
    "Rise",
    "product design",
    "development",
    "AI agents",
    "GEO",
    "Lisbon studio",
    "design subscription",
  ],
  openGraph: {
    title: "Rise — Make it unreal",
    description:
      "Clearer thinking, sharper execution, real impact. Your AI-fueled design, development & growth subscription.",
    type: "website",
    locale: "en_US",
    siteName: "Rise",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${eiko.variable} ${diatypeItalic.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-page text-ink font-sans">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
