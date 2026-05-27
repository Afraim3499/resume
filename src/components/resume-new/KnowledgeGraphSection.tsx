"use client";

import { ResumeGraph } from "@/components/ResumeGraph";
import { motion } from "framer-motion";
import { Network, Search } from "lucide-react";

export function KnowledgeGraphSection() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-primary/20">
              <Network className="w-3.5 h-3.5" /> Technical Infrastructure
            </div>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">
              Digital Systems & <span className="text-gradient">Technical Foundation</span> Map
            </h2>
            <p className="text-muted-foreground text-lg">
              Interactive visualization of the underlying technical neural network that powers my digital product understanding.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2 text-xs font-bold text-muted-foreground bg-secondary/50 px-4 py-2 rounded-full border border-border/50">
            <Search className="w-4 h-4" /> Click nodes to inspect connections
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[3rem] overflow-hidden border border-border/50 shadow-2xl"
        >
          <ResumeGraph />
        </motion.div>
      </div>
    </section>
  );
}
