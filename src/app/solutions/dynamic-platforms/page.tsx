import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowUpRight, ArrowRight, Layers, ShieldCheck, Database, CheckCircle2, AlertTriangle, TrendingUp } from "lucide-react";
import { solutions } from "@/data/solutions";
import { TechnicalSpecificationsTable } from "@/components/TechnicalSpecificationsTable";

export const metadata: Metadata = {
  title: "Dynamic Product Platforms & Web Systems | Rizwanul Islam Afraim",
  description: "Explore custom-built publishing systems, news aggregators, reservation booking engines, and dynamic web applications built for scale and sub-second delivery.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/solutions/dynamic-platforms",
  },
};

export default function DynamicPlatformsPage() {
  const dynamicSolutions = solutions.filter((s) => s.categoryGroup === "dynamic-platforms");
  
  // Find individual solutions for specifications injection
  const newsSol = dynamicSolutions.find(s => s.slug === "news-media-platform");
  const bookingSol = dynamicSolutions.find(s => s.slug === "booking-system");

  const hubSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Dynamic Product Platforms & Web Systems",
    "description": "Information-dense media aggregators, custom CMS networks, and booking reservation engines.",
    "url": "https://www.rizwanulafraim.com/solutions/dynamic-platforms",
    "hasPart": dynamicSolutions.map((sol) => ({
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
            { label: "Dynamic Platforms" },
          ]}
        />

        {/* Hero Banner */}
        <header className="mt-8 mb-16 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EF] text-[#0F5132] text-xs font-semibold mb-6 border border-[#0F5132]/16">
            <Database className="w-3.5 h-3.5" />
            <span>DYNAMIC WEB APPLICATIONS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight leading-tight">
            Dynamic Product <span className="text-[#0F5132] italic">Platforms</span>
          </h1>
          <p className="text-lg text-[#5F655F] leading-relaxed">
            Scalable, stateful architectures. Engineered with PostgreSQL relational database tiers, Redis caching structures, AWS S3 storage arrays, and automated Playwright E2E browser tests to assure zero-regression deployments.
          </p>
        </header>

        {/* Comparative Architecture Table */}
        <section className="mb-20">
          <div className="mb-8">
            <h2 className="text-xl font-serif font-bold text-[#0F5132] flex items-center gap-2">
              <Layers className="w-5 h-5" />
              Comparative System Matrix
            </h2>
            <p className="text-sm text-[#5F655F] mt-1">
              Side-by-side assessment of engine logic, storage systems, and caching parameters.
            </p>
          </div>

          <div className="w-full overflow-x-auto border border-[#0F5132]/12 rounded-xl bg-[#FFFDF8] shadow-sm">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-[#EAF7EF] border-b border-[#0F5132]/12">
                  <th className="px-6 py-4 font-mono text-xs uppercase text-[#0F5132] font-bold w-1/3">System Parameter</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-1/3">News / Media Aggregator</th>
                  <th className="px-6 py-4 font-bold text-[#171717] w-1/3">Multi-Service Booking System</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Primary Intent</td>
                  <td className="px-6 py-4">High-Velocity Publishing &amp; Curation</td>
                  <td className="px-6 py-4">Dynamic Availability &amp; Booking State Engine</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Caching Standard</td>
                  <td className="px-6 py-4">Aggressive Static Pre-renders &amp; Edge Headers</td>
                  <td className="px-6 py-4">Redis Cache Memory Store (&lt;50ms state reads)</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Asset Ingestion</td>
                  <td className="px-6 py-4">AWS S3 / Presigned upload URLs</td>
                  <td className="px-6 py-4">Cloudinary CDN / Optimized Responsive Images</td>
                </tr>
                <tr className="border-b border-[#0F5132]/6 hover:bg-[#EAF7EF]/10">
                  <td className="px-6 py-4 font-semibold text-[#0F5132]/90 bg-[#F7F4EC]/30">Testing Pipeline</td>
                  <td className="px-6 py-4">Playwright E2E browser mocks in CI/CD</td>
                  <td className="px-6 py-4">Vitest Unit tests / Integration test suite</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Expanded Solutions Directories */}
        <section className="space-y-24 mb-24">

          {/* 01. News & Media Platform */}
          {newsSol && (
            <div id="media" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 01: HIGH-SCALE PUBLISHING
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Custom News or Media Platform
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    An enterprise editorial CMS engineered to handle high-traffic spikes through static generation, featuring secure S3 asset uploading and rigorous automated regression testing.
                  </p>
                </div>
                <Link
                  href={`/solutions/${newsSol.slug}`}
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
                    Legacy CMS Failures (WordPress / Drupal)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>WordPress plugin dependencies create severe code vulnerability risks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>No multi-stage editorial review workspace leads to styling errors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Heavy dynamic database calls crash under sudden viral traffic spikes.</span>
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
                      <span>Decoupled static output handles traffic spikes without database strain.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Strict multi-stage approval (Draft → Review → Published) workflow is built-in.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Automated Playwright checks block layout breaking code prior to push.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables & Proof */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {newsSol.deliverables.slice(0, 6).map((del, i) => (
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
                      Built a cloud-native editorial Bangla platform with AWS S3 asset pipelines and automated Playwright E2E browser checks.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: InshortBD</span>
                    <Link
                      href="/projects/inshortbd"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={newsSol.technicalSpecs} title="News Engine Specifications" />
            </div>
          )}

          {/* 02. Booking System */}
          {bookingSol && (
            <div id="booking" className="border-t border-[#0F5132]/12 pt-16">
              <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#0F5132] font-bold bg-[#EAF7EF] px-3 py-1 rounded-full border border-[#0F5132]/10 mb-3 inline-block">
                    SYSTEM TIER 02: RESERVATION ENGINE
                  </span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#171717]">
                    Low-Latency Reservation Booking System
                  </h2>
                  <p className="text-sm text-[#5F655F] mt-2 max-w-2xl">
                    A multi-service reservations database featuring a low-latency Redis cache availability store and automated billing integrations.
                  </p>
                </div>
                <Link
                  href={`/solutions/${bookingSol.slug}`}
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
                    Legacy Plugin Failures (WooCommerce Bookings)
                  </h4>
                  <ul className="space-y-2.5 text-xs text-[#5F655F]">
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Rigid database structures cannot handle custom reservation rules.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Slow database lookup speeds cause double booking errors.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-500">✕</span>
                      <span>Checkout pages lack mobile conversion optimizations.</span>
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
                      <span>Extensible schema structures map easily to custom business logic.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>Redis cache queries process reservation validation in milliseconds.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0F5132] font-bold">✓</span>
                      <span>One-page checkout layouts improve conversion performance.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Deliverables & Proof */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-[#0F5132] font-bold mb-4">Core Deliverables</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#5F655F]">
                    {bookingSol.deliverables.slice(0, 6).map((del, i) => (
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
                      Built a car rental platform features dynamic scheduling validation, support chatbots, and local bkash payment support.
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#0F5132]/6">
                    <span className="text-xs font-bold text-[#0F5132]">Case Study: Gaari Bookings</span>
                    <Link
                      href="/projects/gaari"
                      className="text-xs text-[#0F5132] font-bold hover:underline flex items-center gap-1"
                    >
                      Read Case Study <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Specifications Table */}
              <TechnicalSpecificationsTable specs={bookingSol.technicalSpecs} title="Booking Engine Specifications" />
            </div>
          )}

        </section>

        {/* Crawlable SEO Supporting Guide */}
        <section className="border-t border-[#0F5132]/12 pt-16 mb-20">
          <div className="prose prose-sm max-w-none text-[#5F655F] space-y-8">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[#171717] mb-4">
                Architecture Discipline: Engineering Stateful Content and Transaction Engines
              </h2>
              <p className="leading-relaxed text-sm">
                Custom platforms need to process dynamic states (e.g. seat allocations, breaking news alerts) without failing under concurrent spikes. Statically serving media pages while relying on low-latency caching layers for database transaction routes provides the best performance compromise.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  Enterprise Ingestion: AWS S3 Pipelines and Editorial Workflows
                </h3>
                <p className="leading-relaxed text-xs">
                  For large-scale media portals like InshortBD, direct uploads to web nodes cause IO bottlenecks. The S3 ingestion pipeline handles media storage through client-signed secure URLs, bypassing the application server entirely. Rich content is structured via a customized Tiptap editor and runs through role-based access control (RBAC) editorial workflows before generation.
                </p>
              </div>

              <div>
                <h3 className="text-base font-bold text-[#171717] mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
                  Dynamic Scheduling: Redis Caching and Booking States
                </h3>
                <p className="leading-relaxed text-xs">
                  Booking apps like Gaari require real-time validation of availability across hundreds of variables (landmarks, timezones, operators). Querying PostgreSQL directly under heavy search loads triggers thread lockouts. Implementing a Redis lookup cache checks reservation parameters within milliseconds, keeping reservation locks transient and database loads light.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#171717] mb-2">
                CI/CD Testing &amp; Structural Stability
              </h3>
              <p className="leading-relaxed text-xs">
                To guarantee production platforms remain stable, we deploy automated browser pipelines. Playwright runs full programmatic user-journey sequences (search, cart addition, booking execution) on clean instances during continuous integration checks, preventing code regressions from hitting live environments.
              </p>
            </div>
          </div>
        </section>

        {/* Structured FAQ */}
        <section className="bg-[#FFFDF8] border border-[#0F5132]/12 rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-serif font-bold text-[#171717] mb-8 text-center">
            Frequently Asked Platform Questions
          </h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                How do you handle high-traffic spikes on media platforms?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                By generating articles statically during publishing. When an article goes live, the Next.js router pre-compiles it to a flat HTML asset. Visitors fetch static content directly from cache headers, leaving PostgreSQL connection pools free to service dynamic comment or interaction requests.
              </p>
            </div>
            <div className="h-px bg-[#0F5132]/6" />
            <div>
              <h4 className="font-bold text-[#0F5132] text-sm md:text-base mb-2">
                Why is Playwright testing important for custom business tools?
              </h4>
              <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed">
                In complex systems with active reservation parameters, upgrading a layout file can break payment processing routes. Playwright acts as a robot checker, executing automated browser trials of your key business paths before deployment, which maintains reliability.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="mt-20 p-8 rounded-3xl bg-[#0F5132] text-white text-center">
          <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Need to deploy a custom application?</h2>
          <p className="text-white/80 text-sm max-w-xl mx-auto mb-6">
            Let&apos;s structure a clean database design and define your scaling parameters.
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
