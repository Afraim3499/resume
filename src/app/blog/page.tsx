import { Metadata } from "next";
import { BlogListing } from "@/components/BlogListing";
import { getAllBlogPosts } from "@/lib/blog-loader";

export const metadata: Metadata = {
  title: "Advanced Technical Blog | System Architecture & AI Agents",
  description: "Deep dives into RAG Pipelines, Next.js Architecture, Agentic Systems, and Operational Data Strategy by Rizwanul Islam (Afraim).",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <main className="bg-background min-h-screen text-foreground">
      <BlogListing initialPosts={posts} />
    </main>
  );
}
