import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import clsx from "clsx";
import { SchemaData } from "@/components/SchemaData";
import { getAllFAQs } from "@/lib/faq-loader";
import { Analytics } from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { Navigation } from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { EntryWrapper } from "./EntryWrapper";
import { CustomCursor } from "@/components/CustomCursor";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { GlobalSchema } from "@/components/json-ld/GlobalSchema";

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



export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Rizwanul Islam | Advanced Venture Architect",
    template: "%s | Rizwanul Islam (Afraim)",
  },
  description: "Advanced Venture Architect and Operations Expert specializing in building intelligent data platforms, scalable technical systems, and modern digital ventures. View the portfolio of Rizwanul Islam.",
  keywords: [
    "Rizwanul Islam",
    "Afraim",
    "Rizwanul Islam Afraim",
    "Venture Architect",
    "Advanced Systems",
    "Operations Expert",
    "Technical Lead",
    "Data Strategy",
    "Gaari Founder",
    "Platform Development",
    "Next.js Expert",
    "AI Agentic Systems",
  ],
  authors: [{ name: "Rizwanul Islam (Afraim)", url: "https://www.rizwanulafraim.com" }],
  creator: "Rizwanul Islam (Afraim)",
  publisher: "Rizwanul Islam (Afraim)",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizwanulafraim.com"),
  alternates: {
    canonical: 'https://www.rizwanulafraim.com',
    languages: {
      'en-US': '/en-US',
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rizwanulafraim.com",
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
    google: "bxgbWtpcZz0UeIdXK_U1hyPALpOnAezUEOBZo6c5nHA",
    other: {
      "msvalidate.01": "D856AACF6C5D5003C81D9CF9ED47668C",
      "p:domain_verify": "09fdfc9215d7eeefb6030ff991b9c026",
    },
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Rizwanul Islam (Afraim)",
  },
  formatDetection: {
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const faqItems = getAllFAQs();
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Priority Preload: Hero Image - LCP Optimization */}
        <link
          rel="preload"
          as="image"
          href="/assets/rizwanul-islam-afraim.webp"
          imageSrcSet="/assets/rizwanul-islam-afraim.webp 320w, /assets/rizwanul-islam-afraim.webp 640w"
          imageSizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 320px"
          fetchPriority="high"
        />
        <link rel="alternate" href="https://www.rizwanulafraim.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d2fltix0v2e0sb.cloudfront.net" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <meta name="theme-color" content="#10b981" />
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
          <GlobalSchema />
          <SchemaData faqItems={faqItems} />
          <Suspense fallback={null}>
            <Analytics />
            <VercelAnalytics />
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
