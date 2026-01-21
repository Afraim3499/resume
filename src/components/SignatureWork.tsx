"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, BookOpen } from "lucide-react";
import { projects } from "@/data/projects";
import { getCaseStudyByProject } from "@/data/case-studies";
import { getBlogPostByProjectSlug } from "@/data/blog";
import { fadeUp, slideInLeft, slideInRight, hoverScale } from "@/lib/animations";
import { ImageHover3D } from "./ImageHover3D";
import { ParticleSystem } from "./ParticleSystem";
import type { Project } from "@/data/projects";

// Get signature projects (production projects)
const signatureProjects = projects
  .filter((p) => p.status === "production" && ["gaari", "the-trail", "yagacalls"].includes(p.slug))
  .slice(0, 3);

export function SignatureWork() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(
    signatureProjects[0] || null
  );

  const selectedCaseStudy = selectedProject ? getCaseStudyByProject(selectedProject.slug) : null;
  const selectedBlogPost = selectedProject ? getBlogPostByProjectSlug(selectedProject.slug) : null;

  return (
    <section id="signature-work" className="py-32 md:py-40 lg:py-48 bg-background/85 relative overflow-hidden">
      {/* Ambient Background - Layer 0 */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />

      {/* Particle System - Layer 1 (above backgrounds, below content) */}
      <ParticleSystem count={16} />

      {/* Content - Layer 10 */}
      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            Signature Work
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 tracking-tighter">
            Selected <span className="text-gradient">Ventures</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Production-ready platforms where strategy meets technical excellence
          </p>
        </motion.div>

        {/* Carousel Layout */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left Column - Project List */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="lg:col-span-2 space-y-4"
          >
            {signatureProjects.map((project) => {
              const isSelected = selectedProject?.slug === project.slug;

              return (
                <motion.button
                  key={project.slug}
                  onClick={() => setSelectedProject(project)}
                  whileHover={hoverScale}
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${isSelected
                    ? "bg-primary/10 border-primary/50 shadow-lg shadow-primary/10"
                    : "bg-secondary/30 border-foreground/10 hover:border-primary/30"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-xl md:text-2xl lg:text-3xl font-bold transition-colors ${isSelected ? "text-primary" : "text-foreground"
                          }`}>
                          {project.title}
                        </h3>
                        {project.status === "production" && (
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Live
                          </span>
                        )}
                      </div>

                      {/* Category Labels */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className={`text-xs font-medium px-2 py-1 rounded ${isSelected
                              ? "bg-primary/20 text-primary border border-primary/30"
                              : "bg-foreground/5 text-foreground/60 border border-foreground/10"
                              }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Quick Stats */}
                      {project.metrics && (
                        <div className="flex items-center gap-4 text-sm text-foreground/60">
                          {project.metrics.components && (
                            <span>{project.metrics.components}+ Components</span>
                          )}
                          {project.performance?.lighthouse && (
                            <span>{project.performance.lighthouse}/100 Score</span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Active Indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="w-1 h-full bg-primary rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Right Column - Preview Panel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  key={selectedProject.slug}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="relative h-full min-h-[400px] md:min-h-[600px] rounded-2xl overflow-hidden border border-foreground/10 bg-secondary/20"
                >
                  {/* Project Image with 3D Hover */}
                  {selectedProject.image && (
                    <div className="relative h-64 md:h-80 w-full overflow-hidden">
                      <ImageHover3D
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-full"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-8 lg:p-10">
                    <div className="mb-6">
                      <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4">
                        {selectedProject.title}
                      </h3>
                      <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-6">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Key Metrics */}
                    {selectedProject.metrics && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
                        {selectedProject.metrics.components && (
                          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {selectedProject.metrics.components}+
                            </div>
                            <div className="text-xs text-foreground/60">Components</div>
                          </div>
                        )}
                        {selectedProject.metrics.apiEndpoints && (
                          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {selectedProject.metrics.apiEndpoints}+
                            </div>
                            <div className="text-xs text-foreground/60">APIs</div>
                          </div>
                        )}
                        {selectedProject.performance?.lighthouse && (
                          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {selectedProject.performance.lighthouse}
                            </div>
                            <div className="text-xs text-foreground/60">Lighthouse</div>
                          </div>
                        )}
                        {selectedProject.performance?.loadTime && (
                          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10">
                            <div className="text-2xl font-bold text-primary mb-1">
                              {selectedProject.performance.loadTime}
                            </div>
                            <div className="text-xs text-foreground/60">Load Time</div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 md:gap-4 pt-6 border-t border-foreground/10">
                      {selectedProject.link && (
                        <a
                          href={selectedProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors text-sm md:text-base"
                        >
                          Visit Live Site <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {selectedCaseStudy && (
                        <Link
                          href={`/case-studies/${selectedCaseStudy.slug}`}
                          className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/30 transition-colors text-sm md:text-base"
                        >
                          <FileText className="w-4 h-4" />
                          Case Study
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      {selectedBlogPost && (
                        <Link
                          href={`/blog/${selectedBlogPost.slug}`}
                          className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 border border-blue-500/30 transition-colors text-sm md:text-base"
                        >
                          <BookOpen className="w-4 h-4" />
                          Blog Post
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                      <Link
                        href={`/projects/${selectedProject.slug}`}
                        className="inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-foreground/5 text-foreground/80 hover:bg-foreground/10 border border-foreground/10 transition-colors text-sm md:text-base sm:ml-auto"
                      >
                        Full Details
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

