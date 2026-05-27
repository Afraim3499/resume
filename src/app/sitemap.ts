import { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { getAllBlogPosts } from "@/lib/blog-loader";
import { getAllCaseStudies } from "@/lib/case-study-loader";
import { getAllTerms } from "@/data/knowledge-graph";
import { solutions } from "@/data/solutions";

export default function sitemap(): MetadataRoute.Sitemap {
  /* Absolute URL Verification: Hardcoded for production SEO stability */
  const baseUrl = "https://www.rizwanulafraim.com";

  const cleanUrl = (url: string) => url.replace(/\/$/, "");

  const makeAbsolute = (url: string) => {
    if (!url) return "";
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url;
    }
    return `${baseUrl}${url.startsWith("/") ? "" : "/"}${url}`;
  };

  const posts = getAllBlogPosts();
  const caseStudies = getAllCaseStudies();
  const wikiTerms = getAllTerms();

  // Core Routes - Priority 1.0 for Home, 0.9 for key pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/rizwanul-islam-afraim.webp")],
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: projects.map(p => p.image ? makeAbsolute(p.image) : "").filter(Boolean),
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/rizwanul-islam-afraim.webp")],
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: posts.map(p => p.image ? makeAbsolute(p.image) : "").filter(Boolean),
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: projects.map(p => p.image ? makeAbsolute(p.image) : "").filter(Boolean),
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/solutions`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/solutions/gtm-operations`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/solutions/dynamic-platforms`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/solutions/executive-brand`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
      images: [makeAbsolute("/assets/afraim-logo.png")],
    },
    {
      url: `${baseUrl}/research/agentic-ai-coordination-infrastructure`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research/power-bi-ai-era-2026-effectiveness`,
      lastModified: new Date("2026-04-08"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research/skill-mismatch-managerial-shortages-rmg`,
      lastModified: new Date("2026-04-10"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
  ];

  // Dynamic Project Routes - Priority 0.8
  const projectRoutes = projects.map((project) => {
    const projectImages = [
      project.image ? makeAbsolute(project.image) : null,
      ...(project.screenshots || []).map(s => makeAbsolute(s))
    ].filter((img): img is string => !!img);

    return {
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(project.year ? `${project.year}-01-01` : Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: projectImages,
    };
  });

  // Dynamic Blog Post Routes - Priority 0.7-0.9 (featured)
  const blogRoutes = posts.map((post) => {
    const postImages = [
      post.image ? makeAbsolute(post.image) : null
    ].filter((img): img is string => !!img);

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt || post.date),
      changeFrequency: "weekly" as const,
      priority: post.featured ? 0.9 : 0.7,
      images: postImages,
    };
  });

  // Dynamic Case Study Routes - Priority 0.8
  const caseStudyRoutes = caseStudies.map((study) => {
    const matchingProject = projects.find((p) => p.slug === study.projectSlug);
    const studyImages = matchingProject
      ? [
          matchingProject.image ? makeAbsolute(matchingProject.image) : null,
          ...(matchingProject.screenshots || []).map((s) => makeAbsolute(s)),
        ].filter((img): img is string => !!img)
      : [];

    return {
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: studyImages,
    };
  });

  // Dynamic Wiki Term Routes - Priority 0.6
  const wikiRoutes = wikiTerms.map((term) => ({
    url: `${baseUrl}/wiki/${term.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic Solution Routes - Priority 0.9
  const solutionRoutes = solutions.map((solution) => {
    // Collect all unique images from proof projects
    const solutionImages: string[] = [];
    solution.proofProjects.forEach((proof) => {
      const match = projects.find((p) => p.slug === proof.slug);
      if (match) {
        if (match.image) {
          solutionImages.push(makeAbsolute(match.image));
        }
        if (match.screenshots) {
          match.screenshots.forEach((s) => {
            solutionImages.push(makeAbsolute(s));
          });
        }
      }
    });

    // Make sure elements are unique
    const uniqueSolutionImages = Array.from(new Set(solutionImages));

    return {
      url: `${baseUrl}/solutions/${solution.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
      images: uniqueSolutionImages,
    };
  });

  const allRoutes = [...routes, ...projectRoutes, ...blogRoutes, ...caseStudyRoutes, ...wikiRoutes, ...solutionRoutes];

  const lastModified = new Date();

  return allRoutes.map(route => ({
    ...route,
    url: cleanUrl(route.url),
    lastModified: route.lastModified || lastModified
  }));
}
