"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Building2, Terminal } from "lucide-react";

interface TestimonialTab {
  id: "cms" | "attribution" | "operations";
  clientName: string;
  clientRole: string;
  company: string;
  shortTag: string;
  quote: string;
}

export function ExternalCredibilitySection() {
  const [activeTab, setActiveTab] = useState<"cms" | "attribution" | "operations">("cms");
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() => {
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

  const tabs: TestimonialTab[] = [
    {
      id: "cms",
      clientName: "Jahin Ahmed",
      clientRole: "Co-Founder",
      company: "The Trailheadline",
      shortTag: "Headless CMS & Architecture",
      quote: "Working with Rizwanul has been exceptional. His technical expertise combined with strategic thinking helped us launch a production-ready platform faster than we imagined. The custom CMS he built is intuitive, and the performance optimizations he implemented ensure our site loads in under half a second. He doesn't just code—he solves problems."
    },
    {
      id: "attribution",
      clientName: "Tawhid Rahman",
      clientRole: "Founder",
      company: "Arrivals Cave",
      shortTag: "Conversion & Meta CAPI",
      quote: "Rizwanul architected our complete e-commerce experience from the ground up for Eid 2026. The integration of Meta CAPI and Google Merchant Center, combined with his CRO engine, directly contributed to a massively successful launch. He understands both code and commerce."
    },
    {
      id: "operations",
      clientName: "Operational Coordinator",
      clientRole: "Management & Events",
      company: "NSUSS / Quantanite",
      shortTag: "Data Strategy & Operations",
      quote: "Leading 200+ people and processing over 1 million operational data points requires exceptional coordination. Rizwanul turned chaotic, raw operations into structured pipelines and automated dashboards that executed with absolute precision."
    }
  ];

  const activeData = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section
      id="external-credibility"
      className="relative bg-[#F7F4EC] text-[#171717] w-full py-16 md:py-24 border-t border-[#0F5132]/10 overflow-hidden"
    >
      {/* ─────────────────────── SEO / AEO / GEO DOM LAYER ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>10 / EXTERNAL CREDIBILITY: What people trust me with.</h2>
        <p>
          Read strategic client reviews, technical endorsements, and operational recommendations for Rizwanul Islam Afraim from co-founders, e-commerce store owners, and corporate operations managers.
        </p>
        {tabs.map((tab) => (
          <blockquote key={tab.id}>
            <p>{tab.quote}</p>
            <footer>— {tab.clientName}, {tab.clientRole}, {tab.company}</footer>
          </blockquote>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2.5 leading-none">
              EXTERNAL CREDIBILITY
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              What people <span className="text-[#0F5132] italic">trust me with.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed max-w-lg md:text-right">
            Real peer-to-peer verification from co-founders and operations executives who have scaled operations with me.
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Testimonial Tab Selectors + Quote Card (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 h-full">
            
            {/* Pill Tab Selector */}
            <div className="flex flex-col gap-2 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-xl p-3 shadow-3xs">
              <span className="text-[7.5px] font-mono font-bold text-[#0F5132] uppercase tracking-wider px-2 mb-1">
                SELECT TRUST CAPABILITY
              </span>
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-serif font-bold transition-all duration-200 cursor-pointer flex items-center justify-between border ${
                      isActive
                        ? "bg-[#0F5132] border-[#0F5132] text-white"
                        : "bg-white border-transparent text-[#5F655F] hover:bg-[#FAF8F3] hover:text-[#171717]"
                    }`}
                  >
                    <span>{tab.shortTag}</span>
                    <span className={`text-[9px] font-mono ${isActive ? "text-white/85" : "text-[#5F655F]"}`}>
                      {tab.company}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dynamic Quote Wrapper */}
            <div className="bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-6 md:p-8 flex-1 flex flex-col justify-between relative shadow-xs">
              <div className="absolute top-4 right-4 text-[#0F5132]/5 select-none pointer-events-none">
                <Quote className="w-16 h-16 stroke-[1]" />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-base md:text-lg font-serif italic text-[#171717] leading-relaxed mb-6">
                    &ldquo;{activeData.quote}&rdquo;
                  </h3>
                </motion.div>
              </AnimatePresence>

              <div className="pt-5 border-t border-[#0F5132]/8 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-serif font-bold text-[#171717]">{activeData.clientName}</h4>
                  <p className="text-[9px] font-mono font-bold text-[#5F655F] uppercase tracking-wider mt-0.5">
                    {activeData.clientRole}, {activeData.company}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-[#FAF8F3] border border-[#0F5132]/10 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-[#0F5132]" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Systems Visualizer Canvas (col-span-7) */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-5%" }}
            transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
            className="lg:col-span-7 flex flex-col justify-between bg-[#FFFDF8] border border-[#0F5132]/14 rounded-2xl p-6 md:p-8 shadow-xs relative self-stretch"
          >
            {/* Header info */}
            <div className="flex items-center justify-between pb-3 border-b border-[#0F5132]/8 mb-4">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#0F5132]" />
                <span className="text-[9px] font-mono font-bold text-[#171717] uppercase tracking-wider">
                  Operational System Mapping
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-sm bg-[#EAF7EF] border border-[#0F5132]/12 text-[7.5px] font-mono text-[#0F5132] font-bold">
                DELIVERED
              </span>
            </div>

            {/* Dynamic Rendering Canvas based on active testimonial category */}
            <div className="flex-1 flex items-center justify-center min-h-[220px] bg-[#FAF8F3] rounded-xl border border-[#0F5132]/5 p-4 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {activeTab === "cms" && (
                  <motion.div
                    key="cms-visual"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    {/* CMS Nodes Visualizer */}
                    <div className="flex justify-between items-center">
                      <span className="text-[7.5px] font-mono text-[#5F655F] font-bold uppercase">Headless Editor Tree</span>
                      <span className="text-[#0F5132] text-[7.5px] font-mono font-extrabold">SPEED RATIO &lt; 0.45s</span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 my-auto">
                      {[
                        { title: "Tiptap Core Editor", status: "Active Block Editor" },
                        { title: "JSON Schema Parser", status: "Crawlable Output" },
                        { title: "Edge Cache Sync", status: "0ms Vercel KV Cache" }
                      ].map((node, idx) => (
                        <div key={idx} className="bg-white border border-[#0F5132]/10 rounded-lg p-2.5 flex flex-col justify-between h-20 shadow-3xs">
                          <span className="text-[8px] font-serif font-bold text-[#171717]">{node.title}</span>
                          <span className="text-[6.5px] font-mono text-[#0F5132] mt-auto font-bold leading-none">
                            {node.status}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-[7px] font-mono text-[#5F655F]/65 uppercase tracking-widest pt-2 border-t border-[#0F5132]/6">
                      <span>NEXT.JS ISR SERVER</span>
                      <span className="text-[#0F5132] font-bold">API STATUS: ONLINE</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "attribution" && (
                  <motion.div
                    key="attribution-visual"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    {/* E-Commerce Attribution Flow */}
                    <div className="flex justify-between items-center">
                      <span className="text-[7.5px] font-mono text-[#5F655F] font-bold uppercase">Attribution Pipeline Flow</span>
                      <span className="text-[#0F5132] text-[7.5px] font-mono font-extrabold">Meta CAPI Active</span>
                    </div>

                    <div className="flex items-center justify-between my-auto relative px-4">
                      {/* Connector SVGs */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 80">
                        <path d="M 60,40 H 240" stroke="#0F5132" strokeWidth="1" strokeDasharray="3 3" />
                        {/* Moving particles */}
                        <motion.circle
                          cx="60"
                          cy="40"
                          r="3"
                          fill="#168A4A"
                          initial={{ cx: 60, cy: 40 }}
                          animate={{ cx: [60, 240] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                      </svg>

                      <div className="w-16 h-14 rounded-lg bg-white border border-[#0F5132]/10 p-1.5 flex flex-col justify-between z-10 shadow-3xs">
                        <span className="text-[7px] font-mono text-[#5F655F] uppercase block font-bold leading-none">Purchase Event</span>
                        <span className="text-[8.5px] font-serif font-bold text-[#171717] mt-1">$450 CAD</span>
                      </div>

                      <div className="w-16 h-14 rounded-lg bg-white border border-[#0F5132]/10 p-1.5 flex flex-col justify-between z-10 shadow-3xs">
                        <span className="text-[7px] font-mono text-[#5F655F] uppercase block font-bold leading-none">Server Dispatch</span>
                        <span className="text-[6.5px] font-mono text-[#0F5132] font-bold mt-1">200 Sync OK</span>
                      </div>

                      <div className="w-16 h-14 rounded-lg bg-[#0F5132] border border-[#0F5132] p-1.5 flex flex-col justify-between z-10 shadow-3xs">
                        <span className="text-[7px] font-mono text-white/85 uppercase block font-bold leading-none">Meta Ads API</span>
                        <span className="text-[7.5px] font-serif font-bold text-white mt-1">Matched 99%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[7px] font-mono text-[#5F655F]/65 uppercase tracking-widest pt-2 border-t border-[#0F5132]/6">
                      <span>Server-Side Hook Dispatch</span>
                      <span className="text-[#0F5132] font-bold">100% Deduplicated</span>
                    </div>
                  </motion.div>
                )}

                {activeTab === "operations" && (
                  <motion.div
                    key="operations-visual"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="w-full h-full flex flex-col justify-between"
                  >
                    {/* Operations Ticket / Millions Data points */}
                    <div className="flex justify-between items-center">
                      <span className="text-[7.5px] font-mono text-[#5F655F] font-bold uppercase">Enterprise Operations</span>
                      <span className="text-[#0F5132] text-[7.5px] font-mono font-extrabold">1M+ Records Processed</span>
                    </div>

                    <div className="grid grid-cols-12 gap-2 my-auto items-center">
                      {/* Bar graph representing ticket throughput */}
                      <div className="col-span-8 space-y-1.5">
                        {[
                          { name: "Tickets (25k attendees)", val: 95 },
                          { name: "Sourcing Logistics Sync", val: 85 },
                          { name: "Enterprise DB Queries", val: 100 }
                        ].map((bar, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="flex justify-between text-[7px] font-mono text-[#5F655F] font-bold">
                              <span>{bar.name}</span>
                              <span>{bar.val}%</span>
                            </div>
                            <div className="w-full bg-white h-2 rounded-full border border-[#0F5132]/8 overflow-hidden">
                              <motion.div
                                className="bg-gradient-to-r from-[#0F5132] to-[#168A4A] h-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${bar.val}%` }}
                                transition={{ duration: 0.8 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Side dashboard metric block */}
                      <div className="col-span-4 bg-white border border-[#0F5132]/10 rounded-lg p-2.5 h-20 shadow-3xs flex flex-col justify-between">
                        <span className="text-[6.5px] font-mono text-[#5F655F] font-bold uppercase tracking-wider leading-none">Accuracy Rating</span>
                        <div className="text-center my-auto">
                          <span className="text-lg font-serif font-bold text-[#171717]">99.99%</span>
                        </div>
                        <span className="text-[6.5px] font-mono text-[#0F5132] font-bold uppercase leading-none">Stable Scale</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[7px] font-mono text-[#5F655F]/65 uppercase tracking-widest pt-2 border-t border-[#0F5132]/6">
                      <span>ACE VOLUNTEER GRAPH</span>
                      <span className="text-[#0F5132] font-bold">STABILITY: EXCELLENT</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom details block */}
            <div className="pt-4 border-t border-[#0F5132]/8 mt-4 flex items-center justify-between text-[11px] text-[#5F655F] font-medium leading-none">
              <span>All case metrics are fully verified and referenced.</span>
              <span className="font-bold text-[#0F5132]">Compounding Trust &bull; 2026</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
