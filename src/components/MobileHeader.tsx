"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Linkedin, Github, Mail, ArrowRight, Calendar, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface MobileHeaderProps {
  navItems: Array<{ name: string; href: string }>;
  activeSection: string;
}

export function MobileHeader({ activeSection }: MobileHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Scroll Lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const isLinkActive = (href: string) => {
    const sectionId = href.replace("/#", "");
    return activeSection === sectionId || (href !== "/" && pathname.startsWith(href));
  };

  return (
    <>
      {/* Top Bar for Mobile viewports */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6D8C8] z-50 flex items-center justify-between px-4">
        <div className="flex flex-col select-none">
          <Link
            href="/"
            onClick={handleLinkClick}
            className="text-sm font-serif font-bold text-[#1F2022] hover:text-[#0F5132] transition-colors leading-tight"
          >
            Rizwanul Islam Afraim
          </Link>
          <span className="text-[8px] text-[#5F5A52] font-sans font-semibold tracking-wider uppercase leading-none mt-0.5">
            Systems Architect
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-full bg-[#0F5132] text-white text-[10px] font-bold tracking-wide hover:bg-[#168A4A] transition-all shadow-xs min-h-[36px] flex items-center justify-center"
          >
            Start Project
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 flex items-center justify-center text-[#1F2022]/70 hover:text-[#0F5132] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Premium Command Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 w-screen h-[100dvh] bg-[#FDFBF7] z-40 overflow-y-auto flex flex-col justify-between pt-18 px-6 pb-20 select-none"
          >
            {/* Scrollable Container Wrapper */}
            <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-lg mx-auto">
              
              {/* Brand Dashboard Profile Banner */}
              <div className="flex items-center gap-3.5 border-b border-[#0F5132]/10 pb-4">
                <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-[#0F5132]/20 bg-white shrink-0 shadow-xs">
                  <Image
                    src="/assets/afraim-logo.png"
                    alt="Rizwanul Islam Afraim Illustrated Portrait Logo"
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-serif font-bold text-[#1F2022] text-sm leading-tight">
                    Rizwanul Islam Afraim
                  </h4>
                  <p className="text-[8px] font-mono uppercase tracking-widest font-extrabold text-[#0F5132] mt-0.5 leading-none">
                    Systems Architect &bull; GTM Ops
                  </p>
                  <p className="text-[8px] text-[#5F5A52] font-semibold mt-0.5 leading-none">
                    Marketing &amp; Sales Operations
                  </p>
                </div>
              </div>

              {/* Grid Layout separating Primary and Audience channels */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                
                {/* Column 1: Primary Navigation */}
                <div className="flex flex-col gap-1 text-left">
                  <span className="text-[8px] font-mono tracking-widest text-[#0F5132] font-extrabold uppercase mb-1">
                    Primary Navigation
                  </span>
                  {[
                    { name: "Start Here", href: "/" },
                    { name: "What I Solve", href: "/#what-i-solve" },
                    { name: "Featured Work", href: "/case-studies" },
                    { name: "Leverage Finder", href: "/#leverage-finder" },
                    { name: "Research", href: "/research" },
                    { name: "Resume", href: "/resume" },
                    { name: "About Profile", href: "/about" },
                  ].map((item) => {
                    const active = isLinkActive(item.href);
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className={`text-sm font-semibold py-2 px-3 rounded-xl transition-all duration-150 flex items-center justify-between min-h-[40px] ${
                          active
                            ? "bg-[#EAF7EF] text-[#0F5132] shadow-xs"
                            : "text-[#1F2022] hover:bg-[#FAF8F3] hover:text-[#0F5132]"
                        }`}
                      >
                        <span>{item.name}</span>
                        {active && <ChevronRight className="w-3.5 h-3.5 text-[#0F5132]" />}
                      </Link>
                    );
                  })}
                </div>

                {/* Column 2: Audience Routes & Focus Channels */}
                <div className="flex flex-col gap-4 text-left justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-[8px] font-mono tracking-widest text-[#0F5132] font-extrabold uppercase mb-1">
                      Audience Focus
                    </span>
                    {[
                      { name: "For Founders", href: "/solutions/gtm-operations" },
                      { name: "For Recruiters", href: "/resume" },
                      { name: "For Collaborators", href: "/about" },
                    ].map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="text-xs font-semibold py-2 px-3 rounded-xl bg-[#FAF8F3]/50 border border-[#0F5132]/6 text-[#1F2022] hover:border-[#0F5132]/20 hover:bg-[#EAF7EF]/20 transition-all flex items-center justify-between min-h-[40px]"
                      >
                        <span>{item.name}</span>
                        <ArrowRight className="w-3 h-3 text-[#5F5A52]" />
                      </Link>
                    ))}
                  </div>

                  {/* Actions Block */}
                  <div className="flex flex-col gap-1.5 border-t border-[#0F5132]/10 pt-3 mt-4 sm:mt-auto">
                    <a
                      href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleLinkClick}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#0F5132] text-white font-bold hover:bg-[#168A4A] transition-all flex items-center justify-center gap-2 text-xs tracking-wider uppercase min-h-[40px] shadow-sm active:scale-98"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Start a Project</span>
                    </a>
                    <Link
                      href="/#contact"
                      onClick={handleLinkClick}
                      className="w-full py-2.5 px-4 rounded-xl border border-[#0F5132]/25 bg-white text-[#1F2022] font-bold hover:bg-[#EAF7EF] transition-all flex items-center justify-center gap-2 text-xs tracking-wider uppercase min-h-[40px] active:scale-98"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#0F5132]" />
                      <span>Send Message</span>
                    </Link>
                  </div>

                </div>

              </div>

            </div>

            {/* Menu Footer Contact Strip */}
            <div className="w-full max-w-lg mx-auto border-t border-[#0F5132]/10 pt-4 flex items-center justify-between mt-auto">
              <span className="text-[9px] font-mono text-[#5F5A52]/70 uppercase tracking-widest font-bold">
                Get In Touch
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="mailto:hello@rizwanulafraim.com"
                  className="w-9 h-9 rounded-full border border-[#0F5132]/10 bg-white flex items-center justify-center text-[#1F2022] hover:text-[#0F5132] hover:border-[#0F5132]/20 transition-all min-h-[36px]"
                  aria-label="Email Address"
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com/in/rizwanul-islam-afraim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#0F5132]/10 bg-white flex items-center justify-center text-[#1F2022] hover:text-[#0F5132] hover:border-[#0F5132]/20 transition-all min-h-[36px]"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="https://github.com/afraim"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-[#0F5132]/10 bg-white flex items-center justify-center text-[#1F2022] hover:text-[#0F5132] hover:border-[#0F5132]/20 transition-all min-h-[36px]"
                  aria-label="GitHub Account"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
