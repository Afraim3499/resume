import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, BookOpen, ArrowRight, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "Agentic AI as Coordination Infrastructure | Rizwanul Islam Afraim",
  description:
    "Published SSRN research by Rizwanul Islam Afraim on agentic AI as coordination infrastructure, firm restructuring, economic divergence, and Bangladesh's strategic AI position.",
  alternates: {
    canonical:
      "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure",
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
    title: "Agentic AI as Coordination Infrastructure Technology",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim on agentic AI, coordination compression, labor stratification, and economic divergence.",
    url: "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure",
    siteName: "Rizwanul Afraim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agentic AI as Coordination Infrastructure Technology",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim on agentic AI, coordination compression, labor stratification, and economic divergence.",
  },
};

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id":
        "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure#article",
      headline:
        "Agentic AI as Coordination Infrastructure Technology: Structural Implications for Firms, Growth, and Economic Divergence",
      description:
        "Published SSRN research by Rizwanul Islam Afraim on agentic AI as coordination infrastructure, coordination compression, labor stratification, and economic divergence.",
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
      datePublished: "2026-04-02",
      dateCreated: "2026-02-14",
      dateModified: "2026-04-02",
      inLanguage: "en",
      keywords: [
        "Agentic AI",
        "Coordination Infrastructure Technology",
        "Transaction Cost Economics",
        "Artificial Intelligence and Growth",
        "Institutional Economics",
        "Platform Capitalism",
        "Digital Sovereignty",
        "Economic Divergence",
      ],
      about: [
        "Agentic AI",
        "Coordination Infrastructure Technology",
        "Coordination Compression Hypothesis",
        "Dynamic Agentic Productivity Gradient",
        "Economic Divergence",
        "Bangladesh",
      ],
      isBasedOn: [
        "https://ssrn.com/abstract=6236898",
        "http://dx.doi.org/10.2139/ssrn.6236898",
      ],
      url: "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure",
      mainEntityOfPage:
        "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure",
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure#breadcrumb",
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
          name: "Agentic AI as Coordination Infrastructure",
          item: "https://www.rizwanulafraim.com/research/agentic-ai-coordination-infrastructure",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.rizwanulafraim.com/#person",
      name: "Rizwanul Islam Afraim",
      url: "https://www.rizwanulafraim.com/",
      jobTitle: "Advanced Venture Architect",
      sameAs: ["https://www.rizwanulafraim.com/"],
    },
  ],
};

/* ---------- Framework cards ---------- */
const frameworks = [
  {
    title: "Coordination Infrastructure Technology (CIT)",
    body: "CIT frames agentic AI as a system that reduces coordination costs across workflows, not just a tool that automates isolated tasks. In this view, the real transformation is not output generation alone, but the compression of managerial mediation, routing, supervision, and coordination.",
    color: "emerald",
  },
  {
    title: "Coordination Compression Hypothesis (CCH)",
    body: "CCH argues that as agentic capability increases, the number of optimal coordination layers declines. That pushes firms toward flatter structures, higher spans of control, leaner oversight, and stronger dependence on systems-level architecture.",
    color: "violet",
  },
  {
    title: "Dynamic Agentic Productivity Gradient (DAPG)",
    body: "DAPG explains why AI gains do not distribute evenly. The paper divides workers into three broad groups: system designers, tool users, and routine task executors. The result is non-linear productivity divergence, widening income and capability gaps across individuals, firms, and economies.",
    color: "blue",
  },
];

