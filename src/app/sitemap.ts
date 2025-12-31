import { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portfolio-rizwanul.vercel.app";

  const routes = [
    "",
    "/projects",
    "/blog",
    "/about",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes];
}

