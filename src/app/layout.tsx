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
    default: "Rizwanul Islam (Afraim) | Digital Strategist & Full-Stack Developer",
    template: "%s | Rizwanul Islam (Afraim)",
  },
  description: "Legendary Digital Strategist and Full-Stack Developer. Rizwanul Islam (Afraim) builds super-intelligent, scalable systems for visionary businesses. Founder of Gaari and The Trail.",
  keywords: [
    "Rizwanul Islam",
    "Afraim",
    "Rizwanul Islam Afraim",
    "Rizwanul Afraim",
    "Rizwanul",
    "Business Developer",
    "Digital Strategist",
    "Full-Stack Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript",
    "PostgreSQL",
    "Web Development",
    "AI/ML",
    "Portfolio",
  ],
  authors: [{ name: "Rizwanul Islam Afraim", url: "https://portfolio-rizwanul.vercel.app" }],
  creator: "Rizwanul Islam Afraim",
  publisher: "Rizwanul Islam Afraim",
  metadataBase: new URL("https://portfolio-rizwanul.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rizwanul.vercel.app",
    title: "Rizwanul Islam | Digital Strategist & Full-Stack Developer",
    description: "Full-stack developer and digital strategist specializing in Next.js, React, TypeScript, PostgreSQL, and AI/ML solutions.",
    siteName: "Rizwanul Islam Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rizwanul Islam - Full-Stack Developer & Digital Strategist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwanul Islam | Digital Strategist & Full-Stack Developer",
    description: "Full-stack developer and digital strategist specializing in Next.js, React, TypeScript, PostgreSQL, and AI/ML solutions.",
    images: ["/og-image.jpg"],
    creator: "@rizwanul_afraim",
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
        <meta name="google-site-verification" content="AgEIer9xlB7rHjMCi02zynoNYCDMXwU8UyVjkqyU5xI" />
        {/* Bing Webmaster */}
        <meta name="msvalidate.01" content="D856AACF6C5D5003C81D9CF9ED47668C" />
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
