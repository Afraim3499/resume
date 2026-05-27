"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Compass,
  Search,
  Workflow,
  Code,
  Cpu,
  TrendingUp,
  User,
  ShieldCheck,
  Sparkles,
  FileText,
  Download,
  Share2,
  Mail,
  Zap,
} from "lucide-react";
import Link from "next/link";

/* ─────────────────────── TYPES ─────────────────────── */

interface PathCardData {
  id: string;
  index: string;
  audienceLabel: string;
  title: string;
  description: string;
  bullets: string[][]; // Two columns of bullets
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
  visualType: "blueprint" | "resume" | "partnership";
}

/* ─────────────────────── CONSTANT DATA ─────────────────────── */

const ENGAGEMENT_PATHS: PathCardData[] = [
  {
    id: "founders-clients",
    index: "01",
    audienceLabel: "FOR FOUNDERS / CLIENTS",
    title: "Build or fix a business system.",
    description:
      "For teams dealing with messy operations, weak visibility, scattered content, manual workflows, or unclear product direction.",
    bullets: [
      [
        "Sales & market research systems",
        "Dashboards & reporting",
        "Website & SEO/AEO architecture",
      ],
      [
        "Automation workflows",
        "Product & platform architecture",
      ],
    ],
    primaryCtaLabel: "Start a Project",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "See related transformations",
    secondaryCtaHref: "#featured-transformations",
    visualType: "blueprint",
  },
  {
    id: "employers-recruiters",
    index: "02",
    audienceLabel: "FOR EMPLOYERS / RECRUITERS",
    title: "Hire for strategy, operations, and execution.",
    description:
      "For companies looking for someone who can work across marketing operations, sales operations, product operations, business development, growth systems, and technical coordination.",
    bullets: [
      [
        "Marketing Operations",
        "Sales Operations",
        "Product Operations",
      ],
      [
        "Business Development",
        "Growth Systems",
        "Technical Coordination",
      ],
    ],
    primaryCtaLabel: "View Resume",
    primaryCtaHref: "/resume",
    secondaryCtaLabel: "Download PDF",
    secondaryCtaHref: "/Rizwanul_Islam_Afraim_Resume.pdf", // Standard PDF download placeholder
    visualType: "resume",
  },
  {
    id: "collaborators-ventures",
    index: "03",
    audienceLabel: "FOR COLLABORATORS / VENTURES",
    title: "Explore long-term strategic collaboration.",
    description:
      "For founders, builders, media operators, sourcing businesses, education platforms, and venture teams who need someone who can think beyond a single task.",
    bullets: [
      [
        "Venture architecture",
        "Platform building",
        "Content infrastructure",
      ],
      [
        "Go-to-market systems",
        "AI / workflow automation",
        "Strategic product direction",
      ],
    ],
    primaryCtaLabel: "Discuss Collaboration",
    primaryCtaHref: "#contact",
    secondaryCtaLabel: "View ongoing systems",
    secondaryCtaHref: "#featured-transformations",
    visualType: "partnership",
  },
];

/* ─────────────────────── VISUAL SUB-COMPONENTS ─────────────────────── */

