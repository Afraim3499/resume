import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Cookie Policy | Rizwanul Islam Afraim",
  description: "Information regarding cookie use, telemetry, and browser configurations on rizwanulafraim.com.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/cookies",
  },
};

export default function CookiesPage() {
  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pt-32 pb-24">
      <div className="container px-4 mx-auto max-w-3xl relative z-10">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cookie Policy" },
          ]}
        />

        <article className="mt-8 prose prose-lg max-w-none prose-headings:font-serif prose-headings:font-bold prose-p:text-[#5F655F] prose-strong:text-[#171717] prose-a:text-[#0F5132] prose-a:no-underline hover:prose-a:underline prose-hr:border-[#0F5132]/10">
          <header className="mb-12 border-b border-[#0F5132]/15 pb-8">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#171717] tracking-tight mb-4">
              Cookie Policy
            </h1>
            <p className="text-[#5F655F] text-sm font-mono">
              Last Updated: May 27, 2026
            </p>
          </header>

          <section className="space-y-8">
            <p className="lead text-lg text-[#171717] font-medium font-serif leading-relaxed">
              This cookie disclosure details how cookies and basic web storage technologies are used on this portfolio website.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              1. What Are Cookies?
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide basic structural preferences.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              2. Cookies &amp; Storage Used on This Site
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              This website prioritizes performance and privacy. The use of cookies is restricted:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#5F655F]">
              <li><strong>Essential Storage:</strong> Local storage and session variables may be used to handle essential functions, such as caching layout themes, managing local variables in client calculators, or preserving state variables. These do not contain personal tracking data.</li>
              <li><strong>Performance &amp; Analytics:</strong> basic serverless analytics (such as Vercel Web Analytics) may be active. These use telemetry identifiers rather than tracking profiles to measure overall page counts, and they do not store user-identifiable data.</li>
              <li><strong>Marketing &amp; Retargeting:</strong> This website does not run marketing pixels, Facebook ads tracking scripts, or ad networks that store behavioral profiles across third-party networks.</li>
            </ul>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              3. Third-Party Services
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              When visiting third-party links or calendars linked on this site (such as Google Calendar widgets), these external providers may set their own browser cookies. I do not govern or access these third-party trackers.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              4. Controlling Cookies
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              You can configure your browser to block cookies or notify you when they are set. Deleting cookies will not break your ability to browse the primary pages of this website, though local states inside user tools (such as wealth inputs) may reset.
            </p>

            <h2 className="text-2xl font-serif font-bold text-[#171717] mt-8 mb-4">
              5. Contact Cookie Support
            </h2>
            <p className="text-sm text-[#5F655F] leading-relaxed">
              If you have any questions regarding data storage on this portfolio, contact:
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
