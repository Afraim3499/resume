import type { Metadata } from "next";
import { Projects } from "@/components/Projects";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Projects | Rizwanul Islam Afraim",
  description:
    "Explore projects, ventures, platforms, and systems built by Rizwanul Islam Afraim across travel, media, CRM, e-commerce, SEO, automation, and product architecture.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/projects",
  },
  openGraph: {
    title: "Projects & Ventures Showcase | Rizwanul Islam Afraim",
    description:
      "A complete showcase of technical innovation and systems architecture built by Rizwanul Islam Afraim.",
  },
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
