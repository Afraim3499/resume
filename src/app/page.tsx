import { type Metadata } from "next";
import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import dynamic from "next/dynamic";

/* ─────────────────────────────────────────────────────────────
   HOMEPAGE METADATA  (overrides layout.tsx defaults for /)
   ───────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  title: "Rizwanul Islam Afraim — Marketing, Sales & Systems",
  description: "Dhaka-based systems architect helping teams build sales ops, marketing workflows, product systems, automation, and SEO/AEO/GEO visibility.",
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
};


// New Phase 2 approved sections
const WhatISolve = dynamic(() => import("@/components/WhatISolve").then((mod) => mod.WhatISolve), { loading: () => <LoadingSpinner /> });
const HowISolve = dynamic(() => import("@/components/HowISolve").then((mod) => mod.HowISolve), { loading: () => <LoadingSpinner /> });
const ProofOfCapability = dynamic(() => import("@/components/ProofOfCapability").then((mod) => mod.ProofOfCapability), { loading: () => <LoadingSpinner /> });
const FeaturedTransformations = dynamic(() => import("@/components/FeaturedTransformations").then((mod) => mod.FeaturedTransformations), { loading: () => <LoadingSpinner /> });
const LeverageFinder = dynamic(() => import("@/components/LeverageFinder").then((mod) => mod.LeverageFinder), { loading: () => <LoadingSpinner /> });
const EngagementPathsSection = dynamic(() => import("@/components/EngagementPathsSection").then((mod) => mod.EngagementPathsSection), { loading: () => <LoadingSpinner /> });

// Combined Homepage Ending Sections (09–12)
const ResearchInsightsSection = dynamic(() => import("@/components/ResearchInsightsSection").then((mod) => mod.ResearchInsightsSection), { loading: () => <LoadingSpinner /> });
const ExternalCredibilitySection = dynamic(() => import("@/components/ExternalCredibilitySection").then((mod) => mod.ExternalCredibilitySection), { loading: () => <LoadingSpinner /> });
const SystemsFAQSection = dynamic(() => import("@/components/SystemsFAQSection").then((mod) => mod.SystemsFAQSection), { loading: () => <LoadingSpinner /> });
const FinalCTASection = dynamic(() => import("@/components/FinalCTASection").then((mod) => mod.FinalCTASection), { loading: () => <LoadingSpinner /> });

export default function Home() {
  return (
    <main id="main-content" className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white overflow-x-clip">
      {/* 01 Header (loaded globally in root layout) */}
      
      {/* 02 Hero */}
      <Hero />
      <SectionDivider variant="wave" className="text-[#FDFBF7]" />
      
      {/* 03 What I Solve */}
      <WhatISolve />
      <SectionDivider variant="gradient" />
      
      {/* 04 How I Solve / Operating Loop */}
      <HowISolve />
      <SectionDivider variant="gradient" />
      
      {/* 05 Proof of Capability */}
      <ProofOfCapability />
      <SectionDivider variant="gradient" />
      
      {/* 06 Featured Transformations */}
      <FeaturedTransformations />
      <SectionDivider variant="gradient" />
      
      {/* 07 Leverage Finder */}
      <LeverageFinder />
      <SectionDivider variant="gradient" />
      
      {/* 08 Engagement Paths */}
      <EngagementPathsSection />
      <SectionDivider variant="gradient" />
      
      {/* 09 Research & Insights */}
      <ResearchInsightsSection />
      <SectionDivider variant="gradient" />
      
      {/* 10 External Credibility */}
      <ExternalCredibilitySection />
      <SectionDivider variant="morph" />
      
      {/* 11 Systems FAQ */}
      <SystemsFAQSection />
      <SectionDivider variant="gradient" />
      
      {/* 12 Final CTA & Footer */}
      <FinalCTASection />
    </main>
  );
}

