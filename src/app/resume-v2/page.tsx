import { Metadata } from "next";
import { ResumeHero } from "@/components/resume-new/ResumeHero";
import { ProofChips } from "@/components/resume-new/ProofChips";
import { RoleFitSummary } from "@/components/resume-new/RoleFitSummary";
import { BestFitRoles } from "@/components/resume-new/BestFitRoles";
import { BrandExecutiveReadiness } from "@/components/resume-new/BrandExecutiveReadiness";
import { ProofOfExecution } from "@/components/resume-new/ProofOfExecution";
import { ExperienceTimeline } from "@/components/resume-new/ExperienceTimeline";
import { TechnicalEdge } from "@/components/resume-new/TechnicalEdge";
import { ProjectHighlights } from "@/components/resume-new/ProjectHighlights";
import { SkillsMatrix } from "@/components/resume-new/SkillsMatrix";
import { KnowledgeGraphSection } from "@/components/resume-new/KnowledgeGraphSection";
import { ResumePreviewSection } from "@/components/resume-new/ResumePreviewSection";
import { ResumeCTA } from "@/components/resume-new/ResumeCTA";

export const metadata: Metadata = {
  title: "Preview: Marketing Operations & Digital Brand Executive | Resume V2",
  description: "Preview version of the updated professional resume for Rizwanul Islam Afraim.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ResumeV2Page() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary/30">
      {/* 1. Role-focused Hero */}
      <ResumeHero />

      {/* 2. Proof Chips */}
      <ProofChips />

      {/* 3. Role Fit Summary */}
      <RoleFitSummary />

      {/* 4. Best-Fit Role Cards */}
      <BestFitRoles />

      {/* 5. Brand Executive Readiness */}
      <BrandExecutiveReadiness />

      {/* 6. Proof of Execution */}
      <ProofOfExecution />

      {/* 7. Professional Experience */}
      <ExperienceTimeline />

      {/* 8. Technical Edge: AI-Assisted Full-Stack Product Building */}
      <TechnicalEdge />

      {/* 9. Project Highlights */}
      <ProjectHighlights />

      {/* 10. Skills Matrix */}
      <SkillsMatrix />

      {/* 11. Repositioned Knowledge Graph */}
      <KnowledgeGraphSection />

      {/* 12. Resume Preview / Download CV */}
      <ResumePreviewSection />

      {/* 13. Contact CTA */}
      <ResumeCTA />
    </main>
  );
}
