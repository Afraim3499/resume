"use client";


import { projects } from "@/data/projects";
import { usePathname } from "next/navigation";
import type { FAQItem } from "@/lib/faq-loader";

interface FAQSchemaItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}


interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

interface SchemaDataProps {
  faqItems: FAQItem[];
}

export function SchemaData({ faqItems }: SchemaDataProps) {
  const pathname = usePathname();
  // Hardcode baseUrl to avoid hydration mismatch in Schema ID generation
  const baseUrl = "https://www.rizwanulafraim.com";

  // Dynamic FAQ Schema
  // Dynamic FAQ Schema - Only render on pages where FAQs are actually visible
  // Google Policy: "Limit the use of FAQPage markup to pages that contain a list of questions and answers."
  const shouldRenderFAQ = pathname === "/";

  const faqSchema = shouldRenderFAQ ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item): FAQSchemaItem => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } : null;



  // Dynamic Breadcrumb Generation
  const breadcrumbItems: BreadcrumbItem[] = [
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
  } else if (pathname?.startsWith("/blog/")) {
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
  } else if (pathname?.startsWith("/projects/")) {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

    </>
  );
}
