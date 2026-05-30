"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Database, ShieldCheck, CheckCircle2, ArrowUpRight
} from "lucide-react";
import Link from "next/link";
import { MobileProofOfCapability } from "./MobileProofOfCapability";

interface SlideData {
  category: string;
  proof: string;
  explanation: string;
  businessMeaning: string;
  tags: string[];
}

const slides: SlideData[] = [
  {
    category: "Data Operations",
    proof: "1M+ data points processed",
    explanation: "Worked with large volumes of operational data, strengthening my ability to structure messy information into usable workflows, reports, and decisions.",
    businessMeaning: "I can turn scattered information into structured operating clarity.",
    tags: ["Data workflows", "Reporting", "Accuracy", "Operations"]
  },
  {
    category: "People & Coordination",
    proof: "200+ people coordinated",
    explanation: "Coordinated across university-scale event operations where planning, communication, delegation, and execution had to work under pressure.",
    businessMeaning: "I understand systems that involve real humans, deadlines, stakeholders, and execution pressure.",
    tags: ["Leadership", "Coordination", "Operations", "Execution"]
  },
  {
    category: "Product Systems",
    proof: "6+ ventures / projects",
    explanation: "Built and supported ventures and platforms across travel, media, trading education, editorial systems, and automation-led operations.",
    businessMeaning: "I do not only advise systems. I build and operate them.",
    tags: ["Gaari", "The Trailheadline", "Yagacalls", "InshortBD", "Lurnava"]
  },
  {
    category: "Growth & Content Infrastructure",
    proof: "SEO / AEO / content systems",
    explanation: "Designed content and search structures that connect user intent, page architecture, internal linking, and conversion paths.",
    businessMeaning: "I build websites and content systems that are designed to rank, explain, and convert.",
    tags: ["SEO", "AEO", "Content architecture", "Internal linking", "Conversion"]
  },
  {
    category: "Research & Thinking",
    proof: "35+ articles + SSRN research",
    explanation: "Published research and long-form technical/business writing around AI systems, operations, automation, and digital strategy.",
    businessMeaning: "I bring structured thinking, not just task execution.",
    tags: ["Research", "Writing", "AI systems", "Operations", "Strategy"]
  }
];