/* ---------- Q&A items ---------- */
const qaItems = [
  {
    q: "What is Agentic AI?",
    a: "Agentic AI is a class of AI systems that can decompose goals, choose tools, execute multi-step actions, monitor outcomes, and iterate with reduced human direction. In practical terms, it moves AI from passive response generation toward workflow execution and operational coordination.",
  },
  {
    q: "How is Agentic AI different from generative AI?",
    a: "Generative AI responds to prompts and produces static outputs that require a human to act on them. Agentic AI goes further: it decomposes goals, selects tools, executes multi-step workflows, monitors results, and iterates autonomously. The shift is from reactive output generation to operational coordination.",
  },
  {
    q: "What is Coordination Infrastructure Technology?",
    a: "Coordination Infrastructure Technology is the paper's term for agentic AI as a system that reduces coordination costs at scale. Instead of merely automating one task at a time, it changes how work gets routed, supervised, sequenced, and governed across organizations.",
  },
  {
    q: "What is the Coordination Compression Hypothesis?",
    a: "The Coordination Compression Hypothesis states that as agentic capability increases, the number of optimal coordination layers within a firm declines. This produces leaner firms, higher spans of control, greater reliance on systems-level oversight, and a structural shift from human-mediated coordination to computational coordination.",
  },
  {
    q: "What is the Dynamic Agentic Productivity Gradient?",
    a: "The Dynamic Agentic Productivity Gradient describes how AI-driven productivity gains distribute non-linearly across three worker tiers: system designers (Tier A), tool users (Tier B), and routine task executors (Tier C). The result is widening income and capability dispersion across individuals, firms, and economies.",
  },
  {
    q: "Why does this matter for Bangladesh?",
    a: "Bangladesh sits at a strategic fork. Its digital exports currently rely on freelancing platforms, service-based coding, and routine digital tasks — categories under pressure from AI substitution. The opportunity is to move toward AI workflow design, localized AI solutions, SME automation, and regional SaaS value creation. That requires stronger AI literacy, compute access, startup capital, and institutional clarity.",
  },
];

/* ---------- TOC items ---------- */
const tocItems = [
  { id: "what-this-research-argues", label: "What this research argues" },
  { id: "core-frameworks", label: "The three core frameworks" },
  { id: "key-questions", label: "Key questions answered" },
  { id: "bangladesh", label: "Why this matters for Bangladesh" },
  { id: "my-view", label: "My view" },
  { id: "research-integrity", label: "Research integrity" },
  { id: "related-reading", label: "Related reading" },
];

/* ---------- Color helpers ---------- */
function getCardStyles(color: string) {
  switch (color) {
    case "emerald":
      return "border-emerald-500/30 bg-emerald-500/5";
    case "violet":
      return "border-violet-500/30 bg-violet-500/5";
    case "blue":
      return "border-blue-500/30 bg-blue-500/5";
    default:
      return "border-foreground/10 bg-secondary/10";
  }
}

function getCardAccent(color: string) {
  switch (color) {
    case "emerald":
      return "text-emerald-400";
    case "violet":
      return "text-violet-400";
    case "blue":
      return "text-blue-400";
    default:
      return "text-primary";
  }
}

