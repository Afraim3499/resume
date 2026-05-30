"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ArticleCard {
  title: string;
  desc: string;
  tag: string;
  url: string;
  badge: string;
}

export function ResearchInsightsSection() {
  const [activeTab, setActiveTab] = useState<"firm-scale" | "economic-divergence">("firm-scale");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const articles: ArticleCard[] = [
    {
      title: "Power BI in the AI Era: Assessing Its 2026 Effectiveness",
      desc: "Evaluating business intelligence scaling within hybrid architectures, detailing low-code integration vs dedicated Python analytics frameworks.",
      tag: "SSRN Publication",
      url: "/research/power-bi-ai-era-2026-effectiveness",
      badge: "BI & ML Scaling"
    },
    {
      title: "Skill Mismatch and Managerial Shortages in Bangladesh's RMG Industry Research",
      desc: "Investigating the paradox of graduate unemployment and critical managerial talent shortages filled by expensive expatriates inside garment export factories.",
      tag: "SSRN Publication",
      url: "/research/skill-mismatch-managerial-shortages-rmg",
      badge: "Labor Economics"
    },
    {
      title: "Beyond \"Hello World\": Meet The Architect Reimagining Dhaka's Digital Infrastructure",
      desc: "An independent featured deep-dive into the custom platform engineering frameworks and tactical system designs powering regional enterprises.",
      tag: "Medium Story",
      url: "https://kalababascrypto.medium.com/beyond-hello-world-meet-the-architect-reimagining-dhakas-digital-infrastructure-41482724e196",
      badge: "Featured Essay"
    }
  ];

  const topicChips = [
    "Agentic AI",
    "Systems Architecture",
    "AEO/GEO Indexing",
    "Attribution Logic",
    "Systems Strategy",
    "PostgreSQL Optimization"
  ];

  return (
    <section
      id="research-insights"
      className="relative bg-[#FAF8F3] text-[#171717] w-full py-16 md:py-24 border-y border-[#0F5132]/10 overflow-hidden"
    >
      {/* ─────────────────────── SEO / AEO / GEO DOM LAYER ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>09 / RESEARCH &amp; INSIGHTS: Thinking behind the systems.</h2>
        <p>
          Rizwanul Islam Afraim is a systems architect whose software engineering, marketing operations, and platform consulting work is grounded in deep academic research, structured essays, and search technology frameworks.
        </p>
        <article>
          <h3>Featured SSRN Academic Publication: Agentic AI as Coordination Infrastructure Technology</h3>
          <p>
            This paper explores how agentic AI compresses coordination costs, reshapes modern business structures, and widens the divergence between AI-orchestrating and AI-consuming economies.
          </p>
          <a href="/research/agentic-ai-coordination-infrastructure">Read Agentic AI SSRN Paper</a>
        </article>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.02),transparent_60%)] pointer-events-none" />

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2.5 leading-none">
              RESEARCH &amp; INSIGHTS
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              Thinking behind <span className="text-[#0F5132] italic">the systems.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed max-w-lg md:text-right">
            Systems aren&apos;t built by accident. They are grounded in deep academic research, published economics papers, and highly structured digital manifestos.
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive System Economics Board (col-span-5) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-5 flex flex-col justify-between bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-6 md:p-8 shadow-xs relative overflow-hidden"
          >
            {/* Ambient visual glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.04),transparent_70%)] pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-2 py-0.5 text-[8px] font-mono font-extrabold uppercase tracking-widest text-[#0F5132] bg-[#EAF7EF] border border-[#0F5132]/12 rounded-xs">
                  Academic Research
                </span>
                <span className="text-[10px] font-mono text-[#5F655F]">SSRN Pre-Print</span>
              </div>

              <h3 className="text-lg md:text-xl font-serif font-bold text-[#171717] mb-2 leading-snug tracking-tight">
                Agentic AI as Coordination Infrastructure Technology: Structural Implications for Firms, Growth, and Economic Divergence
              </h3>

              <p className="text-xs text-[#5F655F] leading-relaxed mb-6">
                Exploring how autonomous agent networks compress transaction costs, creating structural economic advantages for AI-orchestrating firms.
              </p>

              {/* Dynamic Interactive SVG Chart Selector */}
              <div className="space-y-4 pt-4 border-t border-[#0F5132]/8">
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("firm-scale")}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono font-bold transition-all border cursor-pointer ${
                      activeTab === "firm-scale"
                        ? "bg-[#0F5132] border-[#0F5132] text-white"
                        : "bg-white border-[#0F5132]/12 text-[#5F655F] hover:border-[#0F5132]/25"
                    }`}
                  >
                    FIRM SCALE IMPACT
                  </button>
                  <button
                    onClick={() => setActiveTab("economic-divergence")}
                    className={`px-3 py-1.5 rounded-full text-[9px] font-mono font-bold transition-all border cursor-pointer ${
                      activeTab === "economic-divergence"
                        ? "bg-[#0F5132] border-[#0F5132] text-white"
                        : "bg-white border-[#0F5132]/12 text-[#5F655F] hover:border-[#0F5132]/25"
                    }`}
                  >
                    GROWTH DIVERGENCE
                  </button>
                </div>

                {/* SVG Visualizer Canvas */}
                <div className="w-full h-36 bg-[#FAF8F3] rounded-lg border border-[#0F5132]/6 p-3 flex items-center justify-center relative select-none">
                  <AnimatePresence mode="wait">
                    {activeTab === "firm-scale" ? (
                      <motion.div
                        key="firm-scale"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center text-[7.5px] font-mono font-bold text-[#5F655F]">
                          <span>COORDINATION COSTS</span>
                          <span className="text-[#0F5132]">● AGENTIC COMPRESSION</span>
                        </div>
                        <svg className="w-full h-20" viewBox="0 0 200 80">
                          {/* Traditional firm curve */}
                          <path d="M 10,10 Q 50,60 190,70" stroke="#C4B8A3" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
                          {/* Agentic compressed firm curve */}
                          <motion.path
                            d="M 10,10 Q 50,20 190,15"
                            stroke="#0F5132"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                          {/* Indicator points */}
                          <circle cx="100" cy="40" r="3" fill="#C4B8A3" />
                          <circle cx="100" cy="18" r="3.5" fill="#168A4A" />
                          <line x1="100" y1="40" x2="100" y2="18" stroke="#168A4A" strokeWidth="0.8" strokeDasharray="2 1" />
                        </svg>
                        <div className="flex justify-between text-[7px] font-mono text-[#5F655F]/60 uppercase tracking-widest mt-1">
                          <span>Small Scale</span>
                          <span>Large Scale Operations</span>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="economic-divergence"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-center text-[7.5px] font-mono font-bold text-[#5F655F]">
                          <span>PRODUCTIVITY GROWTH</span>
                          <span className="text-[#0F5132]">● PRODUCTIVITY DIVERGENCE</span>
                        </div>
                        <svg className="w-full h-20" viewBox="0 0 200 80">
                          {/* Orchestrating economies */}
                          <motion.path
                            d="M 10,70 Q 100,60 190,10"
                            stroke="#0F5132"
                            strokeWidth="2"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                          {/* Consuming economies */}
                          <path d="M 10,70 Q 100,75 190,72" stroke="#C4B8A3" strokeWidth="1.5" fill="none" strokeDasharray="2 2" />
                          <text x="110" y="32" fill="#0F5132" className="text-[6.5px] font-mono font-bold">System Orchestrators</text>
                          <text x="110" y="78" fill="#5F655F" className="text-[6.5px] font-mono font-bold">Standard Consumers</text>
                        </svg>
                        <div className="flex justify-between text-[7px] font-mono text-[#5F655F]/60 uppercase tracking-widest mt-1">
                          <span>Current</span>
                          <span>Horizon</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

            </div>

            <div className="mt-8 pt-5 border-t border-[#0F5132]/8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[9px] font-mono font-bold text-[#5F655F] uppercase tracking-wider">
                  Academic Citations
                </span>
              </div>
              <Link
                href="/research/agentic-ai-coordination-infrastructure"
                className="inline-flex items-center justify-center gap-1.5 px-4.5 py-2.5 rounded-full bg-[#0F5132] text-white hover:bg-[#168A4A] text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-200"
              >
                <span>Read Full Research PDF</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Insights Shelf (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              {articles.map((art, idx) => (
                <motion.div
                  key={art.url}
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-5%" }}
                  transition={{ duration: 0.45, delay: prefersReducedMotion ? 0 : idx * 0.1 }}
                  className="bg-[#FFFDF8] border border-[#0F5132]/14 rounded-xl p-5 hover:border-[#168A4A]/35 hover:shadow-xs transition-all duration-300 group flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-1.5 py-0.5 text-[8px] font-mono font-extrabold uppercase tracking-wider text-[#0F5132] bg-[#EAF7EF] border border-[#0F5132]/10 rounded-sm">
                        {art.tag}
                      </span>
                      <span className="text-[9px] font-mono text-[#5F655F]">{art.badge}</span>
                    </div>
                    <h4 className="text-base font-serif font-bold text-[#171717] mb-1.5 leading-snug group-hover:text-[#0F5132] transition-colors">
                      {art.title}
                    </h4>
                    <p className="text-xs text-[#5F655F] leading-relaxed">
                      {art.desc}
                    </p>
                  </div>
                  <a
                    href={art.url}
                    target={art.url.startsWith("http") ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className="self-start sm:self-center shrink-0 w-9 h-9 rounded-full bg-[#FAF8F3] hover:bg-[#0F5132] text-[#0F5132] hover:text-white border border-[#0F5132]/10 flex items-center justify-center transition-all duration-200 shadow-3xs"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </motion.div>
              ))}
            </div>

            {/* Bottom Section: Topic Chips + Core Nav Links */}
            <div className="pt-6 border-t border-[#0F5132]/8 mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex flex-wrap gap-1.5 max-w-md">
                {topicChips.map((chip) => (
                  <span
                    key={chip}
                    className="text-[9.5px] font-mono font-medium px-2 py-0.5 rounded bg-white border border-[#0F5132]/8 text-[#5F655F]"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 shrink-0 text-xs font-bold">
                <Link
                  href="/research"
                  className="text-[#0F5132] hover:text-[#168A4A] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Research Library</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <span className="text-[#0F5132]/25 select-none">|</span>
                <Link
                  href="/blog"
                  className="text-[#0F5132] hover:text-[#168A4A] hover:underline flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Read Insights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
