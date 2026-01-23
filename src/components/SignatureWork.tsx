"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, FileText, BookOpen, Layers, Zap } from "lucide-react";
import { projects } from "@/data/projects";
import { getBlogSlugForProject, getCaseStudySlugForProject } from "@/lib/project-blog-mapper";
import { fadeUp } from "@/lib/animations";
import { ImageHover3D } from "./ImageHover3D";
import { ParticleSystem } from "./ParticleSystem";
import type { Project } from "@/data/projects";

// Get signature projects (production projects)
const preferredOrder = ["gaari", "the-trail", "yagacalls"];
const signatureProjects = projects
  .filter((p) => p.status === "production" && preferredOrder.includes(p.slug))
  .sort((a, b) => preferredOrder.indexOf(a.slug) - preferredOrder.indexOf(b.slug));

export function SignatureWork() {
  const [selectedProject, setSelectedProject] = useState<Project>(signatureProjects[0]);

  const selectedCaseStudySlug = getCaseStudySlugForProject(selectedProject.slug);
  const selectedBlogSlug = getBlogSlugForProject(selectedProject.slug);

  return (
    <section id="signature-work" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

      {/* Particle System */}
      <ParticleSystem count={15} />

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            Signature Work
          </span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 tracking-tight">
            Selected <span className="text-gradient">Ventures</span>
          </h2>
          <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
            Where abstract vision meets concrete architecture. Production-grade platforms built for scale.
          </p>
        </motion.div>

        {/* Gallery Showcase Layout */}
        <div className="space-y-8 md:space-y-12">
          {/* 1. Top Section: The Visual (16:9) */}
          <div className="w-full aspect-video md:aspect-[21/9] lg:aspect-[16/7] relative rounded-2xl overflow-hidden border border-foreground/10 bg-secondary/20 shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.slug}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                {selectedProject.image && (
                  <div className="relative w-full h-full">
                    <ImageHover3D
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Gradient Overlay for Text Readability if needed, though mostly decorative here */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 2. Middle Section: The Controller (Tabs) */}
          <div className="flex flex-wrap justify-center gap-4">
            {signatureProjects.map((project) => {
              const isSelected = selectedProject.slug === project.slug;
              return (
                <button
                  key={project.slug}
                  onClick={() => setSelectedProject(project)}
                  aria-label={`Select project: ${project.title}`}
                  className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 border ${isSelected
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/25 scale-105"
                    : "bg-secondary/50 text-foreground/80 border-foreground/10 hover:bg-secondary hover:text-foreground hover:border-foreground/20"
                    }`}
                >
                  {project.title}
                </button>
              );
            })}
          </div>

          {/* 3. Bottom Section: The Details (Split View) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedProject.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start"
            >
              {/* Left Column: Narrative */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">{selectedProject.title}</h3>
                  <p className="text-xl text-foreground/80 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">The Challenge & Solution</h4>
                  <p className="text-foreground/70 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>
              </div>

              {/* Right Column: Tech & Stats */}
              <div className="space-y-8 bg-secondary/10 p-6 md:p-8 rounded-2xl border border-foreground/5">
                {/* Tech Stack */}
                <div>
                  <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                    <Layers className="w-4 h-4" /> Tech Architecture
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-sm bg-background border border-foreground/10 rounded-md text-foreground/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Metrics Grid */}
                {selectedProject.metrics && (
                  <div>
                    <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground/60 uppercase tracking-wider mb-4">
                      <Zap className="w-4 h-4" /> Impact Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.metrics.components && (
                        <div className="p-3 bg-background rounded-lg border border-foreground/5">
                          <div className="text-2xl font-bold text-primary">{selectedProject.metrics.components}+</div>
                          <div className="text-xs text-foreground/60">Components</div>
                        </div>
                      )}
                      {selectedProject.metrics.apiEndpoints && (
                        <div className="p-3 bg-background rounded-lg border border-foreground/5">
                          <div className="text-2xl font-bold text-primary">{selectedProject.metrics.apiEndpoints}+</div>
                          <div className="text-xs text-foreground/60">API Endpoints</div>
                        </div>
                      )}
                      {selectedProject.performance?.lighthouse && (
                        <div className="p-3 bg-background rounded-lg border border-foreground/5">
                          <div className="text-2xl font-bold text-emerald-500">{selectedProject.performance.lighthouse}/100</div>
                          <div className="text-xs text-foreground/60">Lighthouse Score</div>
                        </div>
                      )}
                      {selectedProject.metrics.databaseTables && (
                        <div className="p-3 bg-background rounded-lg border border-foreground/5">
                          <div className="text-2xl font-bold text-primary">{selectedProject.metrics.databaseTables}+</div>
                          <div className="text-xs text-foreground/60">DB Tables</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-foreground/10">
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${selectedProject.title} Live Site`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors font-medium"
                    >
                      Visit Live Site <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  {selectedCaseStudySlug && (
                    <Link
                      href={`/case-studies/${selectedCaseStudySlug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-background border border-foreground/20 hover:bg-foreground/5 transition-colors font-medium"
                    >
                      <FileText className="w-4 h-4" /> Case Study
                    </Link>
                  )}
                  {selectedBlogSlug && (
                    <Link
                      href={`/blog/${selectedBlogSlug}`}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-background border border-foreground/20 hover:bg-foreground/5 transition-colors font-medium"
                    >
                      <BookOpen className="w-4 h-4" /> Read Blog
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

