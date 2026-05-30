"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Globe, Layers, Cpu, Network, ArrowRight } from "lucide-react";
import Link from "next/link";

interface DiagnosticCard {
  icon: typeof Search;
  title: string;
  cost: string;
  build: string;
  number: string;
}

const cards: DiagnosticCard[] = [
  {
    number: "01",
    icon: Search,
    title: "Scattered Sales & Market Research",
    cost: "bad targeting, slow outreach",
    build: "research systems & lead pipelines"
  },
  {
    number: "02",
    icon: Eye,
    title: "Weak Operational Visibility",
    cost: "reactive decisions, low focus",
    build: "dashboards, reporting layers & workflow tracking"
  },
  {
    number: "03",
    icon: Globe,
    title: "Websites Without Growth Architecture",
    cost: "traffic leaks, low conversion",
    build: "SEO/AEO journeys, internal linking & conversion paths"
  },
  {
    number: "04",
    icon: Layers,
    title: "Product Ideas Without Execution Systems",
    cost: "slow builds, messy scope",
    build: "product architecture, MVP systems & internal tools"
  },
  {
    number: "05",
    icon: Cpu,
    title: "Manual Work That Should Be Automated",
    cost: "wasted hours, inconsistent output",
    build: "AI-assisted workflows, automation pipelines & integrations"
  },
  {
    number: "06",
    icon: Network,
    title: "Execution Without a Clear Operating Model",
    cost: "busy teams that do not compound",
    build: "operating systems connecting planning, execution & reporting"
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
                  r="2.5"
                  fill="#0F5132"
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
                      <span className="text-[9px] font-mono text-[#5F5A52]/50 font-bold">
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
                          <span className="text-[8px] font-bold text-[#5F5A52]/50 uppercase tracking-wider shrink-0 w-8">
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

          {/* TABLET & MOBILE LAYOUT (Stacked / Sequential order, no path SVG) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:hidden gap-5">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className="bg-[#FFFDF8] border border-[#E6D8C8] hover:border-primary/30 rounded-xl p-5 flex flex-col justify-between transition-all duration-300 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[9px] font-mono text-[#5F5A52]/50 font-bold">
                      {card.number}
                    </span>
                    <div className="p-1.5 rounded bg-primary/5 text-primary">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-serif font-medium text-[#1F2022] mb-3 leading-snug">
                      {card.title}
                    </h3>
                    <div className="space-y-2 text-[11px] sm:text-xs font-sans">
                      <div className="flex gap-2 items-baseline">
                        <span className="text-[8px] font-bold text-[#5F5A52]/50 uppercase tracking-wider shrink-0 w-9">
                          Cost
                        </span>
                        <p className="text-[#5F5A52] leading-tight">
                          {card.cost}
                        </p>
                      </div>
                      <div className="flex gap-2 items-baseline pt-2 border-t border-[#E6D8C8]/40">
                        <span className="text-[8px] font-bold text-primary/80 uppercase tracking-wider shrink-0 w-9">
                          Build
                        </span>
                        <p className="text-[#1F2022] font-medium leading-tight">
                          {card.build}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM CTA STRIP */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-[#E6D8C8]/60 text-xs sm:text-sm font-sans z-10 relative">
          <div className="text-[#5F5A52]/50 font-bold uppercase tracking-widest text-[9px] sm:text-xs">
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
