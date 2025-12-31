import { projects } from "@/data/projects";

export function SchemaData() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rizwanul Islam",
    alternateName: "Afraim",
    jobTitle: "Founder & Digital Strategist",
    description: "Full-stack developer, digital strategist, and founder specializing in Next.js, React, TypeScript, and AI/ML solutions.",
    url: "https://portfolio-rizwanul.vercel.app",
    sameAs: [
      // Add social media profiles when available
      // "https://linkedin.com/in/rizwanulislam",
      // "https://github.com/rizwanulislam",
      // "https://twitter.com/rizwanulislam",
    ],
    knowsAbout: [
      "Web Development",
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "AI/ML",
      "Digital Marketing",
      "Event Management",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "NSU", // Update with actual education
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Rizwanul Islam - Digital Strategist",
    description: "Full-stack development and digital strategy services",
    url: "https://portfolio-rizwanul.vercel.app",
    founder: {
      "@type": "Person",
      name: "Rizwanul Islam",
    },
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
    description: "Portfolio of Rizwanul Islam (Afraim) - Full-stack developer and digital strategist",
    url: "https://portfolio-rizwanul.vercel.app",
    author: {
      "@type": "Person",
      name: "Rizwanul Islam",
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

