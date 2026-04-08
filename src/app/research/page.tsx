import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ArrowRight, BookOpen, ExternalLink, Database, Brain, Network, BarChart3 } from "lucide-react";
import { ResearchStrip } from "@/components/ResearchStrip";

export const metadata: Metadata = {
  title: "Research | Rizwanul Islam Afraim",
  description: "Exploring the structural economics of agentic AI, coordination infrastructure technology, and the future of enterprise decision intelligence systems.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/research",
  },
};

const researchAreas = [
  {
    icon: Network,
    title: "Coordination Infrastructure",
    description: "Analyzing how agentic AI compresses coordination costs and reshapes firm hierarchies from the inside out.",
    color: "emerald"
  },
  {
    icon: Database,
    title: "Capital Deepening",
    description: "Studying the shift from human-mediated workflows to compute-heavy, systems-led operational architectures.",
    color: "blue"
  },
  {
    icon: Brain,
    title: "Labor Stratification",
    description: "Investigating the non-linear productivity gradient between AI designers, users, and routine executors.",
    color: "violet"
  },
  {
    icon: BarChart3,
    title: "Decision Intelligence",
    description: "Analyzing the convergence of BI interfaces and AI-driven logic in enterprise decision systems.",
    color: "amber"
  }
];

const relatedPosts = [
  {
    title: "The 9-Hour Efficiency Gap: Power BI vs Python Dashboards in 2026",
    slug: "the-9-hour-efficiency-gap-power-bi-vs-python-dashboards-in-2026",
    date: "2026-04-08"
  },
  {
    title: "Enterprise Intelligence Architecture: Why 97% of Fortune 500 Trust Power BI",
    slug: "why-97-percent-fortune-500-trust-power-bi",
    date: "2026-04-05"
  },
  {
    title: "The Real Economic Shift Behind AI is Coordination",
    slug: "the-real-economic-shift-behind-ai-is-coordination-not-just-productivity",
    date: "2026-03-24"
  },
  {
    title: "Why Bangladesh Risks Becoming an AI-Consuming Economy",
    slug: "why-bangladesh-risks-becoming-an-ai-consuming-economy",
    date: "2026-03-18"
  }
];

export default function ResearchIndexPage() {
  return (
    <main className="bg-background min-h-screen text-foreground pb-20">
      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Ambient background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.04),transparent_60%)] pointer-events-none" />

        <div className="container px-4 mx-auto max-w-5xl relative z-10">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Research" },
            ]}
          />

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
              The Pursuit of <span className="text-primary italic">Structural Clarity</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed mb-8">
              My research focuses on the intersection of agentic AI, enterprise intelligence, and institutional economics—exploring how technology redefines firm boundaries and decision-making at scale.
            </p>
          </div>
        </div>
      </section>

      {/* ===== FEATURED RESEARCH ===== */}
      <section className="py-8 relative">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="mb-4 flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Featured Publications</h2>
            <div className="h-px flex-grow bg-foreground/10" />
          </div>
        </div>
        <ResearchStrip />
      </section>

      {/* ===== RESEARCH PILLARS ===== */}
      <section className="py-16 bg-secondary/10 border-y border-foreground/5">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Core Research Pillars</h2>
            <p className="text-foreground/60 leading-relaxed">
              Synthesizing transaction cost economics with advanced breakthroughs in agentic reasoning to map the next decade of economic shift.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {researchAreas.map((area) => (
              <div 
                key={area.title}
                className="p-6 rounded-2xl bg-background border border-foreground/5 hover:border-primary/20 transition-all group"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 bg-secondary/50 text-foreground/70 group-hover:bg-primary/10 group-hover:text-primary transition-colors`}>
                  <area.icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{area.title}</h3>
                <p className="text-xs text-foreground/70 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED INSIGHTS ===== */}
      <section className="py-20">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4">Related Insights</h2>
              <p className="text-foreground/60 leading-relaxed">
                Applied analysis and theoretical deep-dives extending the findings of my primary research papers.
              </p>
            </div>
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline group"
            >
              View all technical articles
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid gap-4">
            {relatedPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-6 rounded-xl bg-secondary/20 border border-foreground/5 hover:border-primary/30 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-background border border-foreground/10 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-xs text-foreground/40 mt-1">
                      Theoretical Depth &bull; {post.date}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-12">
        <div className="container px-4 mx-auto max-w-5xl">
          <div className="p-8 md:p-12 rounded-3xl bg-primary text-white relative overflow-hidden">
            {/* Design patterns */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6">Interested in collaboration or detailed discussion?</h2>
              <p className="text-white/80 text-lg mb-8">
                I am actively engaging with economists, venture architects, and policy designers to refine these models for real-world application.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="mailto:rizwanul.islam.afraim@gmail.com" 
                  className="px-8 py-4 rounded-full bg-white text-primary font-bold hover:bg-white/90 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Contact for Research
                </a>
                <Link 
                  href="/research"
                  className="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
                >
                  Explore Portfolio
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
