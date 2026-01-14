import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Tag, ExternalLink, FileText } from "lucide-react";
import type { Metadata } from "next";
import { getBlogPostBySlug, blogPosts, getBlogPostByProjectSlug } from "@/data/blog";
import { MarkdownContent } from "@/components/MarkdownContent";
import { formatPostDate, getRelatedPosts } from "@/lib/blog";
import { SocialShare } from "@/components/SocialShare";
import { ReadingProgress } from "@/components/ReadingProgress";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCaseStudyByProject } from "@/data/case-studies";
import { projects } from "@/data/projects";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-rizwanul.vercel.app";

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${url}/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Rizwanul Islam (Afraim)`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name || "Rizwanul Islam (Afraim)"],
      tags: post.tags,
      images: post.image ? [post.image] : [],
      url: `${url}/blog/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Rizwanul Islam (Afraim)`,
      description: post.excerpt,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, blogPosts);
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-rizwanul.vercel.app";
  const postUrl = `${url}/blog/${post.slug}`;

  // Find related project and case study
  const projectSlugMap: Record<string, string> = {
    "building-gaari-booking-system": "gaari",
    "launching-trail-news-platform": "the-trail",
    "4-layer-seo-framework-yagacalls": "yagacalls",
  };
  const projectSlug = projectSlugMap[slug];
  const project = projectSlug ? projects.find((p) => p.slug === projectSlug) : undefined;
  const caseStudy = projectSlug ? getCaseStudyByProject(projectSlug) : undefined;

  return (
    <main className="bg-background min-h-screen text-foreground">
      <ReadingProgress />
      <article className="container px-4 mx-auto max-w-4xl py-12">
        <Breadcrumbs
          items={[
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mb-8">
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatPostDate(post.date)}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readingTime} min read
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <span>{post.views} views</span>
              </div>
            )}
            <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium border border-primary/30">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{post.title}</h1>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 border border-foreground/10 text-sm flex items-center gap-1"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          <SocialShare url={postUrl} title={post.title} description={post.excerpt} />
        </header>

        <div className="mb-12">
          <MarkdownContent content={post.content} />
        </div>

        {/* Related Project & Case Study Links */}
        {(project || caseStudy) && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <h2 className="text-2xl font-bold mb-6">Related Content</h2>
            <div className="flex flex-col sm:flex-row gap-4">
              {project && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="flex-1 p-6 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      View Project
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">{project.title}</p>
                </Link>
              )}
              {caseStudy && (
                <Link
                  href={`/case-studies/${caseStudy.slug}`}
                  className="flex-1 p-6 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FileText className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      Read Case Study
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">Detailed project analysis</p>
                </Link>
              )}
            </div>
          </div>
        )}

        {relatedPosts.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="p-4 rounded-lg bg-secondary/30 border border-foreground/10 hover:border-primary/50 transition-colors"
                >
                  <h3 className="text-lg font-bold text-white hover:text-primary transition-colors mb-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-foreground/70 text-sm line-clamp-2">{relatedPost.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  );
}

