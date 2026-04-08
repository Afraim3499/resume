import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, BookOpen, ChevronDown, BarChart3, Zap, Layers, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Power BI in the AI Era: Assessing Its 2026 Effectiveness | Rizwanul Islam Afraim",
  description:
    "Published SSRN research by Rizwanul Islam Afraim on Power BI's evolution, comparing business intelligence tools against AI-driven coding, Python analytics, and ML systems in 2026.",
  alternates: {
    canonical:
      "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Power BI in the AI Era: Assessing Its 2026 Effectiveness",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim evaluating Power BI alongside coding-centric analytical ecosystems and AI workflows.",
    url: "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness",
    siteName: "Rizwanul Afraim",
    type: "article",
    images: [{ url: "/assets/research-powerbi-og.jpg", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Power BI in the AI Era: Assessing Its 2026 Effectiveness",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim on Power BI's role in increasingly AI-driven analytical ecosystems.",
  },
};

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id":
        "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness#article",
      headline:
        "Power BI in the AI Era: Assessing Its 2026 Effectiveness",
      description:
        "Published SSRN research by Rizwanul Islam Afraim investigating whether traditional business intelligence tools remain effective compared to modern AI-enabled coding workflows.",
      author: {
        "@type": "Person",
        name: "Rizwanul Islam Afraim",
        url: "https://www.rizwanulafraim.com/",
      },
      publisher: {
        "@type": "Person",
        name: "Rizwanul Islam Afraim",
        url: "https://www.rizwanulafraim.com/",
      },
      datePublished: "2026-04-08",
      dateCreated: "2026-02-16",
      dateModified: "2026-04-08",
      inLanguage: "en",
      keywords: [
        "Business Intelligence",
        "Power BI",
        "Artificial Intelligence Analytics",
        "Data Visualization",
        "Python Analytics",
        "Machine Learning Systems",
        "Decision Intelligence",
        "AI-driven Analytics",
        "Data Science Platforms",
        "Enterprise Analytics"
      ],
      about: [
        "Power BI",
        "AI Integration",
        "Python vs Power BI",
        "Decision Intelligence",
        "Hybrid Analytics Ecosystem"
      ],
      isBasedOn: [
        "https://ssrn.com/abstract=6250518",
        "http://dx.doi.org/10.2139/ssrn.6250518",
      ],
      url: "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness",
      mainEntityOfPage:
        "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness",
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.rizwanulafraim.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Research",
          item: "https://www.rizwanulafraim.com/research/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Power BI in the AI Era",
          item: "https://www.rizwanulafraim.com/research/power-bi-ai-era-2026-effectiveness",
        },
      ],
    },
  ],
};

/* ---------- Framework cards ---------- */
const frameworks = [
  {
    title: "The Hybrid Synergy Model",
    body: "Rather than choice between coding and BI, the research argues for a hybrid workflow: using Python/R for back-end data modeling and ML, while leveraging Power BI as a high-accessibility 'Decision Interface' for enterprise distribution.",
    color: "amber",
    icon: Layers
  },
  {
    title: "The 9-Hour Efficiency Gap",
    body: "Empirical comparison shows a standard complex dashboard takes ~7 hours to build in Power BI versus ~16 hours in Python/Plotly. For routine reporting, Power BI maintains a 56% speed advantage despite AI coding advances.",
    color: "amber",
    icon: Zap
  },
  {
    title: "AI-BI Convergence",
    body: "The findings indicate a merging of tools where BI platforms are embedding generative AI (Copilot), and coding environments are gaining visual-first capabilities, making the 'tool choice' less binary and more based on 'governance and scale'.",
    color: "amber",
    icon: BarChart3
  },
];

/* ---------- Comparison Items ---------- */
const comparisons = [
  { feature: "Ease of Use", pb: "High (Drag-and-drop, No-code)", python: "Moderate (Requires syntax, logic)" },
  { feature: "Flexibility", pb: "Moderate (Constrained by visuals)", python: "Maximum (Unlimited custom logic)" },
  { feature: "Build Velocity", pb: "~7 hours (Benchmark dashboard)", python: "~16 hours (Benchmark dashboard)" },
  { feature: "ML Integration", pb: "High (Azure/Fabric support)", python: "Native (Full library ecosystem)" },
  { feature: "Collaboration", pb: "Native (Teams, SharePoint, RLS)", python: "Custom (Requires deployment pipeline)" },
  { feature: "Maintenance", pb: "Automated (Microsoft managed)", python: "Manual (Server, library upkeep)" },
];

