import type { Metadata } from "next";
import { About } from "@/components/About";
import { MyStory } from "@/components/MyStory";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionDivider } from "@/components/SectionDivider";

export const metadata: Metadata = {
  title: "About Rizwanul Islam Afraim",
  description:
    "Rizwanul Islam Afraim is a Dhaka-based marketing and sales operations professional, product founder, and systems builder working across business operations, product architecture, automation, and digital ventures.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/about",
  },
  openGraph: {
    title: "About Rizwanul Islam Afraim - Systems Builder",
    description:
      " Dhaka-based marketing and sales operations strategist, product founder, and systems architect optimizing operations.",
  },
};

export default function AboutPage() {
  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pt-24 pb-16">
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Navigation Breadcrumbs */}
        <div className="mb-6 flex justify-start pl-2 print:hidden">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "About" },
            ]}
          />
        </div>

        {/* Section Wrapper */}
        <div className="space-y-6">
          <About />
          <SectionDivider variant="morph" className="text-[#0F5132]/10" />
          <MyStory />
        </div>
      </div>
    </main>
  );
}
