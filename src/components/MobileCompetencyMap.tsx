"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { allSkills } from "@/data/skills";
import {
  Brain, BarChart3, Megaphone, Server,
  Search, Sparkles, ArrowUpRight, ChevronDown, CheckCircle
} from "lucide-react";

const CATEGORY_CONFIG: Record<string, {
  hex: string;
  bg: string;
  glow: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  solutionHref?: string;
}> = {
  gtm_operations: {
    hex: "#B45309",
    bg: "rgba(180,83,9,0.06)",
    glow: "0 0 18px 4px rgba(180,83,9,0.35)",
    icon: BarChart3,
    label: "GTM & Ops",
    description: "Lead routing, CRM pipelines, Meta CAPI, Google Merchant feeds, and voice agent integrations that drive revenue operations.",
    solutionHref: "/solutions/gtm-operations",
  },
  brand_execution: {
    hex: "#BE123C",
    bg: "rgba(190,18,60,0.06)",
    glow: "0 0 18px 4px rgba(190,18,60,0.35)",
    icon: Megaphone,
    label: "Brand",
    description: "Large-scale event operations (25,000+ audiences), competitor research, organic brand campaigns, and team/vendor coordination.",
    solutionHref: "/solutions/executive-brand",
  },
  digital_platforms: {
    hex: "#047857",
    bg: "rgba(4,120,87,0.06)",
    glow: "0 0 18px 4px rgba(4,120,87,0.35)",
    icon: Server,
    label: "Platforms",
    description: "Next.js pre-rendering, multi-stage CMS workflows, SEO/AEO frameworks, RAG chatbots, and automated testing pipelines.",
    solutionHref: "/solutions/dynamic-platforms",
  },
  systems_infrastructure: {
    hex: "#1D4ED8",
    bg: "rgba(29,78,216,0.06)",
    glow: "0 0 18px 4px rgba(29,78,216,0.35)",
    icon: Brain,
    label: "Infra",
    description: "PostgreSQL schema design, Supabase RLS security, API architecture, deterministic state locking, and Redis availability caching.",
  },
};

