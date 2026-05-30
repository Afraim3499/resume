"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Workflow,
  TrendingUp,
  Cpu,
  Rocket,
  AlertTriangle,
  Send,
  Crosshair,
  Binoculars,
  UserCheck,
  Database,
  Layers,
  ChevronRight,
  Map,
  Layout,
  BookOpen,
  GitMerge,
  Activity,
  Sliders,
  Network,
  MousePointer,
  GitCommit,
  GitPullRequest,
  ArrowRight,
  Check,
  CheckCircle,
  Code,
  Webhook,
  ShieldAlert,
  Clock,
  Compass,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { MobileLeverageFinder } from "./MobileLeverageFinder";

/* ─────────────────────── DATA TYPES ─────────────────────── */

interface BlueprintNode {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ProofItem {
  title: string;
  subtitle: string;
  icon: "database" | "car" | "trending" | "webhook" | "layers";
}

interface RelatedProject {
  name: string;
  icon: "database" | "car" | "layers" | "search";
}

interface LeverageArea {
  id: string;
  index: string;
  selectorLabel: string;
  formalHeading: string;
  systemPath: string[];
  clientProblem: string;
  diagnose: string[];
  build: BlueprintNode[];
  outcomes: string[];
  relatedProof: ProofItem[];
  relatedProjects: RelatedProject[];
  ctaLabel: string;
  ctaHref: string;
  calloutText: string;
  seoIntentTerms: string[];
}

/* ─────────────────────── STREAMLINED CONSTANT DATA ─────────────────────── */

const LEVERAGE_AREAS: LeverageArea[] = [
  {
    id: "sales-ops",
    index: "01",
    selectorLabel: "Lead Quality",
    formalHeading: "Sales & Market Operations",
    systemPath: ["Research", "CRM", "Outreach"],
    clientProblem: "Leads exist, but targeting, qualification, follow-up, and reporting are scattered.",
    diagnose: [
      "Weak lead qualification logic",
      "Unclear Ideal Customer Profile (ICP)",
      "Scattered, manual market research",
      "Messy CRM pipelines & stages",
    ],
    build: [
      {
        title: "Market Research",
        description: "Analyze buying signals",
        icon: Binoculars,
      },
      {
        title: "ICP & Lead Mapping",
        description: "Identify target accounts",
        icon: Crosshair,
      },
      {
        title: "Lead Qualification",
        description: "Filter high-prob leads",
        icon: UserCheck,
      },
      {
        title: "CRM Workflow",
        description: "Define pipeline stages",
        icon: Database,
      },
      {
        title: "Outreach System",
        description: "Deploy follow-up cadence",
        icon: Send,
      },
      {
        title: "Reporting Dashboard",
        description: "Track pipeline values",
        icon: TrendingUp,
      },
    ],
    outcomes: [
      "Cleaner target accounts",
      "Faster outreach cycles",
      "Disciplined lead follow-ups",
      "Visible sales conversions",
    ],
    relatedProof: [
      { title: "Operational Workflow CRM", subtitle: "Sales operations system", icon: "database" },
      { title: "Gaari", subtitle: "Travel & booking platform", icon: "car" },
    ],
    relatedProjects: [
      { name: "Operational Workflow CRM", icon: "database" },
      { name: "Gaari", icon: "car" },
    ],
    ctaLabel: "See sales systems work",
    ctaHref: "#featured-transformations",
    calloutText: "The goal is not more leads. The goal is the right leads, in the right system, with the right follow-up.",
    seoIntentTerms: [
      "sales operations systems",
      "lead research workflows",
      "CRM workflow design",
      "market research operations",
      "competitor intelligence system",
    ],
  },
  {
    id: "operational-visibility",
    index: "02",
    selectorLabel: "Operational Clarity",
    formalHeading: "Operational Visibility Systems",
    systemPath: ["Workflow", "Dashboard", "Decisions"],
    clientProblem: "Work happens across tools, but leaders cannot see delayed tasks or blocked workflows.",
    diagnose: [
      "Hidden process bottlenecks",
      "No single source of task truth",
      "Scattered, silent task ownership",
      "Assumptions-based decisions",
    ],
    build: [
      {
        title: "Workflow Audit",
        description: "Map human processes",
        icon: Map,
      },
      {
        title: "Tracking Engine",
        description: "Establish task boards",
        icon: Layout,
      },
      {
        title: "SOP Framework",
        description: "Document playbooks",
        icon: BookOpen,
      },
      {
        title: "Data Aggregator",
        description: "Sync tool activities",
        icon: GitMerge,
      },
      {
        title: "Team Dashboard",
        description: "Chart task velocity",
        icon: Activity,
      },
      {
        title: "Decision Loops",
        description: "Structure weekly reviews",
        icon: Sliders,
      },
    ],
    outcomes: [
      "Clearer decision-making",
      "Zero workflow confusion",
      "Predictable team velocity",
      "Visible task delay spots",
    ],
    relatedProof: [
      { title: "The Trailheadline", subtitle: "Custom editorial workflow", icon: "layers" },
      { title: "Operational Workflow CRM", subtitle: "Venture database platform", icon: "database" },
    ],
    relatedProjects: [
      { name: "The Trailheadline", icon: "layers" },
      { name: "Operational Workflow CRM", icon: "database" },
    ],
    ctaLabel: "See operations work",
    ctaHref: "#featured-transformations",
    calloutText: "Clear workflows eliminate operational drag. What gets measured gets managed, and what gets managed gets optimized.",
    seoIntentTerms: [
      "operations dashboards",
      "workflow tracking systems",
      "business reporting systems",
      "SOP systems",
      "operational visibility",
    ],
  },
  {
    id: "search-growth",
    index: "03",
    selectorLabel: "Website & Search Growth",
    formalHeading: "SEO / AEO / GEO Content Infrastructure",
    systemPath: ["SEO", "AEO", "Conversion"],
    clientProblem: "Your website exists, but it fails to rank or answer intent queries on AI search engines.",
    diagnose: [
      "Weak search intent mapping",
      "Missing semantic entity logic",
      "Thin, disconnected linking",
      "Pages not optimized for AI",
    ],
    build: [
      {
        title: "Intent Mapping",
        description: "Cluster search queries",
        icon: Search,
      },
      {
        title: "Entity Schema",
        description: "Structure JSON-LD markup",
        icon: Network,
      },
      {
        title: "Content Clusters",
        description: "Author authority hubs",
        icon: Layers,
      },
      {
        title: "SXO Optimization",
        description: "Maximize page speeds",
        icon: MousePointer,
      },
      {
        title: "Conversion Paths",
        description: "Align sticky CTAs",
        icon: GitCommit,
      },
      {
        title: "A/B Analytics",
        description: "Measure user actions",
        icon: Activity,
      },
    ],
    outcomes: [
      "Better search visibility",
      "Higher topical authority",
      "Clearer conversion paths",
      "Excellent LLM readability",
    ],
    relatedProof: [
      { title: "Yagacalls", subtitle: "Organic lead capture", icon: "trending" },
      { title: "InshortBD", subtitle: "Media SEO optimization", icon: "layers" },
    ],
    relatedProjects: [
      { name: "InshortBD", icon: "layers" },
      { name: "The Trailheadline", icon: "layers" },
    ],
    ctaLabel: "See search growth work",
    ctaHref: "#featured-transformations",
    calloutText: "AI search and GEO are about answers, not keywords. We build search systems that search engines love and humans trust.",
    seoIntentTerms: [
      "SEO content architecture",
      "AEO optimization",
      "GEO optimization",
      "AI search visibility",
      "internal linking strategy",
    ],
  },
  {
    id: "automation-workflow",
    index: "04",
    selectorLabel: "Automation & Workflow",
    formalHeading: "Automation & Operating Systems",
    systemPath: ["Manual Work", "Rules", "Scale"],
    clientProblem: "High-value teams repeat the same data copying, manual syncs, and tool updates.",
    diagnose: [
      "Repetitive manual entry work",
      "Disconnected tool silos",
      "Delayed, manual spreadsheets",
      "Slow operational cycles",
    ],
    build: [
      {
        title: "Trigger Audit",
        description: "Audit manual workflows",
        icon: AlertTriangle,
      },
      {
        title: "Logic Rules",
        description: "Code process checks",
        icon: Code,
      },
      {
        title: "API Connections",
        description: "Integrate database pipelines",
        icon: Webhook,
      },
      {
        title: "AI Synthesis",
        description: "Deploy LLM summary tools",
        icon: Cpu,
      },
      {
        title: "Failsafe Queues",
        description: "Prevent API data loss",
        icon: ShieldAlert,
      },
      {
        title: "Savings Dashboard",
        description: "Track hours recovered",
        icon: Clock,
      },
    ],
    outcomes: [
      "Zero human data entry errors",
      "Blazing fast workflow cycles",
      "Immediate cross-tool updates",
      "Fewer operational bottlenecks",
    ],
    relatedProof: [
      { title: "Operational Workflow CRM", subtitle: "Automated sales triggers", icon: "database" },
      { title: "Yagacalls", subtitle: "Auto lead distribution", icon: "trending" },
    ],
    relatedProjects: [
      { name: "Operational Workflow CRM", icon: "database" },
      { name: "InshortBD", icon: "layers" },
    ],
    ctaLabel: "See automation work",
    ctaHref: "#featured-transformations",
    calloutText: "Automation isn't just about saving time; it's about removing human error and building a business that runs while you sleep.",
    seoIntentTerms: [
      "workflow automation",
      "AI workflow automation",
      "reporting automation",
      "operations automation",
      "business process automation",
    ],
  },
  {
    id: "product-execution",
    index: "05",
    selectorLabel: "Product Execution",
    formalHeading: "Product & Venture Execution Systems",
    systemPath: ["Idea", "System", "Launch"],
    clientProblem: "You have product ideas, but lack structured data schemas or logical MVPs.",
    diagnose: [
      "Over-inflated product scope",
      "Disjointed user logic flows",
      "Weak database schemas",
      "Poor admin control dashboards",
    ],
    build: [
      {
        title: "Scope Definition",
        description: "Map minimal features",
        icon: Compass,
      },
      {
        title: "Data Modeling",
        description: "Design relational schemas",
        icon: Database,
      },
      {
        title: "UX & Logic Mapping",
        description: "Wireframe routes & rules",
        icon: GitPullRequest,
      },
      {
        title: "Full-Stack Build",
        description: "Assemble Next.js codebase",
        icon: Cpu,
      },
      {
        title: "Backoffice Admin",
        description: "Build admin control panels",
        icon: Sliders,
      },
      {
        title: "Secure Launch",
        description: "Deploy with telemetry",
        icon: Rocket,
      },
    ],
    outcomes: [
      "Clear product roadmaps",
      "Zero rebuild development waste",
      "Robust, clean UX logic",
      "Scalability of databases",
    ],
    relatedProof: [
      { title: "Gaari", subtitle: "E-travel booking engine", icon: "car" },
      { title: "The Trailheadline", subtitle: "Modern custom CMS platform", icon: "layers" },
    ],
    relatedProjects: [
      { name: "Gaari", icon: "car" },
      { name: "Arrivals Cave", icon: "database" },
    ],
    ctaLabel: "See product systems work",
    ctaHref: "#featured-transformations",
    calloutText: "An MVP isn't a draft; it's a tight operational engine. Build once, build correctly, and launch with architectural confidence.",
    seoIntentTerms: [
      "product architecture",
      "MVP architecture",
      "CMS development",
      "digital venture architecture",
      "venture building",
    ],
  },
];

/* ─────────────────────── COMPONENT ─────────────────────── */

export function LeverageFinder() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
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

