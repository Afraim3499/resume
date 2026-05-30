import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import { getOGImage } from "@/lib/og-metadata";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const ogTitle = `${project.title} — Project by Rizwanul Afraim`;
  const ogDesc = project.longDescription || project.description || "A system, platform, or workflow project by Rizwanul Islam Afraim across product architecture, operations, automation, and execution.";
  const { openGraphImage, twitterImage } = getOGImage("projects");

  return {
    title: `${project.title} | Advanced Platform Project`,
    description: `${project.longDescription || project.description} Built with production-grade architecture by Rizwanul Islam (Afraim).`,
    alternates: {
      canonical: `https://www.rizwanulafraim.com/projects/${project.slug}`,
    },
    openGraph: {
      title: ogTitle,
      description: ogDesc,
      type: "website",
      locale: "en_US",
      url: `https://www.rizwanulafraim.com/projects/${project.slug}`,
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
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rizwanulafraim.com";

  // SoftwareApplication Schema for SEO
  // SoftwareApplication Schema for SEO (Amazon Protocol Upgrade)
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.title,
    description: project.longDescription || project.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Cloud, Cross-Platform",
    softwareRequirements: project.techStack.join(", "),
    // featureList: project.features ? project.features.join(", ") : undefined,
    url: project.link || `${url}/projects/${project.slug}`,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/OnlineOnly"
    },
    author: {
      "@type": "Person",
      name: "Rizwanul Islam (Afraim)",
      url: "https://www.rizwanulafraim.com",
    },
    maintainer: {
      "@type": "Person",
      name: "Rizwanul Islam (Afraim)"
    }
  };

  return (
    <main className="bg-background min-h-screen text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <div className="container px-4 mx-auto max-w-5xl pt-24 pb-12">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/projects" },
            { label: project.title },
          ]}
        />
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}

