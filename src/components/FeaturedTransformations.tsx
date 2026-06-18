"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Layers,
  AlertTriangle,
  Wrench,
  TrendingUp,
  Globe,
  Construction,
} from "lucide-react";
import Link from "next/link";
import { MobileFeaturedTransformations } from "./MobileFeaturedTransformations";

/* ─────────────────────── DATA ─────────────────────── */

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

const transformations: TransformationProject[] = [
  {
    slug: "gaari",
    index: "01",
    title: "Gaari",
    subtitle: "Car Booking & Travel Ecosystem",
    messyReality:
      "Bangladesh had zero unified digital platform for car rentals. The entire industry ran on phone calls, WhatsApp, and physical offices — no inventory visibility, wildly inconsistent pricing, and double-booking nightmares.",
    whatIBuilt:
      "A full-stack multi-service booking engine with real-time availability, dynamic pricing via Redis-cached algorithms, dual payment gateways (Stripe + Bkash), and an AI chatbot handling 80% of support queries.",
    systemLayers: [
      "Booking Engine with State Management",
      "Supabase Realtime Availability Layer",
      "Redis-Cached Dynamic Pricing Engine",
      "Dual Payment Gateway Abstraction",
      "Geocoding + Route Optimization (500+ landmarks)",
    ],
    businessImpact:
      "40% increase in fleet utilization. 80% reduction in manual support queries. 98/100 Lighthouse score on mid-range Android devices over 4G.",
    tools: ["Next.js 14", "Supabase", "Redis", "Stripe", "Bkash", "PostgreSQL", "Cloudinary"],
    image: "/assets/gaari-1.webp",
    imageAlt: "Gaari car booking platform dashboard showing vehicle selection and booking flow",
    link: "https://gaaribd.com",
    metrics: [
      { label: "Fleet Utilization", value: "+40%" },
      { label: "Support Queries", value: "-80%" },
      { label: "Lighthouse", value: "98/100" },
    ],
    aspectRatio: 2.089,
  },
  {
    slug: "the-trail",
    index: "02",
    title: "The Trailheadline",
    subtitle: "Custom CMS & News Delivery Platform",
    messyReality:
      "No publishing platform existed. Zero SEO infrastructure. Manual editorial workflows with no visibility into content performance. Editors were stuck between WordPress bloat and Google Docs chaos.",
    whatIBuilt:
      "A custom CMS with Tiptap editor, multi-stage approval workflow (Draft → Review → Approved → Published), trending algorithms with exponential time-decay, and comprehensive analytics.",
    systemLayers: [
      "Tiptap Rich Text CMS Engine",
      "Multi-Stage Approval Workflow (4 states)",
      "Gravity/Velocity Trending Algorithm",
      "PostgreSQL Full-Text Search (tsvector)",
      "JSON-LD SEO + Dynamic Sitemap + RSS",
    ],
    businessImpact:
      "3x content velocity via automation. 15k+ monthly active readers in the first quarter. 95/100 Lighthouse with 0.4s load times.",
    tools: ["Next.js 14", "Tiptap", "Supabase", "PostgreSQL", "Redis", "Docker", "Nginx"],
    image: "/assets/the-trail.webp",
    imageAlt: "The Trailheadline news platform showing editorial layout and category navigation",
    link: "https://trailheadlines.com",
    metrics: [
      { label: "Content Velocity", value: "3x" },
      { label: "Monthly Readers", value: "15k+" },
      { label: "Lighthouse", value: "95/100" },
    ],
    aspectRatio: 1.475,
  },
  {
    slug: "arrivals-cave",
    index: "03",
    title: "Arrivals Cave",
    subtitle: "Headless E-Commerce with Full-Stack Attribution",
    messyReality:
      "Launching a seasonal Panjabi collection from zero audience. Client-side tracking pixels were losing 30-40% of conversion data to iOS 14+ ad-blockers, destroying ROAS predictability.",
    whatIBuilt:
      "A headless commerce engine with server-side Meta CAPI via Server Actions with SHA-256 deduplication, programmatic Google Merchant XML feed, and CRO-optimized mobile checkout with sticky ATC and urgency logic.",
    systemLayers: [
      "Server-to-Server Meta Conversions API (CAPI)",
      "SHA-256 Event Deduplication Pipeline",
      "Google Merchant XML Variant Generator",
      "CRO Components (Sticky ATC, Scarcity, Cashback)",
      "Tiptap CMS for Non-Technical Staff",
    ],
    businessImpact:
      "+30% ad attribution recovery. 95+ Lighthouse. 7+ CRO features shipping from day one. Eid 2026 collection live and revenue-generating immediately.",
    tools: ["Next.js 16", "Supabase", "Meta CAPI", "Google Merchant", "Zustand", "Tiptap"],
    image: "/arrivals-cave-1.jpg",
    imageAlt: "Arrivals Cave e-commerce storefront showing Eid 2026 Panjabi collection",
    link: "https://www.arrivalscavebd.com",
    metrics: [
      { label: "Attribution", value: "+30%" },
      { label: "Lighthouse", value: "95+" },
      { label: "CRO Features", value: "7+" },
    ],
    aspectRatio: 1.800,
  },
  {
    slug: "inshortbd",
    index: "04",
    title: "InshortBD",
    subtitle: "Cloud-Native Bangla Media Platform",
    messyReality:
      "Serving 170M+ Bengali speakers required flawless Unicode typography, a scalable media pipeline capable of surviving viral breaking-news spikes, and zero-downtime reliability for a non-technical editorial team.",
    whatIBuilt:
      "A cloud-native platform with AWS S3 presigned URL media pipeline, Playwright E2E tests in CI/CD, Twitter API v2 syndication, and a headless Tiptap CMS with custom slash commands for journalists.",
    systemLayers: [
      "AWS S3 Presigned URL Media Pipeline",
      "GitHub Actions + Playwright CI/CD Gate",
      "Tiptap CMS with Custom Slash Commands",
      "Article Series/Collections Engine",
      "Twitter API v2 Social Syndication",
    ],
    businessImpact:
      "0% CI/CD regressions reaching production. 40% faster time-to-publish. Enterprise-grade infrastructure targeting 170M+ Bengali speakers globally.",
    tools: ["Next.js 16", "AWS S3", "Playwright", "GitHub Actions", "Tiptap", "Supabase"],
    image: "/inshortbd-1.jpg",
    imageAlt: "InshortBD Bangla news platform showing editorial layout with Bangla typography",
    link: "https://www.inshortbd.com",
    metrics: [
      { label: "CI Regressions", value: "0%" },
      { label: "Time-to-Publish", value: "-40%" },
      { label: "Audience", value: "170M+" },
    ],
    aspectRatio: 2.061,
  },
  // Ongoing projects
  {
    slug: "lurnava",
    index: "05",
    title: "Lurnava",
    subtitle: "AI-Powered Learning Management System",
    messyReality:
      "Traditional LMS platforms treat all learners identically. Course completion rates stagnate because content delivery ignores individual learning patterns, pace, and knowledge gaps.",
    whatIBuilt:
      "Designing an adaptive learning engine that personalizes content delivery based on learner behavior patterns, with AI-driven assessment and progress tracking.",
    systemLayers: [
      "Adaptive Content Delivery Engine",
      "AI-Driven Progress Assessment",
      "Behavioral Learning Analytics",
      "Course Architecture Framework",
    ],
    businessImpact: "Currently in active development. Targeting personalized education at scale.",
    tools: ["Next.js", "Supabase", "AI/ML", "PostgreSQL"],
    image: "/assets/lurnava-ongoing.jpg",
    imageAlt: "Lurnava learning platform - Adaptive AI learning dashboard and course builder interface (In Development)",
    metrics: [],
    ongoing: true,
    aspectRatio: 1.646,
  },
  {
    slug: "sinha",
    index: "06",
    title: "Sinha Sourcing",
    subtitle: "B2B Sourcing & Supply Chain Platform",
    messyReality:
      "Cross-border sourcing from Bangladesh operates on trust networks and manual coordination. No digital infrastructure exists for vendor discovery, order tracking, or quality assurance at scale.",
    whatIBuilt:
      "Building a digital sourcing platform that connects international buyers with verified Bangladeshi manufacturers, with order lifecycle management and quality tracking.",
    systemLayers: [
      "Vendor Discovery & Verification Engine",
      "Order Lifecycle Management",
      "Quality Assurance Tracking",
      "Cross-Border Communication Layer",
    ],
    businessImpact: "Currently in active development. Targeting B2B sourcing digitization.",
    tools: ["Next.js", "Supabase", "PostgreSQL"],
    image: "/assets/sinha-sourcing-ongoing.jpg",
    imageAlt: "Sinha Sourcing platform - B2B global supply chain and verified manufacturer discovery dashboard (In Development)",
    metrics: [],
    ongoing: true,
    aspectRatio: 2.078,
  },
];

