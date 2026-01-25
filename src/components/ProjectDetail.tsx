"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, Calendar, Code, Database, Layers, Zap, Tag, FileText, BookOpen, ArrowRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { projects } from "@/data/projects";
import { getBlogSlugForProject, getCaseStudySlugForProject } from "@/lib/project-blog-mapper";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const relatedProjects = projects
    .filter((p) => p.slug !== project.slug && p.category === project.category)
    .slice(0, 2);

  // Get related case study and blog post
  const caseStudySlug = getCaseStudySlugForProject(project.slug);
  const blogSlug = getBlogSlugForProject(project.slug);

  const metrics = [
    project.metrics?.components && {
      icon: Code,
      label: "Components",
      value: `${project.metrics.components}+`,
      color: "text-emerald-400",
    },
    project.metrics?.apiEndpoints && {
      icon: Layers,
      label: "API Endpoints",
      value: `${project.metrics.apiEndpoints}+`,
      color: "text-blue-400",
    },
    project.metrics?.databaseTables && {
      icon: Database,
      label: "Database Tables",
      value: `${project.metrics.databaseTables}+`,
      color: "text-purple-400",
    },
    project.metrics?.linesOfCode && {
      icon: Code,
      label: "Lines of Code",
      value: `${project.metrics.linesOfCode.toLocaleString()}+`,
      color: "text-orange-400",
    },
    project.performance?.lighthouse && {
      icon: Zap,
      label: "Lighthouse Score",
      value: `${project.performance.lighthouse}/100`,
      color: "text-green-400",
    },
  ].filter(Boolean) as Array<{
    icon: typeof Code;
    label: string;
    value: string;
    color: string;
  }>;

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-xl text-foreground/70 mb-4">{project.description}</p>
            <div className="flex items-center gap-4 text-sm text-foreground/60">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {project.year}
              </div>
              {project.status === "production" && (
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium">
                  Live
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4">
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              Visit Project <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border border-foreground/10 transition-colors"
            >
              <Github className="w-4 h-4" />
              View Code
            </a>
          )}
        </div>

        {/* Related Content Links */}
        {(caseStudySlug || blogSlug) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10"
          >
            {caseStudySlug && (
              <Link
                href={`/case-studies/${caseStudySlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors"
              >
                <FileText className="w-4 h-4" />
                View Case Study
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
            {blogSlug && (
              <Link
                href={`/blog/${blogSlug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                Read Blog Post
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Screenshots */}
      {project.screenshots && project.screenshots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Screenshots</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {project.screenshots.map((screenshot, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-white/10"
              >
                <Image
                  src={screenshot}
                  alt={`${project.title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Metrics */}
      {metrics.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Project Metrics</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-secondary/30 border border-white/5"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                    <div className="text-sm text-foreground/60">{metric.label}</div>
                  </div>
                  <div className={`text-2xl font-bold ${metric.color}`}>
                    {metric.value}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Long Description */}
      {project.longDescription && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">About This Project</h2>
          <p className="text-foreground/70 leading-relaxed">{project.longDescription}</p>
        </motion.div>
      )}

      {/* Articles about */}
      {project.articles && project.articles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="w-6 h-6" />
            Articles about
          </h2>
          <div className="grid gap-4">
            {project.articles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors mb-1">
                    {article.title}
                  </h3>
                  <div className="text-sm text-foreground/60">Published on {article.publisher}</div>
                </div>
                <ExternalLink className="w-5 h-5 text-foreground/40 group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tech Stack */}
      {project.techStack && project.techStack.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Technology Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-lg bg-foreground/5 text-foreground/80 border border-foreground/10 hover:border-primary/50 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Challenges & Solutions */}
      {(project.challenges || project.solutions) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {project.challenges && project.challenges.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Key Challenges</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span className="text-foreground/70">{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.solutions && project.solutions.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Solutions</h2>
              <ul className="space-y-3">
                {project.solutions.map((solution, index) => (
                  <li key={index} className="flex gap-3">
                    <span className="text-emerald-400 mt-1">✓</span>
                    <span className="text-foreground/70">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}

      {/* Tags */}
      {project.tags && project.tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6" />
            Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-foreground/5 text-foreground/80 border border-foreground/10 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold">Related Projects</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedProjects.map((relatedProject) => (
              <Link
                key={relatedProject.slug}
                href={`/projects/${relatedProject.slug}`}
                className="p-6 rounded-lg bg-secondary/30 border border-white/5 hover:border-primary/50 transition-colors"
              >
                <h3 className="text-xl font-bold text-white hover:text-primary transition-colors mb-2">
                  {relatedProject.title}
                </h3>
                <p className="text-foreground/70 text-sm line-clamp-2">
                  {relatedProject.description}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}

