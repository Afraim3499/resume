"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { Shield, Settings, Zap, Briefcase } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  "Marketing & Brand": Shield,
  "Operations & Reporting": Settings,
  "Digital & Technical": Zap,
  "Execution & Leadership": Briefcase,
};

export function SkillsMatrix() {
  const { skillsMatrix } = resumeContent;

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Skills Matrix</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A cross-functional toolset designed for efficiency in modern business ecosystems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsMatrix.map((category, i) => {
            const Icon = ICON_MAP[category.category] || Zap;
            
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-background border border-border/40 rounded-[2rem] p-8 shadow-sm hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2.5 rounded-xl bg-primary/5 text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-widest">{category.category}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <span 
                      key={skill} 
                      className="px-3 py-1.5 rounded-lg bg-secondary/30 text-[11px] font-bold border border-border/20 text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
