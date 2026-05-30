"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Compass, BarChart3, Repeat, Rocket, Milestone, Wrench, Cpu, AreaChart, HelpCircle, ChevronDown } from "lucide-react";

interface StepCard {
  number: string;
  title: string;
  icon: typeof Search;
  copy: string;
  outputs: string[];
  whyItMatters: string;
}

const steps: StepCard[] = [
  {
    number: "01",
    title: "Diagnose",
    icon: Search,
    copy: "I uncover the real bottlenecks behind the metrics, workflows, and goals.",
    outputs: ["Research audit", "Workflow map", "Data review"],
    whyItMatters: "So we solve the actual bottleneck, not the surface symptom."
  },
  {
    number: "02",
    title: "Architect",
    icon: Milestone,
    copy: "I design the system structure, data logic, user journey, and execution model.",
    outputs: ["Operating blueprint", "Database logic", "UX flow"],
    whyItMatters: "So execution has structure before resources are spent."
  },
  {
    number: "03",
    title: "Build",
    icon: Wrench,
    copy: "I build the dashboards, platforms, workflows, CMS, and technical assets that bring the plan to life.",
    outputs: ["Next.js interfaces", "Supabase/PostgreSQL", "CMS/workflow tools"],
    whyItMatters: "So the plan becomes a working system, not just an idea."
  },
  {
    number: "04",
    title: "Automate",
    icon: Cpu,
    copy: "I reduce repeated work through AI-assisted workflows, integrations, and process automation.",
    outputs: ["Automation flows", "AI support systems", "Process rules"],
    whyItMatters: "So repeated work becomes faster, cleaner, and more scalable."
  },
  {
    number: "05",
    title: "Measure",
    icon: AreaChart,
    copy: "I track what matters, surface insights, and refine the system for continuous improvement.",
    outputs: ["Reporting dashboards", "Meta CAPI / analytics", "AEO/GEO/SXO insights"],
    whyItMatters: "So the system improves through evidence, not guesswork."
  }
];

// Constants for loop animation timing
const LOOP_DURATION = 12000; // 12 seconds for uniform slow loop
const STEP_TIMING_FRACTIONS = [0, 0.104, 0.208, 0.313, 0.417];
const CHEVRON_TIMING_FRACTION = 0.708;