  const active = LEVERAGE_AREAS[activeIndex];

  // Map icon strings to Lucide components
  const renderProofIcon = (iconName: string) => {
    switch (iconName) {
      case "database":
        return <Database className="w-3.5 h-3.5 text-[#0F5132]" />;
      case "car":
        return <Rocket className="w-3.5 h-3.5 text-[#0F5132]" />;
      case "trending":
        return <TrendingUp className="w-3.5 h-3.5 text-[#0F5132]" />;
      case "webhook":
        return <Cpu className="w-3.5 h-3.5 text-[#0F5132]" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-[#0F5132]" />;
    }
  };

  const renderProjectIcon = (iconName: string) => {
    switch (iconName) {
      case "database":
        return <Database className="w-3 h-3 text-[#5F655F]" />;
      case "car":
        return <Rocket className="w-3 h-3 text-[#5F655F]" />;
      case "layers":
        return <Layers className="w-3 h-3 text-[#5F655F]" />;
      default:
        return <Search className="w-3 h-3 text-[#5F655F]" />;
    }
  };

  return (
    <section
      id="leverage-finder"
      className="relative bg-[#F7F4EC] text-[#171717] w-full py-6 md:py-8 lg:py-10 overflow-hidden"
    >
      {/* ─────────────────────── SEO SEMANTIC LAYER (Crawlers & LLMs) ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>Where I create the most leverage</h2>
        <p>
          Most business problems are not solved by adding more tools. They are solved by finding the
          constraint and building the right system around it.
        </p>
        {LEVERAGE_AREAS.map((area) => (
          <article key={area.id} id={`seo-leverage-${area.id}`}>
            <h3>{area.formalHeading}</h3>
            <p>
              <strong>Constraint:</strong> {area.selectorLabel}
            </p>
            <p>
              <strong>System Architecture:</strong> {area.systemPath.join(" → ")}
            </p>
            <p>
              <strong>Client Operational Bottleneck:</strong> {area.clientProblem}
            </p>
            <h4>What I Diagnose</h4>
            <ul>
              {area.diagnose.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <h4>The 6-Step System I Build</h4>
            <ol>
              {area.build.map((step, idx) => (
                <li key={idx}>
                  <strong>{step.title}</strong>: {step.description}
                </li>
              ))}
            </ol>
            <h4>Target Outcomes & Business Results</h4>
            <ul>
              {area.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p>
              <strong>Related Proof:</strong>{" "}
              {area.relatedProof.map((p) => `${p.title} (${p.subtitle})`).join(", ")}
            </p>
            <p>
              <strong>Semantic Intent Tags:</strong> {area.seoIntentTerms.join(", ")}
            </p>
            <Link href={area.ctaHref}>{area.ctaLabel}</Link>
          </article>
        ))}
      </div>

      {/* ─────────────────────── INTERACTIVE VISUAL LAYER (Humans - Desktop only) ─────────────────────── */}
      <div className="hidden lg:block container mx-auto max-w-7xl px-4 md:px-8">
        
        {/* Viewport-Fitted Compact Header Row: Title & Subtitle in one line (Aligned to visual system) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-3.5">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2 leading-none">
              LEVERAGE FINDER
            </span>
            <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              Where I create <span className="text-[#0F5132] italic">the most leverage.</span>
            </h2>
          </div>
          <p className="text-xs md:text-[13px] text-[#5F655F] leading-relaxed max-w-lg md:text-right select-none">
            Most business problems are not solved by adding more tools. They are solved by finding the constraint and building the right system.
          </p>
        </div>

        {/* CAPSULE-SIZED SELECTORS: Zero horizontal scrolling, fits perfectly, wraps naturally on mobile */}
        <div className="flex flex-wrap gap-2.5 mb-4 w-full justify-start items-center">
          {LEVERAGE_AREAS.map((area, i) => {
            const isActive = activeIndex === i;
            const SelectorIcon = area.id === "sales-ops" ? Search
                               : area.id === "operational-visibility" ? Workflow
                               : area.id === "search-growth" ? TrendingUp
                               : area.id === "automation-workflow" ? Cpu
                               : Rocket;
            return (
              <button
                key={area.id}
                onClick={() => setActiveIndex(i)}
                aria-pressed={isActive}
                className={`px-3.5 py-1.5 rounded-full border text-[11.5px] font-serif font-bold transition-all duration-200 cursor-pointer focus:outline-hidden flex items-center gap-2 leading-none ${
                  isActive
                    ? "bg-[#0F5132] text-white border-[#0F5132] shadow-sm shadow-[#0F5132]/10"
                    : "bg-white border-[#0F5132]/10 text-[#5F655F] hover:border-[#0F5132]/25 hover:text-[#0F5132] hover:bg-[#FFFDF8]"
                }`}
              >
                <span className={`text-[8.5px] font-mono font-semibold ${isActive ? "text-white/80" : "text-[#0F5132]"}`}>
                  {area.index}
                </span>
                <SelectorIcon className="w-3.5 h-3.5" />
                <span>{area.selectorLabel}</span>
              </button>
            );
          })}
        </div>

        {/* ─────────────────────── MAIN BLUEPRINT PANEL (Extremely Compact) ─────────────────────── */}
        <div className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="bg-white border border-[#0F5132]/14 rounded-2xl p-5 shadow-xs relative overflow-hidden"
            >
              {/* Top Section: Three-column layout (Left: Constraint, Center: Node Path, Right: Outcomes) */}
              <div className="grid grid-cols-12 gap-5 lg:gap-6 items-stretch pb-4 border-b border-[#0F5132]/10">
                
                {/* 1. Left Column: Constraint Identity & Diagnostics (Streamlined) */}
                <div className="col-span-12 lg:col-span-3 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#0F5132]/10 pb-4 lg:pb-0 lg:pr-5">
                  <div>
                    <span className="inline-block text-[8px] font-mono font-bold text-[#0F5132] tracking-wider uppercase mb-1">
                      Selected Constraint
                    </span>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-1.5 rounded-lg bg-[#EAF7EF]">
                        {active.id === "sales-ops" ? <Search className="w-4 h-4 text-[#0F5132]" />
                         : active.id === "operational-visibility" ? <Workflow className="w-4 h-4 text-[#0F5132]" />
                         : active.id === "search-growth" ? <TrendingUp className="w-4 h-4 text-[#0F5132]" />
                         : active.id === "automation-workflow" ? <Cpu className="w-4 h-4 text-[#0F5132]" />
                         : <Rocket className="w-4 h-4 text-[#0F5132]" />}
                      </div>
                      <h3 className="text-base md:text-lg font-serif font-bold text-[#171717]">{active.selectorLabel}</h3>
                    </div>
                    <p className="text-xs md:text-[13px] text-[#5F655F] leading-relaxed mb-3">
                      {active.clientProblem}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-[8px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                        I Diagnose
                      </span>
                    </div>
                    <ul className="flex flex-col gap-1 text-[11px] md:text-xs text-[#5F655F] font-medium pl-1">
                      {active.diagnose.map((d, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold leading-none select-none">•</span>
                          <span className="leading-tight">{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 2. Center Column: Widescreen Horizontal Node Blueprint (Compact) */}
                <div className="col-span-12 lg:col-span-6 flex flex-col justify-between py-0.5 border-b lg:border-b-0 lg:border-r border-[#0F5132]/10 pb-4 lg:pb-0 lg:px-4">
                  <div className="w-full">
                    <span className="inline-block text-[8px] font-mono font-bold text-[#0F5132] tracking-wider uppercase mb-2">
                      The System I Build
                    </span>

                    {/* Custom CSS/SVG Horizontal Node Path */}
                    <div className="relative w-full flex flex-col md:flex-row items-center md:items-stretch md:justify-between gap-5 md:gap-1 py-3">
                      
                      {/* Horizontal connecting dotted background line (Desktop only) */}
                      <div className="absolute top-[22px] left-[5%] right-[5%] h-0.5 border-t-2 border-dashed border-[#168A4A]/20 hidden md:block pointer-events-none" />

                      {active.build.map((node, i) => {
                        const NodeIcon = node.icon;
                        return (
                          <div key={i} className="flex-1 flex flex-col items-center text-center relative z-10 w-full max-w-[120px] md:max-w-none">
                            {/* Compact Circular Icon badge */}
                            <div className="w-9 h-9 rounded-full bg-[#FFFDF8] border border-[#0F5132]/15 flex items-center justify-center shadow-xs group hover:border-[#0F5132] transition-colors duration-300">
                              <div className="w-6.5 h-6.5 rounded-full bg-[#EAF7EF] border border-[#168A4A]/10 flex items-center justify-center shrink-0">
                                <NodeIcon className="w-3.5 h-3.5 text-[#0F5132]" />
                              </div>
                            </div>

                            {/* Node Metadata */}
                            <h4 className="text-[10.5px] font-serif font-bold text-[#171717] mt-2 mb-0.5 leading-none">
                              {node.title}
                            </h4>
                            <p className="text-[9px] text-[#5F655F] leading-tight px-0.5 hidden md:block select-none">
                              {node.description}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Philosophy Callout Box (Consolidated) */}
                  <div className="mt-2.5 p-2 px-3 bg-[#EAF7EF] border border-[#168A4A]/20 rounded-lg flex items-center gap-2.5">
                    <div className="w-6.5 h-6.5 rounded-full bg-[#0F5132] flex items-center justify-center text-white shrink-0 shadow-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-white" />
                    </div>
                    <p className="text-xs md:text-[13px] text-[#0F5132] font-semibold leading-relaxed italic">
                      &ldquo;{active.calloutText}&rdquo;
                    </p>
                  </div>
                </div>

                {/* 3. Right Column: What Changes After & Related Proof (Compact) */}
                <div className="col-span-12 lg:col-span-3 flex flex-col justify-between pl-0 lg:pl-5">
                  {/* Changes Section */}
                  <div>
                    <span className="inline-block text-[8px] font-mono font-bold text-[#0F5132] tracking-wider uppercase mb-1.5">
                      What Changes After
                    </span>
                    <ul className="flex flex-col gap-1 text-[11px] md:text-xs text-[#5F655F] font-medium pl-1 mb-4">
                      {active.outcomes.map((o, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-[#168A4A] shrink-0 mt-0.5" />
                          <span className="leading-tight">{o}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Related Proof Cards (Limited to 2 items for extreme height efficiency) */}
                  <div>
                    <span className="inline-block text-[8px] font-mono font-bold text-[#0F5132] tracking-wider uppercase mb-2">
                      Related Proof
                    </span>
                    <div className="flex flex-col gap-2">
                      {active.relatedProof.slice(0, 2).map((proof, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 p-2 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-lg hover:border-[#0F5132]/25 transition-all duration-200"
                        >
                          <div className="w-6.5 h-6.5 rounded-md bg-[#EAF7EF] flex items-center justify-center shrink-0">
                            {renderProofIcon(proof.icon)}
                          </div>
                          <div>
                            <h4 className="text-[11px] font-serif font-bold text-[#171717] leading-none mb-0.5">
                              {proof.title}
                            </h4>
                            <p className="text-[8px] font-mono text-[#5F655F] leading-none">{proof.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: Related Projects & CTA */}
              <div className="pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-3">
                {/* Related Projects Tags */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[8px] font-mono text-[#5F655F] uppercase font-bold tracking-wider mr-1">
                    Related Projects
                  </span>
                  {active.relatedProjects.map((proj) => (
                    <div
                      key={proj.name}
                      className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F7F4EC] border border-[#0F5132]/10 text-[9.5px] font-semibold text-[#5F655F] select-none"
                    >
                      {renderProjectIcon(proj.icon)}
                      {proj.name}
                    </div>
                  ))}
                  <Link
                    href="#projects"
                    className="text-[9.5px] font-semibold text-[#0F5132] hover:text-[#168A4A] hover:underline flex items-center gap-0.5 ml-1"
                  >
                    View work <ChevronRight className="w-2.5 h-2.5 inline" />
                  </Link>
                </div>

                {/* Main Section CTA */}
                <div>
                  <Link
                    href={active.ctaHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0F5132] hover:bg-[#168A4A] text-white text-xs font-semibold shadow-xs hover:shadow-md transition-all duration-300 cursor-pointer leading-none"
                  >
                    {active.ctaLabel}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─────────────────────── BOTTOM STATEMENT STRIP (Slim & Viewport-Fitted) ─────────────────────── */}
        <div className="mt-4 w-full p-3.5 bg-white/70 border border-[#0F5132]/14 rounded-2xl flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
          <div className="flex items-center gap-3.5 max-w-2xl">
            {/* Green Leverage Icon */}
            <div className="w-8.5 h-8.5 rounded-full bg-[#0F5132] flex items-center justify-center text-white shrink-0 shadow-sm shadow-[#0F5132]/10">
              <TrendingUp className="w-4.5 h-4.5 text-white" />
            </div>
            <div>
              <h4 className="text-xs md:text-sm font-serif font-bold text-[#171717] leading-none mb-1">
                I don&apos;t just deliver tasks. <span className="text-[#0F5132] italic">I build leverage systems.</span>
              </h4>
              <p className="text-[10.5px] text-[#5F655F] leading-relaxed">
                From research to dashboards, from content to automation — I help teams build systems that create compounding clarity.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 self-start md:self-auto">
            <Link
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border border-[#0F5132] text-[#0F5132] hover:bg-[#0F5132] hover:text-white text-xs font-semibold shadow-2xs hover:shadow-xs transition-all duration-300 cursor-pointer leading-none"
            >
              Let&apos;s solve this
              <ArrowRight className="w-2.5 h-2.5" />
            </Link>

            {/* Compact Avatars */}
            <div className="flex items-center gap-2 select-none">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image
                    src="/shahriar-kabir-1.jpg"
                    alt="Shahriar Kabir - Tech Director & Client Reference Portrait 1"
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <div className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image
                    src="/shahriar-kabir-2.jpg"
                    alt="Shahriar Kabir - Tech Director & Client Reference Portrait 2"
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <div className="relative w-6 h-6 rounded-full border-2 border-white overflow-hidden bg-slate-100">
                  <Image
                    src="/shahriar-kabir-3.jpg"
                    alt="Shahriar Kabir - Tech Director & Client Reference Portrait 3"
                    fill
                    className="object-cover"
                    sizes="24px"
                  />
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-white bg-[#0F5132] text-white flex items-center justify-center text-[7px] font-bold shrink-0">
                  +20
                </div>
              </div>
              <span className="text-[8px] font-mono text-[#5F655F] uppercase font-bold tracking-wider">
                Trusted
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* ─────────────────────── INTERACTIVE VISUAL LAYER (Humans - Mobile only) ─────────────────────── */}
      <div className="lg:hidden container mx-auto max-w-xl px-4">
        {/* Mobile Header Row */}
        <div className="mb-4">
          <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2 leading-none">
            LEVERAGE FINDER
          </span>
          <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-[#171717] leading-tight mb-2">
            Where I create <span className="text-[#0F5132] italic">the most leverage.</span>
          </h2>
          <p className="text-xs text-[#5F655F] leading-relaxed">
            Most business problems are not solved by adding more tools. They are solved by finding the constraint and building the right system.
          </p>
        </div>

        <MobileLeverageFinder
          areas={LEVERAGE_AREAS}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          renderProofIcon={renderProofIcon}
          renderProjectIcon={renderProjectIcon}
          prefersReducedMotion={prefersReducedMotion}
        />
      </div>
    </section>
  );
}
