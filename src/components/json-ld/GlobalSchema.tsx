import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";

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
        "CRM Architecture": "https://www.wikidata.org/wiki/Q327572", // Operations/CRM
        "SaaS Strategy": "https://www.wikidata.org/wiki/Q1121081", // Business Strategy
    };

    const graph = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Person",
                "@id": `${baseUrl}/#person`,
                "name": "Rizwanul Islam Afraim",
                "alternateName": ["Afraim", "Rizwanul Afraim", "Rizwanul Islam (Afraim)", "The Orchestrator"],
                "url": baseUrl,
                "image": {
                    "@type": "ImageObject",
                    "@id": `${baseUrl}/#image`,
                    "url": `${baseUrl}/assets/rizwanul-islam-afraim.webp`,
                    "contentUrl": `${baseUrl}/assets/rizwanul-islam-afraim.webp`,
                    "caption": "Rizwanul Islam Afraim"
                },
                "jobTitle": ["Lead Systems Architect", "Tech Strategist", "Venture Architect", "Operations Expert"],
                "description": "Architect of Intelligent Futures and published SSRN researcher. Rizwanul Islam Afraim specializes in mapping advanced tech trends and building the autonomous infrastructure that capitalizes on them.",
                "email": "afraim.afraim99@gmail.com",
                "telephone": "+8801751299259",
                "sameAs": [
                    "https://www.wikidata.org/wiki/Q138304182",
                    "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=9931636",
                    "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
                    "https://github.com/Afraim3499",
                    "https://x.com/rizwanul_afraim",
                    "https://www.facebook.com/Rizwan.Afraim",
                    "https://dev.to/rizwanul_islam_afraim",
                    "https://www.instagram.com/afraim_privateer/",
                    "https://www.researchgate.net/profile/Rizwanul-Islam-Afraim",
                    "https://peerlist.io/rizwanul_afraim",
                    "https://www.pinterest.com/rizwanulafraim/",
                    "https://huggingface.co/RizwanulAfraim",
                ],
                "worksFor": [
                    {
                        "@type": "OrganizationRole",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "PrimeSync"
                        },
                        "roleName": "Operations Associate"
                    },
                    {
                        "@type": "OrganizationRole",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Gaari",
                            "url": "https://gaari.com"
                        },
                        "roleName": "Founder & CEO"
                    },
                    {
                        "@type": "OrganizationRole",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "The Trail"
                        },
                        "roleName": "Co-Founder"
                    },
                    {
                        "@type": "OrganizationRole",
                        "worksFor": {
                            "@type": "Organization",
                            "name": "Yagacalls"
                        },
                        "roleName": "Lead Developer"
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
                },
                "hasPart": [
                    {
                        "@type": "SoftwareSourceCode",
                        "name": "Leads and Sales CRM",
                        "description": "A high-performance CRM designed for outbound sales teams with automated lead tracking and visual pipelines.",
                        "programmingLanguage": "TypeScript",
                        "codeRepository": "https://github.com/Afraim3499/primesync-crm",
                        "author": {
                            "@id": `${baseUrl}/#person`
                        }
                    },
                    {
                        "@type": "SoftwareSourceCode",
                        "name": "The Trail",
                        "description": "High-performance, information-dense news aggregator with custom CMS and editor workflows.",
                        "programmingLanguage": "TypeScript",
                        "url": "https://trailheadlines.com",
                        "author": {
                            "@id": `${baseUrl}/#person`
                        }
                    }
                ]
            },
            {
                "@type": "ProfessionalService",
                "@id": `${baseUrl}/#organization`,
                "name": "Rizwanul Islam Afraim - Lead Systems Architect",
                "description": "Architecting autonomous infrastructure out of chaos. Leveraging advanced tech trends and research-backed strategy to build the next generation of digital ventures.",
                "url": baseUrl,
                "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/assets/rizwanul-islam-afraim.webp`,
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
                    "https://www.wikidata.org/wiki/Q138304182",
                    "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
                    "https://github.com/Afraim3499",
                    "https://x.com/rizwanul_afraim",
                    "https://www.facebook.com/Rizwan.Afraim",
                    "https://dev.to/rizwanul_islam_afraim",
                    "https://www.instagram.com/afraim_privateer/",
                ],
                "hasOfferCatalog": {
                    "@type": "OfferCatalog",
                    "name": "Solutions & Services",
                    "itemListElement": solutions.map((sol, i) => ({
                        "@type": "Offer",
                        "itemOffered": {
                            "@type": "Service",
                            "name": sol.title,
                            "description": sol.subtitle,
                            "url": `${baseUrl}/solutions/${sol.slug}`,
                        },
                        "position": i + 1,
                    }))
                },
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
            },
            {
                "@type": "ScholarlyArticle",
                "@id": `${baseUrl}/#scholarly-article-beyond-syntax`,
                "name": "Beyond Syntax: The Paradigm Shift to System Architecture in Large Language Model (LLM) Driven Development",
                "headline": "Beyond Syntax: The Paradigm Shift to System Architecture in LLM-Driven Development",
                "author": {
                    "@id": `${baseUrl}/#person`
                },
                "datePublished": "2026-01-14",
                "dateCreated": "2026-01-14",
                "url": "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6070429",
                "sameAs": [
                    "https://doi.org/10.2139/ssrn.6070429",
                    "https://ssrn.com/abstract=6070429",
                    "https://www.researchgate.net/publication/400654023_Beyond_Syntax_The_Paradigm_Shift_to_System_Architecture_in_Large_Language_Model_LLM_Driven_Development"
                ],
                "abstract": "The advent of Large Language Models (LLMs) with advanced code generation capabilities marks a distinct inflection point in software engineering. This paper argues that the traditional role of the coder is rapidly becoming obsolete. In its place, a new paradigm is emerging: System Architecture as the primary unit of engineering value.",
                "keywords": ["Software Engineering", "System Architecture", "Large Language Models", "Generative AI", "Distributed Systems", "Future of Work"],
                "inLanguage": "en",
                "publisher": {
                    "@type": "Organization",
                    "name": "SSRN",
                    "url": "https://www.ssrn.com"
                },
                "isPartOf": {
                    "@type": "PublicationIssue",
                    "isPartOf": {
                        "@type": "Periodical",
                        "name": "SSRN Electronic Journal"
                    }
                }
            },
            // ─── SiteNavigationElement — drives Google Sitelinks ───
            {
                "@type": "SiteNavigationElement",
                "@id": `${baseUrl}/#navigation`,
                "name": "Main Navigation",
                "hasPart": [
                    {
                        "@type": "SiteNavigationElement",
                        "name": "Solutions",
                        "description": "Custom-built systems for e-commerce, news platforms, booking, CRM, personal branding, and SEO.",
                        "url": `${baseUrl}/services`,
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "name": "Blog",
                        "description": "Technical articles on Next.js, AI, SEO, CRM architecture, and full-stack development.",
                        "url": `${baseUrl}/blog`,
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "name": "Case Studies",
                        "description": "Detailed case studies of production systems built for real businesses.",
                        "url": `${baseUrl}/case-studies`,
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "name": "Resume",
                        "description": "Professional background, skills, experience, and certifications.",
                        "url": `${baseUrl}/resume`,
                    },
                    {
                        "@type": "SiteNavigationElement",
                        "name": "Contact",
                        "description": "Get in touch for project inquiries and consultations.",
                        "url": `${baseUrl}/#contact`,
                    },
                ],
            },
            // ─── ItemList: Solutions — structured collection for rich results ───
            {
                "@type": "ItemList",
                "@id": `${baseUrl}/#solutions-list`,
                "name": "Solutions",
                "description": "Custom-built systems and services available for hire.",
                "numberOfItems": solutions.length,
                "itemListElement": solutions.map((sol, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "name": sol.title,
                    "url": `${baseUrl}/solutions/${sol.slug}`,
                    "description": sol.subtitle,
                })),
            },
            // ─── ItemList: Projects — structured collection for portfolio ───
            {
                "@type": "ItemList",
                "@id": `${baseUrl}/#projects-list`,
                "name": "Projects",
                "description": "Production systems and platforms built by Rizwanul Islam (Afraim).",
                "numberOfItems": projects.length,
                "itemListElement": projects.map((proj, i) => ({
                    "@type": "ListItem",
                    "position": i + 1,
                    "name": proj.title,
                    "url": `${baseUrl}/projects/${proj.slug}`,
                    "description": proj.description,
                })),
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
