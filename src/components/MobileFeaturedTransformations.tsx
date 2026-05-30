"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Globe, ExternalLink, AlertTriangle, Wrench, TrendingUp, Construction } from "lucide-react";

interface TransformationProject {
  slug: string;
  index: string;
  title: string;
  subtitle: string;
  messyReality: string;
  whatIBuilt: string;
  systemLayers: string[];
  businessImpact: string;
  tools: string[];
  image: string;
  imageAlt: string;
  link?: string;
  metrics: { label: string; value: string }[];
  ongoing?: boolean;
  aspectRatio: number;
}

interface MobileFeaturedTransformationsProps {
  completedProjects: TransformationProject[];
  ongoingProjects: TransformationProject[];
  setLightboxProject: (project: TransformationProject | null) => void;
}

export function MobileFeaturedTransformations({
  completedProjects,
  ongoingProjects,
  setLightboxProject,
}: MobileFeaturedTransformationsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<"problem" | "system" | "meaning">("problem");

  const active = completedProjects[activeIndex];

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % completedProjects.length);
    setActiveTab("problem");
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + completedProjects.length) % completedProjects.length);
    setActiveTab("problem");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Completed projects slideshow card */}
      <div className="bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-4 shadow-sm flex flex-col gap-4">
        {/* Visual First */}
        {active.image && (
          <div
            onClick={() => setLightboxProject(active)}
            style={{ aspectRatio: active.aspectRatio }}
            className="relative w-full rounded-xl overflow-hidden border border-[#0F5132]/10 cursor-zoom-in bg-[#FAF8F3]"
          >
            <Image
              src={active.image}
              alt={active.imageAlt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 100vw, 90vw"
              priority={activeIndex === 0}
            />
            {active.link && (
              <Link
                href={active.link}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-semibold text-[#0F5132] border border-[#0F5132]/10 shadow-xs"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="w-3 h-3" /> Live <ExternalLink className="w-2.5 h-2.5" />
              </Link>
            )}
          </div>
        )}

        {/* Project Name and Category Info */}
        <div className="flex justify-between items-start border-b border-[#0F5132]/10 pb-3">
          <div className="flex flex-col min-w-0">
            <span className="text-[9px] font-mono text-[#0F5132] uppercase tracking-wider font-bold">
              Project Record // {active.index}
            </span>
            <h3 className="text-base font-serif font-bold text-[#171717] mt-0.5">
              {active.title}
            </h3>
            <span className="text-xs text-[#5F655F] truncate mt-0.5">
              {active.subtitle}
            </span>
          </div>
        </div>

        {/* Quick metrics grid */}
        {active.metrics.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {active.metrics.map((m) => (
              <div key={m.label} className="p-2 bg-[#EAF7EF] rounded-lg text-center border border-[#168A4A]/10">
                <div className="text-sm font-serif font-bold text-[#0F5132] leading-none">{m.value}</div>
                <div className="text-[8px] font-mono text-[#5F655F] mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* 3 Compact Tabs */}
        <div className="flex border-b border-[#0F5132]/10 py-1 gap-1">
          {(["problem", "system", "meaning"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-center text-xs font-mono font-bold capitalize transition-colors border-b-2 cursor-pointer ${
                activeTab === tab
                  ? "border-[#0F5132] text-[#0F5132]"
                  : "border-transparent text-[#5F655F] hover:text-[#0F5132]"
              }`}
            >
              {tab === "meaning" ? "Value" : tab}
            </button>
          ))}
        </div>

        {/* Active tab content */}
        <div className="min-h-[110px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.15 }}
              className="p-3 bg-[#FAF8F3] border border-[#0F5132]/8 rounded-xl"
            >
              {activeTab === "problem" && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-[8px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                      Messy Reality
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F655F] leading-relaxed">{active.messyReality}</p>
                </div>
              )}
              {activeTab === "system" && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#168A4A] shrink-0" />
                    <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                      What I Built
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5F655F] leading-relaxed mb-2">{active.whatIBuilt}</p>
                  <div className="flex flex-wrap gap-1.5 border-t border-[#0F5132]/6 pt-2">
                    {active.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[7.5px] font-sans px-2 py-0.5 rounded bg-white border border-[#0F5132]/10 text-[#5F655F]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "meaning" && (
                <div>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-[#168A4A] shrink-0" />
                    <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                      Business Impact
                    </span>
                  </div>
                  <p className="text-[11px] text-[#0F5132] font-medium leading-relaxed">{active.businessImpact}</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA Case Study Link */}
        <div className="pt-2">
          <Link
            href={`/projects/${active.slug}`}
            className="w-full rounded-lg border border-[#0F5132]/20 bg-[#FFFDF8] hover:bg-[#EAF7EF] text-[#0F5132] text-xs font-bold text-center transition-colors flex items-center justify-center uppercase tracking-wider min-h-[44px]"
          >
            View Case Study Blueprint
          </Link>
        </div>

        {/* Thumb-friendly Previous / Next Controls */}
        <div className="flex justify-between items-center gap-4 mt-2 pt-4 border-t border-[#0F5132]/10">
          <button
            onClick={goPrev}
            className="flex-1 bg-[#FAF8F3] border border-[#E6DDD0] hover:border-[#0F5132] rounded-xl flex items-center justify-center gap-1 text-xs font-bold text-[#5F655F] hover:text-[#0F5132] transition-colors cursor-pointer min-h-[44px]"
            aria-label="Previous Project"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <span className="text-[10px] font-mono text-[#5F655F] font-bold select-none shrink-0">
            {activeIndex + 1} / {completedProjects.length}
          </span>
          <button
            onClick={goNext}
            className="flex-1 bg-[#FAF8F3] border border-[#E6DDD0] hover:border-[#0F5132] rounded-xl flex items-center justify-center gap-1 text-xs font-bold text-[#5F655F] hover:text-[#0F5132] transition-colors cursor-pointer min-h-[44px]"
            aria-label="Next Project"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile Ongoing builds cards at the bottom */}
      {ongoingProjects.length > 0 && (
        <div className="mt-4 pt-6 border-t border-[#0F5132]/10">
          <div className="flex items-center gap-2 mb-4">
            <Construction className="w-3.5 h-3.5 text-[#168A4A]" />
            <span className="text-[9px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
              Ongoing Systems in Development
            </span>
          </div>
          <div className="space-y-3">
            {ongoingProjects.map((p) => (
              <div
                key={p.slug}
                className="p-4 bg-[#FFFDF8] border border-dashed border-[#0F5132]/15 rounded-xl flex flex-col gap-3"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-xs font-serif font-bold text-[#171717]">{p.title}</h4>
                    <span className="text-[7px] font-mono text-amber-600 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full font-semibold uppercase leading-none">
                      Building
                    </span>
                  </div>
                  <p className="text-[10px] text-[#0F5132] font-semibold">{p.subtitle}</p>
                </div>

                {p.image && (
                  <div
                    onClick={() => setLightboxProject(p)}
                    style={{ aspectRatio: p.aspectRatio }}
                    className="relative w-full rounded-lg overflow-hidden border border-[#0F5132]/10 bg-[#FAF8F3] cursor-zoom-in"
                  >
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 100vw, 90vw"
                    />
                  </div>
                )}

                <p className="text-[10.5px] text-[#5F655F] leading-relaxed">{p.messyReality}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
