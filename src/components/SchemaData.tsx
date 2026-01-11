import { projects } from "@/data/projects";

export function SchemaData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rizwanul Islam",
    alternateName: "Afraim",
    jobTitle: "Founder & Digital Strategist",
    description: "Full-stack developer, digital strategist, and founder specializing in Next.js, React, TypeScript, and AI/ML solutions. Building ventures that scale.",
    url: "https://portfolio-rizwanul.vercel.app",
    image: "https://portfolio-rizwanul.vercel.app/og-image.jpg",
    email: "contact@rizwanulislam.com",
    sameAs: [
      "https://www.linkedin.com/in/rizwanul-islam-afraim99/",
      "https://github.com/Afraim3499",
      "https://x.com/rizwanul_afraim",
      "https://www.facebook.com/Rizwan.Afraim",
    ],
    knowsAbout: [
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
    url: "https://portfolio-rizwanul.vercel.app",
    logo: "https://portfolio-rizwanul.vercel.app/og-image.jpg",
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
    url: "https://portfolio-rizwanul.vercel.app",
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: "Rizwanul Islam",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://portfolio-rizwanul.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://portfolio-rizwanul.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://portfolio-rizwanul.vercel.app/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Blog",
        item: "https://portfolio-rizwanul.vercel.app/blog",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://portfolio-rizwanul.vercel.app/contact",
      },
    ],
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
