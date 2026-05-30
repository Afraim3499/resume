"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";

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

interface MobileLeverageFinderProps {
  areas: LeverageArea[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  renderProofIcon: (iconName: string) => React.ReactNode;
  renderProjectIcon: (iconName: string) => React.ReactNode;
  prefersReducedMotion: boolean;
}

export function MobileLeverageFinder({
  areas,
  activeIndex,
  setActiveIndex,
  renderProofIcon,
  renderProjectIcon,
  prefersReducedMotion,
}: MobileLeverageFinderProps) {
  const active = areas[activeIndex];

  return (
    <div className="flex flex-col gap-4">
      {/* Target Question */}
      <div className="text-left mb-1.5 select-none">
        <span className="text-[10px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
          What are you trying to fix?
        </span>
      </div>

      {/* Horizontal Swipeable Bottlenecks Selector */}
      <div className="w-full overflow-x-auto scrollbar-none flex gap-2 pb-2 -mx-4 px-4 select-none">
        {areas.map((area, i) => {
          const isActive = activeIndex === i;
          const shortLabel = area.id === "leads_sales" ? "Leads" :
                             area.id === "ops_clarity" ? "Ops" :
                             area.id === "search_growth" ? "Search" :
                             area.id === "automation" ? "Automation" :
                             area.id === "product_exec" ? "Product" : area.selectorLabel;

          return (
            <button
              key={area.id}
              onClick={() => setActiveIndex(i)}
              aria-pressed={isActive}
              className={`px-4 py-3 rounded-full border text-xs font-serif font-bold transition-all duration-200 shrink-0 cursor-pointer flex items-center gap-2 leading-none whitespace-nowrap min-h-[44px] ${
                isActive
                  ? "bg-[#0F5132] text-white border-[#0F5132] shadow-sm shadow-[#0F5132]/10"
                  : "bg-white border-[#0F5132]/10 text-[#5F655F]"
              }`}
            >
              <span className={`text-[9px] font-mono font-semibold ${isActive ? "text-white/85" : "text-[#0F5132]"}`}>
                {area.index}
              </span>
              <span>{shortLabel}</span>
            </button>
          );
        })}
      </div>

      {/* Active Area Showcase */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="bg-white border border-[#0F5132]/14 rounded-2xl p-5 shadow-sm flex flex-col gap-5"
        >
          {/* Section: Title & Reality */}
          <div>
            <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider block mb-1">
              {active.formalHeading}
            </span>
            <p className="text-xs text-[#5F655F] leading-relaxed">
              {active.clientProblem}
            </p>
          </div>

          {/* Section: Diagnostics */}
          <div className="p-4 bg-[#FAF8F3] border border-[#0F5132]/8 rounded-xl">
            <div className="flex items-center gap-2 mb-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span className="text-[9px] font-mono font-bold text-amber-800 uppercase tracking-wider">
                Common Symptoms I Diagnose
              </span>
            </div>
            <ul className="flex flex-col gap-2 text-xs text-[#5F655F] font-medium pl-1">
              {active.diagnose.map((d, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold select-none leading-none mt-0.5">•</span>
                  <span className="leading-tight">{d}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Vertical System Flow (Blueprint) */}
          <div>
            <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider block mb-3">
              The 6-Step System I Build
            </span>
            
            <div className="relative pl-6 flex flex-col gap-4">
              {/* Vertical connecting line */}
              <div className="absolute top-3 bottom-3 left-[11px] w-0.5 border-l-2 border-dashed border-[#168A4A]/20 pointer-events-none" />

              {active.build.map((node, i) => {
                const NodeIcon = node.icon;
                return (
                  <div key={i} className="relative flex items-start gap-3">
                    {/* Node circular badge indicator */}
                    <div className="absolute -left-[23.5px] w-6 h-6 rounded-full bg-[#EAF7EF] border border-[#168A4A]/25 flex items-center justify-center z-10 shrink-0">
                      <NodeIcon className="w-3.5 h-3.5 text-[#0F5132]" />
                    </div>
                    <div>
                      <h4 className="text-xs font-serif font-bold text-[#171717] leading-none mb-1">
                        0{i + 1}. {node.title}
                      </h4>
                      <p className="text-[10px] text-[#5F655F] leading-tight">
                        {node.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section: Philosophy Callout */}
          <div className="p-3 bg-[#EAF7EF] border border-[#168A4A]/15 rounded-xl">
            <p className="text-xs text-[#0F5132] font-semibold leading-relaxed italic">
              &ldquo;{active.calloutText}&rdquo;
            </p>
          </div>

          {/* Section: Outcomes */}
          <div>
            <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider block mb-2.5">
              What Changes After
            </span>
            <ul className="flex flex-col gap-2 text-xs text-[#5F655F] font-medium">
              {active.outcomes.map((o, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#168A4A] shrink-0 mt-0.5" />
                  <span className="leading-tight">{o}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Related Proof (Chips) */}
          <div className="border-t border-[#0F5132]/10 pt-4 flex flex-col gap-3">
            <div>
              <span className="text-[8px] font-mono font-bold text-[#5F655F] uppercase tracking-wider block mb-2">
                Related Proof Records
              </span>
              <div className="flex flex-col gap-2">
                {active.relatedProof.slice(0, 2).map((proof, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2 bg-[#FAF8F3] border border-[#0F5132]/10 rounded-lg"
                  >
                    <div className="w-7 h-7 rounded-md bg-[#EAF7EF] flex items-center justify-center shrink-0">
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

            {/* Related Projects Tags */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              {active.relatedProjects.map((proj) => (
                <div
                  key={proj.name}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F7F4EC] border border-[#0F5132]/10 text-[9px] font-semibold text-[#5F655F]"
                >
                  {renderProjectIcon(proj.icon)}
                  <span>{proj.name}</span>
                </div>
              ))}
              <Link
                href="#projects"
                className="text-[9.5px] font-semibold text-[#0F5132] hover:text-[#168A4A] hover:underline flex items-center gap-0.5 ml-1 min-h-[30px] items-center"
              >
                View all work <ChevronRight className="w-2.5 h-2.5" />
              </Link>
            </div>
          </div>

          {/* Section: CTA Button */}
          <div className="pt-2">
            <Link
              href={active.ctaHref}
              className="w-full py-3.5 rounded-xl bg-[#0F5132] hover:bg-[#168A4A] text-white text-xs font-bold text-center transition-colors flex items-center justify-center gap-2 uppercase tracking-wider"
            >
              <span>{active.ctaLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
