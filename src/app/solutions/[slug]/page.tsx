import { Metadata } from "next";
import { notFound } from "next/navigation";
import { solutions, getSolutionBySlug } from "@/data/solutions";
import { SolutionLanding } from "@/components/SolutionLanding";
import { getOGImage } from "@/lib/og-metadata";

interface SolutionPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return solutions.map((solution) => ({
        slug: solution.slug,
    }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);
    if (!solution) return {};

    const ogTitle = `${solution.title} — Systems Built for Execution`;
    const ogDesc = solution.metaDescription || "Systems built for teams that need clearer sales workflows, marketing operations, product execution, automation, and search visibility.";
    const { openGraphImage, twitterImage } = getOGImage("solutions");

    return {
        title: solution.metaTitle,
        description: solution.metaDescription,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            type: "website",
            locale: "en_US",
            url: `https://www.rizwanulafraim.com/solutions/${solution.slug}`,
            siteName: "Rizwanul Islam Afraim",
            images: [openGraphImage],
        },
        twitter: {
            card: "summary_large_image",
            title: ogTitle,
            description: ogDesc,
            images: [twitterImage],
            creator: "@rizwanul_afraim",
        },
        alternates: {
            canonical: `https://www.rizwanulafraim.com/solutions/${solution.slug}`,
        },
    };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
    const { slug } = await params;
    const solution = getSolutionBySlug(slug);

    if (!solution) {
        notFound();
    }

    // High-Precision Knowledge Graph Loop
    // This links this specific page's Service back to the global Person/Org
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `https://www.rizwanulafraim.com/solutions/${solution.slug}#service`,
        "name": solution.title,
        "description": solution.subtitle,
        "provider": {
            "@id": "https://www.rizwanulafraim.com/#organization"
        },
        "brand": {
            "@id": "https://www.rizwanulafraim.com/#person"
        },
        "url": `https://www.rizwanulafraim.com/solutions/${solution.slug}`,
        "serviceType": solution.heroTagline,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".hero-title", ".hero-subtitle"]
        },
        "offers": {
            "@type": "Offer",
            "availability": "https://schema.org/InStock",
            "seller": {
                "@id": "https://www.rizwanulafraim.com/#organization"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(serviceSchema),
                }}
            />
            <SolutionLanding solution={solution} />
        </>
    );
}
