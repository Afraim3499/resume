"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export function ResearchStrip() {
  return (
    <section id="published-research" className="py-12 md:py-16 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.04),transparent_60%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-4xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="p-6 md:p-8 rounded-2xl bg-secondary/20 border border-foreground/5 hover:border-primary/20 transition-colors"
        >
          {/* Eyebrow */}
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-4">
            Published Research
          </span>

          {/* Headline */}
          <h2 className="text-xl md:text-2xl font-serif font-bold mb-3 tracking-tight leading-tight">
            Agentic AI as Coordination Infrastructure Technology: Structural Implications for Firms, Growth, and Economic Divergence
          </h2>

          {/* Body */}
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed max-w-[75ch] mb-6">
            A published SSRN paper by{" "}
            <span className="text-primary font-medium">
              Rizwanul Islam Afraim — SSRN published researcher
            </span>{" "}
            exploring how agentic AI compresses coordination costs, reshapes
            firms, and may widen divergence between AI-orchestrating and
            AI-consuming economies.
          </p>

          {/* CTA */}
          <Link
            href="/research/agentic-ai-coordination-infrastructure"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 group"
          >
            Read the full research
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
