import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  /* Absolute URL Verification: Hardcoded for production SEO stability */
  const baseUrl = "https://www.rizwanulafraim.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: ["GPTBot", "CCBot", "Google-Extended"],
        allow: "/",
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

