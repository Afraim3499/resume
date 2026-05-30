import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import {
  ShoppingCart,
  Newspaper,
  CalendarDays,
  UserCircle2,
  LineChart,
  Search,
  Zap,
  ArrowRight,
  ArrowUpRight,
  Layers
} from "lucide-react";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions | Rizwanul Islam Afraim",
  description: "Browse custom-engineered platform architectures built for real business models — from high-scale e-commerce to timezone-aware CRMs and automation engines.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/solutions",
  },
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  ShoppingCart,
  Newspaper,
  CalendarDays,
  UserCircle2,
  LineChart,
  Search,
};

export default function SolutionsIndexPage() {
  const solutionsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Productized Solutions & Architectures",
    "description": "Finished, deployable platform architectures designed for specific business operational profiles.",
    "url": "https://www.rizwanulafraim.com/solutions",
    "numberOfItems": solutions.length,
    "itemListElement": solutions.map((sol, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "name": sol.title,
        "description": sol.subtitle,
        "url": `https://www.rizwanulafraim.com/solutions/${sol.slug}`
      }
    }))
  };

  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(solutionsSchema)
        }}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Subtle green ambient glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(15,81,50,0.04),transparent_70%)] pointer-events-none" />

        <div className="container px-4 mx-auto max-w-5xl relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Solutions" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF7EF] text-[#0F5132] text-xs font-semibold mb-6 border border-[#0F5132]/16">
              <Zap className="w-3.5 h-3.5" />
              <span>PRODUCTION-GRADE SYSTEMS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
              Architected <span className="text-[#0F5132] italic">Solutions</span>
            </h1>
            <p className="text-lg md:text-xl text-[#5F655F] leading-relaxed">
              Below are ready, production-tested software and operations architectures. Rather than writing templates from scratch, I configure these high-performance foundation systems to accelerate your execution speed and reduce deployment risk.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="container px-4 mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((sol) => {
            const Icon = iconMap[sol.iconName] || Layers;
            return (
              <div
                key={sol.slug}
                className="group relative p-8 rounded-2xl bg-[#FFFDF8] border border-[#0F5132]/12 hover:border-[#0F5132]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Icon & Tagline */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#EAF7EF] text-[#0F5132] flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#0F5132] font-extrabold bg-[#EAF7EF] px-2.5 py-1 rounded-full border border-[#0F5132]/10">
                      {sol.heroTagline}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold mb-3 font-serif text-[#171717] group-hover:text-[#0F5132] transition-colors leading-tight">
                    {sol.title}
                  </h3>
                  <p className="text-sm text-[#5F655F] leading-relaxed mb-6">
                    {sol.subtitle}
                  </p>

                  {/* Highlights/Deliverables */}
                  <ul className="space-y-2 mb-8">
                    {sol.deliverables.slice(0, 3).map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#5F655F]">
                        <span className="w-1 h-1 rounded-full bg-[#0F5132] mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer link */}
                <div className="pt-4 border-t border-[#0F5132]/6 flex items-center justify-between">
                  <div className="flex gap-2">
                    {sol.techStack.slice(0, 3).map((tech) => (
                      <span key={tech} className="text-[10px] font-medium px-2 py-0.5 bg-[#F7F4EC] rounded text-[#5F655F]">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/solutions/${sol.slug}`}
                    className="inline-flex items-center text-xs font-bold text-[#0F5132] uppercase tracking-wider group-hover:underline"
                  >
                    View Architecture <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Scoping Call band */}
      <section className="container px-4 mx-auto max-w-5xl mt-20">
        <div className="p-8 md:p-12 rounded-3xl bg-[#0F5132] text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#EAF7EF] font-bold block mb-4">
              TAILORED DEPLOYMENT
            </span>
            <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6">
              Need a bespoke integration or a custom system?
            </h2>
            <p className="text-white/80 text-base mb-8">
              Whether you need to bridge dynamic sales pipelines, design serverless CRM synchronization loops, or optimize localized e-commerce transaction performance, let&apos;s explore your business architecture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-full bg-[#FFFDF8] text-[#0F5132] font-bold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2 shadow-md"
              >
                Schedule Scoping Session
              </a>
              <a
                href="mailto:hello@rizwanulafraim.com"
                className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
              >
                Email Specifications
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
