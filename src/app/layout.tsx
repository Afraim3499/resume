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
    default: "Rizwanul Islam (Afraim) | Venture Architect & Systems Orchestrator",
    template: "%s | Rizwanul Islam (Afraim)",
  },
  description: "Official portfolio of Rizwanul Islam (Afraim), the Orchestrator of Intelligent Futures. Venture Architect, Full-Stack Strategist, and Founder of Gaari & PrimeSync.",
  keywords: [
    "Rizwanul Islam",
    "Afraim",
    "Rizwanul Islam Afraim",
    "The Orchestrator",
    "Venture Architect",
    "System Orchestration",
    "Founder Mode",
    "Full-Stack Developer",
    "Next.js Expert",
    "AI Agentic Systems",
    "RAG Pipelines",
    "Gaari Founder",
    "Dhaka Tech",
    "North South University Alumni",
  ],
  authors: [{ name: "Rizwanul Islam (Afraim)", url: "https://portfolio-rizwanul.vercel.app" }],
  creator: "Rizwanul Islam (Afraim)",
  publisher: "Rizwanul Islam (Afraim)",
  metadataBase: new URL("https://portfolio-rizwanul.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-rizwanul.vercel.app",
    title: "Rizwanul Islam (Afraim) | Venture Architect",
    description: "Architecting Intelligent Futures through scalable ventures and robust code. The portfolio of Rizwanul Islam (Afraim).",
    siteName: "Rizwanul Islam (Afraim) Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rizwanul Islam (Afraim) - The Orchestrator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwanul Islam (Afraim) | Venture Architect",
    description: "Architecting Intelligent Futures. The digital HQ of Rizwanul Islam (Afraim).",
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
    google: "AgEIer9xlB7rHjMCi02zynoNYCDMXwU8UyVjkqyU5xI",
    other: {
      "msvalidate.01": "D856AACF6C5D5003C81D9CF9ED47668C",
      "p:domain_verify": "09fdfc9215d7eeefb6030ff991b9c026",
    },
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
        {/* Pinterest Verification */}
        <meta name="p:domain_verify" content="09fdfc9215d7eeefb6030ff991b9c026" />
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
          "antialiased min-h-screen flex flex-col bg-background text-foreground relative"
        )}
      >
        <ThemeProvider>
          <a
            href="#main-content"
            className="absolute left-0 top-0 z-[100] -translate-y-full px-4 py-2 bg-background text-foreground border border-primary focus:translate-y-0 transition-transform"
          >
            Skip to main content
          </a>
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
