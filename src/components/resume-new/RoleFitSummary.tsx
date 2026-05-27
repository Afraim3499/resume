"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function RoleFitSummary() {
  const { roleFitSummary } = resumeContent;

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <Quote className="absolute -top-12 -left-12 w-24 h-24 text-primary/5 -z-10" />
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.3em] text-primary mb-8">
              Executive Positioning
            </h3>
            
            <div className="prose prose-invert max-w-none">
              {roleFitSummary.split('\n\n').map((para, i) => (
                <p 
                  key={i} 
                  className="text-xl md:text-2xl font-serif leading-relaxed text-foreground/90 italic"
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
