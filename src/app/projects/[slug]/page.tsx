import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/data/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";

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

  return {
    title: `${project.title} | Project`,
    description: project.longDescription || project.description,
    openGraph: {
      title: `${project.title} | Rizwanul Islam`,
      description: project.longDescription || project.description,
      type: "website",
      images: project.screenshots?.[0] ? [{ url: project.screenshots[0] }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Rizwanul Islam`,
      description: project.longDescription || project.description,
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-background min-h-screen text-foreground">
      <div className="container px-4 mx-auto max-w-5xl py-12">
        <Breadcrumbs
          items={[
            { label: "Projects", href: "/#projects" },
            { label: project.title },
          ]}
        />
        <ProjectDetail project={project} />
      </div>
    </main>
  );
}

