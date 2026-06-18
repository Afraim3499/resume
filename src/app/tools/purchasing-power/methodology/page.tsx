import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import { markdownToHtml } from "@/lib/markdown";
import { SITE_URL } from "@/lib/purchasing-power/seo";

export const metadata: Metadata = {
  title: "Purchasing Power Roadmap Methodology",
  description:
    "How the Purchasing Power Roadmap uses official historical price index data for supported countries.",
  alternates: {
    canonical: `${SITE_URL}/tools/purchasing-power/methodology`,
  },
  openGraph: {
    title: "Purchasing Power Roadmap Methodology",
    description:
      "How the Purchasing Power Roadmap uses official historical price index data for supported countries.",
    url: `${SITE_URL}/tools/purchasing-power/methodology`,
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Purchasing Power Roadmap Methodology",
    description:
      "How official price index data is used for supported purchasing power estimates.",
  },
};

export default async function PurchasingPowerMethodologyPage() {
  const markdown = readFileSync(
    join(process.cwd(), "src", "content", "purchasing-power", "methodology.md"),
    "utf8"
  );
  const html = await markdownToHtml(markdown);

  return (
    <main className="content-section purchasing-power-methodology">
      <article
        className="content-prose"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
