import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  /* Absolute URL Verification: Hardcoded for production SEO stability */
  const baseUrl = "https://www.rizwanulafraim.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/llms.txt", "/humans.txt", "/manifest.json", "/feed.xml"],
        disallow: ["/api/", "/auth/", "/login", "/onboarding", "/budget/"],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "CCBot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "anthropic-ai",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Claude-Web",
        allow: "/",
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        crawlDelay: 1,
      },
      {
        userAgent: "Applebot-Extended",
        allow: "/",
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Bingbot",
        allow: "/",
        crawlDelay: 0,
      },
      {
        userAgent: "Slurp",
        allow: "/",
      },
      {
        userAgent: "SemrushBot",
        disallow: "/",
      },
      {
        userAgent: "AhrefsBot",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      {
        userAgent: "MJ12bot",
        disallow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

