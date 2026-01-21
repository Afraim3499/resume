import { Metadata } from "next";
import { BlogListing } from "@/components/BlogListing";

export const metadata: Metadata = {
  title: "Advanced Technical Blog | System Architecture & AI Agents",
  description: "Deep dives into RAG Pipelines, Next.js Architecture, Agentic Systems, and Operational Data Strategy by Rizwanul Islam (Afraim).",
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
