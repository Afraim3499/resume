import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Zap, ArrowUpRight, ArrowRight, Layers, ShieldCheck, UserCircle, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { solutions } from "@/data/solutions";
import { TechnicalSpecificationsTable } from "@/components/TechnicalSpecificationsTable";

export const metadata: Metadata = {
  title: "Premium Executive Brand Platforms | Rizwanul Islam Afraim",
  description: "Bespoke digital portfolios and thought-leadership websites engineered for founders, partners, and high-impact executives. Static pre-rendering, MDX blog, and JSON-LD schema.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/solutions/executive-brand",
  },
};

export default function ExecutiveBrandPage() {
  const brandSolutions = solutions.filter((s) => s.categoryGroup === "executive-brand");
  
  // Find individual solution for spec table injection
  const brandSol = brandSolutions.find(s => s.slug === "personal-brand-website");

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Premium Executive Brand Platforms",
    "description": "Custom-built, high-authority personal ecosystems and editorial publication platforms.",
    "url": "https://www.rizwanulafraim.com/solutions/executive-brand",
    "hasPart": brandSolutions.map((sol) => ({
      "@type": "WebPage",
      "name": sol.title,
      "url": `https://www.rizwanulafraim.com/solutions/${sol.slug}`
    }))
  };

  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pb-24 pt-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(hubSchema),
        }}
      />

      <div className="container px-4 mx-auto max-w-5xl">
        <Breadcrumbs
          items={[
            { label: "Solutions", href: "/solutions" },
            { label: "Executive Brand" },
          ]}
        />

        {/* Hero Banner */}
        <header className="mt-8 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EF] text-[#0F5132] text-xs font-semibold mb-6 border border-[#0F5132]/16">
            <UserCircle className="w-3.5 h-3.5" />
            <span>EXECUTIVE IDENTITIES</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight leading-tight">
            Executive Brand <span className="text-[#0F5132] italic">Systems</span>
          </h1>
          <p className="text-lg text-[#5F655F] leading-relaxed">
            Thought leadership platforms. Engineered using MDX publishing pipelines, dynamic serverless social share cards (`@vercel/og`), and complete Person and Organization JSON-LD schemas.
          </p>
        </header>

        {/* Platform Architecture Details */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl font-serif font-bold text-[#0F5132] flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Platform Architecture Matrix
            </h2>
            <p className="text-sm text-[#5F655F] mt-1">
              Key performance parameters and schema configurations for thought-leadership portals.
            </p>
          </div>

          <div className="w-full overflow-x-auto border border-[#0F5132]/12 rounded-xl bg-[#FFFDF8] shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#EAF7EF] border-b border-[#0F5132]/12">
                  <th className="px-6 py-4 font-mono text-xs uppercase text-[#0F5132] font-bold w-1/3">System Parameter</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-2/3">Thought Leadership Platform Standard</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Typographic Standards</td>
                  <td className="px-6 py-4">Triple font system (Serif headings, Sans-serif body, Mono metadata) for editorial authority.</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Asset Automation</td>
                  <td className="px-6 py-4">Edge function dynamic OG generation. Generates personalized PNG cards per post automatically.</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Crawl Target</td>
                  <td className="px-6 py-4">Person Wikidata matching, Career timeline micro-formats, Academic SSRN references.</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">UX Engineering</td>
                  <td className="px-6 py-4">Framer Motion transition triggers, Lenis scroll integration, and complete pre-rendering.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Expanded Solutions Directories */}
        <section className="space-y-24 mb-24">

          {/* 01. Personal Brand Website */}
          {brandSol && (
            <div id="brand" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 01: INTELLECTUAL PRESENCE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Bespoke Personal Brand System
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    A premium thought-leadership platform built for AI company executives, founders, and partners, featuring dynamic metadata, timeline narratives, and high performance.
                  </p>
                </div>
                <Link
                  href={`/solutions/${brandSol.slug}`}
                  className="px-5 py-3 rounded-full bg-[#0F5132] text-[#FFFDF8] hover:bg-[#0F5132]/90 transition-all font-semibold text-xs inline-flex items-center gap-2"
                >
                  View Detail Blueprint <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Legacy vs Custom comparison cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-red-500/[0.02] border border-red-500/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Legacy Template Failures (Wix / Squarespace)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Generic templates look identical to thousands of other portfolios.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Missing JSON-LD structured schemas makes search indexation incomplete.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Heavy script libraries create layout shifts and load lags on mobile.</span>
                    </li>
                  </ul>
                </div>
                <div className="p-6 rounded-xl bg-[#EAF7EF]/20 border border-[#0F5132]/12">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F5132] mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Custom Systems Advantage
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Bespoke editorial grid systems create distinct design authority.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Complete Person Wikidata nodes establish proper entity indexation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Static pre-rendering and clean Tailwind layout ensure high page performance.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables & Proof */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {brandSol.deliverables.slice(0, 6).map((del, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-[#FFFDF8] border border-[#0F5132]/12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Real-World Case Study Link
                    </h4>
                    <p className="text-xs text-[#5F655F] leading-relaxed mb-4">
                      Developed thought-leadership portfolio for PrimeSync AI's Head of Operations, integrating dynamic OG cards and structured schemas.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: Shahriar Kabir</span>
                    <Link
                      href="/projects/shahriar-kabir"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={brandSol.technicalSpecs} title="Personal Brand System Specifications" />
            </div>
          )}

        </section>

        {/* Crawlable SEO Supporting Guide */}
        <section className="border-t border-[#0F5132]/12 pt-16 mb-20">
          <div className="prose prose-sm max-w-none text-[#5F655F] space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#171717] mb-4">
                The Architecture of Influence: Engineering High-Authority Personal Ecosystems
              </h2>
              <p className="leading-relaxed text-sm">
                A personal brand site for an executive or founder should not read like a generic résumé. It functions as a specialized information engine that establishes authority for both human readers and search engines' entity classifiers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  Wikidata Entity Loop &amp; Semantic SEO
                </h3>
                <p className="leading-relaxed text-xs">
                  AI engines classify people based on structured context. By embedding Person and Organization JSON-LD schemas that target specific Wikidata endpoints, search crawlers understand the creator's relationships to companies, academic research, and patents directly.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  MDX Publishing and Dynamic OG Engines
                </h3>
                <p className="leading-relaxed text-xs">
                  SaaS template portfolios require manual share card configuration. Using MDX lets authors write articles in clean text formats, while `@vercel/og` renders personalized social cards dynamically at runtime, reducing loading overhead.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#171717] mb-2">
                Conversion Experience Optimization (SXO)
              </h3>
              <p className="leading-relaxed text-xs">
                Rather than passive contact forms, authority platforms guide prospects through visual career timelines and interactive calendar booking components, creating a professional and engaging user journey.
              </p>
            </div>
          </div>
        </section>

        {/* Structured FAQ */}
        <section className="bg-[#FFFDF8] border border-[#0F5132]/12 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-serif font-bold text-[#171717] mb-8 text-center">
            Frequently Asked Personal Branding Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                Why not use Squarespace or Wix for personal executive branding?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                Wix and Squarespace serve heavy, non-semantic JS templates that load slowly on mobile and generate incomplete JSON-LD schemas. A custom Next.js build pre-renders clean HTML, optimizing Lighthouse rankings and making entity mapping easier for search crawlers.
              </p>
            </div>
            <div className="h-px bg-[#0F5132]/6" />
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                How do dynamic OG images help authority positioning?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                When your content is shared on LinkedIn or Twitter, standard platforms fall back to generic logos. A custom dynamic engine creates customized, high-contrast title cards for each article, which improves click-through rates.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-20 p-8 rounded-3xl bg-[#0F5132] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Want to build your digital authority?</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-6">
            Let's design a custom platform that aligns with your professional credentials and research.
          </p>
          <a
            href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-full bg-[#FFFDF8] text-[#0F5132] font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2 text-sm shadow"
          >
            Schedule Systems Scoping <ArrowRight className="w-4 h-4" />
          </a>
        </section>
      </div>
    </main>
  );
}
