import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, BookOpen, ArrowRight, ChevronDown } from "lucide-react";

export const metadata: Metadata = {
  title: "RMG Skill Mismatch & Managerial Shortages Research | Rizwanul Islam Afraim",
  description:
    "Published SSRN research by Rizwanul Islam Afraim on graduate unemployment, credential inflation, skills mismatch, and expatriate managerial premium inside Bangladesh's garments exports.",
  alternates: {
    canonical:
      "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg",
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
    title: "Skill Mismatch and Managerial Shortages in Bangladesh's RMG Industry Research",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim on ready-made garment exports, credential inflation, expatriate premium, and labor market policy in Bangladesh.",
    url: "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg",
    siteName: "Rizwanul Afraim",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skill Mismatch and Managerial Shortages in Bangladesh's RMG Industry Research",
    description:
      "A published SSRN research paper by Rizwanul Islam Afraim on ready-made garment exports, credential inflation, expatriate premium, and labor market policy in Bangladesh.",
  },
};

/* ---------- JSON-LD ---------- */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ScholarlyArticle",
      "@id":
        "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg#article",
      headline:
        "Skill Mismatch and Managerial Shortages in Bangladesh's RMG Industry Research",
      description:
        "Published SSRN research by Rizwanul Islam Afraim on skills mismatch, graduate unemployment, credential inflation, and expatriate reliance in the ready-made garments sector.",
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
      datePublished: "2026-04-10",
      dateCreated: "2026-02-19",
      dateModified: "2026-04-10",
      inLanguage: "en",
      keywords: [
        "Ready-Made Garment (RMG) Industry",
        "Credential Inflation",
        "Expatriate Premium",
        "Labor Economics",
        "Higher Education Policy",
        "Industry-Academia Linkage",
        "Bangladesh Labor Market",
        "Skill Mismatch",
      ],
      about: [
        "Bangladesh Ready-Made Garments exports",
        "Managerial talent shortages",
        "Graduate credentials inflation",
        "Expatriate hiring premium",
        "Mixed-methods sequential study",
      ],
      isBasedOn: [
        "https://ssrn.com/abstract=6270999",
        "http://dx.doi.org/10.2139/ssrn.6270999",
      ],
      url: "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg",
      mainEntityOfPage:
        "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg",
    },
    {
      "@type": "BreadcrumbList",
      "@id":
        "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg#breadcrumb",
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
          name: "RMG Skill Mismatch Research",
          item: "https://www.rizwanulafraim.com/research/skill-mismatch-managerial-shortages-rmg",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.rizwanulafraim.com/#person",
      name: "Rizwanul Islam Afraim",
      url: "https://www.rizwanulafraim.com/",
      jobTitle: "Systems Architect & Operations Builder",
      sameAs: ["https://www.rizwanulafraim.com/"],
    },
  ],
};

/* ---------- TOC items ---------- */
const tocItems = [
  { id: "abstract", label: "Research abstract" },
  { id: "methodology", label: "Proposed methodology" },
  { id: "key-dimensions", label: "Key dimensions" },
  { id: "suggested-reforms", label: "Reforms & solutions" },
  { id: "research-integrity", label: "Research integrity" },
  { id: "suggested-citation", label: "Suggested citation" },
];

