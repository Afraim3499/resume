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
import { FooterWrapper } from "@/components/FooterWrapper";

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

/* ─────────────────────────────────────────────────────────────
   HOMEPAGE / GLOBAL METADATA
   OG Image: /og-image.jpg  →  1200 × 630 px  JPEG  106 KB
   og:logo:  /logo.png       →  portrait mark  PNG
   ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: {
    default: "Rizwanul Islam Afraim | Systems for Growth, Operations & Product Execution",
    template: "%s | Rizwanul Islam Afraim",
  },
  description: "Rizwanul Islam Afraim helps teams organize market research, sales operations, product workflows, SEO systems, automation, and reporting into scalable execution systems.",
  keywords: [
    "Rizwanul Islam Afraim",
    "Afraim",
    "Systems Architect",
    "Marketing Operations",
    "Sales Operations",
    "SEO AEO GEO",
    "Coordination Infrastructure",
    "Venture Architecture",
    "Operations Expert",
    "Data Strategy",
    "Gaari Founder",
    "Next.js Expert",
  ],
  authors: [{ name: "Rizwanul Islam Afraim", url: "https://www.rizwanulafraim.com" }],
  creator: "Rizwanul Islam Afraim",
  publisher: "Rizwanul Islam Afraim",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizwanulafraim.com"),
  alternates: {
    canonical: "https://www.rizwanulafraim.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.rizwanulafraim.com/",
    title: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
    description: "Dhaka-based systems architect helping teams build sales ops, marketing workflows, product systems, automation, and SEO/AEO/GEO visibility.",
    siteName: "Rizwanul Islam Afraim",
    images: [
      {
        url: "https://www.rizwanulafraim.com/og-image.jpg",
        secureUrl: "https://www.rizwanulafraim.com/og-image.jpg",
        type: "image/jpeg",
        width: 1200,
        height: 630,
        alt: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
    description: "Dhaka-based systems architect helping teams build sales ops, marketing workflows, product systems, automation, and SEO/AEO/GEO visibility.",
    images: [
      {
        url: "https://www.rizwanulafraim.com/og-image.jpg",
        alt: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
      },
    ],
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/favicon.ico" },
    ],
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
          href="/assets/afraim-logo.png"
          imageSrcSet="/assets/afraim-logo.png 320w, /assets/afraim-logo.png 640w"
          imageSizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 320px"
          fetchPriority="high"
        />
        <link rel="alternate" href="https://www.rizwanulafraim.com/" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://d2fltix0v2e0sb.cloudfront.net" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="alternate" type="application/rss+xml" title="RSS Feed" href="/feed.xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#0F5132" />
        {/* og:logo — non-standard but required by some validators (LinkedIn, Google Rich Results) */}
        {/* Not emitted by Next.js Metadata API, so added manually here */}
        <meta property="og:logo" content="https://www.rizwanulafraim.com/logo.png" />
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
          <FooterWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
