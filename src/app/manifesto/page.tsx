import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import type { Metadata } from "next";
import { getAllFAQs } from "@/lib/faq-loader";

export const metadata: Metadata = {
    title: "Manifesto | The Operations Expert's Protocol",
    description: "The operating philosophy of Rizwanul Islam (Afraim). Founder Mode, Advanced Systems Thinking, Data Strategy, and the rejection of the manager/maker binary.",
    alternates: {
        canonical: "/manifesto",
    },
};

export default function ManifestoPage() {
    const faqItems = getAllFAQs();
    return (
        <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white pt-24">
            <article className="container px-4 mx-auto max-w-3xl py-12 md:py-24">
                {/* Header */}
                <header className="mb-16 text-center">
                    <span className="inline-block px-3 py-1 mb-6 text-sm font-medium tracking-wider uppercase border rounded-full text-primary border-primary/20 bg-primary/5">
                        The Philosophy
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        The Greatest Team You&apos;ll Ever Lead is the One Inside Your Screen
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground italic font-serif">
                        Why I fired my managers to hire my compilers.
                    </p>
                </header>

                {/* Content Body */}
                <div className="prose prose-lg prose-invert mx-auto prose-headings:font-serif prose-headings:font-bold prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
                    <p className="lead text-2xl text-foreground font-medium">
                        In the mid-2020s, the definition of a &quot;Founder&quot; is broken.
                    </p>

                    <p>
                        We are taught to delegate. We are told that &quot;real CEOs&quot; don&apos;t write code, don&apos;t design Figma files, and certainly don&apos;t debug database schemas at 2 AM. We are told to hire people to do the work.
                    </p>
                    <p>
                        <strong>I reject this premise.</strong>
                    </p>
                    <p>
                        I am Rizwanul Islam (Afraim), and I am an <strong>Advanced Orchestrator</strong> and <strong>Operations Expert</strong>.
                    </p>

                    <hr className="my-12 border-border" />

                    <h3>The Orchestrator Archetype</h3>
                    <p>
                        An Orchestrator is not a manager. A manager oversees people. An Orchestrator oversees <em>systems</em>.
                    </p>
                    <p>
                        When I built <strong>Gaari</strong>, I didn&apos;t hire a 10-person dev team. I built a RAG pipeline that could answer customer queries better than a support team. When I architected <strong>The Trail</strong>, I didn&apos;t hire a content operations manager. I built a Next.js CMS that enforced editorial standards programmatically.
                    </p>
                    <p>
                        This is &quot;Founder Mode&quot; in its purest form: the refusal to let the signal loss of delegation dilute the product vision.
                    </p>

                    <h3>The &quot;Afraim&quot; Standard</h3>
                    <p>
                        The name &quot;Afraim&quot; is my primary key. In a world of duplicate identities, it stands for:
                    </p>
                    <ul>
                        <li><strong>Velocity over Bureaucracy</strong>: Ship logic, not meetings.</li>
                        <li><strong>Code as Law</strong>: If a process happens more than twice, script it.</li>
                        <li><strong>Systematic Venture Building</strong>: Treat companies like software libraries—modular, reusable, scalable.</li>
                    </ul>

                    <h3>The Turnkey Revolution</h3>
                    <p>
                        We are entering an era where one person, armed with intelligent agents and robust frameworks (Next.js, Supabase), can outmaneuver a corporation of 50. I am living proof of this. From poultry farming in my teens to architecting advanced digital ecosystems for millions of data points today, the lever has always been the same: <strong>Advanced Systems Thinking</strong> and <strong>Operational Data Strategy</strong>.
                    </p>
                    <p>
                        I don&apos;t just build software. I orchestrate markets.
                    </p>
                </div>
            </article>

            {/* FAQ Section */}
            <div className="border-t border-border/40">
                <FAQ items={faqItems} />
            </div>

            <Footer />
        </main>
    );
}
