import { Metadata } from "next";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Blog & Articles | Rizwanul Islam (Afraim)",
  description: "Technical insights, tutorials, and thoughts on web development, AI Agentic Systems, and Venture Architecture by Rizwanul Islam (Afraim).",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <main className="bg-background min-h-screen text-foreground">
      <BlogListing />
    </main>
  );
}
