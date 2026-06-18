"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, Users, Layers, Cpu, BarChart3, ArrowRight } from "lucide-react";

type ActiveMode = "idle" | "all" | "market" | "sales" | "product" | "automation" | "reporting";

const modules = [
  {
    id: "market",
    title: "Market Research",
    sub: "Signals & insight",
    explanation: "I turn scattered market, competitor, and customer signals into clear direction.",
    icon: Search,
    posClass: "absolute left-0 top-[10px]",
    connector: "M 130 36 Q 175 36, 175 90"
  },
  {
    id: "sales",
    title: "Sales Ops",
    sub: "Leads & workflow",
    explanation: "I structure lead research, CRM flows, follow-up logic, and sales visibility.",
    icon: Users,
    posClass: "absolute left-0 top-[140px]",
    connector: "M 130 166 H 162"
  },
  {
    id: "product",
    title: "Product Systems",
    sub: "Systems & structure",
    explanation: "I map product ideas into workflows, dashboards, systems, and buildable roadmaps.",
    icon: Layers,
    posClass: "absolute right-0 top-[10px]",
    connector: "M 370 36 Q 325 36, 325 90"
  },
  {
    id: "automation",
    title: "Automation",
    sub: "Repeatable execution",
    explanation: "I remove repeated manual work through AI-assisted workflows and process automation.",
    icon: Cpu,
    posClass: "absolute right-0 top-[130px]",
    connector: "M 370 156 Q 338 156, 338 170"
  },
  {
    id: "reporting",
    title: "Reporting",
    sub: "Clarity & decisions",
    explanation: "I create dashboards and reporting layers that make decisions clearer.",
    icon: BarChart3,
    posClass: "absolute right-0 top-[250px]",
    connector: "M 370 276 Q 325 276, 325 250"
  }
] as const;

