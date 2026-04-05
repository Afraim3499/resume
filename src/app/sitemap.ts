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

  // Core Routes - Priority 1.0 for Home, 0.9 for key pages
  const routes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/manifesto`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/wiki`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/research/agentic-ai-coordination-infrastructure`,
      lastModified: new Date("2026-04-02"),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
  ];

  // Dynamic Project Routes - Priority 0.8
  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.year ? `${project.year}-01-01` : Date.now()),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Blog Post Routes - Priority 0.7-0.9 (featured)
  const posts = getAllBlogPosts();
  const blogRoutes = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.date),
    changeFrequency: "weekly" as const,
    priority: post.featured ? 0.9 : 0.7,
  }));

  // Dynamic Case Study Routes - Priority 0.8
  const caseStudies = getAllCaseStudies();
  const caseStudyRoutes = caseStudies.map((study) => ({
    url: `${baseUrl}/case-studies/${study.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Dynamic Wiki Term Routes - Priority 0.6
  const wikiTerms = getAllTerms();
  const wikiRoutes = wikiTerms.map((term) => ({
    url: `${baseUrl}/wiki/${term.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic Solution Routes - Priority 0.9
  const solutionRoutes = solutions.map((solution) => ({
    url: `${baseUrl}/solutions/${solution.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const allRoutes = [...routes, ...projectRoutes, ...blogRoutes, ...caseStudyRoutes, ...wikiRoutes, ...solutionRoutes];

  const lastModified = new Date();

  return allRoutes.map(route => ({
    ...route,
    url: cleanUrl(route.url),
    lastModified: route.lastModified || lastModified
  }));
}
