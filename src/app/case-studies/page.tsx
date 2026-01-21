import { CaseStudyCard } from "@/components/CaseStudyCard";
import { getAllCaseStudies } from "@/lib/case-study-loader";
import type { Metadata } from "next";
import type { CaseStudy } from "@/data/case-studies";

export const metadata: Metadata = {
  title: "Case Studies | Engineering Scalable Platform Architecture",
  description: "Deep dive case studies on building Advanced Systems, Gaari's booking engine, and Data Operations strategies. Engineering scale for production ventures.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllCaseStudies();
  return (
    <main className="bg-background min-h-screen text-foreground">
      <div className="container px-4 mx-auto max-w-6xl py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Engineering <span className="text-gradient">Scalable Platforms</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Deep dives into advanced systems, operational logic, and the architecture behind production-grade platform ventures.
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((caseStudy: CaseStudy, index: number) => (
              <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-foreground/70 text-lg mb-4">Case studies coming soon!</p>
            <p className="text-foreground/60">Detailed project analyses will be available here.</p>
          </div>
        )}
      </div>
    </main>
  );
}

