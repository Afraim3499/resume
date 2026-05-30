"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, BookOpen, Quote, Star, ArrowRight, ExternalLink, ShieldCheck, Cpu, LayoutGrid, Zap } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import Link from "next/link";
import { fadeUp } from "@/lib/animations";

type TabId = "metrics" | "publications" | "testimonials";

interface MetricItem {
  value: string;
  label: string;
  description: string;
  icon: typeof Zap;
}

const mainMetrics: MetricItem[] = [
  {
    value: "1M+",
    label: "Data Points Processed",
    description: "Mission-critical data points analyzed and verified for global enterprises at Quantanite.",
    icon: Cpu
  },
  {
    value: "25k+",
    label: "Event Attendees",
    description: "Orchestrated large-scale events and programs logistics as VP of Programs at NSUSS.",
    icon: ShieldCheck
  },
  {
    value: "6+",
    label: "Production Ventures",
    description: "Platforms built and launched (Gaari, The Trail, Vibrance, Carnival of Crust, Yagacalls, CRM).",
    icon: LayoutGrid
  },
  {
    value: "98/100",
    label: "Lighthouse Performance",
    description: "Achieved ultra-fast pages with zero CLS, ensuring high conversion on mobile storefronts.",
    icon: Zap
  },
  {
    value: "200+",
    label: "Team Members Led",
    description: "Coordinated cross-department operations to streamline planning, execution, and BPO workflows.",
    icon: ShieldCheck
  },
  {
    value: "150+",
    label: "Modular Components",
    description: "Bespoke UI nodes engineered and maintained across commercial CMS and booking platforms.",
    icon: LayoutGrid
  }
];

const secondaryMetrics = [
  { value: "110+", label: "API Endpoints", description: "Built with Next.js & Supabase" },
  { value: "35+", label: "Articles / Publications", description: "Across SSRN, Medium, & Dev.to" },
  { value: "30+", label: "Database Tables", description: "Complex schemas designed & optimized" },
  { value: "100%", label: "Type-Safe Development", description: "TypeScript workflow" }
];

