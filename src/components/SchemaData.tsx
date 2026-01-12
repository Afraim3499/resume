"use client";

import { projects } from "@/data/projects";
import { usePathname } from "next/navigation";

export function SchemaData() {
  const pathname = usePathname();
  const baseUrl = "https://portfolio-rizwanul.vercel.app";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rizwanul Islam",
    alternateName: ["Afraim", "Rizwanul Afraim", "Rizwanul Islam Afraim", "Rizwanul"],
    jobTitle: ["Founder", "Digital Strategist", "Business Developer", "Full-Stack Developer"],
    description: "Legendary Digital Strategist and Architect of Intelligent Futures. Founder specializing in scalable, super-intelligent web systems and business development. Known for unshakeable reliability.",
    disambiguatingDescription: "Founder, Digital Strategist, and Full-Stack Developer. Known as Afraim. Not associated with academic lecturing or North South University faculty.",
    url: baseUrl,
    image: `${baseUrl}/og-image.jpg`,
    email: "contact@rizwanulislam.com",
    sameAs: [
      "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
      "https://github.com/Afraim3499",
      "https://x.com/rizwanul_afraim",
      "https://www.facebook.com/Rizwan.Afraim",
    ],
    knowsAbout: [
      "Enterprise Architecture",
      "AI Strategy",
      "Business Development",
      "Market Creation",
      "Web Development",
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Supabase",
      "AI/ML",
      "Digital Marketing",
      "Event Management",
      "Startup Founding",
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
    name: "Rizwanul Islam - Digital Strategist",
    description: "Full-stack development, digital strategy, and startup consulting services",
    url: baseUrl,
    logo: `${baseUrl}/og-image.jpg`,
    founder: {
      "@type": "Person",
      name: "Rizwanul Islam",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 23.8103,
        longitude: 90.4125,
      },
      geoRadius: "50000",
    },
    serviceType: ["Web Development", "Digital Strategy", "AI Solutions", "Startup Consulting"],
  };

  // FAQ Schema for common questions
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services does Rizwanul Islam offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rizwanul Islam offers full-stack web development using Next.js, React, and TypeScript, digital strategy consulting, AI/ML integration solutions, and startup advisory services. Specializing in scalable web applications with PostgreSQL and Supabase backends.",
        },
      },
      {
        "@type": "Question",
        name: "What technologies does Rizwanul Islam specialize in?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rizwanul specializes in Next.js, React, TypeScript, Node.js, PostgreSQL, Supabase, Tailwind CSS, and AI/ML integrations. He has built production-ready platforms like Gaari (booking system) and The Trail (news platform).",
        },
      },
      {
        "@type": "Question",
        name: "What projects has Rizwanul Islam founded or co-founded?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Rizwanul founded Gaari (a car rental booking platform with AI chatbot), co-founded The Trail (a production-ready news platform with custom CMS), and led development of Yagacalls (SEO-focused marketing platform). He also served as VP of NSUSS, managing 200+ people.",
        },
      },
      {
        "@type": "Question",
        name: "How can I hire Rizwanul Islam for a project?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can contact Rizwanul through the contact form on his portfolio website, connect via LinkedIn, or reach out on Twitter/X. He is available for freelance projects, consulting, and full-time opportunities.",
        },
      },
    ],
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
      name: "Rizwanul Islam",
    },
    datePublished: `${project.year}-01-01`,
    programmingLanguage: project.techStack,
  }));

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rizwanul Islam - Portfolio",
    alternateName: "Afraim Portfolio",
    description: "Portfolio of Rizwanul Islam (Afraim) - Full-stack developer, digital strategist, and startup founder",
    url: baseUrl,
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Rizwanul Islam",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${baseUrl}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  // Dynamic Breadcrumb Generation
  const breadcrumbItems = [
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
    // For blog posts, we could add the post title if available via context or props,
    // but typically just showing the hierarchy is better than nothing.
    // Ideally, we'd pluck the slug.
    const slug = pathname.split("/").pop();
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: slug ? slug.replace(/-/g, " ") : "Post",
      item: `${baseUrl}${pathname}`,
    });
  } else if (pathname.startsWith("/projects/")) {
    // No main project index page exists, so we link to section
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 2,
      name: "Projects",
      item: `${baseUrl}/#projects`,
    });
    const slug = pathname.split("/").pop();
    // Find project title
    const project = projects.find(p => p.slug === slug);
    breadcrumbItems.push({
      "@type": "ListItem",
      position: 3,
      name: project ? project.title : (slug ? slug.replace(/-/g, " ") : "Project"),
      item: `${baseUrl}${pathname}`,
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