export function MobileCompetencyMap() {
  const [activeCategory, setActiveCategory] = useState<string>("gtm_operations");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSkill, setExpandedSkill] = useState<string | null>(null);

  const categories = Object.keys(CATEGORY_CONFIG);

  // Filter skills based on search
  const filteredSkills = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return allSkills.filter((s) => s.category === activeCategory);
    }
    return allSkills.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        (CATEGORY_CONFIG[s.category]?.label || "").toLowerCase().includes(query)
    );
  }, [searchQuery, activeCategory]);

  const activeCfg = CATEGORY_CONFIG[activeCategory];

  return (
    <div className="flex flex-col gap-4">
      {/* Category Pills & Search Container */}
      <div className="flex flex-col gap-3">
        {/* Search Input */}
        <div className="relative w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5F655F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setExpandedSkill(null);
            }}
            placeholder="Search skills (e.g. Next.js, CRM)..."
            className="w-full pl-10 pr-4 py-3 text-sm rounded-xl border border-[#0F5132]/15 bg-white focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 text-[#171717] placeholder:text-[#5F655F]/50"
          />
        </div>

        {/* Category Pills (Only show if search is empty) */}
        {!searchQuery.trim() && (
          <div className="w-full overflow-x-auto scrollbar-none flex gap-1.5 pb-1 -mx-4 px-4 select-none">
            {categories.map((cat) => {
              const cfg = CATEGORY_CONFIG[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setExpandedSkill(null);
                  }}
                  className="px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer min-h-[44px]"
                  style={{
                    background: isActive ? cfg.hex : "#fff",
                    color: isActive ? "#fff" : cfg.hex,
                    borderColor: isActive ? cfg.hex : `${cfg.hex}30`,
                  }}
                >
                  {cfg.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Info Header (Only if search is empty) */}
      {!searchQuery.trim() && activeCfg && (
        <div className="p-4 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-2xl flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg text-white" style={{ background: activeCfg.hex }}>
              <activeCfg.icon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-serif font-bold text-[#171717]">{activeCfg.label} Domain</h3>
          </div>
          <p className="text-xs text-[#5F655F] leading-relaxed">
            {activeCfg.description}
          </p>
          {activeCfg.solutionHref && (
            <Link
              href={activeCfg.solutionHref}
              className="text-[10px] font-bold hover:underline flex items-center gap-0.5 mt-1"
              style={{ color: activeCfg.hex }}
            >
              Explore {activeCfg.label} Solutions <ArrowUpRight className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}

      {/* Skills list / Accordion stack */}
      <div className="flex flex-col gap-2">
        {searchQuery.trim() && (
          <span className="text-[10px] font-mono text-[#5F655F] uppercase tracking-wider font-bold mb-1">
            Search Results ({filteredSkills.length} matches)
          </span>
        )}

        {filteredSkills.length === 0 ? (
          <div className="text-center py-8 text-xs text-[#5F655F] bg-[#FFFDF8] border border-[#0F5132]/10 rounded-2xl">
            No matching skills found. Try searching for another term.
          </div>
        ) : (
          filteredSkills.map((skill) => {
            const skillId = `${skill.category}-${skill.name}`;
            const isExpanded = expandedSkill === skillId;
            const cfg = CATEGORY_CONFIG[skill.category];
            const isExpert = skill.level === "expert";

            return (
              <div
                key={skillId}
                className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded ? "border-[#0F5132] shadow-sm" : "border-[#0F5132]/10"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setExpandedSkill(isExpanded ? null : skillId)}
                  className="w-full flex justify-between items-center p-4 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isExpanded}
                >
                  <div className="flex flex-col gap-1 pr-3 min-w-0">
                    {searchQuery.trim() && (
                      <span
                        className="text-[8px] font-mono font-bold uppercase tracking-wider leading-none"
                        style={{ color: cfg?.hex ?? "#0F5132" }}
                      >
                        {cfg?.label || skill.category}
                      </span>
                    )}
                    <h4 className="text-xs font-bold text-[#171717] truncate leading-tight">
                      {skill.name}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border leading-none ${
                        isExpert
                          ? "bg-[#EAF7EF] text-[#0F5132] border-[#0F5132]/15"
                          : "bg-[#FAF8F3] text-[#5F655F] border-[#E6DDD0]"
                      }`}
                    >
                      {skill.level}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#5F655F] transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-[#0F5132]" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 border-t border-[#0F5132]/5 pt-3 bg-[#FAF8F3]/50 flex flex-col gap-3">
                        {/* Wiki definitions if present */}
                        {skill.wikiId && (
                          <div>
                            <Link
                              href={`/wiki/${skill.wikiId}`}
                              className="text-[10px] font-bold text-[#0F5132] hover:underline flex items-center gap-0.5"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#0F5132] shrink-0" />
                              View Wiki Definition &amp; Scope
                              <ArrowUpRight className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        )}

                        {/* Production deployments list */}
                        {skill.projects && skill.projects.length > 0 && (
                          <div>
                            <span className="block text-[8px] font-mono font-bold text-[#5F655F] uppercase tracking-wider mb-2">
                              Production Deployments
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {skill.projects.map((p) => (
                                <Link
                                  key={p.slug}
                                  href={p.type === "project" ? `/projects/${p.slug}` : `/solutions/${p.slug}`}
                                  className="px-2.5 py-1 rounded-md text-[9px] font-semibold border transition-all flex items-center gap-0.5"
                                  style={{
                                    background: `${cfg?.hex ?? "#0F5132"}08`,
                                    color: cfg?.hex ?? "#0F5132",
                                    borderColor: `${cfg?.hex ?? "#0F5132"}15`,
                                  }}
                                >
                                  <span>{p.label}</span>
                                  <ArrowUpRight className="w-2.5 h-2.5" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Verification tick */}
                        <div className="flex items-center gap-1.5 text-[9px] text-[#0F5132] font-semibold">
                          <CheckCircle className="w-3 h-3 text-[#168A4A]" />
                          <span>Verified production system integration</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        )}
      </div>

      {/* Mobile-friendly helper text */}
      <p className="text-[10px] text-[#5F655F]/50 text-center select-none mt-2">
        Click on any skill to view its verified production deployments.
      </p>
    </div>
  );
}
