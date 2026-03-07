"use client";


import { projects } from "@/data/projects";
import { solutions } from "@/data/solutions"; // Added to map solution-specific FAQs
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
  faqItems: FAQItem[]; // These are the global homepage FAQs
}

export function SchemaData({ faqItems }: SchemaDataProps) {
  const pathname = usePathname();
  // Hardcode baseUrl to avoid hydration mismatch in Schema ID generation
  const baseUrl = "https://www.rizwanulafraim.com";

  // Dynamic FAQ Mapping for AEO/AIO Optimization
  // Logic: Use solution-specific FAQs on solution pages, global FAQs on home
  let displayFAQs: FAQItem[] = [];
  let shouldRenderFAQ = false;

  if (pathname === "/") {
    displayFAQs = faqItems;
    shouldRenderFAQ = true;
  } else if (pathname?.startsWith("/solutions/")) {
    const slug = pathname.split("/").pop();
    const solution = solutions.find(s => s.slug === slug);
    if (solution && solution.faqs) {
      displayFAQs = solution.faqs;
      shouldRenderFAQ = true;
    }
  }

  const faqSchema = shouldRenderFAQ ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": displayFAQs.map((item): FAQSchemaItem => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
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
  } else if (pathname?.startsWith("/solutions/")) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Solutions",
      item: `${baseUrl}/services`,
    });
    const slug = pathname.split("/").pop();
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Solution",
      item: `${baseUrl}${pathname}`,
    });
  } else if (pathname?.startsWith("/case-studies/")) {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Case Studies",
      item: `${baseUrl}/case-studies`,
    });
    const slug = pathname.split("/").pop();
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Case Study",
      item: `${baseUrl}${pathname}`,
    });
  } else if (pathname === "/case-studies") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Case Studies",
      item: `${baseUrl}/case-studies`,
    });
  } else if (pathname === "/services") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Solutions & Services",
      item: `${baseUrl}/services`,
    });
  } else if (pathname === "/resume") {
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Resume",
      item: `${baseUrl}/resume`,
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
