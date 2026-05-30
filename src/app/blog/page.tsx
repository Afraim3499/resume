import { Metadata } from "next";
import { BlogListing } from "@/components/BlogListing";
import { getAllBlogPostPreviews } from "@/lib/blog-loader";
import { buildOGMetadata } from "@/lib/og-metadata";

export const metadata: Metadata = {
  title: "Blog — The Thinking Behind Better Systems | Rizwanul Afraim",
  description: "Field notes on marketing, sales, product operations, AI workflows, SEO/AEO/GEO, and the systems behind clearer execution.",
  alternates: {
    canonical: "https://www.rizwanulafraim.com/blog",
  },
  ...buildOGMetadata("blog", {
    title: "Blog — The Thinking Behind Better Systems | Rizwanul Afraim",
    description: "Field notes on marketing, sales, product operations, AI workflows, SEO/AEO/GEO, and the systems behind clearer execution.",
    url: "https://www.rizwanulafraim.com/blog",
  }),
};

export default function BlogPage() {
  const posts = getAllBlogPostPreviews();

  return (
    <main className="bg-background min-h-screen text-foreground">
      <BlogListing initialPosts={posts} />
    </main>
  );
}