export function ProofOfImpact() {
  const [activeTab, setActiveTab] = useState<TabId>("metrics");
  const [showSecondary, setShowSecondary] = useState(false);

  const tabs = [
    { id: "metrics", label: "Key Metrics", icon: BarChart3 },
    { id: "publications", label: "Research & Publications", icon: BookOpen },
    { id: "testimonials", label: "Client Reviews", icon: Quote }
  ] as const;

  return (
    <section id="proof-of-impact" className="py-24 md:py-32 bg-[#FDFBF7] text-[#1F2022] relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,81,50,0.01),transparent_60%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-xs font-semibold tracking-wider uppercase mb-5 leading-none">
            Credibility Dashboard
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium tracking-tight text-[#1F2022] mb-6">
            Proof of <span className="text-[#0F5132] italic">Impact</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#5F5A52] leading-relaxed max-w-2xl mx-auto font-sans">
            Quantifying success through data operations, academic publication, community feature story archives, and peer validation.
          </p>
        </motion.div>

        {/* Tab Controls (Segmented Control on Desktop, stack on Mobile) */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-2 mb-12 p-1.5 bg-[#FFFDF8] border border-[#E6D8C8] rounded-2xl max-w-2xl mx-auto">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0F5132] text-white shadow-sm"
                    : "text-[#5F5A52] hover:bg-[#0F5132]/5 hover:text-[#0F5132]"
                }`}
              >
                <TabIcon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Dashboard Panels */}
        <div className="min-h-[420px] bg-[#FFFDF8] border border-[#E6D8C8] rounded-3xl p-6 md:p-10 shadow-sm relative">
          <AnimatePresence mode="wait">
            {activeTab === "metrics" && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-8 font-sans"
              >
                {/* Main Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mainMetrics.map((item) => {
                    const MetricIcon = item.icon;
                    return (
                      <div key={item.label} className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E6D8C8]/60 hover:border-[#0F5132]/20 transition-colors">
                        <div className="flex items-center gap-3 mb-3 text-[#0F5132]">
                          <MetricIcon className="w-5 h-5" />
                          <span className="text-3xl md:text-4xl font-serif font-bold tracking-tight">
                            {item.value}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#1F2022] mb-1">
                          {item.label}
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Expandable Secondary Metrics */}
                <div className="pt-6 border-t border-[#E6D8C8]/60 text-center">
                  {!showSecondary ? (
                    <button
                      onClick={() => setShowSecondary(true)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0F5132] hover:text-[#168A4A] transition-colors"
                    >
                      Show Detailed Specifications <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {secondaryMetrics.map((sm) => (
                          <div key={sm.label} className="p-4 rounded-xl bg-[#FDFBF7] border border-[#E6D8C8]/30">
                            <div className="text-lg font-bold text-[#0F5132]">{sm.value}</div>
                            <div className="text-xs font-semibold text-[#1F2022]">{sm.label}</div>
                            <div className="text-[10px] text-[#5F5A52] mt-0.5">{sm.description}</div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowSecondary(false)}
                        className="text-xs font-semibold text-[#5F5A52] hover:text-[#0F5132] transition-colors"
                      >
                        Hide Details
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "publications" && (
              <motion.div
                key="publications"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-10"
              >
                {/* Academic SSRN Papers */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F5A52]/60 mb-4 font-sans">
                    Academic Research & Foundations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E6D8C8] flex flex-col justify-between h-full">
                      <div>
                        <span className="inline-block text-[10px] font-bold text-[#0F5132] uppercase tracking-wider mb-2 font-sans">
                          Agentic AI & Economics
                        </span>
                        <h4 className="text-lg font-serif font-medium text-[#1F2022] mb-3 leading-snug">
                          Agentic AI as Coordination Infrastructure Technology: Structural Implications for Firms, Growth, and Economic Divergence
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed mb-6 font-sans">
                          Exploring how agentic AI compresses coordination costs, reshapes firms, and may widen divergence between AI-orchestrating and AI-consuming economies.
                        </p>
                      </div>
                      <Link
                        href="/research/agentic-ai-coordination-infrastructure"
                        className="inline-flex items-center justify-between px-4 py-2 rounded-lg bg-[#0F5132]/5 hover:bg-[#0F5132] text-[#0F5132] hover:text-white font-sans text-xs font-semibold transition-all group"
                      >
                        Read SSRN Research
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E6D8C8] flex flex-col justify-between h-full">
                      <div>
                        <span className="inline-block text-[10px] font-bold text-[#0F5132] uppercase tracking-wider mb-2 font-sans">
                          Business Intelligence & ML
                        </span>
                        <h4 className="text-lg font-serif font-medium text-[#1F2022] mb-3 leading-snug">
                          Power BI in the AI Era: Assessing Its 2026 Effectiveness
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed mb-6 font-sans">
                          Evaluating the evolution of business intelligence platforms against AI-driven coding environments and Python analytics in a hybrid ecosystem.
                        </p>
                      </div>
                      <Link
                        href="/research/power-bi-ai-era-2026-effectiveness"
                        className="inline-flex items-center justify-between px-4 py-2 rounded-lg bg-[#0F5132]/5 hover:bg-[#0F5132] text-[#0F5132] hover:text-white font-sans text-xs font-semibold transition-all group"
                      >
                        Read Research
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Medium & Dev.to Articles */}
                <div className="pt-6 border-t border-[#E6D8C8]/60">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#5F5A52]/60 mb-4 font-sans">
                    Thought-Leadership & Technical Authority
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                    {/* Medium 1 */}
                    <a
                      href="https://kalababascrypto.medium.com/beyond-hello-world-meet-the-architect-reimagining-dhakas-digital-infrastructure-41482724e196"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-[#FDFBF7] border border-[#E6D8C8]/60 hover:border-[#0F5132]/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="block text-[9px] font-bold text-[#5F5A52]/60 uppercase mb-2">Featured Story</span>
                        <h4 className="text-sm font-bold text-[#1F2022] mb-2 leading-snug group-hover:text-[#0F5132] transition-colors">
                          Beyond &quot;Hello World&quot;
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed mb-4">
                          Independent deep-dive into the architectural philosophy behind Gaari and Dhaka&apos;s systems.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F5132] mt-auto">
                        Read on Medium <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    {/* Medium 2 */}
                    <a
                      href="https://medium.com/@rizwanulislamafraim/the-death-of-the-coder-why-i-became-a-system-architect-276563ae6338"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-[#FDFBF7] border border-[#E6D8C8]/60 hover:border-[#0F5132]/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="block text-[9px] font-bold text-[#5F5A52]/60 uppercase mb-2">My Manifesto</span>
                        <h4 className="text-sm font-bold text-[#1F2022] mb-2 leading-snug group-hover:text-[#0F5132] transition-colors">
                          The Death of the &quot;Coder&quot;
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed mb-4">
                          Why I transitioned from syntax details to system orchestration, and how to future-proof careers.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F5132] mt-auto">
                        Read on Medium <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>

                    {/* Dev.to */}
                    <a
                      href="https://dev.to/rizwanul_islam_afraim"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-5 rounded-xl bg-[#FDFBF7] border border-[#E6D8C8]/60 hover:border-[#0F5132]/30 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <span className="block text-[9px] font-bold text-[#5F5A52]/60 uppercase mb-2">Dev.to HQ</span>
                        <h4 className="text-sm font-bold text-[#1F2022] mb-2 leading-snug group-hover:text-[#0F5132] transition-colors">
                          Technical Authority
                        </h4>
                        <p className="text-xs text-[#5F5A52] leading-relaxed mb-4">
                          Architectural breakdowns on RAG pipelines, database optimizations, and system layouts.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0F5132] mt-auto">
                        Visit Dev.to Profile <ExternalLink className="w-3 h-3" />
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "testimonials" && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="space-y-6 font-sans"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map((test) => (
                    <div key={test.id} className="p-6 rounded-2xl bg-[#FDFBF7] border border-[#E6D8C8] flex flex-col justify-between relative">
                      <div>
                        <Quote className="w-7 h-7 text-[#0F5132]/10 mb-3 absolute top-6 right-6" />
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(test.rating || 5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-[#5F5A52] leading-relaxed mb-6 italic">
                          &quot;{test.content}&quot;
                        </p>
                      </div>
                      <div className="pt-4 border-t border-[#E6D8C8]/60 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-[#1F2022]">{test.name}</div>
                          <div className="text-[10px] text-[#5F5A52]/80">
                            {test.role} {test.company && `at ${test.company}`}
                          </div>
                        </div>
                        {test.companyUrl && (
                          <a
                            href={test.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-semibold text-[#0F5132] hover:underline flex items-center gap-1"
                          >
                            Site <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