export function HowISolve() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [mobileActiveStep, setMobileActiveStep] = useState<number | null>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // Timer loop for node head tracing (12s total duration)
  useEffect(() => {
    if (!isHovered || prefersReducedMotion || activeStep !== null) {
      const timeoutId = setTimeout(() => {
        setElapsedTime(0);
      }, 0);
      return () => clearTimeout(timeoutId);
    }

    const interval = setInterval(() => {
      setElapsedTime((prev) => (prev + 100) % LOOP_DURATION);
    }, 100);

    return () => clearInterval(interval);
  }, [isHovered, prefersReducedMotion, activeStep]);

  const isCardHighlighted = (index: number) => {
    if (activeStep !== null) {
      return activeStep === index;
    }
    if (isHovered && !prefersReducedMotion) {
      const fraction = elapsedTime / LOOP_DURATION;
      return fraction >= STEP_TIMING_FRACTIONS[index];
    }
    return false;
  };

  const isLineActive = (lineIndex: number) => {
    if (!isHovered || prefersReducedMotion || activeStep !== null) return false;
    const fraction = elapsedTime / LOOP_DURATION;
    return fraction >= STEP_TIMING_FRACTIONS[lineIndex + 1];
  };

  const isChevronActive = isHovered && activeStep === null && !prefersReducedMotion && (elapsedTime / LOOP_DURATION) >= CHEVRON_TIMING_FRACTION;

  // Keyframes for the circular return loop path
  // Fits viewBox="0 0 1000 200"
  const loopCx = [100, 300, 500, 700, 900, 950, 970, 950, 900, 500, 100, 50, 30, 50, 100];
  const loopCy = [80, 80, 80, 80, 80, 100, 120, 140, 160, 160, 160, 140, 120, 100, 80];
  // Uniform speed timing percentages
  const loopTimes = [0, 0.104, 0.208, 0.313, 0.417, 0.438, 0.458, 0.479, 0.500, 0.708, 0.917, 0.938, 0.958, 0.979, 1.0];

  const selectedStepCard = activeStep !== null ? steps[activeStep] : null;

  return (
    <section
      id="how-i-solve"
      className="py-16 md:py-20 bg-[#FAF8F3] text-[#1F2022] relative overflow-hidden font-sans min-h-[90vh] flex flex-col justify-center border-y border-[#E6DDD0]/60"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.01),transparent_60%)] pointer-events-none" />

      <div className="container px-4 md:px-8 mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10 md:mb-12">
          <div className="lg:col-span-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3.5 leading-none">
              HOW I SOLVE
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#1F2022] mb-3">
              A repeatable operating loop that turns <br className="hidden sm:inline" />
              messy work into <span className="text-[#0F5132] italic font-serif">measurable systems.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5F5A52] max-w-xl leading-relaxed">
              I move from diagnosis to architecture, build, automation, and measurement — so the system does not just launch, it compounds.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center gap-4 p-4 rounded-xl bg-[#FFFDF8] border border-[#E6DDD0] shadow-sm self-start lg:self-center">
            <div className="p-2.5 rounded-lg bg-[#0F5132]/5 text-[#0F5132] border border-[#0F5132]/15">
              <Repeat className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#1F2022]">Not a one-time project.</h4>
              <p className="text-[11px] text-[#5F5A52] leading-tight mt-0.5">
                A system that learns, improves, and compounds over time.
              </p>
            </div>
          </div>
        </div>

        {/* Central Operating Loop Visual */}
        <div
          className="relative mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setElapsedTime(0);
          }}
        >
          {/* DESKTOP PIPELINE & LOOP PATH (lg:block, hidden on smaller screens) */}
          <div className="hidden lg:block relative h-[250px] z-0">
            {/* SVG Connector board behind cards */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 200"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <marker
                  id="how-arrow-muted"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F5132" />
                </marker>
                <marker
                  id="how-arrow-active"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="5"
                  markerHeight="5"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#0F5132" />
                </marker>
              </defs>

              {/* Base muted lines between adjacent step centers */}
              <line
                x1="170"
                y1="80"
                x2="225"
                y2="80"
                stroke={isLineActive(0) ? "#0F5132" : "#E6DDD0"}
                strokeWidth="1.5"
                markerEnd={`url(#how-arrow-${isLineActive(0) ? "active" : "muted"})`}
                className="transition-colors duration-300"
              />
              <line
                x1="370"
                y1="80"
                x2="425"
                y2="80"
                stroke={isLineActive(1) ? "#0F5132" : "#E6DDD0"}
                strokeWidth="1.5"
                markerEnd={`url(#how-arrow-${isLineActive(1) ? "active" : "muted"})`}
                className="transition-colors duration-300"
              />
              <line
                x1="570"
                y1="80"
                x2="625"
                y2="80"
                stroke={isLineActive(2) ? "#0F5132" : "#E6DDD0"}
                strokeWidth="1.5"
                markerEnd={`url(#how-arrow-${isLineActive(2) ? "active" : "muted"})`}
                className="transition-colors duration-300"
              />
              <line
                x1="770"
                y1="80"
                x2="825"
                y2="80"
                stroke={isLineActive(3) ? "#0F5132" : "#E6DDD0"}
                strokeWidth="1.5"
                markerEnd={`url(#how-arrow-${isLineActive(3) ? "active" : "muted"})`}
                className="transition-colors duration-300"
              />

              {/* Base dashed return loop path */}
              <path
                d="M 900,80 C 950,80 970,100 970,120 C 970,140 950,160 900,160 H 100 C 50,160 30,140 30,120 C 30,100 50,80 100,80"
                stroke="#E6DDD0"
                strokeWidth="1.2"
                strokeDasharray="4 4"
                opacity="0.8"
              />

              {/* Active glowing green overlay loop path that draws itself */}
              {!prefersReducedMotion && isHovered && activeStep === null && (
                <motion.path
                  d="M 100,80 H 900 C 950,80 970,100 970,120 C 970,140 950,160 900,160 H 100 C 50,160 30,140 30,120 C 30,100 50,80 100,80 Z"
                  stroke="#0F5132"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: LOOP_DURATION / 1000,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  className="filter drop-shadow-[0_0_2px_rgba(15,81,50,0.5)]"
                />
              )}

              {/* Chevron indicator on the return path */}
              <circle
                cx="500"
                cy="160"
                r="8"
                fill="#FFFDF8"
                stroke={isChevronActive ? "#0F5132" : "#E6DDD0"}
                strokeWidth="1.5"
                className="transition-colors duration-300"
              />
              <path
                d="M 502,157 L 498,160 L 502,163"
                stroke={isChevronActive ? "#0F5132" : "#5F5A52"}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-colors duration-300"
              />

              {/* Moving node head along the path */}
              {!prefersReducedMotion && isHovered && activeStep === null && (
                <motion.circle
                  cx={100}
                  cy={160}
                  r="3.5"
                  fill="#0F5132"
                  animate={{
                    cx: loopCx,
                    cy: loopCy,
                  }}
                  transition={{
                    duration: LOOP_DURATION / 1000,
                    ease: "linear",
                    repeat: Infinity,
                    times: loopTimes,
                  }}
                  className="filter drop-shadow-[0_0_4px_#0F5132]"
                />
              )}
            </svg>

            {/* Desktop cards row */}
            <div className="absolute inset-x-0 top-0 grid grid-cols-5 gap-6 pointer-events-none">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isSelected = activeStep === index;
                const isAnySelected = activeStep !== null;
                const isMuted = isAnySelected && !isSelected;
                const isHighlighted = isCardHighlighted(index);

                return (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(isSelected ? null : index)}
                    aria-pressed={isSelected}
                    className={`relative pointer-events-auto w-full text-left bg-[#FFFDF8] border rounded-xl p-4 transition-all duration-500 ease-in-out cursor-pointer z-10 flex flex-col justify-between h-[180px] ${
                      isSelected
                        ? "border-[#0F5132] shadow-md shadow-[#0F5132]/10 scale-[1.02]"
                        : isHighlighted
                        ? "border-[#0F5132] shadow-sm shadow-[#0F5132]/5 scale-[1.01]"
                        : "border-[#E6DDD0] hover:border-[#0F5132]/40"
                    } ${isMuted ? "opacity-60" : ""}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[9px] font-mono text-[#5F5A52]/50 font-bold">{step.number}</span>
                        <div className={`p-1.5 rounded transition-all duration-500 ${
                          isSelected || isHighlighted
                            ? "bg-[#0F5132] text-white border-[#0F5132]"
                            : "bg-[#0F5132]/5 text-[#0F5132] border-[#0F5132]/5"
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                      </div>
                      <h3 className="text-xs sm:text-sm font-serif font-medium text-[#1F2022] mb-1 leading-none">{step.title}</h3>
                      <p className="text-[10px] text-[#5F5A52] leading-tight font-sans mb-3">{step.copy}</p>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-auto pt-2 border-t border-[#E6DDD0]/40">
                      {step.outputs.slice(0, 2).map((out) => (
                        <span key={out} className="text-[9px] font-sans px-1.5 py-0.5 rounded bg-[#FAF8F3] border border-[#E6DDD0] text-[#5F5A52]/90">
                          {out}
                        </span>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TABLET & MOBILE VIEW (Vertical Process Timeline) */}
          <div className="flex flex-col gap-4 lg:hidden max-w-xl mx-auto w-full">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isExpanded = mobileActiveStep === index;
              return (
                <div key={step.title} className="relative pl-6">
                  {/* Vertical connecting line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-8 bottom-0 left-[11px] w-0.5 border-l border-[#E6DDD0] pointer-events-none" />
                  )}
                  
                  {/* Timeline bullet / icon */}
                  <div
                    onClick={() => setMobileActiveStep(isExpanded ? null : index)}
                    className={`absolute left-0 top-1 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer transition-colors duration-300 z-10 ${
                      isExpanded
                        ? "bg-[#0F5132] text-white"
                        : "bg-[#0F5132]/5 text-[#0F5132] border border-[#0F5132]/10"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  <div
                    className={`bg-white border rounded-xl overflow-hidden transition-all duration-300 ${
                      isExpanded ? "border-[#0F5132] shadow-sm scale-[1.01]" : "border-[#E6DDD0] hover:border-[#0F5132]/40"
                    }`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => setMobileActiveStep(isExpanded ? null : index)}
                      className="w-full flex justify-between items-start p-4 text-left focus:outline-none cursor-pointer min-h-[48px]"
                      aria-expanded={isExpanded}
                    >
                      <div className="flex flex-col gap-2 min-w-0 pr-2 select-none">
                        <div>
                          <span className="text-[8px] font-mono text-[#5F5A52]/50 font-bold uppercase tracking-wider leading-none">
                            Step 0{index + 1}
                          </span>
                          <h3 className="text-xs font-serif font-bold text-[#1F2022] leading-tight mt-0.5">
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-[10.5px] text-[#5F5A52] leading-relaxed font-sans">
                          {step.copy}
                        </p>
                        {/* Artifact Chip Statically Visible */}
                        <div className="flex pt-1">
                          <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#EAF7EF] border border-[#168A4A]/15 text-[#0F5132] leading-none">
                            Artifact: {step.outputs[0]}
                          </span>
                        </div>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-[#5F5A52] transition-transform duration-300 shrink-0 mt-0.5 ${
                          isExpanded ? "rotate-180 text-[#0F5132]" : ""
                        }`}
                      />
                    </button>

                    {/* Collapsible details */}
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="px-4 pb-4 border-t border-[#E6DDD0]/30 pt-3 flex flex-col gap-3.5 text-xs font-sans"
                        >
                          <div className="p-3 bg-[#EAF7EF] border border-[#168A4A]/15 rounded-xl">
                            <span className="block text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider leading-none mb-1">
                              Why It Matters
                            </span>
                            <p className="text-[#0F5132] font-semibold leading-relaxed italic">
                              {step.whyItMatters}
                            </p>
                          </div>

                          <div>
                            <span className="block text-[8px] font-mono font-bold text-[#5F5A52]/50 uppercase tracking-wider mb-2">
                              Deliverable Outputs
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {step.outputs.map((out) => (
                                <span
                                  key={out}
                                  className="text-[9px] px-2.5 py-0.5 rounded-lg bg-[#FAF8F3] border border-[#E6DDD0] text-[#5F5A52]"
                                >
                                  {out}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SHARED INSIGHT PANEL */}
        <div className="mb-6 hidden lg:block">
          <div className="bg-[#FFFDF8] border border-[#E6DDD0] rounded-2xl p-5 md:p-6 shadow-sm min-h-[90px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {selectedStepCard ? (
                <motion.div
                  key={selectedStepCard.title}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center"
                >
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="p-2.5 rounded-full bg-[#0F5132]/10 text-[#0F5132]">
                      {(() => {
                        const StepIcon = selectedStepCard.icon;
                        return <StepIcon className="w-5 h-5" />;
                      })()}
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono font-bold text-[#5F5A52]/50">Selected Step</span>
                      <h4 className="text-sm font-serif font-medium text-[#1F2022] leading-none">
                        {selectedStepCard.number} {selectedStepCard.title}
                      </h4>
                    </div>
                  </div>
                  <div className="md:col-span-5 border-t md:border-t-0 md:border-l border-[#E6DDD0]/60 pt-3 md:pt-0 md:pl-5 text-xs font-sans">
                    <span className="block text-[8px] font-bold text-[#5F5A52]/50 uppercase tracking-wider mb-0.5">What Happens</span>
                    <p className="text-[#5F5A52] leading-relaxed">{selectedStepCard.copy}</p>
                  </div>
                  <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-[#E6DDD0]/60 pt-3 md:pt-0 md:pl-5 text-xs font-sans">
                    <span className="block text-[8px] font-bold text-[#0F5132] uppercase tracking-wider mb-0.5">Why It Matters</span>
                    <p className="text-[#1F2022] font-medium leading-relaxed italic">{selectedStepCard.whyItMatters}</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center gap-2 text-xs text-[#5F5A52] font-sans py-2"
                >
                  <HelpCircle className="w-4 h-4 text-[#0F5132]" />
                  <span>Click any step to see how the system compounds. The system is a loop — not a line.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* BOTTOM OUTCOME STRIP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-8 border-t border-[#E6DDD0]/60 text-xs sm:text-sm font-sans z-10 relative">
          <div className="lg:col-span-4 text-[#1F2022] font-sans leading-tight">
            From diagnosis to measurement, each layer is designed to compound <span className="text-[#0F5132] font-semibold border-b border-[#0F5132]/20">clarity, speed, and growth.</span>
          </div>
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-full bg-[#0F5132]/5 text-[#0F5132] shrink-0 mt-0.5">
                <Compass className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="font-bold text-[#1F2022] text-[11px] leading-tight">Clear Direction</h5>
                <p className="text-[10px] text-[#5F5A52]/80 leading-none mt-0.5">Know where to focus.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-full bg-[#0F5132]/5 text-[#0F5132] shrink-0 mt-0.5">
                <Rocket className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="font-bold text-[#1F2022] text-[11px] leading-tight">Faster Execution</h5>
                <p className="text-[10px] text-[#5F5A52]/80 leading-none mt-0.5">Remove friction.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-full bg-[#0F5132]/5 text-[#0F5132] shrink-0 mt-0.5">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="font-bold text-[#1F2022] text-[11px] leading-tight">Measurable Impact</h5>
                <p className="text-[10px] text-[#5F5A52]/80 leading-none mt-0.5">Track key signals.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-full bg-[#0F5132]/5 text-[#0F5132] shrink-0 mt-0.5">
                <Repeat className="w-3.5 h-3.5" />
              </div>
              <div>
                <h5 className="font-bold text-[#1F2022] text-[11px] leading-tight">Compounding Growth</h5>
                <p className="text-[10px] text-[#5F5A52]/80 leading-none mt-0.5">Cycles scale stronger.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
