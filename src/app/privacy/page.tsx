import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy | Rizwanul Islam Afraim",
  description: "Privacy policy and information collection practices for rizwanulafraim.com. Transparency in data operations, systems, and communication.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pt-32 pb-24">
      <div className="container px-4 mx-auto max-w-3xl relative z-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <article className="mt-8 prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-[#5F655F] prose-strong:text-[#171717] prose-a:text-[#0F5132] prose-a:no-underline hover:prose-a:underline prose-hr:border-[#0F5132]/10">
          <header className="mb-12 border-b border-[#0F5132]/15 pb-8">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight mb-4">
              Privacy Policy
            </h1>
            <p className="text-[#5F655F] text-sm font-mono">
              Last Updated: May 27, 2026
            </p>
          </header>

          <section className="space-y-8">
            <p className="lead text-lg text-[#171717] font-medium font-serif leading-relaxed">
              Transparency, efficiency, and structural integrity are the foundation of my systems work. This policy details how data is handled on this site.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              1. Information Collection
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              This site is designed as a portfolio and professional systems showcase. Information collection is minimal:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F655F]">
              <li><strong>Contact Submissions:</strong> If you use the contact form, submit a leverage finder inquiry, or send an email, I collect your name, email address, company name, and message content to respond to your inquiry.</li>
              <li><strong>Analytics Data:</strong> If configured, third-party analytics services (such as Vercel Web Analytics) may collect basic, anonymous telemetry regarding your visit (e.g., page views, approximate geographic region, browser type) to measure performance and readability.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              2. Data Use &amp; Storage
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              Information submitted via contact forms is utilized solely to evaluate your business requirements and communicate about potential systems engagements. I do not store your data in transactional sales lists or sell/lease personal information to third parties.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              3. Third-Party Integrations
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              This website is hosted on modern cloud architectures. External scheduling utilities (such as Google Calendar links) or code repositories (GitHub) rendered on the site operate under their own respective privacy disclosures.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              4. Contact &amp; Inquiries
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              For any questions regarding this privacy statement or data safety, you can contact me directly at:
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
