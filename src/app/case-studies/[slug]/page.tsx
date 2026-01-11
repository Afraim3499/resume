import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Target, CheckCircle, TrendingUp, Lightbulb, Code, BookOpen } from "lucide-react";
import { getCaseStudyBySlug, caseStudies } from "@/data/case-studies";
import { getProjectBySlug } from "@/data/projects";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { Metadata } from "next";
import { SocialShare } from "@/components/SocialShare";
import { getBlogPostByProjectSlug } from "@/data/blog";

export async function generateStaticParams() {
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.title} | Case Study`,
    description: `Case study: ${caseStudy.problem} - ${caseStudy.solution}`,
    openGraph: {
      title: `${caseStudy.title} | Rizwanul Islam`,
      description: caseStudy.problem,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const project = getProjectBySlug(caseStudy.projectSlug);
  const blogPost = getBlogPostByProjectSlug(caseStudy.projectSlug);
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-rizwanul.vercel.app";
  const caseStudyUrl = `${url}/case-studies/${caseStudy.slug}`;

  return (
    <main className="bg-background min-h-screen text-foreground">
      <article className="container px-4 mx-auto max-w-4xl py-12">
        <Breadcrumbs
          items={[
            { label: "Case Studies", href: "/case-studies" },
            { label: caseStudy.title },
          ]}
        />

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{caseStudy.title}</h1>
          <div className="flex items-center gap-4 text-sm text-foreground/60 mb-6">
            <span>{caseStudy.timeline}</span>
            {project && (
              <Link
                href={`/projects/${project.slug}`}
                className="text-primary hover:underline"
              >
                View Project →
              </Link>
            )}
          </div>
          <SocialShare url={caseStudyUrl} title={caseStudy.title} />
        </header>

        <div className="space-y-12">
          {/* Problem */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-red-500/20 border border-red-500/30">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl font-bold">The Problem</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">{caseStudy.problem}</p>
            {caseStudy.challenges.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Key Challenges:</h3>
                <ul className="space-y-2">
                  {caseStudy.challenges.map((challenge, index) => (
                    <li key={index} className="flex gap-3 text-foreground/70">
                      <span className="text-red-400 mt-1">•</span>
                      <span>{challenge}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Solution */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-emerald-500/20 border border-emerald-500/30">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl font-bold">The Solution</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">{caseStudy.solution}</p>
            {caseStudy.technologies.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-2">
                  {caseStudy.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-foreground/5 text-foreground/80 border border-foreground/10 text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Results */}
          <section>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <h2 className="text-2xl font-bold">Results & Impact</h2>
            </div>

            {caseStudy.results.metrics.length > 0 && (
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {caseStudy.results.metrics.map((metric, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-secondary/30 border border-foreground/10"
                  >
                    <div className="text-sm text-foreground/60 mb-1">{metric.label}</div>
                    <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  </div>
                ))}
              </div>
            )}

            <p className="text-foreground/70 leading-relaxed mb-4">{caseStudy.results.impact}</p>

            {caseStudy.results.improvements.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Key Improvements:</h3>
                <ul className="space-y-2">
                  {caseStudy.results.improvements.map((improvement, index) => (
                    <li key={index} className="flex gap-3 text-foreground/70">
                      <span className="text-emerald-400 mt-1">✓</span>
                      <span>{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          {/* Lessons Learned */}
          {caseStudy.lessonsLearned.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                  <Lightbulb className="w-5 h-5 text-yellow-400" />
                </div>
                <h2 className="text-2xl font-bold">Lessons Learned</h2>
              </div>
              <ul className="space-y-3">
                {caseStudy.lessonsLearned.map((lesson, index) => (
                  <li key={index} className="flex gap-3 text-foreground/70">
                    <span className="text-yellow-400 mt-1">💡</span>
                    <span>{lesson}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Before/After */}
          {caseStudy.beforeAfter && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Before & After</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-lg bg-red-500/10 border border-red-500/20">
                  <h3 className="text-lg font-semibold text-red-400 mb-2">Before</h3>
                  <p className="text-foreground/70">{caseStudy.beforeAfter.before}</p>
                </div>
                <div className="p-6 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <h3 className="text-lg font-semibold text-emerald-400 mb-2">After</h3>
                  <p className="text-foreground/70">{caseStudy.beforeAfter.after}</p>
                </div>
              </div>
            </section>
          )}

          {/* Related Links */}
          {(project || blogPost) && (
            <section className="pt-8 border-t border-foreground/10">
              <h2 className="text-2xl font-bold mb-6">Related Content</h2>
              <div className="flex flex-col sm:flex-row gap-4">
                {project && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/30 transition-colors"
                  >
                    View Full Project Details <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                )}
                {blogPost && (
                  <Link
                    href={`/blog/${blogPost.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 transition-colors"
                  >
                    <BookOpen className="w-4 h-4" />
                    Read Blog Post
                    <ArrowLeft className="w-4 h-4 rotate-180" />
                  </Link>
                )}
                {project?.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border border-foreground/10 transition-colors"
                  >
                    Visit Live Site <ArrowLeft className="w-4 h-4 rotate-180" />
                  </a>
                )}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}

