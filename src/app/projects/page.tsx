import type { Metadata } from "next";
import { Projects } from "@/components/Projects";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { buildOGMetadata } from "@/lib/og-metadata";

export const metadata: Metadata = {
  title: "Projects — Built From Idea to Execution | Rizwanul Afraim",
  description: "Explore platforms, dashboards, CRM tools, booking systems, media products, and automation workflows built from idea to execution.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/projects",
  },
  ...buildOGMetadata("projects", {
    title: "Projects — Built From Idea to Execution | Rizwanul Afraim",
    description: "Explore platforms, dashboards, CRM tools, booking systems, media products, and automation workflows built from idea to execution.",
    url: "https://www.rizwanulafraim.com/projects",
  }),
};

export default function ProjectsIndexPage() {
  return (
    <main className="bg-background min-h-screen pt-24 pb-16">
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex justify-start pl-2 print:hidden">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Projects" },
            ]}
          />
        </div>

        {/* Dynamic Project Filter Grid Component */}
        <Projects />
      </div>
    </main>
  );
}