/* ========== PAGE ========== */
export default function AgenticAIResearchPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.06),transparent_70%)] pointer-events-none" />

        <div className="container px-4 mx-auto max-w-4xl relative z-10">
          <Breadcrumbs
            items={[
              { label: "Research", href: "/research" },
              { label: "Agentic AI as Coordination Infrastructure" },
            ]}
          />

          {/* Eyebrow */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Published Research
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-tight max-w-[75ch]">
            Agentic AI as Coordination Infrastructure Technology
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-[75ch] mb-8">
            A structural economics paper arguing that agentic AI is not just
            another productivity tool, but a coordination-layer technology that
            can reshape firms, capital allocation, labor stratification, and
            national economic divergence.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://ssrn.com/abstract=6236898"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
            >
              Read full research on SSRN
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#core-frameworks"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/50 border border-foreground/10 text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Explore the core frameworks
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Byline block */}
          <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5 max-w-xl">
            <h2 className="sr-only">
              Agentic AI as Coordination Infrastructure Technology: Structural
              Implications for Firms, Growth, and Economic Divergence
            </h2>
            <p className="font-semibold text-foreground mb-1">
              Rizwanul Islam Afraim —{" "}
              <span className="text-primary">SSRN published researcher</span>
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Independent Researcher
              <br />
              Published on SSRN
              <br />
              Date Written: February 14, 2026
              <br />
              Posted: April 2, 2026
            </p>
          </div>
        </div>
      </section>

      {/* ===== STICKY TOC (Desktop) ===== */}
      <div className="container px-4 mx-auto max-w-4xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          {/* Main content column */}
          <article className="min-w-0">
            {/* ===== SECTION 2: WHAT THIS RESEARCH ARGUES ===== */}
            <section id="what-this-research-argues" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                What this research argues
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch]">
                <p>
                  Most AI discussion is still too shallow. It focuses on
                  productivity gains, task automation, and headline efficiency.
                  This paper argues that agentic AI changes something deeper:
                  coordination itself.
                </p>
                <p>
                  Unlike generative systems that mostly produce outputs on
                  demand, agentic AI can decompose goals, select tools, execute
                  multi-step workflows, monitor results, and iterate with reduced
                  human mediation. That makes it operational, not just assistive.
                </p>
                <p>
                  The core claim of this research is that agentic AI should be
                  understood as Coordination Infrastructure Technology (CIT): a
                  system that compresses coordination costs at scale and changes
                  how firms, labor, capital, and even nations compete.
                </p>
                <p>
                  That is why the paper focuses less on &ldquo;AI as a
                  tool&rdquo; and more on firm boundaries, capital deepening,
                  labor stratification, platform power, digital sovereignty, and
                  economic divergence.
                </p>
              </div>
            </section>

            {/* ===== SECTION 3: FRAMEWORKS ===== */}
            <section id="core-frameworks" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                The three core frameworks
              </h2>
              <div className="grid gap-6">
                {frameworks.map((fw) => (
                  <div
                    key={fw.title}
                    className={`p-6 md:p-8 rounded-xl border ${getCardStyles(fw.color)} transition-colors`}
                  >
                    <h3
                      className={`text-lg md:text-xl font-bold mb-3 ${getCardAccent(fw.color)}`}
                    >
                      {fw.title}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed max-w-[75ch]">
                      {fw.body}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SVG DIAGRAM ===== */}
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                From Agentic AI to Economic Divergence
              </h2>
              <div className="p-6 md:p-8 rounded-xl bg-secondary/20 border border-foreground/5">
                <svg
                  viewBox="0 0 600 520"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full max-w-md mx-auto"
                  role="img"
                  aria-label="Diagram showing how agentic AI compresses coordination costs, reshapes firms, shifts capital toward compute, and contributes to economic divergence."
                >
                  <title>From Agentic AI to Economic Divergence</title>
                  {/* Node backgrounds */}
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <rect
                      key={`bg-${i}`}
                      x="50"
                      y={i * 88 + 10}
                      width="500"
                      height="56"
                      rx="12"
                      fill={
                        i === 0
                          ? "rgba(16,185,129,0.15)"
                          : i === 5
                            ? "rgba(239,68,68,0.12)"
                            : "rgba(139,92,246,0.08)"
                      }
                      stroke={
                        i === 0
                          ? "rgba(16,185,129,0.3)"
                          : i === 5
                            ? "rgba(239,68,68,0.25)"
                            : "rgba(139,92,246,0.15)"
                      }
                      strokeWidth="1"
                    />
                  ))}
                  {/* Labels */}
                  {[
                    "Agentic AI",
                    "Coordination Cost Compression",
                    "Flatter Firms + Higher Span of Control",
                    "Capital Shift Toward Compute and Systems",
                    "Labor Stratification + Platform Rent Intensification",
                    "Economic Divergence",
                  ].map((label, i) => (
                    <text
                      key={label}
                      x="300"
                      y={i * 88 + 44}
                      textAnchor="middle"
                      fill="currentColor"
                      className="text-foreground"
                      fontSize="15"
                      fontWeight={i === 0 || i === 5 ? "700" : "500"}
                    >
                      {label}
                    </text>
                  ))}
                  {/* Arrows */}
                  {[0, 1, 2, 3, 4].map((i) => (
                    <path
                      key={`arrow-${i}`}
                      d={`M300 ${i * 88 + 66} L300 ${(i + 1) * 88 + 10}`}
                      stroke="rgba(16,185,129,0.4)"
                      strokeWidth="2"
                      markerEnd="url(#arrowhead)"
                    />
                  ))}
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="6"
                      refX="8"
                      refY="3"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 8 3, 0 6"
                        fill="rgba(16,185,129,0.6)"
                      />
                    </marker>
                  </defs>
                </svg>
              </div>
            </section>

            {/* ===== SECTION 4: Q&A ===== */}
            <section id="key-questions" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                Key questions answered by the research
              </h2>
              <div className="space-y-8">
                {qaItems.map((item) => (
                  <div key={item.q}>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-foreground">
                      {item.q}
                    </h3>
                    <p className="text-foreground/80 leading-relaxed max-w-[75ch]">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* ===== SECTION 5: BANGLADESH ===== */}
            <section id="bangladesh" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Why this matters for Bangladesh
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch]">
                <p>Bangladesh sits at a strategic fork.</p>
                <p>
                  One path is passive adoption: use foreign AI tools, rely on
                  foreign APIs, remain concentrated in routine digital labor, and
                  watch more margin leak outward over time. That creates
                  dependency.
                </p>
                <p>
                  The other path is strategic orchestration: move talent from
                  routine execution toward workflow design, localized AI
                  solutions, SME automation, and regional software value
                  creation. That requires stronger AI literacy, compute access,
                  startup capital, institutional clarity, and practical adoption
                  capacity.
                </p>
                <p>
                  The point is not that Bangladesh must build everything from
                  scratch. The point is that it cannot stay structurally
                  downstream forever without paying for that dependency in
                  margin, sovereignty, and long-run competitiveness.
                </p>
              </div>
            </section>

            {/* ===== SECTION 6: MY VIEW ===== */}
            <section id="my-view" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                My view
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch]">
                <p>
                  I wrote this paper because most AI discourse still
                  underestimates where the real shift is happening.
                </p>
                <p>
                  The loudest conversations are still about prompts,
                  productivity boosts, and whether AI replaces this or that task.
                  Those matter, but they are not the deepest layer. The deeper
                  layer is coordination: who designs systems, who controls
                  workflows, who captures the rent, and who becomes structurally
                  dependent on infrastructure they do not own.
                </p>
                <p>
                  What I believe will matter most over the next decade is not
                  just AI adoption, but AI orchestration capacity. The winners
                  will not simply be the people or nations using tools first.
                  They will be the ones who design, integrate, govern, and
                  compound intelligent systems better than everyone else.
                </p>
              </div>
            </section>

            {/* ===== SECTION 7: INTEGRITY ===== */}
            <section id="research-integrity" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Research integrity
              </h2>
              <div className="space-y-4 text-foreground/60 text-sm leading-relaxed max-w-[75ch]">
                <p>
                  <strong className="text-foreground/80">
                    Declaration of Interest:
                  </strong>{" "}
                  The author declares no financial or personal relationships that
                  could have appeared to influence the work reported in this
                  paper.
                </p>
                <p>
                  <strong className="text-foreground/80">
                    Ethics Approval:
                  </strong>{" "}
                  This study is conceptual and theoretical in nature and did not
                  involve human participants, personal data, or experimental
                  interventions. Ethical approval was therefore not required.
                </p>
                <p>
                  <strong className="text-foreground/80">
                    Funder Statement:
                  </strong>{" "}
                  This research was conducted independently and received no
                  external financial support.
                </p>
              </div>
            </section>

            {/* ===== CITATION BLOCK ===== */}
            <section className="mb-16">
              <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                  Suggested Citation
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed max-w-[75ch]">
                  Islam Afraim, Rizwanul, Agentic AI as Coordination
                  Infrastructure Technology: Structural Implications for Firms,
                  Growth, and Economic Divergence (February 14, 2026). Available
                  at SSRN:{" "}
                  <a
                    href="https://ssrn.com/abstract=6236898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://ssrn.com/abstract=6236898
                  </a>{" "}
                  or{" "}
                  <a
                    href="http://dx.doi.org/10.2139/ssrn.6236898"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    http://dx.doi.org/10.2139/ssrn.6236898
                  </a>
                </p>
              </div>
            </section>

            {/* ===== RELATED READING ===== */}
            <section id="related-reading" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">
                Related reading
              </h2>
              <div className="grid gap-4">
                <Link
                  href="/blog/why-agentic-ai-is-not-just-automation"
                  className="group p-5 rounded-xl bg-secondary/20 border border-foreground/5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        Why Agentic AI Is Not Just Automation
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/blog/the-real-economic-shift-behind-ai-is-coordination-not-just-productivity"
                  className="group p-5 rounded-xl bg-secondary/20 border border-foreground/5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        The Real Economic Shift Behind AI Is Coordination
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>

                <Link
                  href="/blog/why-bangladesh-risks-becoming-an-ai-consuming-economy"
                  className="group p-5 rounded-xl bg-secondary/20 border border-foreground/5 hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <BookOpen className="w-5 h-5 text-primary shrink-0" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        Why Bangladesh Risks Becoming an AI-Consuming Economy
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                  </div>
                </Link>
              </div>
            </section>

            {/* ===== FINAL CTA ===== */}
            <section className="mb-16 pb-12 border-b border-foreground/5">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://ssrn.com/abstract=6236898"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
                >
                  Read full research on SSRN
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </section>
          </article>

          {/* ===== Sticky TOC sidebar (desktop only) ===== */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Table of contents"
              className="sticky top-28 space-y-1"
            >
              <h3 className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">
                On this page
              </h3>
              {tocItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-sm text-foreground/50 hover:text-primary py-1 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>
        </div>
      </div>
    </main>
  );
}
