"use client";

import Link from "next/link";
import { Mail, Linkedin, ExternalLink, MapPin, ArrowUpRight } from "lucide-react";

const navGroups = [
  {
    label: "Work",
    links: [
      { name: "Case Studies", href: "/case-studies" },
      { name: "Projects", href: "/projects" },
      { name: "Services", href: "/services" },
      { name: "Resume", href: "/resume" },
    ],
  },
  {
    label: "Research & Writing",
    links: [
      { name: "Research Papers", href: "/research" },
      { name: "Blog & Insights", href: "/blog" },
      { name: "Manifesto", href: "/manifesto" },
    ],
  },
  {
    label: "About",
    links: [
      { name: "About Rizwanul", href: "/about" },
      { name: "SSRN Profile", href: "https://ssrn.com/author=7265688", external: true },
      { name: "Start a Project", href: "https://calendar.app.google/GYA3R9Ct4Aq5Qu74A", external: true },
    ],
  },
];

export function GlobalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className="bg-[#F0EDE4] border-t border-[#0F5132]/12 text-[#171717]"
    >
      {/* Main footer body */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <div>
              <Link
                href="/"
                className="text-lg font-serif font-bold text-[#171717] hover:text-[#0F5132] transition-colors leading-tight block"
              >
                Rizwanul Islam Afraim
              </Link>
              <p className="text-xs text-[#5F655F] mt-1 font-sans">
                Systems Architect · Marketing &amp; Sales Operations
              </p>
            </div>

            <p className="text-[13px] text-[#5F655F] leading-relaxed max-w-xs">
              Building execution systems for growth, operations, and product — across research, strategy, and deployment.
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#5F655F]">
              <MapPin className="w-3 h-3 text-[#0F5132]" />
              Dhaka, Bangladesh
            </div>

            {/* Contact/social row */}
            <div className="flex items-center gap-3">
              <a
                href="mailto:rizwanul.islam.afraim@gmail.com"
                aria-label="Email Rizwanul"
                className="w-8 h-8 rounded-full border border-[#0F5132]/20 bg-[#FFFDF8] hover:bg-[#EAF7EF] hover:border-[#0F5132]/40 flex items-center justify-center transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-[#0F5132]" />
              </a>
              <a
                href="https://www.linkedin.com/in/rizwanulislamafraim"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="w-8 h-8 rounded-full border border-[#0F5132]/20 bg-[#FFFDF8] hover:bg-[#EAF7EF] hover:border-[#0F5132]/40 flex items-center justify-center transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0F5132]" />
              </a>
              <a
                href="https://ssrn.com/author=7265688"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="SSRN Research profile"
                className="w-8 h-8 rounded-full border border-[#0F5132]/20 bg-[#FFFDF8] hover:bg-[#EAF7EF] hover:border-[#0F5132]/40 flex items-center justify-center transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#0F5132]" />
              </a>
            </div>
          </div>

          {/* Nav groups */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="text-[9px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-3">
                  {group.label}
                </p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.name}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] text-[#5F655F] hover:text-[#0F5132] transition-colors inline-flex items-center gap-1 group"
                        >
                          {link.name}
                          <ArrowUpRight className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13px] text-[#5F655F] hover:text-[#0F5132] transition-colors"
                        >
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legal strip */}
      <div className="border-t border-[#0F5132]/10">
        <div className="container mx-auto max-w-7xl px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-[#5F655F]">
            © {year} Rizwanul Islam Afraim. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/research"
              className="text-[11px] text-[#5F655F] hover:text-[#0F5132] transition-colors"
            >
              Research
            </Link>
            <Link
              href="/manifesto"
              className="text-[11px] text-[#5F655F] hover:text-[#0F5132] transition-colors"
            >
              Manifesto
            </Link>
            <a
              href="mailto:rizwanul.islam.afraim@gmail.com"
              className="text-[11px] text-[#5F655F] hover:text-[#0F5132] transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
