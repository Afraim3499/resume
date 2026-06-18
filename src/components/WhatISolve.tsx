"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Eye, Globe, Layers, Cpu, Network, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";

interface DiagnosticCard {
  icon: typeof Search;
  title: string;
  cost: string;
  build: string;
  number: string;
  href: string;
}

const cards: DiagnosticCard[] = [
  {
    number: "01",
    icon: Search,
    title: "Scattered Sales & Market Research",
    cost: "bad targeting, slow outreach",
    build: "research systems & lead pipelines",
    href: "/solutions/gtm-operations"
  },
  {
    number: "02",
    icon: Eye,
    title: "Weak Operational Visibility",
    cost: "reactive decisions, low focus",
    build: "dashboards, reporting layers & workflow tracking",
    href: "/solutions/gtm-operations"
  },
  {
    number: "03",
    icon: Globe,
    title: "Websites Without Growth Architecture",
    cost: "traffic leaks, low conversion",
    build: "SEO/AEO journeys, internal linking & conversion paths",
    href: "/solutions/dynamic-platforms"
  },
  {
    number: "04",
    icon: Layers,
    title: "Product Ideas Without Execution Systems",
    cost: "slow builds, messy scope",
    build: "product architecture, MVP systems & internal tools",
    href: "/solutions/dynamic-platforms"
  },
  {
    number: "05",
    icon: Cpu,
    title: "Manual Work That Should Be Automated",
    cost: "wasted hours, inconsistent output",
    build: "AI-assisted workflows, automation pipelines & integrations",
    href: "/solutions/gtm-operations"
  },
  {
    number: "06",
    icon: Network,
    title: "Execution Without a Clear Operating Model",
    cost: "busy teams that do not compound",
    build: "operating systems connecting planning, execution & reporting",
    href: "/solutions/executive-brand"
  }
];

// Snake path order for 3-column desktop layout:
// Row 1: Card 1 (0), Card 2 (1), Card 3 (2)
// Row 2: Card 6 (5), Card 5 (4), Card 4 (3)
const desktopOrder = [0, 1, 2, 5, 4, 3];