export function Hero() {
  const [activeMode, setActiveMode] = useState<ActiveMode>("idle");
  const visualRef = useRef<HTMLDivElement>(null);

  // Escape key & Click Outside event listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveMode("idle");
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (visualRef.current && !visualRef.current.contains(e.target as Node)) {
        setActiveMode("idle");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isCardActive = (id: string) => activeMode === "all" || activeMode === id;
  const isCardMuted = (id: string) => activeMode !== "idle" && activeMode !== "all" && activeMode !== id;

  return (
    <section
      id="hero"
      className="relative min-h-[calc(100vh-4.5rem)] flex flex-col items-center justify-center bg-[#FDFBF7] text-[#1F2022] pt-24 md:pt-28 pb-8 md:pb-12 px-4 md:px-8 selection:bg-primary selection:text-white overflow-hidden"
    >
      <div className="container relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Text & CTAs */}
        <div className="lg:col-span-7 flex flex-col justify-center select-none">
          {/* 1. Portrait on mobile viewports, hidden on larger screens */}
          <div className="block sm:hidden order-1 my-3 flex justify-center">
            <div className="w-24 h-24 rounded-full overflow-hidden border border-[#0F5132]/25 bg-white p-1 relative shadow-xs">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src="/assets/afraim-logo.png"
                  alt="Rizwanul Islam Afraim - Illustrated Portrait Logo"
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
            </div>
          </div>

          {/* 2a. Mobile Role Chip */}
          <div className="block sm:hidden order-2 mb-4 text-center">
            <span className="inline-block px-3 py-1 rounded-full bg-[#EAF7EF] border border-[#168A4A]/15 text-[#0F5132] text-[10px] font-mono tracking-widest font-extrabold uppercase leading-none">
              Systems Architect &bull; GTM Ops
            </span>
          </div>

          {/* 2b. Desktop Label */}
          <div className="hidden sm:flex order-2">
            <span className="inline-block px-3 py-1.5 rounded-full bg-primary/10 text-primary text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-5 leading-none">
              FOR TEAMS WITH MESSY GROWTH, OPERATIONS & PRODUCT WORK
            </span>
          </div>

          {/* 3. Headline */}
          <h1
            className="order-3 text-center sm:text-left text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-serif font-medium leading-[1.12] tracking-tight text-[#1F2022] mb-5 max-w-[680px]"
          >
            When growth gets messy, <br />
            I turn it into <br />
            <span className="text-primary italic font-serif">a system.</span>
          </h1>

          {/* 4a. Mobile Subcopy */}
          <p
            className="block sm:hidden order-4 text-xs text-[#5F5A52] leading-relaxed text-center max-w-sm mx-auto mb-6"
          >
            I build and operate marketing, sales, and product systems that transform scattered, repetitive manual work into automated growth engines.
          </p>

          {/* 4b. Desktop Subcopy */}
          <p
            className="hidden sm:block order-4 text-sm sm:text-base md:text-lg text-[#5F5A52] leading-relaxed font-sans max-w-2xl mb-7"
          >
            I help teams organize market research, sales operations, product workflows, SEO systems, automation, and reporting into one clear execution engine — so decisions get smarter, teams move faster, and growth compounds.
          </p>

          {/* 5. CTAs */}
          <div
            className="order-5 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8"
          >
            <a
              href="#what-i-solve"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("what-i-solve")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group px-5 py-3.5 rounded-xl bg-primary text-white font-bold text-center hover:bg-[#168A4A] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm text-xs sm:text-sm flex items-center justify-center gap-1.5 min-h-[44px]"
            >
              <span>Show Me What You Solve</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <Link
              href="/case-studies"
              className="px-5 py-3.5 rounded-xl border border-[#E6D8C8] bg-[#FFFDF8] text-[#1F2022] font-bold text-center hover:bg-[#EAF7EF] hover:border-primary/30 transition-colors text-xs sm:text-sm min-h-[44px]"
            >
              See Case Studies
            </Link>
            <Link
              href="/resume"
              className="hidden sm:block px-5 py-3 text-[#1F2022]/85 hover:text-primary font-medium text-center transition-colors text-xs sm:text-sm underline underline-offset-4"
            >
              View Resume
            </Link>
          </div>

          {/* 6. Capabilities Row */}
          <div className="order-6 border-t border-[#E6D8C8]/60 pt-5">
            <p className="text-[9px] uppercase tracking-widest text-[#5F5A52] font-bold mb-2.5 text-center sm:text-left">Key Capabilities</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
              {["Market Research", "Sales Ops", "Product Systems", "SEO / AEO", "Automation"].map((cap) => (
                <span
                  key={cap}
                  className="px-3 py-1.5 rounded-lg bg-[#FFFDF8] border border-[#E6D8C8]/70 text-[#1F2022]/80 text-xs font-semibold hover:border-primary/50 transition-colors min-h-[32px] flex items-center"
                >
                  {cap}
                </span>
              ))}
            </div>
          </div>

          {/* 7. Mobile Scroll Cue */}
          <div
            className="block sm:hidden order-7 text-center mt-6 text-[#5F5A52]/80 text-[9px] font-mono animate-bounce uppercase tracking-widest"
          >
            &darr; scroll to diagnose &darr;
          </div>
        </div>

        {/* Right Column: Visual Trust Anchor + Connected modules */}
        <div className="lg:col-span-5 flex items-center justify-center w-full" ref={visualRef}>
          
          {/* Desktop/Tablet Connected visual layout */}
          <div className="relative w-full max-w-[500px] h-[380px] hidden sm:block select-none">
            {/* SVG Connector Lines */}
            <svg className="absolute inset-0 pointer-events-none w-full h-full text-primary" fill="none">
              {modules.map((mod) => (
                <path
                  key={mod.id}
                  d={mod.connector}
                  stroke="currentColor"
                  strokeWidth={isCardActive(mod.id) ? "2" : "1.5"}
                  strokeDasharray={isCardActive(mod.id) ? undefined : "4 4"}
                  className={`transition-all duration-300 ${
                    isCardActive(mod.id)
                      ? "opacity-100 text-primary"
                      : isCardMuted(mod.id)
                      ? "opacity-10 text-[#E6D8C8]"
                      : "opacity-40 text-primary"
                  }`}
                />
              ))}
              {/* Bottom statement vertical line */}
              <path
                d="M 250 258 V 304"
                stroke="currentColor"
                strokeWidth={activeMode !== "idle" ? "2" : "1.5"}
                strokeDasharray={activeMode !== "idle" ? undefined : "4 4"}
                className={`transition-all duration-300 ${
                  activeMode !== "idle" ? "opacity-100 text-primary" : "opacity-40 text-primary"
                }`}
              />
            </svg>

            {/* Central Portrait Card Trigger */}
            <button
              onClick={() => setActiveMode(activeMode === "all" ? "idle" : "all")}
              className={`absolute left-1/2 top-[82px] -translate-x-1/2 w-44 h-44 rounded-2xl overflow-hidden border-2 transition-all duration-300 bg-white p-1.5 focus:outline-none focus:ring-2 focus:ring-primary shadow-md ${
                activeMode === "all"
                  ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                  : activeMode !== "idle"
                  ? "border-primary/50 shadow-sm"
                  : "border-[#E6D8C8] hover:border-primary/60"
              }`}
              aria-label="Toggle all systems integration view"
              aria-pressed={activeMode === "all"}
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/assets/afraim-logo.png"
                  alt="Rizwanul Islam Afraim - Illustrated Portrait Logo representing Systems Builder & Growth Operations"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
              </div>
            </button>

            {/* Orbiting Small Module Cards */}
            {modules.map((mod) => {
              const Icon = mod.icon;
              const active = isCardActive(mod.id);
              const muted = isCardMuted(mod.id);
              return (
                <div key={mod.id} className={mod.posClass}>
                  <button
                    onClick={() => setActiveMode(activeMode === mod.id ? "idle" : mod.id)}
                    className={`relative flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#FFFDF8] w-[140px] text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                      active
                        ? "border-primary shadow-md shadow-primary/10 scale-[1.03] z-30"
                        : muted
                        ? "border-[#E6D8C8]/40 opacity-40 scale-[0.98]"
                        : "border-[#E6D8C8] hover:border-primary hover:scale-[1.02] shadow-sm"
                    }`}
                    aria-pressed={active}
                  >
                    {/* Active Status Indicator Dot */}
                    <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      active ? "bg-primary" : "bg-[#E6D8C8]"
                    }`} />
                    
                    <div className="p-1.5 rounded-lg bg-[#EAF7EF] text-primary flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="flex flex-col min-w-0">
                      <span className="text-[10px] font-bold text-[#1F2022] truncate leading-tight">
                        {mod.title}
                      </span>
                      <span className="text-[8px] text-[#5F5A52] truncate leading-none mt-0.5">
                        {mod.sub}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Shared Insight Panel (Replaces old statement card) */}
            <div
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[420px] min-h-[76px] px-4 py-3 rounded-xl border bg-[#FFFDF8] transition-all duration-300 text-center flex items-center justify-center ${
                activeMode !== "idle"
                  ? "border-primary shadow-md shadow-primary/10 scale-[1.02] bg-[#EAF7EF]/30"
                  : "border-[#E6D8C8] shadow-sm"
              }`}
            >
              <p
                className={`text-xs font-serif font-medium leading-normal transition-colors ${
                  activeMode !== "idle" ? "text-primary font-semibold" : "text-[#1F2022]"
                }`}
              >
                {activeMode === "idle" && "One execution engine. Aligned teams. Smarter decisions. Real growth."}
                {activeMode === "all" && "One connected execution engine that turns scattered research, sales, product, automation, and reporting work into clearer decisions and faster execution."}
                {activeMode === "market" && "I turn scattered market, competitor, and customer signals into clear direction."}
                {activeMode === "sales" && "I structure lead research, CRM flows, follow-up logic, and sales visibility."}
                {activeMode === "product" && "I map product ideas into workflows, dashboards, systems, and buildable roadmaps."}
                {activeMode === "automation" && "I remove repeated manual work through AI-assisted workflows and process automation."}
                {activeMode === "reporting" && "I create dashboards and reporting layers that make decisions clearer."}
              </p>
            </div>
          </div>

          {/* Mobile Stacking Visual Layout with Shared Insight Panel */}
          <div className="flex flex-col items-center w-full sm:hidden mt-6">

            {/* Module Cards Grid (Compact control buttons) */}
            <div className="grid grid-cols-2 gap-2.5 w-full max-w-sm mb-4">
              {modules.map((mod) => {
                const Icon = mod.icon;
                const active = isCardActive(mod.id);
                return (
                  <button
                    key={mod.id}
                    onClick={() => setActiveMode(activeMode === mod.id ? "idle" : mod.id)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border bg-[#FFFDF8] shadow-sm relative transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                      active ? "border-primary ring-2 ring-primary/10" : "border-[#E6D8C8]"
                    }`}
                    aria-pressed={active}
                  >
                    <span className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                      active ? "bg-primary" : "bg-[#E6D8C8]"
                    }`} />
                    
                    <div className="p-1 rounded-lg bg-[#EAF7EF] text-primary flex-shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    
                    <div className="flex flex-col min-w-0 text-left">
                      <span className="text-[10px] font-bold text-[#1F2022] truncate leading-tight">
                        {mod.title}
                      </span>
                      <span className="text-[8px] text-[#5F5A52] truncate leading-none mt-0.5">
                        {mod.sub}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Shared Insight Panel */}
            <div
              className={`p-4 rounded-xl border transition-all duration-300 text-center w-full max-w-sm min-h-[72px] flex items-center justify-center bg-[#FFFDF8] ${
                activeMode !== "idle" ? "border-primary scale-[1.01] bg-[#EAF7EF]/20" : "border-[#E6D8C8]"
              }`}
            >
              <p
                className={`text-xs font-serif font-medium leading-normal transition-colors ${
                  activeMode !== "idle" ? "text-primary font-semibold" : "text-[#1F2022]"
                }`}
              >
                {activeMode === "idle" && "One execution engine. Aligned teams. Smarter decisions. Real growth."}
                {activeMode === "all" && "One connected execution engine that turns scattered research, sales, product, automation, and reporting work into clearer decisions and faster execution."}
                {activeMode === "market" && "I turn scattered market, competitor, and customer signals into clear direction."}
                {activeMode === "sales" && "I structure lead research, CRM flows, follow-up logic, and sales visibility."}
                {activeMode === "product" && "I map product ideas into workflows, dashboards, systems, and buildable roadmaps."}
                {activeMode === "automation" && "I remove repeated manual work through AI-assisted workflows and process automation."}
                {activeMode === "reporting" && "I create dashboards and reporting layers that make decisions clearer."}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
