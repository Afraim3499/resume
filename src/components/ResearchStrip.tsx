"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp } from "@/lib/animations";

export function ResearchStrip() {
  const researchLinks = [
    {
      title: "Agentic AI as Coordination Infrastructure Technology: Structural Implications for Firms, Growth, and Economic Divergence",
      description: "Exploring how agentic AI compresses coordination costs, reshapes firms, and may widen divergence between AI-orchestrating and AI-consuming economies.",
      href: "/research/agentic-ai-coordination-infrastructure",
      color: "text-emerald-400",
      accent: "rgba(16,185,129,0.04)",
      borderColor: "hover:border-emerald-500/20",
      tag: "Agentic AI & Economics"
    },
    {
      title: "Power BI in the AI Era: Assessing Its 2026 Effectiveness",
      description: "Evaluating the evolution of business intelligence platforms against AI-driven coding environments and Python analytics in a hybrid ecosystem.",
      href: "/research/power-bi-ai-era-2026-effectiveness",
      color: "text-amber-400",
      accent: "rgba(251,191,36,0.04)",
      borderColor: "hover:border-amber-500/20",
      tag: "Business Intelligence & ML"
    }
  ];

  return (
    <section id="published-research" className="py-12 md:py-16 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.02),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(251,191,36,0.02),transparent_60%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium uppercase tracking-wider mb-4">
            Published SSRN Research
          </span>
          <h2 className="text-2xl md:text-4xl font-serif font-bold tracking-tight">Academic Foundations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {researchLinks.map((research, index) => (
            <motion.div
              key={research.href}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={index}
              className={`p-6 md:p-8 rounded-2xl bg-secondary/20 border border-foreground/5 ${research.borderColor} transition-all duration-300 flex flex-col h-full`}
              style={{ background: `radial-gradient(circle at top right, ${research.accent}, transparent)` }}
            >
              <div className="mb-4">
                <span className={`text-[10px] uppercase tracking-widest font-bold ${research.color} opacity-80`}>
                  {research.tag}
                </span>
                <h3 className="text-xl md:text-2xl font-serif font-bold mt-2 mb-3 tracking-tight leading-tight group-hover:text-primary transition-colors">
                  {research.title}
                </h3>
              </div>

              <p className="text-sm md:text-base text-foreground/70 leading-relaxed mb-8 flex-grow">
                {research.description}
              </p>

              <div className="flex items-center justify-between mt-auto pt-6 border-t border-foreground/5">
                <div className="text-xs text-foreground/40 font-medium">
                  Rizwanul Islam Afraim
                </div>
                <Link
                  href={research.href}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 text-foreground hover:bg-primary hover:text-white text-sm font-medium transition-all group`}
                >
                  View Research
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
