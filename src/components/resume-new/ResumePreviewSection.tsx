"use client";

import { ResumeView } from "@/components/ResumeView";
import { motion } from "framer-motion";
import { FileText, Download } from "lucide-react";

export function ResumePreviewSection() {
  return (
    <section className="py-24 bg-secondary/5 relative">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
            <FileText className="w-3.5 h-3.5" /> Traditional View
          </div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Curriculum Vitae</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A clean, HR-optimized view of my professional background, ready for download or print.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[2rem] overflow-hidden shadow-2xl border border-border/50 bg-background scale-[0.98] origin-top hover:scale-100 transition-transform duration-700"
        >
          <div className="max-h-[800px] overflow-y-auto no-scrollbar scroll-smooth">
            <ResumeView />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
