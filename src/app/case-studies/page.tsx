import { CaseStudyCard } from "@/components/CaseStudyCard";
import { caseStudies } from "@/data/case-studies";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Detailed case studies showcasing problem-solving, technical implementation, and measurable results from production projects.",
};

export default function CaseStudiesPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <div className="container px-4 mx-auto max-w-6xl py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Case <span className="text-gradient">Studies</span>
          </h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Deep dives into real projects: problems solved, solutions implemented, and results achieved.
          </p>
        </div>

        {caseStudies.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((caseStudy, index) => (
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

