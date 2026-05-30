"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlideData {
  category: string;
  proof: string;
  explanation: string;
  businessMeaning: string;
  tags: string[];
}

interface MobileProofOfCapabilityProps {
  slides: SlideData[];
  renderArtifact: (index: number) => React.ReactNode;
}

export function MobileProofOfCapability({ slides, renderArtifact }: MobileProofOfCapabilityProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {slides.map((slide, i) => {
        const isExpanded = expandedIndex === i;
        return (
          <div
            key={slide.category}
            className={`bg-[#FFFDF8] border rounded-xl overflow-hidden transition-all duration-300 ${
              isExpanded ? "border-[#0F5132] shadow-md shadow-[#0F5132]/5" : "border-[#E6DDD0] hover:border-[#0F5132]/40"
            }`}
          >
             {/* Header / Trigger */}
            <button
              onClick={() => setExpandedIndex(isExpanded ? null : i)}
              className="w-full flex justify-between items-start p-5 text-left focus:outline-none cursor-pointer min-h-[48px]"
              aria-expanded={isExpanded}
            >
              <div className="flex flex-col gap-1.5 pr-4 select-none">
                <span className="text-[9px] font-mono text-[#0F5132] uppercase tracking-wider font-bold">
                  0{i + 1}{" // "}{slide.category}
                </span>
                <span className="text-lg font-serif font-bold text-[#171717] mt-0.5">
                  {slide.proof}
                </span>
                <p className="text-[11px] text-[#5F655F] leading-normal font-sans pt-0.5">
                  Takeaway: {slide.businessMeaning}
                </p>
              </div>
              <span className={`w-6 h-6 rounded-full border border-[#0F5132]/10 flex items-center justify-center text-xs transition-transform duration-300 shrink-0 mt-0.5 ${
                isExpanded ? "bg-[#0F5132] text-white rotate-180" : "bg-[#FAF8F3] text-[#0F5132]"
              }`}>
                {isExpanded ? "−" : "+"}
              </span>
            </button>

            {/* Collapsible Content */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-5 pb-5 border-t border-[#0F5132]/10 pt-4"
                >
                  <p className="text-xs text-[#5F655F] leading-relaxed mb-4">
                    {slide.explanation}
                  </p>

                  {/* Visual Artifact (Only when expanded) */}
                  <div className="h-[275px] w-full bg-[#FAF8F3] border border-[#0F5132]/5 rounded-xl p-3 mb-4 overflow-hidden relative">
                    {renderArtifact(i)}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 border-t border-[#0F5132]/10 pt-3.5">
                    {slide.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[8px] font-sans px-2.5 py-0.5 rounded-full bg-[#F7F4EC] border border-[#0F5132]/10 text-[#5F655F]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
