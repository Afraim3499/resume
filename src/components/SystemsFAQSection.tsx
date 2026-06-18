"use client";

import React, { useState } from "react";
import { Plus, Minus, HelpCircle, ShieldCheck, Target, BadgeDollarSign, HeartHandshake } from "lucide-react";
import { faqData } from "@/data/faq";

interface CategoryMeta {
  id: string;
  name: string;
  shortName: string;
  desc: string;
  icon: typeof ShieldCheck;
  dataCategories: string[];
}

export function SystemsFAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");


  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const categories: CategoryMeta[] = [
    {
      id: "all",
      name: "All Strategic Inquiries",
      shortName: "All Inquiries",
      desc: "Comprehensive system objections fully resolved.",
      icon: ShieldCheck,
      dataCategories: ["Capability", "Role", "Search Strategy", "Execution", "Process", "Collaboration", "Pricing", "Value Proposition"]
    },
    {
      id: "scoping",
      name: "Capability & Process",
      shortName: "Process",
      desc: "Diagnostics, scope pipelines, and fractional advisory.",
      icon: Target,
      dataCategories: ["Capability", "Role", "Execution", "Process"]
    },
    {
      id: "commercials",
      name: "Pricing & Retainers",
      shortName: "Pricing",
      desc: "Value packages, ongoing support, and fractional scale.",
      icon: BadgeDollarSign,
      dataCategories: ["Pricing", "Collaboration", "Value Proposition"]
    },
    {
      id: "search",
      name: "AEO/GEO Indexing",
      shortName: "AEO/GEO",
      desc: "Advanced search schemas, index graphs, and LLM reference optimization.",
      icon: HeartHandshake,
      dataCategories: ["Search Strategy"]
    }
  ];

  // Filter FAQs based on active category
  const activeMeta = categories.find((c) => c.id === activeCategory) || categories[0];
  const filteredFAQs = faqData.filter((item) => activeMeta.dataCategories.includes(item.category));

  // Generate dynamic JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section
      id="systems-faq"
      className="relative bg-[#FAF8F3] text-[#171717] w-full py-16 md:py-24 border-y border-[#0F5132]/10 overflow-hidden"
    >
      {/* ─────────────────────── DYNAMIC FAQ JSON-LD INJECTION ─────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─────────────────────── SEO / AEO / GEO DOM LAYER ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>11 / SYSTEMS FAQ: Questions before we build the system.</h2>
        <p>
          Find direct, strategic answers regarding Rizwanul Islam Afraim&apos;s product platform architecture capabilities, business automation strategy, search engine optimization solutions (including AEO, GEO, SXO, and AI optimization), pricing models, and platform systems architecture advisory.
        </p>
        {faqData.map((item, idx) => (
          <div key={idx}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2.5 leading-none">
              SYSTEMS FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              Questions before we <span className="text-[#0F5132] italic">build the system.</span>
            </h2>
          </div>
          <p className="text-xs md:text-sm text-[#5F655F] leading-relaxed max-w-md md:text-right">
            Addressing tactical objections, commercial scopes, retainers, and search engine optimization standards upfront.
          </p>
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Category selectors (col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6 h-full">
            
            {/* Desktop Category selection list */}
            <div className="hidden lg:flex flex-col gap-2 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-xl p-3.5 shadow-3xs">
              <span className="text-[7.5px] font-mono font-bold text-[#168A4A] uppercase tracking-wider px-2 mb-1.5">
                Filter by Category
              </span>

              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                const CatIcon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenIndex(null); // Reset open states on filter change
                    }}
                    className={`w-full text-left p-3 rounded-lg border transition-all duration-200 cursor-pointer flex gap-3 items-center ${
                      isActive
                        ? "bg-[#0F5132] border-[#0F5132] text-white shadow-3xs"
                        : "bg-white border-transparent text-[#5F655F] hover:bg-[#FAF8F3] hover:text-[#171717]"
                    }`}
                  >
                    <div className={`p-1.5 rounded-full shrink-0 ${isActive ? "bg-white/10 text-white" : "bg-[#0F5132]/5 text-[#0F5132]"}`}>
                      <CatIcon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <span className="block text-xs font-serif font-bold leading-none mb-0.5">{cat.name}</span>
                      <p className={`text-[9px] font-mono ${isActive ? "text-white/90" : "text-[#5F655F]"}`}>
                        {cat.desc.slice(0, 45)}...
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Mobile Category selector (Horizontal scrolling pills) */}
            <div className="flex lg:hidden overflow-x-auto scrollbar-none gap-2 pb-2 -mx-4 px-4 select-none mb-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenIndex(null);
                    }}
                    className={`px-4 py-2.5 rounded-full border text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer min-h-[40px] whitespace-nowrap ${
                      isActive
                        ? "bg-[#0F5132] border-[#0F5132] text-white"
                        : "bg-white border-[#0F5132]/10 text-[#5F655F]"
                    }`}
                  >
                    {cat.shortName}
                  </button>
                );
              })}
            </div>

            {/* Micro-insight box */}
            <div className="bg-[#FFFDF8] border border-[#E6DDD0]/60 rounded-xl p-5 shadow-3xs flex-1 flex flex-col justify-center select-none text-left">
              <HelpCircle className="w-5 h-5 text-[#0F5132] mb-2" />
              <p className="text-xs font-serif font-bold text-[#171717] mb-1">Looking for a custom project setup?</p>
              <p className="text-[11px] text-[#5F655F] leading-relaxed">
                If your specific system bottleneck isn&apos;t covered here, feel free to submit a blueprint inquiry via the WhatsApp terminal below for fractional scoping.
              </p>
            </div>

          </div>

          {/* Right Column: Accordion Panels (col-span-8) */}
          <div className="lg:col-span-8 flex flex-col gap-3.5 justify-center">
            {filteredFAQs.map((item) => {
              // Find index of item in global faqData for stable IDs
              const globalIdx = faqData.indexOf(item);
              const isOpen = openIndex === globalIdx;

              return (
                <div
                  key={globalIdx}
                  className={`bg-[#FFFDF8] border border-[#0F5132]/14 rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen ? "shadow-xs border-[#168A4A]/30" : "hover:border-[#168A4A]/25"
                  }`}
                >
                  {/* Trigger Header */}
                  <button
                    id={`faq-trigger-${globalIdx}`}
                    aria-controls={`faq-content-${globalIdx}`}
                    aria-expanded={isOpen}
                    onClick={() => handleToggle(globalIdx)}
                    className="flex items-center justify-between w-full p-4.5 text-left cursor-pointer group"
                  >
                    <span className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#EAF7EF] flex items-center justify-center shrink-0 text-[#0F5132] mt-0.5 select-none font-mono text-[8px] font-bold">
                        {globalIdx + 1 < 10 ? `0${globalIdx + 1}` : globalIdx + 1}
                      </span>
                      <span className="text-sm md:text-base font-serif font-bold text-[#171717] group-hover:text-[#0F5132] transition-colors leading-snug">
                        {item.question}
                      </span>
                    </span>

                    <span
                      className={`flex-shrink-0 ml-4 p-1 rounded-full border border-[#0F5132]/10 text-[#0F5132] transition-transform duration-300 ${
                        isOpen ? "bg-[#0F5132] text-white rotate-180" : "bg-white group-hover:border-[#168A4A]/30"
                      }`}
                    >
                      {isOpen ? (
                        <Minus className="w-3 h-3 shrink-0" />
                      ) : (
                        <Plus className="w-3 h-3 shrink-0" />
                      )}
                    </span>
                  </button>

                  {/* Body Content Panel */}
                  <div
                    id={`faq-content-${globalIdx}`}
                    aria-labelledby={`faq-trigger-${globalIdx}`}
                    role="region"
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[350px] border-t border-[#0F5132]/6 bg-[#FAF8F3]/30" : "max-h-0"
                    }`}
                  >
                    <div className="p-5 pl-13 text-xs md:text-[13px] text-[#5F655F] leading-relaxed select-text">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
