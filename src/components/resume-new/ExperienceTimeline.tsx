"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export function ExperienceTimeline() {
  const { experience } = resumeContent;

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Professional Experience</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Operational discipline and market-focused execution across leading startups and organizations.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {experience.map((exp, i) => (
            <motion.div
              key={exp.company + exp.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative pl-8 pb-12 last:pb-0 border-l border-border/50"
            >
              <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-sm" />
              
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-4 text-sm font-medium">
                    <span className="text-primary">{exp.company}</span>
                    <span className="text-muted-foreground/30">|</span>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary text-xs font-bold border border-border/50 self-start md:self-center">
                  <Calendar className="w-3.5 h-3.5" /> {exp.period}
                </div>
              </div>

              <div className="bg-secondary/10 border border-border/30 rounded-2xl p-6 md:p-8">
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-4">Focus Areas</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-3">
                  {exp.focus.map(item => (
                    <div key={item} className="flex items-center gap-2 text-sm text-foreground/80">
                      <div className="w-1 h-1 rounded-full bg-primary shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