// Artifact 1: Data Operations (Vertical stack pipeline to avoid squishing)
function ArtifactDataOperations() {
  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-[#0F5132]/10">
      {/* Raw Data Table */}
      <div className="w-full flex flex-col gap-2 p-3 bg-[#FAF8F3] rounded-lg border border-[#0F5132]/5 text-[11px] font-sans">
        <div className="flex justify-between border-b border-[#0F5132]/15 pb-1.5 font-bold text-[#0F5132]">
          <span>Source Stream</span>
          <span>Records</span>
          <span>Status</span>
        </div>
        <div className="flex justify-between text-[#5F655F]">
          <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> API_Lead_Stream</span>
          <span className="font-mono">512,409</span>
          <span className="text-emerald-700 font-semibold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded">Processed</span>
        </div>
        <div className="flex justify-between text-[#5F655F]">
          <span className="flex items-center gap-1.5"><Database className="w-3.5 h-3.5" /> DB_User_Logs</span>
          <span className="font-mono">489,120</span>
          <span className="text-emerald-700 font-semibold text-[9px] bg-emerald-50 px-1.5 py-0.5 rounded">Processed</span>
        </div>
      </div>

      {/* Process Flow Indicator */}
      <div className="flex items-center justify-center gap-3 text-[#168A4A]">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-[#168A4A]/25" />
        <span className="text-[9px] font-mono text-[#5F655F] uppercase tracking-wider font-semibold">Transformation Layer</span>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-[#168A4A]/25" />
      </div>

      {/* Dashboard Card */}
      <div className="w-full p-3 bg-[#EAF7EF] rounded-lg border border-[#168A4A]/25 text-left flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <div className="text-[9px] uppercase tracking-wider font-bold text-[#0F5132]/60">Actionable Records</div>
            <div className="text-sm font-bold text-[#0F5132] font-serif leading-none mt-1">1,001,529</div>
          </div>
          <div className="bg-white border border-[#168A4A]/10 px-2 py-0.5 rounded text-[9px] font-mono text-[#168A4A] font-semibold">
            99.98% Acc
          </div>
        </div>
        <div className="flex justify-between items-end mt-2 pt-2 border-t border-[#168A4A]/10">
          <span className="text-[9px] text-[#5F655F] font-medium">Daily Pipeline Vol</span>
          {/* Sparkline mini-bar chart */}
          <div className="flex items-end gap-1.5 h-6">
            <div className="w-2 h-3 bg-[#168A4A]/40 rounded-t-sm" />
            <div className="w-2 h-4.5 bg-[#168A4A]/60 rounded-t-sm" />
            <div className="w-2 h-5.5 bg-[#168A4A]/80 rounded-t-sm" />
            <div className="w-2 h-6 bg-[#168A4A] rounded-t-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Artifact 2: People & Coordination (Pure responsive SVG for bulletproof node line coordinates)
function ArtifactPeopleCoordination() {
  return (
    <div className="w-full h-full bg-white rounded-xl border border-[#0F5132]/10 p-3 flex items-center justify-center">
      <svg className="w-full h-full max-h-[240px]" viewBox="0 0 340 220" fill="none">
        {/* Connection lines from center to outer nodes */}
        <line x1="170" y1="110" x2="65" y2="40" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="170" y1="110" x2="65" y2="110" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="170" y1="110" x2="65" y2="180" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="170" y1="110" x2="275" y2="40" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="170" y1="110" x2="275" y2="110" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
        <line x1="170" y1="110" x2="275" y2="180" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />

        {/* Center Node (Core Team) */}
        <circle cx="170" cy="110" r="32" fill="#EAF7EF" stroke="#168A4A" strokeWidth="1.5" />
        <text x="170" y="108" fill="#0F5132" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Core Team</text>
        <text x="170" y="118" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">12 Members</text>

        {/* Outer nodes */}
        {/* Logistics */}
        <rect x="15" y="22" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="62" y="38" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Logistics</text>
        <text x="62" y="47" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">45 People</text>

        {/* Creative */}
        <rect x="15" y="94" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="62" y="110" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Creative</text>
        <text x="62" y="119" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">25 People</text>

        {/* Technical */}
        <rect x="15" y="164" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="62" y="180" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Technical</text>
        <text x="62" y="189" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">32 People</text>

        {/* Registration */}
        <rect x="230" y="22" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="277" y="38" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Registration</text>
        <text x="277" y="47" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">40 People</text>

        {/* PR Team */}
        <rect x="230" y="94" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="277" y="110" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">PR Team</text>
        <text x="277" y="119" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">25 People</text>

        {/* Volunteers */}
        <rect x="230" y="164" width="95" height="32" rx="4" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="277" y="180" fill="#0F5132" fontSize="8.5" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Volunteers</text>
        <text x="277" y="189" fill="#5F655F" fontSize="7.5" textAnchor="middle" fontFamily="sans-serif">30 People</text>

        {/* Badge label */}
        <rect x="100" y="198" width="140" height="18" rx="3" fill="#EAF7EF" stroke="#168A4A" strokeWidth="0.5" opacity="0.9" />
        <text x="170" y="210" fill="#0F5132" fontSize="7.5" fontWeight="bold" textAnchor="middle" fontFamily="monospace">200+ ORG MEMBERS</text>
      </svg>
    </div>
  );
}

// Artifact 3: Product Systems (Tiles + Operating Layer vertical flow)
function ArtifactProductSystems() {
  const products = [
    { name: "Gaari", desc: "Travel Booking" },
    { name: "Trailheadline", desc: "News & Editorial" },
    { name: "Yagacalls", desc: "Trading Ed" },
    { name: "InshortBD", desc: "News Aggregator" },
    { name: "Lurnava", desc: "Lifestyle Blog" },
    { name: "Automation", desc: "Workflow Engine" }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-between p-4 bg-white rounded-xl border border-[#0F5132]/10 text-[10px] font-sans">
      {/* Product tiles 3x2 */}
      <div className="grid grid-cols-3 gap-2.5">
        {products.map((p) => (
          <div key={p.name} className="p-2.5 rounded bg-[#FAF8F3] border border-[#0F5132]/5 flex flex-col justify-center text-center shadow-xs">
            <span className="font-bold text-[#0F5132] leading-tight text-[11.5px]">{p.name}</span>
            <span className="text-[9px] text-[#5F655F] leading-none mt-1">{p.desc}</span>
          </div>
        ))}
      </div>

      {/* Downward Flow lines */}
      <div className="flex justify-around items-center h-4 px-4 text-[#168A4A]/30 text-xs font-bold">
        <span>↓</span>
        <span>↓</span>
        <span>↓</span>
      </div>

      {/* Unified Operating Layer */}
      <div className="p-3 bg-[#EAF7EF] border border-[#168A4A]/25 rounded-lg text-left flex flex-col justify-between">
        <div className="text-[9px] font-mono font-bold text-[#0F5132] uppercase tracking-widest leading-none mb-2 pb-1 border-b border-[#168A4A]/10">
          Unified Operating Layer
        </div>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-[10px] text-[#5F655F] font-semibold">
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#168A4A]" /> Data Pipelines</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#168A4A]" /> CRM Workflows</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#168A4A]" /> AI Support</span>
          <span className="flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-[#168A4A]" /> Multi-CMS Engine</span>
        </div>
      </div>
    </div>
  );
}

// Artifact 4: Growth & Content Infrastructure (Vertical stack)
function ArtifactGrowthContent() {
  const steps = [
    { label: "Search Intent", desc: "Identify navigational & commercial terms" },
    { label: "Content Cluster", desc: "Design topic hubs & semantic linking" },
    { label: "Page Architecture", desc: "Engineer clean, structured schemas" },
    { label: "Landing Experience", desc: "Deploy trust rules & active conversion" },
    { label: "Conversion loop", desc: "Deliver qualified business pipelines" }
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center p-2.5 sm:p-4 bg-white rounded-xl border border-[#0F5132]/10 text-[10px] font-sans">
      <div className="flex flex-col gap-2 sm:gap-3 relative pl-1.5 sm:pl-3">
        {/* Draw vertical connecting arrow track */}
        <div className="absolute left-1.5 sm:left-2.5 top-2.5 bottom-2.5 w-[1px] bg-[#168A4A]/25 pointer-events-none" />

        {steps.map((s, idx) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-4 relative z-10">
            <div className="w-5.5 h-5.5 rounded-full bg-[#EAF7EF] border border-[#168A4A]/30 flex items-center justify-center font-bold text-[10.5px] text-[#0F5132] shrink-0">
              {idx + 1}
            </div>
            <div className="flex-1 p-2 rounded bg-[#FAF8F3] border border-[#0F5132]/5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-4 shadow-xs text-left">
              <span className="font-semibold text-[#0F5132] text-[10.5px] sm:text-[11px] leading-tight">{s.label}</span>
              <span className="text-[8.5px] sm:text-[9px] text-[#5F655F] italic leading-tight">{s.desc}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Artifact 5: Research & Thinking (Paper preview + Pure SVG concept map)
function ArtifactResearchThinking() {
  return (
    <div className="w-full h-full flex flex-col sm:flex-row gap-3 p-3 sm:p-4 bg-white rounded-xl border border-[#0F5132]/10 text-[10px] font-sans">
      {/* SSRN Paper preview */}
      <div className="w-full sm:flex-1 p-3 bg-[#FAF8F3] border border-[#0F5132]/10 rounded-lg flex flex-col justify-between text-left shadow-xs">
        <div>
          <span className="text-[8.5px] uppercase font-bold text-[#168A4A] tracking-wider leading-none">SSRN Research Paper</span>
          <h5 className="font-serif font-bold text-[#0F5132] text-[10.5px] sm:text-[11px] mt-1.5 leading-snug">Agentic AI as Coordination Infrastructure</h5>
          <p className="text-[9.5px] text-[#5F655F] mt-1.5 leading-normal line-clamp-3 sm:line-clamp-4">
            Analyzing firm coordination costs compression, operational structural shifts, and macroeconomic divergence...
          </p>
        </div>
        <div className="text-[8px] font-mono text-[#5F655F] pt-1.5 border-t border-[#0F5132]/10 flex justify-between mt-2">
          <span>SSRN Library</span>
          <span>Rizwanul Islam Afraim</span>
        </div>
      </div>

      {/* Concept nodes network */}
      <svg className="hidden sm:block flex-1 h-full max-h-[140px]" viewBox="0 0 160 120" fill="none">
        {/* Connector lines from center to outer */}
        <line x1="80" y1="60" x2="30" y2="25" stroke="#168A4A" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="80" y1="60" x2="130" y2="25" stroke="#168A4A" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="80" y1="60" x2="30" y2="95" stroke="#168A4A" strokeWidth="0.8" strokeDasharray="2 2" />
        <line x1="80" y1="60" x2="130" y2="95" stroke="#168A4A" strokeWidth="0.8" strokeDasharray="2 2" />

        {/* Outer Concept nodes */}
        <rect x="5" y="10" width="55" height="24" rx="3" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="32.5" y="24" fill="#5F655F" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">AI Systems</text>

        <rect x="100" y="10" width="55" height="24" rx="3" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="127.5" y="24" fill="#5F655F" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Operations</text>

        <rect x="5" y="85" width="55" height="24" rx="3" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="32.5" y="99" fill="#5F655F" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Growth</text>

        <rect x="100" y="85" width="55" height="24" rx="3" fill="#FAF8F3" stroke="#0F5132" strokeWidth="0.5" opacity="0.9" />
        <text x="127.5" y="99" fill="#5F655F" fontSize="8.5" textAnchor="middle" fontFamily="sans-serif">Strategy</text>

        {/* Center node */}
        <circle cx="80" cy="60" r="25" fill="#EAF7EF" stroke="#168A4A" strokeWidth="1.2" />
        <text x="80" y="58" fill="#0F5132" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Systems</text>
        <text x="80" y="67" fill="#0F5132" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">Thinking</text>
      </svg>
    </div>
  );
}

export function ProofOfCapability() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  // Render visual artifact dynamically based on index
  const renderArtifact = (index: number) => {
    switch (index) {
      case 0: return <ArtifactDataOperations />;
      case 1: return <ArtifactPeopleCoordination />;
      case 2: return <ArtifactProductSystems />;
      case 3: return <ArtifactGrowthContent />;
      case 4: return <ArtifactResearchThinking />;
      default: return null;
    }
  };

  const activeSlide = slides[activeIndex];

  return (
    <section 
      id="proof-of-capability" 
      className="relative bg-[#F7F4EC] text-[#171717] w-full py-16 md:py-20 lg:py-24 overflow-hidden animate-fade-in"
    >
      {/* DESKTOP VIEWPORT: Tab-based selection (lg:block, hidden on smaller screens) */}
      <div className="hidden lg:block">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 grid grid-cols-12 gap-8 items-center min-h-[500px]">
          
          {/* Left Column: Dossier Header + Stepper Rail */}
          <div className="col-span-5 flex flex-col justify-between h-full min-h-[460px]">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-3.5 leading-none">
              PROOF OF CAPABILITY
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#171717] mb-3 leading-tight">
                Built from real operations, <br />
                not <span className="text-[#0F5132] italic">portfolio exercises.</span>
              </h2>
              <p className="text-xs text-[#5F655F] leading-relaxed max-w-sm">
                My work has been shaped by data-heavy operations, large-team coordination, product building, growth systems, and research-led thinking — which is why I can solve problems that do not fit neatly into one job title.
              </p>
            </div>

            {/* Vertical Stepper Rail (Interactive Tabs) */}
            <div className="relative pl-8 flex flex-col gap-6 py-4 border-l border-[#0F5132]/15 mt-8">
              {slides.map((slide, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={slide.category}
                    onClick={() => setActiveIndex(i)}
                    className="group flex items-start text-left focus:outline-hidden relative cursor-pointer py-1"
                  >
                    {/* Stepper Dot - Centered perfectly on the border line */}
                    <div className={`absolute left-[-39px] top-2.5 w-3.5 h-3.5 rounded-full border bg-[#F7F4EC] transition-all duration-300 flex items-center justify-center ${
                      isActive 
                        ? "border-[#168A4A] scale-110" 
                        : "border-[#0F5132]/25 group-hover:border-[#168A4A]/50"
                    }`}>
                      {isActive && (
                        <div className="w-1.5 h-1.5 bg-[#168A4A] rounded-full" />
                      )}
                    </div>

                    <div>
                      <span className={`block text-[9px] font-mono leading-none ${
                        isActive ? "text-[#0F5132] font-bold" : "text-[#5F655F]"
                      }`}>
                        0{i + 1}
                      </span>
                      <span className={`text-[12px] font-serif transition-colors duration-300 ${
                        isActive ? "text-[#0F5132] font-semibold" : "text-[#5F655F] group-hover:text-[#0F5132]"
                      }`}>
                        {slide.category}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium Active Tab Card Panel */}
          <div className="col-span-7 flex flex-col justify-center h-full min-h-[500px]">
            <div className="relative w-full h-[460px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -15 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-6 shadow-sm shadow-[#168A4A]/5 h-full hover:border-[#168A4A]/24 transition-colors duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-full">
                    {/* Left Side: Text info */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full">
                      <div>
                        {/* Card Header Info */}
                        <div className="border-b border-[#0F5132]/10 pb-3 mb-3">
                          <span className="text-[9px] font-mono text-[#0F5132] uppercase tracking-widest leading-none block">
                            Capability Record // 0{activeIndex + 1}
                          </span>
                          <h3 className="text-sm font-bold text-[#171717] mt-1 leading-none">
                            {activeSlide.category}
                          </h3>
                          <span className="block text-lg md:text-xl font-serif font-bold text-[#0F5132] mt-2 leading-none">
                            {activeSlide.proof}
                          </span>
                        </div>

                        {/* Explanation */}
                        <p className="text-[11px] text-[#5F655F] leading-relaxed mb-3">
                          {activeSlide.explanation}
                        </p>

                        {/* Dossier Style Business Meaning Box */}
                        <div className="p-3 bg-[#EAF7EF] border border-[#168A4A]/15 rounded-lg text-left flex gap-2">
                          <ShieldCheck className="w-4 h-4 text-[#168A4A] shrink-0 mt-0.5" />
                          <div>
                            <span className="block text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider leading-none mb-0.5">
                              Business Significance
                            </span>
                            <p className="text-[10px] font-medium text-[#0F5132] leading-relaxed">
                              {activeSlide.businessMeaning}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Tags at the bottom of left column */}
                      <div className="flex flex-wrap gap-1 pt-2 border-t border-[#0F5132]/10">
                        {activeSlide.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="text-[8px] font-sans px-2 py-0.5 rounded-full bg-[#F7F4EC] border border-[#0F5132]/10 text-[#5F655F]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Side: Visual Artifact */}
                    <div className="md:col-span-7 h-full flex items-center justify-center bg-[#FAF8F3] border border-[#0F5132]/5 rounded-xl p-4 overflow-hidden relative">
                      {renderArtifact(activeIndex)}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE & TABLET VIEW: Accordion Cards (lg:hidden) */}
      <div className="lg:hidden w-full px-4 pt-4 pb-8">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          {/* Mobile Header */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-3.5 leading-none">
              PROOF OF CAPABILITY
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-[#171717] mb-2 leading-tight">
              Built from real operations, not portfolio exercises.
            </h2>
            <p className="text-xs text-[#5F655F] leading-relaxed">
              My work has been shaped by data-heavy operations, large-team coordination, product building, growth systems, and research-led thinking — which is why I can solve problems that do not fit neatly into one job title.
            </p>
          </div>

          <MobileProofOfCapability slides={slides} renderArtifact={renderArtifact} />
        </div>
      </div>

      {/* OPTIONAL CTA AT END OF SECTION (Rendered statically after the viewport) */}
      <div className="bg-[#F7F4EC] border-t border-[#0F5132]/14 py-12 relative z-10">
        <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
          <div className="max-w-xl">
            <h4 className="text-base md:text-lg font-serif font-medium text-[#0F5132] leading-tight mb-2">
              These numbers are not the goal. They are proof of the journey.
            </h4>
            <p className="text-xs text-[#5F655F] leading-relaxed">
              Each data point, person, system, and article shaped the way I solve problems today — across research, operations, products, growth, and execution.
            </p>
          </div>
          <div>
            <Link 
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0F5132] hover:bg-[#168A4A] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              View Case Studies
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
