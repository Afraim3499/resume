"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Linkedin, Twitter, Github, Mail, Phone, MapPin, ChevronDown
} from "lucide-react";
import { EmailDisplay } from "./EmailDisplay";

interface NavLink {
  label: string;
  href: string;
}

interface NavGroup {
  title: string;
  links: NavLink[];
}

interface TrustItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  metric: string;
  desc: string;
}

interface MobileFooterProps {
  navGroups: NavGroup[];
  trustItems: TrustItem[];
}

export function MobileFooter({ navGroups, trustItems }: MobileFooterProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  const toggleGroup = (title: string) => {
    setExpandedGroup(expandedGroup === title ? null : title);
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-6">
      {/* 1. Portrait Branding Card & Info */}
      <div className="flex flex-col gap-4 text-left">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#0F5132]/25 bg-white shrink-0">
            <Image
              src="/assets/afraim-logo.png"
              alt="Rizwanul Islam (Afraim) illustrated logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div>
            <h4 className="font-serif font-bold text-[#171717] text-base leading-tight">
              Rizwanul Islam Afraim
            </h4>
            <p className="text-[8px] font-mono uppercase tracking-widest font-extrabold text-[#0F5132] mt-1 leading-none">
              Systems Architect &bull; GTM Ops
            </p>
          </div>
        </div>

        <p className="text-xs leading-relaxed text-[#5F655F]">
          I design and operate business systems that connect marketing, sales, operations, and digital execution into measurable, automated growth engines.
        </p>

        {/* High Contrast Contact/Location rows */}
        <div className="flex flex-col gap-2.5 text-xs text-[#171717] border-t border-b border-[#0F5132]/8 py-3.5 my-1">
          <div className="flex items-center gap-2.5 min-h-[32px]">
            <MapPin className="w-4 h-4 text-[#0F5132] shrink-0" />
            <span>Dhaka, Bangladesh</span>
          </div>
          <div className="flex items-center gap-2.5 min-h-[32px]">
            <Mail className="w-4 h-4 text-[#0F5132] shrink-0" />
            <EmailDisplay className="hover:text-[#0F5132] transition-colors" />
          </div>
          <div className="flex items-center gap-2.5 min-h-[32px]">
            <Phone className="w-4 h-4 text-[#0F5132] shrink-0" />
            <a href="tel:+8801751299259" className="hover:text-[#0F5132] transition-colors">
              +880 1751-299259
            </a>
          </div>
          <div className="flex items-center gap-2 min-h-[24px]">
            <span className="w-2 h-2 rounded-full bg-[#0F5132] animate-pulse" />
            <span className="text-[8px] uppercase font-mono tracking-wider font-bold text-[#0F5132]">
              Active for consulting
            </span>
          </div>
        </div>

        {/* Social Icons Row */}
        <div className="flex items-center gap-3">
          {[
            { icon: Linkedin, href: "https://linkedin.com/in/rizwanul-islam-afraim", label: "LinkedIn profile" },
            { icon: Twitter, href: "https://x.com/islamafraim", label: "X profile" },
            { icon: Github, href: "https://github.com/afraim", label: "GitHub profile" },
            { icon: Mail, href: "mailto:hello@rizwanulafraim.com", label: "Email Rizwanul" }
          ].map((social, sIdx) => (
            <a
              key={sIdx}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              title={social.label}
              className="w-10 h-10 rounded-full border border-[#0F5132]/10 hover:border-[#168A4A]/30 text-[#171717] hover:text-[#0F5132] bg-white flex items-center justify-center transition-all min-w-[40px] min-h-[40px]"
            >
              <social.icon className="w-4 h-4" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* 2. Accordioned Navigation Link Groups */}
      <div className="flex flex-col gap-2 border-t border-[#0F5132]/8 pt-4">
        {navGroups.map((group) => {
          const isExpanded = expandedGroup === group.title;
          return (
            <div
              key={group.title}
              className="border-b border-[#0F5132]/6 pb-2"
            >
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex justify-between items-center py-2 text-[10px] font-mono uppercase tracking-widest font-extrabold text-[#171717] text-left cursor-pointer min-h-[36px]"
              >
                <span>{group.title}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-[#5F655F] transition-transform duration-300 ${isExpanded ? "rotate-180 text-[#0F5132]" : ""}`} />
              </button>

              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden pl-1.5"
                  >
                    <ul className="flex flex-col gap-3 py-2 text-xs font-semibold text-[#5F655F]">
                      {group.links.map((link) => (
                        <li key={link.label} className="min-h-[28px] flex items-center">
                          <Link
                            href={link.href}
                            className="hover:text-[#0F5132] transition-colors block py-1"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 3. Trust Strip (Stacked Cards) */}
      <div className="flex flex-col gap-2 border-t border-[#0F5132]/8 pt-4">
        {trustItems.map((item, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl bg-white border border-[#0F5132]/10 flex items-start gap-3"
          >
            <item.icon className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
            <div className="text-left">
              <span className="block text-[11px] font-serif font-bold text-[#171717] leading-none mb-1">
                {item.title}{" // "}<span className="text-[#0F5132] font-mono">{item.metric}</span>
              </span>
              <p className="text-[10px] text-[#5F655F] leading-normal">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Cinematic Signature Ending (Scaled) */}
      <div className="py-6 border-t border-[#0F5132]/8 text-center flex flex-col items-center justify-center select-none gap-2">
        <span className="text-[8px] font-mono uppercase tracking-[0.2em] font-extrabold text-[#0F5132]">
          SYSTEMS DON&apos;T JUST IMPROVE BUSINESSES.
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#171717] tracking-tight leading-none">
          Rizwanul Islam Afraim
        </h1>
        <p className="text-[8px] font-mono uppercase tracking-[0.25em] font-extrabold text-[#5F655F]">
          THE SYSTEMS ARCHITECT
        </p>
      </div>

      {/* 5. Legal Row */}
      <div className="py-4 border-t border-[#0F5132]/6 flex flex-col items-center gap-3 text-[10px] font-semibold text-[#5F655F] uppercase tracking-wider text-center">
        <div>
          &copy; 2026 rizwanulafraim.com. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 pt-1">
          <Link href="/privacy" className="hover:text-[#0F5132] transition-colors py-1">
            Privacy Policy
          </Link>
          <span className="text-[#0F5132]/20">&bull;</span>
          <Link href="/terms" className="hover:text-[#0F5132] transition-colors py-1">
            Terms of Use
          </Link>
          <span className="text-[#0F5132]/20">&bull;</span>
          <Link href="/cookies" className="hover:text-[#0F5132] transition-colors py-1">
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
