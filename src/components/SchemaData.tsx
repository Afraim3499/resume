"use client";

import { projects } from "@/data/projects";
import { faqData } from "@/data/faq";
import { usePathname } from "next/navigation";

export function SchemaData() {
  const pathname = usePathname();
  const baseUrl = "https://portfolio-rizwanul.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rizwanul Islam",
    alternateName: ["Afraim", "Rizwanul Afraim", "Rizwanul Islam (Afraim)", "The Orchestrator"],
    brand: {
      "@type": "Brand",
      name: "Afraim",
      slogan: "The Orchestrator of Intelligent Futures",
    },
    jobTitle: ["Founder", "Venture Architect", "Operations Associate", "Systems Orchestrator"],
    description: "Legendary Digital Strategist and Architect of Intelligent Futures. Rizwanul Islam (Afraim) combines high-level business strategy with low-level technical execution.",
    disambiguatingDescription: "Founder of Gaari. Operations Associate at PrimeSync Solutions. Known as 'Afraim'. Distinct from Dr. Md. Rizwanul Islam (Dean).",
    url: baseUrl,
    image: `${baseUrl}/og-image.jpg`,
    email: "contact@rizwanulislam.com",
    sameAs: [
      "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
      "https://github.com/Afraim3499",
      "https://x.com/rizwanul_afraim",
      "https://www.facebook.com/Rizwan.Afraim",
      "https://dev.to/rizwanul_islam_afraim",
    ],
    worksFor: [
      {
        "@type": "Organization",
        name: "PrimeSync",
        roleName: "Operations Associate",
      },
      {
        "@type": "Organization",
        name: "Gaari",
        url: "https://gaari.com",
        roleName: "Founder & CEO",
      },
      {
        "@type": "Organization",
        name: "The Trail",
        roleName: "Co-Founder",
      },
      {
        "@type": "Organization",
        name: "Yagacalls",
        roleName: "Lead Developer",
      },
    ],
    knowsAbout: [
      "Business Strategy",
      "Operations Management",
      "Venture Architecture",
      "Systems Orchestration",
      "AI Agentic Systems",
      "Market Creation",
      "Full-Stack Development",
      "Next.js",
      "React",
      "Supabase",
      "RAG Pipelines",
      "SEO Strategy (SXO/AIO)",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "North South University",
      url: "https://www.northsouth.edu/",
    },
    // Geo/Location data
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dhaka",
      addressRegion: "Dhaka Division",
      addressCountry: "Bangladesh",
    },
    nationality: {
      "@type": "Country",
      name: "Bangladesh",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Rizwanul Islam (Afraim) - Venture Architect",
    description: "Full-stack development, digital strategy, and venture orchestration services.",
    url: baseUrl,
    logo: `${baseUrl}/og-image.jpg`,
    founder: {
      "@type": "Person",
      name: "Rizwanul Islam (Afraim)",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 23.8103,
        longitude: 90.4125,
      },
      geoRadius: "Global",
    },
    serviceType: ["Venture Building", "System Architecture", "AI Solutions", "Startup Consulting"],
  };

  // Dynamic FAQ Schema from centralized data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const projectSchemas = projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.description,
    applicationCategory: "WebApplication",
    operatingSystem: "Web",
    url: project.link,
    author: {
      "@type": "Person",
      name: "Rizwanul Islam (Afraim)",
    },
    datePublished: `${project.year}-01-01`,
    programmingLanguage: project.techStack,
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rizwanul Islam (Afraim) Portfolio",
    alternateName: ["Afraim Portfolio", "The Orchestrator Portfolio"],
    description: "Official digital presence of Rizwanul Islam (Afraim) - Venture Architect and Full-Stack Strategist.",
    url: baseUrl,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Rizwanul Islam (Afraim)",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Dynamic Breadcrumb Generation
  const breadcrumbItems: any[] = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
  ];

  if (pathname === "/blog") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${baseUrl}/blog`,
    });
  } else if (pathname.startsWith("/blog/")) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: `${baseUrl}/blog`,
    });
    const slug = pathname.split("/").pop();
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: slug ? slug.replace(/-/g, " ") : "Post",
      item: `${baseUrl}${pathname}`,
    });
  } else if (pathname.startsWith("/projects/")) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${baseUrl}/#projects`,
    });
    const slug = pathname.split("/").pop();
    const project = projects.find(p => p.slug === slug);
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: project ? project.title : (slug ? slug.replace(/-/g, " ") : "Project"),
      item: `${baseUrl}${pathname}`,
    });
  } else if (pathname === "/manifesto") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Manifesto",
      item: `${baseUrl}/manifesto`,
    });
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {projectSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
