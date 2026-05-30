import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck, Cpu, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { solutions } from "@/data/solutions";
import { TechnicalSpecificationsTable } from "@/components/TechnicalSpecificationsTable";
import { buildOGMetadata } from "@/lib/og-metadata";

export const metadata: Metadata = {
  title: "GTM & Sales Operations Systems | Rizwanul Islam Afraim",
  description: "Deploy custom-built, conversion-optimized e-commerce engines, real-time sales CRMs, and 4-layer SEO frameworks engineered to scale business operations.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/solutions/gtm-operations",
  },
  ...buildOGMetadata("solutions", {
    title: "GTM & Sales Operations Systems | Rizwanul Islam Afraim",
    description: "Deploy custom-built, conversion-optimized e-commerce engines, real-time sales CRMs, and 4-layer SEO frameworks engineered to scale business operations.",
    url: "https://www.rizwanulafraim.com/solutions/gtm-operations",
  }),
};

export default function GtmOperationsPage() {
  const gtmSolutions = solutions.filter((s) => s.categoryGroup === "gtm-operations");
  
  // Find individual solution records for detailed spec rendering
  const ecommerceSol = gtmSolutions.find(s => s.slug === "ecommerce-platform");
  const crmSol = gtmSolutions.find(s => s.slug === "crm-sales-system");
  const seoSol = gtmSolutions.find(s => s.slug === "seo-lead-generation");

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "GTM & Sales Operations Systems",
    "description": "Production-tested growth systems, transactional storefronts, and automated sales operations tools.",
    "url": "https://www.rizwanulafraim.com/solutions/gtm-operations",
    "hasPart": gtmSolutions.map((sol) => ({
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
            { label: "GTM & Operations" },
          ]}
        />

        {/* Hero Banner */}
        <header className="mt-8 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EF] text-[#0F5132] text-xs font-semibold mb-6 border border-[#0F5132]/16">
            <Cpu className="w-3.5 h-3.5" />
            <span>OPERATIONAL SYSTEMS ENGINE</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight leading-tight">
            GTM &amp; Sales <span className="text-[#0F5132] italic">Operations</span> Systems
          </h1>
          <p className="text-lg text-[#5F655F] leading-relaxed">
            Eliminate operational drag. These architectures bridge high-scale customer ingestion, real-time outbound lead assignment, and organic search indexing pipelines into custom, zero-dependency business software.
          </p>
        </header>

        {/* Side-by-Side Comparative Matrix */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl font-serif font-bold text-[#0F5132] flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Comparative System Matrix
            </h2>
            <p className="text-sm text-[#5F655F] mt-1">
              Analyze parameters side-by-side to determine implementation fit.
            </p>
          </div>

          <div className="w-full overflow-x-auto border border-[#0F5132]/12 rounded-xl bg-[#FFFDF8] shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#EAF7EF] border-b border-[#0F5132]/12">
                  <th className="px-6 py-4 font-mono text-xs uppercase text-[#0F5132] font-bold w-1/4">System Parameter</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-1/4">E-Commerce Storefront</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-1/4">Real-Time Sales CRM</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-1/4">Organic SEO Framework</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Primary Intent</td>
                  <td className="px-6 py-4">High-CRO Transaction Ingestion</td>
                  <td className="px-6 py-4">Zero-Collision Outbound Leads</td>
                  <td className="px-6 py-4">Uncapped Organic Traffic &amp; AEO</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Core Technologies</td>
                  <td className="px-6 py-4">Next.js 16, React 19, Supabase</td>
                  <td className="px-6 py-4">Next.js 14, WebSockets, Postgres</td>
                  <td className="px-6 py-4">Schema.org, JSON-LD, Search Console</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Latency Profile</td>
                  <td className="px-6 py-4">Static Gen pre-rendering (&lt;0.6s LCP)</td>
                  <td className="px-6 py-4">0ms Optimistic UI updates</td>
                  <td className="px-6 py-4">Static pre-render, 100/100 Lighthouse</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Integration Gateways</td>
                  <td className="px-6 py-4">Stripe, Bkash, SSLCommerz</td>
                  <td className="px-6 py-4">Twilio, API CRM pipelines</td>
                  <td className="px-6 py-4">Meta Conversions API (CAPI), feeds</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Expanded Solutions Directories (No Bullshits) */}
        <section className="space-y-24 mb-24">

          {/* 01. E-Commerce Platform */}
          {ecommerceSol && (
            <div id="ecommerce" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 01: TRANSACTION ENGINE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Custom E-Commerce Platform Architecture
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    A headless commerce layout engineered to bypass Shopify’s platform limitations, plugin drag, and attribution tracking drops, converting high-volume mobile traffic into actual revenue.
                  </p>
                </div>
                <Link
                  href={`/solutions/${ecommerceSol.slug}`}
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
                    Legacy Templated Failures (Shopify / WooCommerce)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Plugin dependencies slow mobile LCP load times past 3 seconds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Standard browser tracking fails to capture up to 30% of social media ad conversions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Monolithic checkouts increase cart abandonment on local billing connections.</span>
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
                      <span>Static pre-rendering ensures page LCP load speeds under 0.6 seconds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Integrated server-to-server Meta CAPI prevents attribution tracking leaks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Bespoke checkout screens are optimized for local payment flows (bKash, SSLCommerz).</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables checklist & Metrics */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {ecommerceSol.deliverables.slice(0, 6).map((del, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-World Proof Card */}
                <div className="p-6 rounded-xl bg-[#FFFDF8] border border-[#0F5132]/12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Real-World Case Study Link
                    </h4>
                    <p className="text-xs text-[#5F655F] leading-relaxed mb-4">
                      Deployed flagship traditional clothing platform featuring 6 custom sub-collections and server-side tracking pipelines.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: Arrivals Cave</span>
                    <Link
                      href="/projects/arrivals-cave"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={ecommerceSol.technicalSpecs} title="E-Commerce System Specifications" />
            </div>
          )}

          {/* 02. CRM & Sales System */}
          {crmSol && (
            <div id="crm" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 02: SALES OPERATING LOOP
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Real-Time CRM &amp; Sales System
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    An outbound sales platform engineered to consolidate lead directories, validate timezone parameters, and resolve database representative collisions in real-time.
                  </p>
                </div>
                <Link
                  href={`/solutions/${crmSol.slug}`}
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
                    Legacy Subscription Failures (Salesforce / HubSpot)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Bloated UI navigation triggers loading lags during representative phone discussions.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Lack of real-time database locks leads to representative collision on identical profiles.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>High monthly seat costs eat into outbound campaign returns.</span>
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
                      <span>0ms Optimistic UI updates ensure immediate state changes.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Supabase WebSocket loops handle presence states to block collision instantly.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>A zero-license codebase is owned fully by the business.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables checklist & Metrics */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {crmSol.deliverables.slice(0, 6).map((del, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-World Proof Card */}
                <div className="p-6 rounded-xl bg-[#FFFDF8] border border-[#0F5132]/12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Real-World Case Study Link
                    </h4>
                    <p className="text-xs text-[#5F655F] leading-relaxed mb-4">
                      Integrated a sales operations command center saving 40% in administrative overhead and doubling representative phone output.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: Leads &amp; Sales CRM</span>
                    <Link
                      href="/projects/leads-sales-crm"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={crmSol.technicalSpecs} title="CRM System Specifications" />
            </div>
          )}

          {/* 03. SEO & Lead Generation */}
          {seoSol && (
            <div id="seo" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 03: ORGANIC ACQUISITION
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Organic SEO &amp; Lead Generation
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    An advanced 4-layer SEO, AEO, and GEO optimization framework to acquire sustainable organic traffic and capture search inquiries without ad budget.
                  </p>
                </div>
                <Link
                  href={`/solutions/${seoSol.slug}`}
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
                    Legacy Agency Failures (Keyword Retainers)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Keyword optimization does not target AI search engines or answer engines.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>No structured JSON-LD entity linking makes catalog comprehension difficult for Google.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Static articles lack dynamic updates, leading to outdated content indicators.</span>
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
                      <span>SXO + AIO + GEO + AEO layers target Perplexity, Gemini, and Google SGE.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Structured entity mapping defines personal credentials towikidata.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Automated dynamic updates keep search results fresh.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables checklist & Metrics */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {seoSol.deliverables.slice(0, 6).map((del, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Real-World Proof Card */}
                <div className="p-6 rounded-xl bg-[#FFFDF8] border border-[#0F5132]/12 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" /> Real-World Case Study Link
                    </h4>
                    <p className="text-xs text-[#5F655F] leading-relaxed mb-4">
                      Implemented custom SEO infrastructure generating 300% growth in organic traffic and building an investor community of 3,500+.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: Yagacalls</span>
                    <Link
                      href="/projects/yagacalls"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={seoSol.technicalSpecs} title="SEO Infrastructure Specifications" />
            </div>
          )}

        </section>

        {/* Crawlable SEO Supporting Guide */}
        <section className="border-t border-[#0F5132]/12 pt-16 mb-20">
          <div className="prose prose-sm max-w-none text-[#5F655F] space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#171717] mb-4">
                Systems-First Growth: Scaling Operations and Customer Ingestion
              </h2>
              <p className="leading-relaxed text-sm">
                In competitive markets like Bangladesh and globally, businesses suffer from fragmented software ecosystems. Building custom e-commerce engines and sales operations platforms from day one prevents dependency traps, mitigates SaaS inflation, and guarantees ownership of conversion pipelines.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  Custom Commerce Storefronts vs. Shopify/WooCommerce
                </h3>
                <p className="leading-relaxed text-xs">
                  While templated builders allow rapid launch, their reliance on client-side plugins degrades page performance on slow networks. A custom headless Next.js implementation ensures a sub-second Largest Contentful Paint (LCP) even on local 3G/4G connections. Incorporating Meta Conversions API (CAPI) events directly in Next.js Server Actions captures ad attribution that browser blocklists routinely wipe out.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  CRM Automation &amp; Real-Time Lead Assignment
                </h3>
                <p className="leading-relaxed text-xs">
                  Standard CRMs introduce latency loops. By designing a custom sales platform on Supabase Realtime, sales representatives coordinate outbound calls instantly. Deterministic collision detection locks lead profiles, preventing duplicate representative contact. Furthermore, automated phone-to-area-code mapping respects timezones, ensuring calls occur strictly within TCPA-compliant hours.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#171717] mb-2">
                Unified Search Visibility: SXO, AIO, GEO, and AEO
              </h3>
              <p className="leading-relaxed text-xs">
                SEO is no longer just about keyword frequency. Google Search Generative Experience (SGE) and AI tools like Perplexity evaluate structured schema parameters and semantic entity definitions. The 4-layer search framework embeds JSON-LD entity graph hooks, matching query-intent to pre-cached platform structures instantly.
              </p>
            </div>
          </div>
        </section>

        {/* Structured Editorial FAQ */}
        <section className="bg-[#FFFDF8] border border-[#0F5132]/12 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-serif font-bold text-[#171717] mb-8 text-center">
            Frequently Asked Operations Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                Why choose a custom built CRM over enterprise subscription systems?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                Enterprise platforms charge heavy seat retainers and suffer from severe navigation load lag due to over-engineered features. A custom-built system isolates the exact workflows your sales team executes daily, optimizing UI latency to 0ms and eliminating recurring software overhead.
              </p>
            </div>
            <div className="h-px bg-[#0F5132]/6" />
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                What is server-side Meta Conversions API (CAPI) tracking?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                Modern browsers and ad-blockers block client-side JavaScript pixels from sending purchase events back to Meta. Server-side CAPI sends actions directly from the database server to the Meta endpoint, preserving ad attribution and matching ROAS metrics perfectly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-20 p-8 rounded-3xl bg-[#0F5132] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Ready to build operational velocity?</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-6">
            Let&apos;s schedule a scoping call to map your operational requirements and select the proper foundation.
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
