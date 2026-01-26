import { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";
import { ResumeGraph } from "@/components/ResumeGraph";
import { allSkills } from "@/data/skills";
import { getWikidataUri } from "@/lib/wikidata-mapping";

export const metadata: Metadata = {
    title: "Resume | Rizwanul Islam - Advanced Venture Architect & Operations Expert",
    description: "Professional resume of Rizwanul Islam (Afraim). Advanced Venture Architect managing 1M+ data points and building scalable platform unicorns like Gaari.",
    alternates: {
        canonical: "/resume",
    },
    openGraph: {
        title: "Resume | Rizwanul Islam - Advanced Venture Architect",
        description: "Professional resume of Rizwanul Islam (Afraim). Operations Expert building scalable platform unicorns.",
    }
};

export default function ResumePage() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizwanulafraim.com";

    const resumeSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "mainEntity": {
            "@type": "Person",
            "@id": `${baseUrl}/#person`,
            "name": "Rizwanul Islam (Afraim)",
            "jobTitle": [
                "Venture Architect",
                "Fractional CTO",
                "Operations Strategist",
                "Full-Stack Engineer"
            ],
            "description": "Advanced Venture Architect bridging the gap between high-level business strategy and low-level technical execution.",
            "knowsAbout": allSkills.map(skill => ({
                "@type": "DefinedTerm",
                "name": skill.name,
                "sameAs": getWikidataUri(skill.name)
            })),
            "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "North South University",
                "sameAs": "https://www.wikidata.org/wiki/Q7056846"
            },
            "worksFor": [
                {
                    "@type": "Organization",
                    "name": "Gaari",
                    "url": "https://gaari.com",
                    "sameAs": "https://www.wikidata.org/wiki/Q11660" // Placeholder if no Wiki
                }
            ]
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(resumeSchema) }}
            />

            <main className="bg-background min-h-screen text-foreground pt-32 pb-12">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 animate-fade-in-up">
                            <span>Interactive Knowledge Graph</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6">
                            The Architecture of <span className="text-gradient">Experience</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            I don&apos;t just list tools. I build connected systems. Explore my technical neural network below.
                        </p>
                    </div>

                    {/* The Graph */}
                    <div className="mb-24">
                        <ResumeGraph />
                    </div>

                    {/* Traditional View (Below) */}
                    <ResumeView />
                </div>
            </main>
        </>
    );
}