const completedProjects = transformations.filter((p) => !p.ongoing);
const ongoingProjects = transformations.filter((p) => p.ongoing);

/* ─────────────────────── COMPONENT ─────────────────────── */

export function FeaturedTransformations() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });
  const [lightboxProject, setLightboxProject] = useState<TransformationProject | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const active = completedProjects[activeIndex];

  const goNext = () => setActiveIndex((i) => (i + 1) % completedProjects.length);
  const goPrev = () => setActiveIndex((i) => (i - 1 + completedProjects.length) % completedProjects.length);

  return (
    <section
      id="featured-transformations"
      className="relative bg-[#F7F4EC] text-[#171717] w-full py-10 md:py-12 lg:py-14 overflow-hidden"
    >
      {/* ──── DESKTOP LAYOUT ──── */}
      <div className="hidden lg:block">
        <div className="container mx-auto max-w-7xl px-4 md:px-8">
          {/* Compact Header Row: Badge + Title + Nav Arrows all in one line */}
          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-2 leading-none">
                FEATURED TRANSFORMATIONS
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
                Where systems thinking{" "}
                <span className="text-[#0F5132] italic">becomes real.</span>
              </h2>
            </div>
            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                aria-label="Previous project"
                className="w-9 h-9 rounded-full border border-[#0F5132]/20 bg-white/60 hover:bg-[#EAF7EF] hover:border-[#168A4A]/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#0F5132]" />
              </button>
              <span className="text-xs font-mono text-[#5F655F] min-w-[40px] text-center">
                {activeIndex + 1} / {completedProjects.length}
              </span>
              <button
                onClick={goNext}
                aria-label="Next project"
                className="w-9 h-9 rounded-full border border-[#0F5132]/20 bg-white/60 hover:bg-[#EAF7EF] hover:border-[#168A4A]/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#0F5132]" />
              </button>
            </div>
          </div>

          {/* Project Selector Rail */}
          <div className="flex gap-2 mb-5 border-b border-[#0F5132]/10 pb-3">
            {completedProjects.map((p, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={p.slug}
                  onClick={() => setActiveIndex(i)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-left transition-all duration-250 cursor-pointer ${
                    isActive
                      ? "bg-[#0F5132] text-white shadow-md shadow-[#0F5132]/15"
                      : "bg-white/50 border border-[#0F5132]/8 text-[#5F655F] hover:bg-white hover:border-[#0F5132]/20 hover:text-[#0F5132]"
                  }`}
                >
                  <span className={`text-[9px] font-mono ${isActive ? "text-white/70" : "text-[#168A4A]/60"}`}>
                    {p.index}
                  </span>
                  <span className="text-xs font-semibold">{p.title}</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Panel — viewport-fitted */}
          <div className="relative w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -12 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid grid-cols-12 gap-6"
              >
                {/* Left Column: Project Info */}
                <div className="col-span-5 flex flex-col gap-3">
                  {/* Title Block */}
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <span className="text-[10px] font-mono text-[#168A4A] font-bold">{active.index}</span>
                      <h3 className="text-lg font-serif font-bold text-[#171717] leading-none">{active.title}</h3>
                    </div>
                    <p className="text-xs md:text-[13px] text-[#0F5132] font-semibold">{active.subtitle}</p>
                  </div>

                  {/* The Messy Reality */}
                  <div className="p-3 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <AlertTriangle className="w-3 h-3 text-amber-600" />
                      <span className="text-[8px] font-mono font-bold text-amber-700 uppercase tracking-wider">
                        The Messy Reality
                      </span>
                    </div>
                    <p className="text-xs md:text-[13px] text-[#5F655F] leading-relaxed">{active.messyReality}</p>
                  </div>

                  {/* What I Built */}
                  <div className="p-3 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Wrench className="w-3 h-3 text-[#168A4A]" />
                      <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                        What I Built
                      </span>
                    </div>
                    <p className="text-xs md:text-[13px] text-[#5F655F] leading-relaxed">{active.whatIBuilt}</p>
                  </div>

                  {/* Business Impact */}
                  <div className="p-3 bg-[#EAF7EF] border border-[#168A4A]/20 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <TrendingUp className="w-3 h-3 text-[#168A4A]" />
                      <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                        Business Impact
                      </span>
                    </div>
                    <p className="text-xs md:text-[13px] text-[#0F5132] font-semibold leading-relaxed">{active.businessImpact}</p>
                  </div>

                  {/* System Layers — compact 2-col grid */}
                  <div className="p-3 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-lg">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Layers className="w-3 h-3 text-[#168A4A]" />
                      <span className="text-[8px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                        System Layers
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      {active.systemLayers.map((layer, i) => (
                        <div key={layer} className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded bg-[#EAF7EF] border border-[#168A4A]/15 flex items-center justify-center shrink-0">
                            <span className="text-[7px] font-mono font-bold text-[#168A4A]">{i + 1}</span>
                          </div>
                          <span className="text-[11px] md:text-xs text-[#5F655F] font-medium leading-tight">{layer}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools Strip */}
                  <div className="flex flex-wrap gap-1">
                    {active.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[8px] font-sans px-2 py-0.5 rounded-full bg-white border border-[#0F5132]/10 text-[#5F655F] font-medium"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column: Visual + Metrics */}
                <div className="col-span-7 flex flex-col gap-3">
                  {/* Project Screenshot */}
                  <div
                    onClick={() => setLightboxProject(active)}
                    style={{ aspectRatio: active.aspectRatio }}
                    className="relative w-full rounded-xl overflow-hidden border border-[#0F5132]/10 bg-[#FAF8F3] shadow-sm group cursor-zoom-in"
                  >
                    {active.image ? (
                      <Image
                        src={active.image}
                        alt={active.imageAlt}
                        fill
                        className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        priority={activeIndex === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F3]">
                        <span className="text-sm text-[#5F655F] font-serif italic">Visual coming soon</span>
                      </div>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0F5132]/10 to-transparent pointer-events-none" />
                    {active.link && (
                      <Link
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm border border-[#0F5132]/10 text-[9px] font-semibold text-[#0F5132] hover:bg-[#EAF7EF] transition-colors duration-200 shadow-sm"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Globe className="w-3 h-3" />
                        Live
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    )}
                  </div>

                  {/* Metrics Strip */}
                  <div className="grid grid-cols-3 gap-2">
                    {active.metrics.map((m) => (
                      <div
                        key={m.label}
                        className="py-2.5 px-2 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-lg text-center"
                      >
                        <div className="text-base font-serif font-bold text-[#0F5132] leading-none">{m.value}</div>
                        <div className="text-[8px] font-mono text-[#5F655F] uppercase tracking-wider mt-1">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ──── Ongoing Systems Strip ──── */}
          {ongoingProjects.length > 0 && (
            <div className="mt-10 pt-6 border-t border-[#0F5132]/10">
              <div className="flex items-center gap-2 mb-4">
                <Construction className="w-3.5 h-3.5 text-[#168A4A]" />
                <span className="text-[9px] font-mono font-bold text-[#0F5132] uppercase tracking-wider">
                  Ongoing Systems in Development
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ongoingProjects.map((p) => (
                  <div
                    key={p.slug}
                    className="p-4 bg-[#FFFDF8] border border-[#0F5132]/10 rounded-xl border-dashed grid grid-cols-12 gap-3.5"
                  >
                    <div className="col-span-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-[9px] font-mono text-[#168A4A] font-bold">{p.index}</span>
                          <p className="text-sm font-serif font-bold text-[#171717]">{p.title}</p>
                          <span className="text-[7px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded-full font-semibold uppercase leading-none">
                            In Development
                          </span>
                        </div>
                        <p className="text-xs text-[#0F5132] font-semibold mb-1.5">{p.subtitle}</p>
                        <p className="text-xs text-[#5F655F] leading-relaxed mb-3">{p.messyReality}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 border-t border-[#0F5132]/8 pt-2">
                        {p.systemLayers.slice(0, 3).map((layer) => (
                          <span
                            key={layer}
                            className="text-[8px] px-2 py-0.5 rounded-full bg-[#EAF7EF] border border-[#168A4A]/10 text-[#0F5132] font-medium"
                          >
                            {layer}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div
                      onClick={() => setLightboxProject(p)}
                      style={{ aspectRatio: p.aspectRatio }}
                      className="col-span-4 relative w-full rounded-lg overflow-hidden border border-[#0F5132]/10 bg-[#FAF8F3] self-center group cursor-zoom-in"
                    >
                      {p.image ? (
                        <Image
                          src={p.image}
                          alt={p.imageAlt}
                          fill
                          className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-300"
                          sizes="(max-width: 1024px) 15vw, 12vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F3]">
                          <span className="text-[8px] text-[#5F655F] font-serif italic">Preview</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ──── MOBILE / TABLET LAYOUT ──── */}
      <div className="lg:hidden w-full px-4">
        <div className="max-w-xl mx-auto flex flex-col gap-6">
          {/* Mobile Header */}
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#0F5132]/10 border border-[#0F5132]/20 text-[#0F5132] text-[10px] font-semibold tracking-wider uppercase mb-3.5 leading-none">
              FEATURED TRANSFORMATIONS
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium tracking-tight text-[#171717] mb-2 leading-tight">
              Where systems thinking <span className="text-[#0F5132] italic">becomes real.</span>
            </h2>
            <p className="text-xs text-[#5F655F] leading-relaxed">
              Each project started as a messy, real-world problem and was transformed into a structured,
              measurable system.
            </p>
          </div>

          <MobileFeaturedTransformations
            completedProjects={completedProjects}
            ongoingProjects={ongoingProjects}
            setLightboxProject={setLightboxProject}
          />
        </div>
      </div>

      {/* ──── Section CTA ──── */}
      <div className="bg-[#F7F4EC] border-t border-[#0F5132]/14 pt-12 mt-16 relative z-10">
        <div className="container mx-auto max-w-4xl px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-left">
          <div className="max-w-xl">
            <p className="text-base md:text-lg font-serif font-medium text-[#0F5132] leading-tight mb-2">
              Every system started as a problem no one wanted to touch.
            </p>
            <p className="text-xs text-[#5F655F] leading-relaxed">
              From mobility ecosystems to media pipelines — each transformation proves that structured thinking
              applied to messy operations creates compounding business value.
            </p>
          </div>
          <div>
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#0F5132] hover:bg-[#168A4A] text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              Explore All Projects
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ──── CINEMATIC LIGHTBOX MODAL ──── */}
      <AnimatePresence>
        {lightboxProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md p-4 md:p-6"
            onClick={() => setLightboxProject(null)}
          >
            {/* Top Bar: Close Button */}
            <div className="flex justify-end w-full">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxProject(null);
                }}
                aria-label="Close lightbox"
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 flex items-center justify-center transition-all cursor-pointer text-white/80 hover:text-white"
              >
                <svg
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Central Widescreen Cinematic Image View */}
            <div className="flex-1 flex items-center justify-center w-full px-2 md:px-12 relative">
              {/* Prev Project Button (Only for completed projects) */}
              {!lightboxProject.ongoing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = completedProjects.findIndex((p) => p.slug === lightboxProject.slug);
                    const prevIdx = (idx - 1 + completedProjects.length) % completedProjects.length;
                    setLightboxProject(completedProjects[prevIdx]);
                  }}
                  aria-label="Previous project image"
                  className="absolute left-2 md:left-6 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 flex items-center justify-center transition-all cursor-pointer text-white/80 hover:text-white z-10"
                >
                  <ChevronLeft className="w-5 h-5 md:w-7 md:h-7" />
                </button>
              )}

              {/* Cinematic Image Frame */}
              <motion.div
                key={lightboxProject.slug}
                initial={{ scale: 0.95, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ aspectRatio: lightboxProject.aspectRatio }}
                className="relative max-w-5xl max-h-[75vh] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={lightboxProject.image}
                  alt={lightboxProject.imageAlt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1280px) 95vw, 1200px"
                  priority
                />
              </motion.div>

              {/* Next Project Button (Only for completed projects) */}
              {!lightboxProject.ongoing && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const idx = completedProjects.findIndex((p) => p.slug === lightboxProject.slug);
                    const nextIdx = (idx + 1) % completedProjects.length;
                    setLightboxProject(completedProjects[nextIdx]);
                  }}
                  aria-label="Next project image"
                  className="absolute right-2 md:right-6 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/5 border border-white/10 hover:bg-white/15 hover:border-white/20 flex items-center justify-center transition-all cursor-pointer text-white/80 hover:text-white z-10"
                >
                  <ChevronRight className="w-5 h-5 md:w-7 md:h-7" />
                </button>
              )}
            </div>

            {/* Bottom Caption and Info */}
            <div className="text-center py-4 select-none">
              <div className="inline-block bg-white/5 border border-white/10 backdrop-blur-md py-2 px-5 rounded-full">
                <span className="text-[10px] md:text-xs font-mono text-[#168A4A] font-bold mr-2 leading-none">
                  {lightboxProject.index}
                </span>
                <span className="text-xs md:text-sm font-serif font-bold text-white leading-none">
                  {lightboxProject.title}
                </span>
                <span className="text-[10px] md:text-xs text-white/85 font-medium ml-2 border-l border-white/20 pl-2 leading-none">
                  {lightboxProject.subtitle}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