// 1. Blueprint Visual Artifact
function BlueprintVisual() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4 bg-[#FAF8F3] rounded-xl border border-[#0F5132]/5 relative select-none">
      <div className="grid grid-cols-12 gap-1.5 w-full items-center">
        {/* Scattered Messy Nodes (Left Side) */}
        <div className="col-span-5 relative h-28 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 120 100">
            {/* Connecting lines for scattered nodes */}
            <path d="M 20,30 L 50,20 L 70,55 L 35,70 Z" stroke="#168A4A" strokeWidth="0.5" strokeDasharray="2 3" fill="none" opacity="0.4" />
            <path d="M 50,20 L 90,35 L 70,55 L 60,85 L 35,70" stroke="#168A4A" strokeWidth="0.5" strokeDasharray="2 3" fill="none" opacity="0.4" />
            
            {/* Floating messy nodes */}
            <circle cx="20" cy="30" r="4.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
            <rect x="45" y="15" width="9" height="9" rx="1.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
            <circle cx="90" cy="35" r="4.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
            <circle cx="70" cy="55" r="4.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
            <rect x="30" y="65" width="9" height="9" rx="1.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
            <circle cx="60" cy="85" r="4.5" fill="#FAF8F3" stroke="#5F655F" strokeWidth="1" />
          </svg>
          <span className="text-[7.5px] font-mono font-bold text-[#5F655F]/60 uppercase tracking-widest absolute top-1">SCATTERED DATA</span>
        </div>

        {/* Transition Arrow */}
        <div className="col-span-1 flex justify-center text-[#168A4A] animate-pulse">
          <ArrowRight className="w-4 h-4 shrink-0" />
        </div>

        {/* Structured Workflow Nodes (Right Side) */}
        <div className="col-span-6 flex flex-col gap-1.5 pl-1.5 border-l border-[#0F5132]/10 relative py-1">
          <span className="text-[7px] font-mono font-bold text-[#168A4A] uppercase tracking-wider absolute -top-3 left-1.5">STRUCTURED SYSTEM</span>
          {[
            { label: "RESEARCH", icon: Search },
            { label: "SYSTEM DESIGN", icon: Workflow },
            { label: "IMPLEMENTATION", icon: Code },
            { label: "WORKFLOW", icon: Cpu },
            { label: "RESULTS", icon: TrendingUp },
          ].map((n, idx) => {
            const NodeIcon = n.icon;
            return (
              <div
                key={n.label}
                className="flex items-center gap-2 px-2 py-1 rounded bg-white border border-[#0F5132]/8 shadow-xs hover:border-[#168A4A]/30 transition-all duration-300"
              >
                <div className="w-4 h-4 rounded bg-[#EAF7EF] flex items-center justify-center shrink-0">
                  <NodeIcon className="w-2.5 h-2.5 text-[#0F5132]" />
                </div>
                <span className="text-[7.5px] font-mono font-bold text-[#171717] tracking-wider leading-none">
                  {n.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// 2. Resume Dossier Visual Artifact
function ResumeVisual() {
  const strengths = [
    "Systems Thinking",
    "Operational Excellence",
    "Cross-functional Execution",
    "Data-driven Decision Making",
    "Product & Platform Mindset",
  ];

  return (
    <div className="w-full min-h-[200px] p-3.5 bg-white border border-[#0F5132]/12 rounded-xl shadow-xs text-left font-sans select-none flex flex-col justify-between">
      {/* Dossier Header Info */}
      <div className="flex items-center gap-2 pb-2.5 border-b border-[#0F5132]/8">
        <div className="w-7 h-7 rounded-full bg-[#0F5132] flex items-center justify-center shrink-0">
          <User className="w-4 h-4 text-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h4 className="text-[10px] font-serif font-bold text-[#171717] leading-none">Rizwanul Islam Afraim</h4>
            <Sparkles className="w-2.5 h-2.5 text-amber-500 shrink-0" />
          </div>
          <p className="text-[7px] font-mono font-bold text-[#5F655F] uppercase tracking-wider mt-0.5 leading-none">
            Business Systems Operator &bull; Strategy &bull; Ops
          </p>
        </div>
      </div>

      {/* Two columns: Core Strengths & Experience visual */}
      <div className="grid grid-cols-12 gap-2.5 py-2">
        {/* Left Col: Core Strengths */}
        <div className="col-span-7 flex flex-col justify-center">
          <span className="text-[6.5px] font-mono font-bold text-[#168A4A] tracking-wider uppercase mb-1 leading-none block">
            CORE STRENGTHS
          </span>
          <ul className="flex flex-col gap-0.5">
            {strengths.map((str, idx) => (
              <li key={idx} className="flex items-center gap-1">
                <Check className="w-2 h-2 text-[#168A4A] shrink-0" />
                <span className="text-[7.5px] font-medium text-[#5F655F] leading-tight">{str}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Col: Experience Visualizer */}
        <div className="col-span-5 flex flex-col justify-center border-l border-[#0F5132]/5 pl-2 gap-1.5">
          <span className="text-[6.5px] font-mono font-bold text-[#168A4A] tracking-wider uppercase leading-none block">
            EXPERIENCE TRACK
          </span>
          <div className="space-y-1">
            {[75, 90, 60, 85].map((val, idx) => (
              <div key={idx} className="w-full bg-[#FAF8F3] h-1.5 rounded-full overflow-hidden border border-[#0F5132]/5">
                <div
                  className="bg-gradient-to-r from-[#0F5132] to-[#168A4A] h-full rounded-full"
                  style={{ width: `${val}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer: Tools Row */}
      <div className="pt-2 border-t border-[#0F5132]/8 flex items-center justify-between">
        <span className="text-[6px] font-mono font-bold text-[#5F655F]/60 uppercase tracking-widest">
          TOOLS & PLATFORMS
        </span>
        <div className="flex gap-1">
          {["Notion", "G-Suite", "Make", "Zapier", "Slack"].map((tool) => (
            <span
              key={tool}
              className="text-[6.5px] font-sans px-1 rounded-sm bg-[#FAF8F3] border border-[#0F5132]/10 text-[#5F655F] leading-normal"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 3. Partnership Visual Artifact
function PartnershipVisual() {
  return (
    <div className="w-full h-full min-h-[200px] flex items-center justify-center p-4 bg-[#FAF8F3] rounded-xl border border-[#0F5132]/5 relative overflow-hidden select-none">
      {/* Central Core with orbital outer circles */}
      <div className="relative w-28 h-28 flex items-center justify-center">
        {/* Orbital SVG dash lines */}
        <svg className="absolute inset-0 w-full h-full animate-[spin_40s_linear_infinite]" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" stroke="#168A4A" strokeWidth="0.5" strokeDasharray="3 4" fill="none" opacity="0.5" />
          <path d="M 50,15 L 85,50 L 50,85 L 15,50 Z" stroke="#168A4A" strokeWidth="0.25" strokeDasharray="1 2" fill="none" opacity="0.3" />
        </svg>

        {/* Center Node */}
        <div className="absolute z-10 w-11 h-11 rounded-full bg-[#0F5132] border border-[#168A4A]/30 flex flex-col items-center justify-center text-center shadow-md p-1">
          <Zap className="w-2.5 h-2.5 text-white animate-bounce mb-0.5" />
          <span className="text-[4.5px] font-mono font-extrabold text-white leading-tight uppercase tracking-wider">STRATEGIC CO-OP</span>
        </div>

        {/* Outer orbital nodes */}
        {/* Node 1: Top (YOUR VISION) */}
        <div className="absolute top-0 flex flex-col items-center justify-center text-center">
          <div className="w-5 h-5 rounded-full bg-white border border-[#0F5132]/10 shadow-xs flex items-center justify-center">
            <span className="text-[5px] font-mono font-bold text-[#0F5132]">VISION</span>
          </div>
          <span className="text-[4.5px] font-mono text-[#5F655F] uppercase mt-0.5 font-bold">YOUR INTENT</span>
        </div>

        {/* Node 2: Bottom Right (OUR SYSTEMS) */}
        <div className="absolute bottom-1 -right-1 flex flex-col items-center justify-center text-center">
          <div className="w-5 h-5 rounded-full bg-white border border-[#0F5132]/10 shadow-xs flex items-center justify-center">
            <span className="text-[5px] font-mono font-bold text-[#0F5132]">SYSTEM</span>
          </div>
          <span className="text-[4.5px] font-mono text-[#5F655F] uppercase mt-0.5 font-bold">MY ARCHITECT</span>
        </div>

        {/* Node 3: Bottom Left (SHARED GROWTH) */}
        <div className="absolute bottom-1 -left-1 flex flex-col items-center justify-center text-center">
          <div className="w-5 h-5 rounded-full bg-white border border-[#0F5132]/10 shadow-xs flex items-center justify-center">
            <span className="text-[5px] font-mono font-bold text-[#0F5132]">GROWTH</span>
          </div>
          <span className="text-[4.5px] font-mono text-[#5F655F] uppercase mt-0.5 font-bold">SHARED SCALE</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────── MAIN SECTION ─────────────────────── */

export function EngagementPathsSection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Helper to render active visual based on type
  const renderVisualArtifact = (type: "blueprint" | "resume" | "partnership") => {
    switch (type) {
      case "blueprint":
        return <BlueprintVisual />;
      case "resume":
        return <ResumeVisual />;
      case "partnership":
        return <PartnershipVisual />;
      default:
        return null;
    }
  };

  return (
    <section
      id="engagement-paths"
      className="relative bg-[#F7F4EC] text-[#171717] w-full py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* ─────────────────────── SEO / AEO / GEO DOM LAYER (Static XML representation) ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>Choose the right path based on what you need next.</h2>
        <p>
          Whether you need a business system built, a cross-functional strategy operator, or a long-term strategic collaborator, explore the three major personal engagement routes for Rizwanul Islam Afraim.
        </p>

        {ENGAGEMENT_PATHS.map((path) => (
          <article key={path.id} id={`seo-${path.id}`}>
            <h3>{path.title}</h3>
            <p><strong>Intent Category:</strong> {path.audienceLabel}</p>
            <p><strong>Target Target audience and pain points solved:</strong> {path.description}</p>
            <h4>Primary Capabilities & Systems Work:</h4>
            <ul>
              {path.bullets.flat().map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <p>
              Explore or initiate this track by routing directly to: <Link href={path.primaryCtaHref}>{path.primaryCtaLabel}</Link> or review proof at <Link href={path.secondaryCtaHref}>{path.secondaryCtaLabel}</Link>.
            </p>
          </article>
        ))}
        <article id="seo-notsure">
          <h3>Uncertain Routing</h3>
          <p>Not sure where to start? Send a short context note and I’ll route the conversation from there.</p>
          <Link href="#contact">Send a Message</Link>
        </article>
      </div>

      {/* ─────────────────────── HUMAN INTERACTIVE VIEWPORT ─────────────────────── */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        
        {/* Intro Block: Title & Subtitle in one cohesive row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-6">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2 leading-none">
              ENGAGEMENT PATHS
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              Choose the right path based on <span className="text-[#0F5132] italic">what you need next.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed max-w-lg md:text-right select-none">
            Whether you need a system built, a cross-functional operator, or a strategic collaborator, the next step should be clear.
          </p>
        </div>

        {/* 3 Horizontal Cards Stacked Vertically */}
        <div className="flex flex-col gap-4">
          {ENGAGEMENT_PATHS.map((card, idx) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : idx * 0.1, ease: "easeOut" }}
              className="group bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-5 md:p-6 shadow-xs hover:border-[#168A4A]/30 hover:shadow-md hover:shadow-[#168A4A]/5 transition-all duration-300 relative overflow-hidden grid grid-cols-12 gap-5 items-center"
            >
              {/* Left Side: Card Copy and Actions */}
              <div className="col-span-12 md:col-span-8 flex flex-col justify-between h-full gap-4">
                
                {/* Header Metadata */}
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/15 flex items-center justify-center text-[#0F5132] text-[10px] font-mono font-bold leading-none">
                      {card.index}
                    </div>
                    <span className="text-[9px] font-mono text-[#168A4A] font-bold tracking-wider uppercase">
                      {card.audienceLabel}
                    </span>
                  </div>
                  <h3 className="text-lg md:text-xl font-serif font-bold text-[#171717] mb-1.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs md:text-[13px] text-[#5F655F] leading-relaxed max-w-2xl">
                    {card.description}
                  </p>
                </div>

                {/* 2-Column Capability Bullets */}
                <div>
                  <span className="inline-block text-[8px] font-mono font-bold text-[#168A4A] tracking-wider uppercase mb-2">
                    What this path is for
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 max-w-xl">
                    {card.bullets.map((col, colIdx) => (
                      <div key={colIdx} className="flex flex-col gap-1.5">
                        {col.map((bullet) => (
                          <div key={bullet} className="flex items-start gap-2">
                            <Check className="w-3.5 h-3.5 text-[#168A4A] shrink-0 mt-0.5" />
                            <span className="text-xs md:text-[13px] text-[#5F655F] font-medium leading-tight">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="flex flex-wrap items-center gap-4 mt-1 border-t border-[#0F5132]/8 pt-3">
                  <Link
                    href={card.primaryCtaHref}
                    className="px-4 py-2 rounded-full bg-[#0F5132] text-white hover:bg-[#168A4A] transition-colors duration-200 text-xs md:text-sm font-semibold flex items-center gap-1.5 shadow-xs cursor-pointer group-hover:scale-[1.01]"
                  >
                    <span>{card.primaryCtaLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform duration-200" />
                  </Link>

                  {card.secondaryCtaLabel === "Download PDF" ? (
                    <a
                      href={card.secondaryCtaHref}
                      download
                      className="text-xs md:text-sm font-semibold text-[#168A4A] hover:text-[#0F5132] hover:underline flex items-center gap-1.5 transition-colors duration-200 cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5 shrink-0" />
                      <span>{card.secondaryCtaLabel}</span>
                    </a>
                  ) : (
                    <Link
                      href={card.secondaryCtaHref}
                      className="text-xs md:text-sm font-semibold text-[#168A4A] hover:text-[#0F5132] hover:underline flex items-center gap-1 transition-colors duration-200 cursor-pointer"
                    >
                      <span>{card.secondaryCtaLabel}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  )}
                </div>

              </div>

              {/* Right Side: Interactive High-Fidelity Visual Artifact Panel */}
              <div className="col-span-12 md:col-span-4 flex items-center justify-center p-2 rounded-xl bg-[#FAF8F3]/50 border border-[#0F5132]/5 h-full self-stretch min-h-[220px]">
                <div className="w-full max-w-[280px] md:max-w-full">
                  {renderVisualArtifact(card.visualType)}
                </div>
              </div>

            </motion.div>
          ))}
        </div>

        {/* ──── Bottom "Not Sure?" strip ──── */}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.2 }}
          className="mt-6 p-4 px-6 bg-[#FAF8F3] border border-[#0F5132]/12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-2xs hover:border-[#168A4A]/20 transition-all duration-300"
        >
          <div className="flex items-center gap-3.5 select-none w-full md:w-auto">
            {/* Dashed circular compass icon wrapper */}
            <div className="w-9 h-9 rounded-full border border-dashed border-[#168A4A]/40 flex items-center justify-center bg-white shrink-0 text-[#168A4A] shadow-3xs">
              <Compass className="w-4 h-4 animate-[spin_90s_linear_infinite]" />
            </div>
            <div>
              <h4 className="text-xs font-serif font-bold text-[#171717] leading-none mb-0.5">Not sure where to start?</h4>
              <p className="text-[11px] md:text-xs text-[#5F655F] leading-tight">
                Send a short context note and I&apos;ll route the conversation from there.
              </p>
            </div>
          </div>

          <Link
            href="#contact"
            className="w-full md:w-auto px-4.5 py-2.5 rounded-full bg-[#0F5132] text-white hover:bg-[#168A4A] transition-colors duration-200 text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>Send a Message</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
