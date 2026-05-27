"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { Code2, Cpu, Zap, Lightbulb } from "lucide-react";

export function TechnicalEdge() {
  const { technicalEdge } = resumeContent;

  return (
    <section className="py-24 bg-primary/[0.02] border-y border-primary/10 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary/5 blur-[150px] rounded-full -z-10" />

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <Cpu className="w-4 h-4" /> Strategic Multiplier
            </div>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight leading-tight">
              {technicalEdge.title}
            </h2>
            <div className="prose prose-invert">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {technicalEdge.content.split('\n\n')[0]}
              </p>
              <div className="p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm">
                <p className="text-sm font-medium text-foreground/90 leading-relaxed italic">
                  {technicalEdge.content.split('\n\n')[1]}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-6">Digital Platform Exposure</h3>
              <div className="grid grid-cols-1 gap-4">
                {technicalEdge.exposure.map((item, i) => (
                  <div 
                    key={i} 
                    className="flex items-start gap-4 p-4 rounded-xl bg-background border border-border/40 hover:border-primary/30 transition-all group"
                  >
                    <div className="mt-1 p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-bold text-foreground/80 group-hover:text-foreground transition-colors">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-4">Core Stack</h3>
              <div className="flex flex-wrap gap-2">
                {technicalEdge.stack.map((tech: string) => (
                  <span key={tech} className="px-3 py-1.5 rounded-lg bg-secondary/50 text-[11px] font-black tracking-tight border border-border/50">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
