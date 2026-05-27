import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Use | Rizwanul Islam Afraim",
  description: "Terms of use, content disclaimers, and intellectual property conditions for rizwanulafraim.com.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pt-32 pb-24">
      <div className="container px-4 mx-auto max-w-3xl relative z-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Use" },
          ]}
        />

        <article className="mt-8 prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-[#5F655F] prose-strong:text-[#171717] prose-a:text-[#0F5132] prose-a:no-underline hover:prose-a:underline prose-hr:border-[#0F5132]/10">
          <header className="mb-12 border-b border-[#0F5132]/15 pb-8">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight mb-4">
              Terms of Use
            </h1>
            <p className="text-[#5F655F] text-sm font-mono">
              Last Updated: May 27, 2026
            </p>
          </header>

          <section className="space-y-8">
            <p className="lead text-lg text-[#171717] font-medium font-serif leading-relaxed">
              Welcome to the digital operations headquarters and systems portfolio of Rizwanul Islam Afraim. By browsing this website, you agree to these Terms of Use.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              1. Site Use &amp; Access
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              This site is provided strictly as a professional showcase of my platform architecture, sales operations methodologies, automation pipelines, and academic pre-print economic publications. Use of this site is for informational, non-commercial purposes.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              2. Intellectual Property
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              Unless otherwise indicated, all content, design architecture, system graphics, text copy, code blocks, and illustrations displayed on this website are the intellectual property of Rizwanul Islam Afraim. Commercial reproduction, redistribution, or modification of these assets without written permission is prohibited.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              3. Content &amp; Disclaimers
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              While I strive to keep all technical, operational, and research details accurate and updated, all information is provided on an &quot;as is&quot; basis. 
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F655F]">
              <li><strong>No Professional Advice:</strong> The blog articles, systems case studies, and research pre-prints published here represent theoretical models, software architecture options, and empirical economics research. They do not constitute formal legal, financial, tax, or investment advice.</li>
              <li><strong>External Resources:</strong> Links to external platforms, repositories, or databases are provided for research convenience. I hold no accountability for the content or availability of these external domains.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              4. Limitation of Liability
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              Rizwanul Islam Afraim shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to access, the content, calculations, or tools provided on this portfolio.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              5. Contact &amp; Terms Inquiries
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              For any questions or clarification regarding these terms, contact:
              <br />
              <a href="mailto:hello@rizwanulafraim.com" className="font-semibold text-[#0F5132] hover:underline mt-2 inline-block">
                hello@rizwanulafraim.com
              </a>
            </p>
          </section>
        </article>
      </div>
    </main>
  );
}