/* ========== PAGE ========== */
export default function RMGResearchPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===== HERO ===== */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_70%)] pointer-events-none" />

        <div className="container px-4 mx-auto max-w-4xl relative z-10">
          <Breadcrumbs
            items={[
              { label: "Research", href: "/research" },
              { label: "RMG Skills Mismatch" },
            ]}
          />

          {/* Eyebrow */}
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Labor Economics Paper
          </span>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-tight max-w-[75ch]">
            Skill Mismatch and Managerial Shortages in Bangladesh&apos;s RMG Industry
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-[75ch] mb-8">
            An SSRN academic paper investigating the economic paradox of high graduate unemployment alongside a critical shortage of localized managerial talent in Bangladesh&apos;s US$47 billion ready-made garment exports.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <a
              href="https://ssrn.com/abstract=6270999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
            >
              Read full paper on SSRN
              <ExternalLink className="w-4 h-4" />
            </a>
            <a
              href="#abstract"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-secondary/50 border border-foreground/10 text-foreground font-medium hover:bg-secondary transition-colors"
            >
              Read research details
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Byline block */}
          <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5 max-w-xl">
            <p className="font-semibold text-foreground mb-1">
              Rizwanul Islam Afraim —{" "}
              <span className="text-primary">SSRN published researcher</span>
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed">
              Independent Researcher
              <br />
              Published on SSRN
              <br />
              Date Written: February 19, 2026
              <br />
              Posted: April 10, 2026
            </p>
          </div>

          {/* Keywords block */}
          <div className="mt-6 flex flex-wrap gap-2 max-w-xl">
            {[
              "Ready-Made Garment (RMG) Industry",
              "Credential Inflation",
              "Expatriate Premium",
              "Labor Economics",
              "Higher Education Policy",
              "Industry-Academia Linkage",
              "Bangladesh Labor Market",
              "Skill Mismatch"
            ].map((keyword) => (
              <span key={keyword} className="px-3 py-1 rounded-full bg-secondary/40 border border-foreground/5 text-xs text-foreground/60 font-medium">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CONTENT GRID ===== */}
      <div className="container px-4 mx-auto max-w-4xl relative">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-12">
          {/* Main content column */}
          <article className="min-w-0">
            {/* ===== ABSTRACT ===== */}
            <section id="abstract" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Research Abstract
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch] select-text">
                <p>
                  Despite the explosive growth of Bangladesh&apos;s ready-made garment (RMG) industry—comprising over 4,600 factories and yielding approximately US$47 billion in FY2023 exports—the sector is constrained by an acute shortage of managerial talent.
                </p>
                <p>
                  Concurrently, the national higher education system graduates over 700,000 students yearly, resulting in significant credential inflation and a pronounced skills mismatch. Consequently, RMG firms increasingly depend on expensive foreign professionals to fill critical technical and managerial roles.
                </p>
                <p>
                  This research outlines an explanatory sequential mixed-methods methodology to investigate this paradox. Utilizing secondary time-series data, HR manager surveys, and qualitative interviews with key stakeholders, this study seeks to quantify the graduate-to-demand gap, pinpoint specific soft and technical skill deficiencies, and calculate the economic impact of expatriate reliance.
                </p>
                <p>
                  The anticipated findings will inform evidence-based policy recommendations, emphasizing urgent curriculum reform and structured industry-academia partnerships.
                </p>
              </div>
            </section>

            {/* ===== METHODOLOGY ===== */}
            <section id="methodology" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Explanatory Sequential Methodology
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch]">
                <p>
                  The paper implements a dual-phase research model to dissect the managerial talent gap:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong>Phase 01 — Quantitative Mapping:</strong> Broad-scale surveys of human resource executives across major garment production hubs, coupled with statistical analysis of graduate numbers and university majors to calculate the baseline discrepancy indices.
                  </li>
                  <li>
                    <strong>Phase 02 — Qualitative Interviews:</strong> Detailed, semi-structured coordination discussions with university deans, trade union representatives, and factory managing directors to explore institutional hurdles.
                  </li>
                </ul>
              </div>
            </section>

            {/* ===== KEY DIMENSIONS ===== */}
            <section id="key-dimensions" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                The Three Structural Friction Points
              </h2>
              <div className="grid gap-6">
                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-500/5">
                  <h3 className="text-base font-bold mb-2 text-blue-600">01 / Credential Inflation</h3>
                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                    Unregulated growth in humanities and general science certifications leads to massive numbers of degree holders who lack the specific engineering, operations, supply chain, and language coordinates demanded by international retail platforms.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5">
                  <h3 className="text-base font-bold mb-2 text-[#0F5132]">02 / The Expatriate Premium</h3>
                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                    Due to local mid-management shortages, factories pay significant premiums to import operational talent from neighboring sourcing regions. This leads to substantial currency outflows and creates organizational silos.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-500/5">
                  <h3 className="text-base font-bold mb-2 text-amber-700">03 / Industry-Academia Disconnect</h3>
                  <p className="text-xs md:text-sm text-foreground/80 leading-relaxed">
                    University syllabi are highly academic and slow to update. Crucial industry coordinates like modern compliance reporting, digital design pipelines, and agile operations management are rarely integrated into coursework.
                  </p>
                </div>
              </div>
            </section>

            {/* ===== SUGGESTED REFORMS ===== */}
            <section id="suggested-reforms" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Strategic System Solutions
              </h2>
              <div className="space-y-4 text-foreground/80 leading-relaxed max-w-[75ch]">
                <p>
                  To bridge this talent gap, the paper proposes three policy actions:
                </p>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>
                    <strong>Modular Compliance & Supply Chain Minors:</strong> Universities in garment production regions must partner with BGMEA to design micro-credential programs focused on operational management.
                  </li>
                  <li>
                    <strong>Expatriate Substitution Targets:</strong> Providing tax incentives for factories that actively develop internal mid-management talent pipelines and transfer expertise through local mentorship programs.
                  </li>
                  <li>
                    <strong>Structured Internships:</strong> Mandating structured internships during university terms so graduates exit with practical operational knowledge.
                  </li>
                </ol>
              </div>
            </section>

            {/* ===== INTEGRITY ===== */}
            <section id="research-integrity" className="mb-16 scroll-mt-24">
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                Research Integrity &amp; Disclosures
              </h2>
              <div className="space-y-4 text-foreground/60 text-xs leading-relaxed max-w-[75ch]">
                <p>
                  <strong>Declaration of Interest:</strong> The author declares that there is no conflict of interest regarding the publication of this paper. The research was conducted in the absence of any commercial or financial relationships that could be construed as a potential conflict of interest.
                </p>
                <p>
                  <strong>Ethics Approval:</strong> This research involves human participants through surveys and semi-structured interviews. Informed consent will be obtained from all participants prior to their involvement, including explicit consent for audio-recording interviews. All data will be anonymized and handled in accordance with standard academic ethical guidelines.
                </p>
                <p>
                  <strong>Funder Statement:</strong> This research received no specific grant from any funding agency in the public, commercial, or not-for-profit sectors.
                </p>
                <p>
                  <strong>JEL Classification:</strong> J23, J24, I23, L67, O15
                </p>
              </div>
            </section>

            {/* ===== SUGGESTED CITATION ===== */}
            <section id="suggested-citation" className="mb-16">
              <div className="p-6 rounded-xl bg-secondary/20 border border-foreground/5">
                <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-3">
                  Suggested Citation
                </h3>
                <p className="text-xs md:text-sm text-foreground/70 leading-relaxed max-w-[75ch] select-all font-mono bg-[#FAF8F3] p-4 rounded border border-[#0F5132]/6">
                  Islam Afraim, Rizwanul, Skill Mismatch and Managerial Shortages in Bangladesh&apos;s RMG Industry Research (February 19, 2026). Available at SSRN: https://ssrn.com/abstract=6270999 or http://dx.doi.org/10.2139/ssrn.6270999
                </p>
              </div>
            </section>
          </article>

          {/* ===== Sticky TOC sidebar ===== */}
          <aside className="hidden lg:block">
            <nav aria-label="Table of contents" className="sticky top-28 space-y-1">
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
