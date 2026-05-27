"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Linkedin,
  Twitter,
  Github,
  Mail,
  FileText,
  Layers,
  Activity,
  Globe,
  Target,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { EmailDisplay } from "./EmailDisplay";

export function FinalCTASection() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const slideUp = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as any } }
  };

  const navGroups = [
    {
      title: "WORK",
      links: [
        { label: "Featured Projects", href: "/#featured-transformations" },
        { label: "All Projects", href: "/projects" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Services", href: "/services" },
        { label: "Industries", href: "/#what-i-solve" },
        { label: "Process & Approach", href: "/#how-i-solve" }
      ]
    },
    {
      title: "PLATFORM",
      links: [
        { label: "E-Commerce Systems", href: "/solutions/ecommerce-platform" },
        { label: "Booking & Fleet", href: "/solutions/booking-system" },
        { label: "CRM & Sales Systems", href: "/solutions/crm-sales-system" },
        { label: "Analytics & BI", href: "/solutions/analytics-bi" },
        { label: "Automation & Integrations", href: "/solutions/automation-integrations" },
        { label: "SEO, AEO, GEO & SXO", href: "/solutions/seo-lead-generation" }
      ]
    },
    {
      title: "RESOURCES",
      links: [
        { label: "Research Hub", href: "/research" },
        { label: "Articles & Insights", href: "/blog" },
        { label: "Guides & Playbooks", href: "/guides" },
        { label: "Knowledge Wiki", href: "/wiki" },
        { label: "Manifesto", href: "/manifesto" }
      ]
    },
    {
      title: "ABOUT",
      links: [
        { label: "About Rizwanul", href: "/about" },
        { label: "Experience", href: "/resume#experience" },
        { label: "Resume", href: "/resume" },
        { label: "Skills", href: "/resume#skills" },
        { label: "Timeline", href: "/resume#timeline" },
        { label: "Manifesto", href: "/manifesto" }
      ]
    }
  ];

  const trustItems = [
    {
      icon: Layers,
      title: "Strategic Systems",
      metric: "50+",
      desc: "High span of control and lean operations."
    },
    {
      icon: Activity,
      title: "Proven Execution",
      metric: "$10M+",
      desc: "Revenue impact enabled for clients globally."
    },
    {
      icon: Globe,
      title: "Research-Driven",
      metric: "10+",
      desc: "SSRN published economic models behind logic."
    },
    {
      icon: Target,
      title: "Impact Focused",
      metric: "Focus",
      desc: "Optimizing for transaction volume and scale."
    }
  ];

  return (
    <section
      id="cohesive-ending"
      className="relative bg-[#FAF8F3] text-[#171717] w-full pt-8 pb-6 border-t border-[#0F5132]/10 overflow-x-hidden flex flex-col"
    >
      {/* ─────────────────────── SEO / AEO / GEO DOM LAYER ─────────────────────── */}
      <div className="sr-only" aria-hidden="false">
        <h2>Ready to build what matters? Connect with Rizwanul Islam Afraim</h2>
        <p>
          Rizwanul Islam Afraim is a Systems Architect specializing in Marketing &amp; Sales Operations. Connect with him to unify marketing, sales, and dynamic operations into high-performance, measurable business growth.
        </p>
        <nav aria-label="Footer Site Directory">
          <h3>Work Portfolio</h3>
          <ul>
            <li><a href="/projects">Filterable Projects</a></li>
            <li><a href="/case-studies">Case Studies</a></li>
          </ul>
        </nav>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 flex flex-col gap-0">
        
        {/* ================= PART A — SLIM FINAL CTA BAND ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-5%" }}
          variants={slideUp}
          className="py-5 border-b border-[#0F5132]/8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          {/* Left Column: Headline copy */}
          <div className="space-y-1.5">
            <span className="inline-block text-[#0F5132] text-xs font-bold tracking-wider uppercase leading-none">
              READY TO BUILD WHAT MATTERS?
            </span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif font-medium tracking-tight text-[#171717] leading-tight">
              Let&apos;s design systems that <span className="text-[#0F5132] italic">scale your business.</span>
            </h2>
            <p className="text-xs md:text-sm text-[#5F655F] leading-none">
              From strategy to execution, I help businesses unify marketing, sales, and digital operations.
            </p>
          </div>

          {/* Right Column: Flex row of small capsule buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-full bg-[#0F5132] text-white hover:bg-[#168A4A] text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all hover:scale-[1.02] shadow-xs cursor-pointer group"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href="mailto:hello@rizwanulafraim.com"
              className="px-5 py-3 rounded-full bg-white border border-[#0F5132]/25 text-[#171717] hover:bg-[#EAF7EF]/20 hover:border-[#0F5132]/45 text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer group"
            >
              <span>Discuss Collaboration</span>
              <MessageSquare className="w-3.5 h-3.5 text-[#0F5132]/60 group-hover:scale-105 transition-transform" />
            </a>

            <Link
              href="/resume"
              className="px-5 py-3 rounded-full bg-white border border-[#0F5132]/25 text-[#171717] hover:bg-[#EAF7EF]/20 hover:border-[#0F5132]/45 text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all group"
            >
              <span>View Resume</span>
              <FileText className="w-3.5 h-3.5 text-[#0F5132]/60 group-hover:scale-105 transition-transform" />
            </Link>

            <Link
              href="/research"
              className="px-5 py-3 rounded-full bg-white border border-[#0F5132]/25 text-[#171717] hover:bg-[#EAF7EF]/20 hover:border-[#0F5132]/45 text-[10.5px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all group"
            >
              <span>Read Research</span>
              <BookOpen className="w-3.5 h-3.5 text-[#0F5132]/60 group-hover:scale-105 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* ================= PART B — MAIN FOOTER BODY ================= */}
        <div className="py-5 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 items-start border-b border-[#0F5132]/8">
          
          {/* Left Column: Portrait Branding Card (col-span-4, premium spacing) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#0F5132]/25 shadow-xs shrink-0 bg-white">
                <Image
                  src="/assets/afraim-logo.png"
                  alt="Rizwanul Islam Afraim Illustrated Portrait"
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              </div>
              <div>
                <h4 className="font-serif font-bold text-[#171717] text-base md:text-lg leading-tight">
                  Rizwanul Islam Afraim
                </h4>
                <p className="text-[9px] md:text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#168A4A] mt-1.5 leading-none">
                  Systems Architect &bull; Marketing &amp; Sales Operations
                </p>
              </div>
            </div>

            <p className="text-xs md:text-[13px] leading-relaxed text-[#5F655F]/85 max-w-sm">
              I design and operate business systems that connect marketing, sales, operations, and digital execution into measurable, automated growth engines.
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-[#171717]">
              <div className="flex items-center gap-1.5 shrink-0">
                <MapPin className="w-4 h-4 text-[#0F5132]/70" />
                <span>Dhaka, BD</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Mail className="w-4 h-4 text-[#0F5132]/70" />
                <EmailDisplay className="hover:text-[#0F5132] transition-colors" />
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <Phone className="w-4 h-4 text-[#0F5132]/70" />
                <a href="tel:+8801751299259" className="hover:text-[#0F5132] transition-colors">
                  +880 1751-299259
                </a>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#168A4A]">
                  Active for consulting
                </span>
              </div>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 pt-1">
              {[
                { icon: Linkedin, href: "https://linkedin.com/in/rizwanul-islam-afraim" },
                { icon: Twitter, href: "https://x.com/islamafraim" },
                { icon: Github, href: "https://github.com/afraim" },
                { icon: Mail, href: "mailto:hello@rizwanulafraim.com" }
              ].map((social, sIdx) => (
                <a
                  key={sIdx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full border border-[#0F5132]/10 hover:border-[#168A4A]/30 text-[#171717] hover:text-[#0F5132] bg-white flex items-center justify-center transition-all"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Middle/Right Columns: Organized navigation links (col-span-8, micro gaps) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6">
            {navGroups.map((group) => (
              <div key={group.title} className="flex flex-col">
                <h5 className="text-[10px] md:text-[11px] font-mono uppercase tracking-widest font-extrabold text-[#171717] mb-4 leading-none">
                  {group.title}
                </h5>
                <ul className="space-y-2 text-xs md:text-[13px] font-semibold text-[#5F655F]">
                  {group.links.map((link) => (
                    <li key={link.label} className="leading-none">
                      <Link
                        href={link.href}
                        className="hover:text-[#0F5132] transition-colors block py-0.5"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

        </div>

        {/* ================= PART C — TRUST STRIP (COMPACT PILLS) ================= */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={slideUp}
          className="py-3 border-b border-[#0F5132]/8 flex flex-wrap items-center justify-center lg:justify-between gap-3"
        >
          {trustItems.map((item, idx) => (
            <div
              key={idx}
              className="px-4.5 py-2.5 rounded-full bg-white border border-[#0F5132]/10 hover:border-[#168A4A]/25 transition-all shadow-3xs flex items-center gap-2.5 text-xs font-medium text-[#171717]"
            >
              <item.icon className="w-4 h-4 text-[#0F5132] shrink-0" />
              <span className="leading-none">
                <strong className="font-bold">{item.title}:</strong>{" "}
                <span className="text-[#168A4A] font-mono font-bold">{item.metric}</span>
                <span className="text-foreground/30 mx-2">&bull;</span>
                <span className="text-[#5F655F] text-[11px]">{item.desc}</span>
              </span>
            </div>
          ))}
        </motion.div>

        {/* ================= PART D — CINEMATIC SIGNATURE ENDING ================= */}
        <div className="py-6 relative flex flex-col items-center justify-center select-none text-center">
          
          {/* Connected nodes subtle business system infographics in background (No leaves!) */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-[0.06] overflow-hidden select-none">
            {/* Left infrastructure path */}
            <svg className="w-64 h-28 hidden md:block" viewBox="0 0 280 140" fill="none">
              <path d="M10,70 Q70,20 140,80 T270,40" stroke="#0F5132" strokeWidth="1.5" strokeDasharray="3 3" />
              <circle cx="10" cy="70" r="3" fill="#0F5132" />
              <circle cx="80" cy="35" r="4.5" fill="#0F5132" />
              <circle cx="140" cy="80" r="3.5" fill="#0F5132" />
              <circle cx="210" cy="50" r="4.5" fill="#0F5132" />
              <circle cx="270" cy="40" r="3" fill="#0F5132" />
              <line x1="80" y1="35" x2="80" y2="120" stroke="#0F5132" strokeWidth="0.8" />
              <circle cx="80" cy="120" r="2.5" fill="#0F5132" />
            </svg>
            
            {/* Right infrastructure path */}
            <svg className="w-64 h-28 hidden md:block" viewBox="0 0 280 140" fill="none">
              <path d="M10,40 Q100,120 180,30 T270,70" stroke="#0F5132" strokeWidth="1.5" />
              <circle cx="10" cy="40" r="3" fill="#0F5132" />
              <circle cx="100" cy="95" r="4" fill="#0F5132" />
              <circle cx="180" cy="30" r="3.5" fill="#0F5132" />
              <circle cx="270" cy="70" r="3" fill="#0F5132" />
              <path d="M100,95 L140,130" stroke="#0F5132" strokeWidth="0.8" />
              <circle cx="140" cy="130" r="2.5" fill="#0F5132" />
            </svg>
          </div>

          <div className="relative z-10 space-y-2.5 max-w-2xl">
            <span className="text-[9px] md:text-[10px] font-mono uppercase tracking-[0.25em] font-extrabold text-[#168A4A] block">
              SYSTEMS DON&apos;T JUST IMPROVE BUSINESSES.
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-[#171717] tracking-tight leading-none px-4 select-text selection:bg-[#0F5132] selection:text-white">
              Rizwanul Islam Afraim
            </h1>
            <p className="text-[9px] md:text-[11px] font-mono uppercase tracking-[0.3em] font-extrabold text-[#5F655F]/85 mt-2">
              THE SYSTEMS ARCHITECT
            </p>
          </div>
        </div>

        {/* ================= BOTTOMMOST LEGAL / UTILITY ROW ================= */}
        <div className="py-4 border-t border-[#0F5132]/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-[#5F655F]/75 uppercase tracking-wider">
          <div>
            &copy; 2026 rizwanulafraim.com. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-[#0F5132] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-[#0F5132] transition-colors">
              Terms of Use
            </Link>
            <Link href="/cookies" className="hover:text-[#0F5132] transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
