import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SchemaData } from "@/components/SchemaData";
import { Analytics } from "@/components/Analytics";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EntryWrapper } from "./EntryWrapper";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
  title: {
    default: "Rizwanul Islam | Digital Strategist & Full-Stack Developer",
    template: "%s | Rizwanul Islam",
  },
  description: "Dynamic Market Researcher and Business Development Professional with expertise in data-driven decision-making and customer experience optimization. Proven track record at PrimeSync Solutions and Quantanite. Founder of Gaari, Co-Founder of The Trail, and Lead Developer of Yagacalls. Vice President of NSUSS, managing 200+ people and organizing events with 25,000+ attendees.",
  keywords: [
    "Rizwanul Islam",
    "Afraim",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "Digital Strategist",
    "Web Development",
    "AI/ML",
    "Portfolio",
  ],
  authors: [{ name: "Rizwanul Islam", url: "https://rizwanulislam.com" }],
  creator: "Rizwanul Islam",
  publisher: "Rizwanul Islam",
  metadataBase: new URL("https://rizwanulislam.com"), // Update with actual domain
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rizwanulislam.com", // Update with actual domain
    title: "Rizwanul Islam | Digital Strategist & Full-Stack Developer",
    description: "Full-stack developer and digital strategist specializing in Next.js, React, TypeScript, PostgreSQL, and AI/ML solutions.",
    siteName: "Rizwanul Islam Portfolio",
    images: [
      {
        url: "/assets/IMG_5210.jpg",
        width: 1200,
        height: 630,
        alt: "Rizwanul Islam - Digital Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwanul Islam | Digital Strategist & Full-Stack Developer",
    description: "Full-stack developer and digital strategist specializing in Next.js, React, TypeScript, PostgreSQL, and AI/ML solutions.",
    images: ["/assets/IMG_5210.jpg"],
    creator: "@rizwanulislam", // Update with actual Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add verification codes when available
    // google: "verification-code",
    // yandex: "verification-code",
    // yahoo: "verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#10b981" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Rizwanul Islam" />
      </head>
      <body
        className={clsx(
          geistSans.variable,
          geistMono.variable,
          playfair.variable,
          "antialiased min-h-screen flex flex-col bg-background text-foreground"
        )}
      >
        <ThemeProvider>
          <SchemaData />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <CustomCursor />
          <ScrollProgress />
          <Navigation />
          <SmoothScroll>
            <EntryWrapper>{children}</EntryWrapper>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