/* ---------- TOC items ---------- */
const tocItems = [
  { id: "abstract", label: "Abstract & Scope" },
  { id: "evolution", label: "Power BI's Evolution" },
  { id: "comparative-analysis", label: "Power BI vs. Python" },
  { id: "market-trends", label: "Market Adoption Trends" },
  { id: "ai-impact", label: "The Role of AI" },
  { id: "conclusions", label: "Research Conclusions" },
  { id: "integrity", label: "Research Integrity" },
];

/* ========== PAGE ========== */
export default function PowerBIResearchPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Ambient gradient - Amber/Yellow theme */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.08),transparent_70%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(245,158,11,0.05),transparent_60%)] pointer-events-none" />

        <div className="container px-4 mx-auto max-w-4xl relative z-10">
          <Breadcrumbs
            items={[
              { label: "Research", href: "/research" },
              { label: "Power BI in the AI Era" },
            ]}
          />

          {/* Eyebrow */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-sm font-medium mb-6 uppercase tracking-wider">
            Enterprise Research Publication
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight tracking-tight max-w-[75ch]">
            Power BI in the AI Era: <span className="text-amber-500 italic">Assessing Its 2026 Effectiveness</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-[75ch] mb-8">
            An investigation into whether traditional business intelligence tools have lost their edge in a world of AI-driven coding and custom Python analytics ecosystems.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://ssrn.com/abstract=6250518"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-medium hover:bg-amber-600 transition-colors shadow-sm shadow-amber-500/20"
            >
              Read full research on SSRN
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#comparative-analysis"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/50 border border-amber-500/10 text-foreground font-medium hover:bg-secondary transition-colors"
            >
              View Comparative Data
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Byline block */}
          <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5 max-w-xl group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <h2 className="sr-only">Publication Details</h2>
            <p className="font-semibold text-foreground mb-1 flex items-center gap-2">
              Rizwanul Islam Afraim 
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-amber-500 text-sm font-bold uppercase">SSRN Researcher</span>
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Independent Researcher & Systems Architect
              <br />
              Published on SSRN: April 8, 2026
              <br />
              Date Written: February 16, 2026
              <br />
              JEL: C88, M15, D83, O33
            </p>
          </div>
        </div>
      </section>

      {/* ===== STICKY TOC & MAIN CONTENT ===== */}
      <div className="container px-4 mx-auto max-w-4xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          {/* Main content column */}
          <article className="min-w-0">
            
            {/* ##### ABSTRACT ##### */}
            <section id="abstract" className="mb-20 scroll-mt-24 overflow-hidden">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 break-words">Abstract</h2>
              <div className="p-8 rounded-2xl bg-secondary/10 border border-foreground/5 italic text-lg leading-relaxed text-foreground/80 break-words">
                &quot;This study investigates whether Power BI remains as effective in 2026 as it was five years ago, considering rapid advances in AI-driven coding, Python-based analytics, and machine learning systems... The findings indicate that while AI coding environments provide greater analytical depth, Power BI continues to offer significant value in accessibility, enterprise integration, and decision communication.&quot;
              </div>
              <div className="mt-8 space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  The hypothesis tested was that traditional BI tools have become less effective relative to modern AI-enabled workflows. The research Scope covers Power BI&apos;s features (Fabric, Copilot) compared with pure Python/ML solutions using Microsoft documentation, industry reports from Gartner and Forrester, and academic case studies.
                </p>
              </div>
            </section>

            {/* ##### CORE FINDINGS ##### */}
            <section id="key-findings" className="mb-20">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Core Research Contributions</h2>
              <div className="grid gap-6">
                {frameworks.map((fw) => (
                  <div
                    key={fw.title}
                    className="p-6 md:p-8 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] flex gap-6"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                      <fw.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold mb-2 text-amber-500">
                        {fw.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {fw.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ##### EVOLUTION ##### */}
            <section id="evolution" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 italic">Power BI&apos;s AI Evolution</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Power BI has transitioned from a drag-and-drop dashboard tool to a core component of the <strong>Microsoft Fabric</strong> data foundation. The integration of <strong>Copilot capabilities</strong> allows users to auto-generate visuals and DAX measures using natural language prompts.
                </p>
                <p>
                  Academic studies (ASTRJ 2025) conclude that Power BI enables &quot;faster decision-making&quot; in operational environments, remaining &quot;indispensable&quot; for organizations that prioritize cost-effectiveness and functionality over complex custom-coded logic.
                </p>
              </div>
            </section>

            {/* ##### COMPARISON TABLE ##### */}
            <section id="comparative-analysis" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-center lg:text-left">Power BI vs. Python: 2026 Assessment</h2>
              <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
                <table className="w-full border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-amber-500/20">
                      <th className="py-4 px-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider text-foreground/40 italic">Capability</th>
                      <th className="py-4 px-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider text-amber-500">Power BI</th>
                      <th className="py-4 px-4 text-left text-xs md:text-sm font-bold uppercase tracking-wider text-foreground/60">Python / AI Coding</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-foreground/5">
                    {comparisons.map((c) => (
                      <tr key={c.feature} className="hover:bg-amber-500/[0.02] transition-colors">
                        <td className="py-4 px-4 font-medium text-foreground text-sm">{c.feature}</td>
                        <td className="py-4 px-4 text-xs md:text-sm text-foreground/70">{c.pb}</td>
                        <td className="py-4 px-4 text-xs md:text-sm text-foreground/70">{c.python}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* ##### HYBRID DIAGRAM ##### */}
            <section className="mb-20">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">The Hybrid Synergy Architecture</h2>
              <div className="p-4 md:p-8 rounded-2xl bg-secondary/20 border border-foreground/5 flex flex-col items-center">
                <div className="w-full max-w-lg space-y-4">
                  {/* Data Source */}
                  <div className="flex justify-center">
                    <div className="px-6 py-2 rounded border border-foreground/10 bg-background/50 text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest">
                      Data Warehouse
                    </div>
                  </div>
                  
                  {/* Flow Arrow */}
                  <div className="flex justify-center py-1">
                    <div className="h-8 border-l border-dashed border-amber-500/30"></div>
                  </div>
                  
                  {/* Logic Layer */}
                  <div className="p-4 md:p-6 rounded-xl border border-amber-500/30 bg-secondary/50 text-center shadow-inner">
                    <div className="text-amber-500 font-bold text-sm md:text-base mb-2">Processing & ML Layer</div>
                    <div className="text-[10px] md:text-xs text-foreground/50 italic mb-1">Python (Scikit-Learn, Pandas, TensorFlow)</div>
                    <div className="text-[10px] md:text-xs text-foreground/50 leading-relaxed md:px-4">Complex modeling, recursive algorithms, reproducibility for deep analytical logic.</div>
                  </div>

                  {/* Flow Arrow */}
                  <div className="flex justify-center py-1">
                    <div className="h-8 border-l border-dashed border-amber-500/30"></div>
                  </div>

                  {/* Interface Layer */}
                  <div className="p-4 md:p-6 rounded-xl border-2 border-amber-500 bg-amber-500/5 text-center shadow-lg shadow-amber-500/5">
                    <div className="text-amber-500 font-bold text-sm md:text-base mb-2 uppercase tracking-wide">Power BI Interface</div>
                    <div className="text-[10px] md:text-xs text-foreground/80 leading-relaxed">Enterprise Distribution, RLS, Mobile Access, Dashboards for end-user storytelling.</div>
                  </div>
                </div>

                <p className="mt-8 text-xs md:text-sm text-center text-foreground/60 leading-relaxed italic max-w-md">
                  The recommended &quot;Hybrid Catalyst&quot; strategy: Outsource logic to code, while centralizing communication through Power BI.
                </p>
              </div>
            </section>

            {/* ##### MARKET ADOPTION ##### */}
            <section id="market-trends" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">Market Adoption & Enterprise Trust</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="p-6 rounded-xl bg-background border border-foreground/5 text-center">
                  <div className="text-4xl font-serif font-bold text-amber-500 mb-1">97%</div>
                  <div className="text-sm text-foreground/50 uppercase tracking-widest font-medium">Fortune 500 Adoption</div>
                </div>
                <div className="p-6 rounded-xl bg-background border border-foreground/5 text-center">
                  <div className="text-4xl font-serif font-bold text-amber-500 mb-1">30.1%</div>
                  <div className="text-sm text-foreground/50 uppercase tracking-widest font-medium">Global BI Market Share</div>
                </div>
              </div>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Usage statistics (Acuity Training 2025) indicate that Power BI&apos;s market share continues to grow, with 58% of surveyed organizations planning to ramp up adoption. While niche tools like Hex or Sigma are growing among startups, the &quot;Big Three&quot; (Power BI, Tableau, Looker) still command 34% of the total BI software spend.
                </p>
              </div>
            </section>

            {/* ##### AI IMPACT ##### */}
            <section id="ai-impact" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">The Dual Role of AI</h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed">
                <p>
                  Generative AI is a double-edged sword. While it embeds powerful ease-of-use into Power BI (DAX generation, visual creation), it also empowers custom coding environments via assistants like GitHub Copilot.
                </p>
                <div className="p-6 rounded-xl bg-amber-500/5 border-l-4 border-amber-500">
                  <h4 className="font-bold flex items-center gap-2 mb-2">
                    <ShieldCheck className="w-5 h-5 text-amber-500" />
                    Governance Caveat
                  </h4>
                  <p className="text-sm italic">
                    The research highlights that AI does not replace domain expertise. AI hallucinations and data privacy concerns make &quot;Check-and-Verify&quot; protocols mandatory for enterprise BI deployments in the AI era.
                  </p>
                </div>
              </div>
            </section>

            {/* ##### CONCLUSIONS ##### */}
            <section id="conclusions" className="mb-20 scroll-mt-24">
              <div className="p-8 md:p-12 rounded-3xl bg-amber-500 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
                <div className="relative z-10">
                  <h2 className="text-2xl md:text-4xl font-serif font-bold mb-6">Research Conclusions</h2>
                  <div className="space-y-6 text-white/90 text-lg">
                    <p>
                      <strong>1. Power BI is not losing its edge:</strong> It is evolving into an AI-augmented interface that centralizes complex logic into accessible decision-intelligence hubs.
                    </p>
                    <p>
                      <strong>2. Blended Strategy is Mandatory:</strong> Modern data teams should use Power BI as the &quot;Enterprise Front-end&quot; and Python/AI platforms for the &quot;Heavier Analytical Back-end.&quot;
                    </p>
                    <p>
                      <strong>3. Human Orchestration Still Wins:</strong> AI speeds up both paths but introduces new governance risks that require human domain expertise to manage.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ##### INTEGRITY ##### */}
            <section id="integrity" className="mb-20 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 text-foreground/60">Research Integrity</h2>
              <div className="space-y-4 text-sm text-foreground/40 leading-relaxed max-w-xl">
                <p><strong>Declaration:</strong> No financial, professional, or personal relationships influenced this independent study.</p>
                <p><strong>Ethics:</strong> No human participants or personal data were used; methodology was strictly analytical and public-source based.</p>
                <p><strong>Funder Statement:</strong> This research received no external funding from any organizations.</p>
              </div>
            </section>

            {/* ##### CITATION ##### */}
            <section className="mb-20">
              <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5">
                <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-3">Suggested Citation</h3>
                <p className="text-sm text-foreground/70 leading-relaxed italic">
                  Islam Afraim, Rizwanul, Power BI in the AI Era: Assessing Its 2026 Effectiveness (February 16, 2026). Available at SSRN: 
                  <a href="https://ssrn.com/abstract=6250518" target="_blank" className="text-amber-500 underline decoration-amber-500/30 hover:decoration-amber-500 ml-1">https://ssrn.com/abstract=6250518</a>
                </p>
              </div>
            </section>

          </article>

          {/* ===== STICKY SIDEBAR ===== */}
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28 space-y-1">
              <h3 className="text-xs font-bold text-foreground/40 uppercase tracking-widest mb-4">Paper Sections</h3>
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-foreground/50 hover:text-amber-500 py-1.5 transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="mt-12 p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.03]">
                <BookOpen className="w-5 h-5 text-amber-500 mb-3" />
                <p className="text-xs text-foreground/70 font-medium">Looking for a collaboration or to discuss these findings?</p>
                <a href="mailto:rizwanul.islam.afraim@gmail.com" className="inline-block mt-3 text-sm text-amber-500 font-bold hover:underline">Connect via Email →</a>
              </div>
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
