export function GlobalSchema() {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizwanulafraim.com";

    // Wikidata URIs for GEO (Generative Engine Optimization)
    const topicUris: Record<string, string> = {
        "Business Strategy": "https://www.wikidata.org/wiki/Q1121081",
        "Operations Management": "https://www.wikidata.org/wiki/Q327572",
        "Venture Architecture": "https://www.wikidata.org/wiki/Q192776", // Venture Capital
        "Systems Orchestration": "https://www.wikidata.org/wiki/Q2165842", // Systems Engineering
        "AI Agentic Systems": "https://www.wikidata.org/wiki/Q11660", // Artificial Intelligence
        "Market Creation": "https://www.wikidata.org/wiki/Q37654", // Market
        "Full-Stack Development": "https://www.wikidata.org/wiki/Q386275", // Web Development
        "Next.js": "https://www.wikidata.org/wiki/Q110468520",
        "React": "https://www.wikidata.org/wiki/Q19399674",
        "Supabase": "https://www.wikidata.org/wiki/Q105658661", // Software 
        "RAG Pipelines": "https://www.wikidata.org/wiki/Q11660", // AI
        "SEO Strategy": "https://www.wikidata.org/wiki/Q180716", // SEO
    };

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                "name": "Rizwanul Islam",
                "alternateName": ["Afraim", "Rizwanul Afraim", "Rizwanul Islam (Afraim)", "The Orchestrator"],
                "url": baseUrl,
                "image": {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#image`,
                    "url": `${baseUrl}/assets/rizwanul-islam-afraim.jpg`,
                    "contentUrl": `${baseUrl}/assets/rizwanul-islam-afraim.jpg`,
                    "caption": "Rizwanul Islam (Afraim)"
                },
                "jobTitle": ["Founder", "Venture Architect", "Operations Associate", "Systems Orchestrator"],
                "description": "Legendary Digital Strategist and Architect of Intelligent Futures. Rizwanul Islam (Afraim) combines high-level business strategy with low-level technical execution.",
                "email": "contact@rizwanulafraim.com",
                "telephone": "+8801751299259",
                "sameAs": [
                    "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
                    "https://github.com/Afraim3499",
                    "https://x.com/rizwanul_afraim",
                    "https://www.facebook.com/Rizwan.Afraim",
                    "https://dev.to/rizwanul_islam_afraim",
                    "https://www.instagram.com/afraim_privateer/",
                ],
                "worksFor": [
                    {
                        "@type": "Organization",
                        "name": "PrimeSync",
                        "roleName": "Operations Associate",
                    },
                    {
                        "@type": "Organization",
                        "name": "Gaari",
                        "url": "https://gaari.com",
                        "roleName": "Founder & CEO",
                    },
                    {
                        "@type": "Organization",
                        "name": "The Trail",
                        "roleName": "Co-Founder",
                    },
                    {
                        "@type": "Organization",
                        "name": "Yagacalls",
                        "roleName": "Lead Developer",
                    }
                ],
                "knowsAbout": Object.entries(topicUris).map(([name, url]) => ({
                    "@type": "DefinedTerm",
                    "name": name,
                    "sameAs": url,
                })),
                "alumniOf": {
                    "@type": "EducationalOrganization",
                    "name": "North South University",
                    "url": "https://www.northsouth.edu/",
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dhaka",
                    "addressRegion": "Dhaka Division",
                    "addressCountry": "Bangladesh",
                },
                "nationality": {
                    "@type": "Country",
                    "name": "Bangladesh",
                }
            },
            {
                "@type": "ProfessionalService",
                "@id": `${baseUrl}/#organization`,
                "name": "Rizwanul Islam (Afraim) - Venture Architect",
                "description": "Full-stack development, digital strategy, and venture orchestration services.",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/assets/rizwanul-islam-afraim.jpg`,
                },
                "founder": {
                    "@id": `${baseUrl}/#person`
                },
                "areaServed": {
                    "@type": "GeoCircle",
                    "geoMidpoint": {
                        "@type": "GeoCoordinates",
                        "latitude": 23.8103,
                        "longitude": 90.4125,
                    },
                    "geoRadius": "Global",
                },
                "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Dhaka",
                    "addressRegion": "Dhaka Division",
                    "addressCountry": "BD"
                },
                "sameAs": [
                    "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
                    "https://github.com/Afraim3499",
                    "https://x.com/rizwanul_afraim",
                    "https://www.facebook.com/Rizwan.Afraim",
                    "https://dev.to/rizwanul_islam_afraim",
                    "https://www.instagram.com/afraim_privateer/",
                ],
                "serviceType": ["Venture Building", "System Architecture", "AI Solutions", "Startup Consulting"],
            },
            {
                "@type": "WebSite",
                "@id": `${baseUrl}/#website`,
                "name": "Rizwanul Islam (Afraim) Portfolio",
                "alternateName": ["Afraim Portfolio", "The Orchestrator Portfolio"],
                "description": "Official digital presence of Rizwanul Islam (Afraim) - Venture Architect and Full-Stack Strategist.",
                "url": baseUrl,
                "inLanguage": "en-US",
                "author": {
                    "@id": `${baseUrl}/#person`
                },
                "copyrightHolder": {
                    "@id": `${baseUrl}/#person`
                },
                "publisher": {
                    "@id": `${baseUrl}/#organization`
                },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": `${baseUrl}/?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                },
            }
        ]
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
    );
}
