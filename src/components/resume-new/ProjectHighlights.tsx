"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ProjectHighlights() {
  const { projects } = resumeContent;

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Project Highlights</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Founder-led digital platforms that bridge the gap between service branding and technical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-secondary/10 border border-border/50 rounded-[2.5rem] p-8 md:p-12 hover:border-primary/20 transition-all group"
            >
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-primary/70 font-bold uppercase tracking-widest text-[10px]">
                    {project.tagline}
                  </p>
                </div>
                {project.link && (
                  <Link 
                    href={project.link} 
                    target="_blank"
                    className="p-3 rounded-full bg-background border border-border/50 hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </Link>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mb-10 text-lg">
                {project.description}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary/60">
                <CheckCircle2 className="w-4 h-4" /> Professional Implementation
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