export function WhatISolve() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(0);

  // Check prefers-reduced-motion on mount
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Update highlighted card based on node progress
  useEffect(() => {
    if (!isHovered || prefersReducedMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveNodeIndex(0);
      return;
    }

    // Node loops along 6 cards in 12 seconds (2s per card segment)
    const interval = setInterval(() => {
      setActiveNodeIndex((prev) => (prev + 1) % 6);
    }, 2000);

    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion]);

  return (
    <section
      id="what-i-solve"
      className="py-16 md:py-20 bg-[#FDFBF7] text-[#1F2022] relative overflow-hidden font-sans min-h-[85vh] flex flex-col justify-center"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,81,50,0.015),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(230,216,200,0.15),transparent_60%)] pointer-events-none" />

      <div className="container px-4 md:px-8 mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3.5 leading-none">
            WHAT I SOLVE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#1F2022] mb-3">
            Business problems that slow you down — <br className="hidden sm:inline" />
            and what I build <span className="text-primary italic font-serif">instead.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#5F5A52] max-w-xl mx-auto leading-relaxed">
            I turn scattered work, unclear systems, and repeated friction into structured execution.
          </p>
        </div>

        {/* System Container holding the grids */}
        <div
          className="relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setActiveNodeIndex(0);
          }}
        >
          {/* DESKTOP LAYOUT (3 Columns x 2 Rows) with SVG connector path and animated node */}
          <div className="hidden lg:grid grid-cols-3 gap-6 relative p-2">
            {/* SVG Path behind cards */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              viewBox="0 0 600 400"
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Base Connector Path loop */}
              <path
                d="M 100,100 H 500 V 300 H 100 Z"
                stroke="#E6D8C8"
                strokeWidth="1.5"
                strokeDasharray="4 5"
              />
              {/* Active green pathway drawing overlay */}
              {!prefersReducedMotion && isHovered && (
                <motion.path
                  d="M 100,100 H 500 V 300 H 100 Z"
                  stroke="#0F5132"
                  strokeWidth="1.5"
                  strokeDasharray="1200"
                  animate={{ strokeDashoffset: [1200, 0] }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              )}
              {/* Moving green node head */}
              {!prefersReducedMotion && isHovered && (
                <motion.circle
                  cx={100}
                  cy={100}
                  r="2.5"
                  fill="#0F5132"
                  initial={{ cx: 100, cy: 100 }}
                  animate={{
                    cx: [100, 300, 500, 500, 300, 100, 100],
                    cy: [100, 100, 100, 300, 300, 300, 100],
                  }}
                  transition={{
                    duration: 12,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                />
              )}
            </svg>

            {desktopOrder.map((cardIndex) => {
              const card = cards[cardIndex];
              const Icon = card.icon;
              const isNodeHere = isHovered && activeNodeIndex >= cardIndex;

              return (
                <div
                  key={card.title}
                  className="relative h-[160px] z-10"
                >
                  <div
                    className={`relative bg-[#FFFDF8] border rounded-xl p-5 h-full flex flex-col justify-between transition-all duration-500 ease-in-out ${
                      isNodeHere
                        ? "border-primary shadow-sm shadow-primary/15 scale-[1.01]"
                        : "border-[#E6D8C8] hover:border-primary/25"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2.5">
                      <span className="text-[9px] font-mono text-[#5F5A52] font-bold">
                        {card.number}
                      </span>
                      <div className={`p-1.5 rounded border transition-all duration-500 ${
                        isNodeHere 
                          ? "bg-primary text-white border-primary" 
                          : "bg-primary/5 text-primary border-primary/5"
                      }`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-serif font-medium text-[#1F2022] mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <div className="space-y-1.5 text-[11px] font-sans">
                        <div className="flex gap-1.5 items-baseline">
                          <span className="text-[8px] font-bold text-[#5F5A52] uppercase tracking-wider shrink-0 w-8">
                            Cost
                          </span>
                          <p className="text-[#5F5A52] leading-tight">
                            {card.cost}
                          </p>
                        </div>
                        <div className="flex gap-1.5 items-baseline pt-1.5 border-t border-[#E6D8C8]/40">
                          <span className="text-[8px] font-bold text-primary/80 uppercase tracking-wider shrink-0 w-8">
                            Build
                          </span>
                          <p className="text-[#1F2022] font-medium leading-tight">
                            {card.build}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* TABLET & MOBILE LAYOUT (Sequential Accordion) */}
          <div className="flex flex-col gap-3 lg:hidden max-w-xl mx-auto w-full">
            {cards.map((card, i) => {
              const isExpanded = mobileExpandedIndex === i;
              return (
                <div
                  key={card.title}
                  className={`bg-[#FFFDF8] border rounded-xl overflow-hidden transition-all duration-300 ${
                    isExpanded ? "border-primary shadow-sm scale-[1.01]" : "border-[#E6D8C8] hover:border-primary/40"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    onClick={() => setMobileExpandedIndex(isExpanded ? null : i)}
                    className="w-full flex justify-between items-center p-4 text-left focus:outline-none cursor-pointer min-h-[48px]"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex flex-col gap-1 min-w-0 pr-2">
                      <div className="flex gap-2 items-center">
                        <span className="text-[9px] font-mono text-[#5F5A52] font-bold shrink-0">
                          {card.number}
                        </span>
                        <h3 className="text-xs font-serif font-bold text-[#1F2022] leading-tight">
                          {card.title}
                        </h3>
                      </div>
                      <span className="text-[10px] text-[#5F5A52] font-semibold pl-4 truncate max-w-[280px]">
                        Pain: {card.cost}
                      </span>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-[#5F5A52] transition-transform duration-300 shrink-0 ${isExpanded ? "rotate-180 text-primary" : ""}`} />
                  </button>

                  {/* Expanded Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                        className="overflow-hidden"
                      >
                        <div className="px-4 pb-4 border-t border-[#E6D8C8]/30 pt-3 flex flex-col gap-3">
                          <div className="space-y-3 text-xs font-sans">
                            {/* Cost / Pain Point */}
                            <div className="flex gap-3 items-start">
                              <span className="text-[9px] font-bold text-amber-800 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 w-11 text-center font-mono">
                                Cost
                              </span>
                              <p className="text-[#5F5A52] leading-relaxed pt-0.5">
                                {card.cost}
                              </p>
                            </div>
                            {/* What I Build */}
                            <div className="flex gap-3 items-start pt-2.5 border-t border-[#E6D8C8]/40">
                              <span className="text-[9px] font-bold text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 w-11 text-center font-mono">
                                Build
                              </span>
                              <p className="text-[#1F2022] font-semibold leading-relaxed pt-0.5">
                                {card.build}
                              </p>
                            </div>
                          </div>

                          {/* CTA Solution Link */}
                          <div className="pt-2 border-t border-[#E6D8C8]/30 flex justify-end">
                            <Link
                              href={card.href}
                              className="text-[10px] font-bold text-primary hover:text-[#168A4A] flex items-center gap-0.5 hover:underline min-h-[30px]"
                            >
                              Explore Solution Blueprint <ArrowRight className="w-3 h-3" />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA STRIP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#E6D8C8]/60 text-xs sm:text-sm font-sans z-10 relative">
          <div className="text-[#5F5A52] font-bold uppercase tracking-widest text-[9px] sm:text-xs">
            Turn friction into systems.
          </div>
          <div className="text-[#5F5A52] font-serif italic text-center text-xs">
            Clear systems. Aligned teams. Compounding growth.
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-lg bg-primary text-white hover:bg-[#168A4A] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm whitespace-nowrap"
          >
            Explore Solutions
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
