"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Solutions", href: "/solutions" },
  { name: "Work", href: "/case-studies" },
  { name: "Research", href: "/research" },
  { name: "Writing", href: "/blog" },
  { name: "Resume", href: "/resume" },
  { name: "About", href: "/about" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 30);

        const sections = navItems.map((item) => item.href.replace("/#", ""));
        const currentSection = sections.find((section) => {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
          }
          return false;
        });
        setActiveSection(currentSection || "");
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6D8C8] shadow-sm h-16 md:h-18"
          : "bg-[#FDFBF7]/85 backdrop-blur-sm border-b border-[#E6D8C8]/30 h-16 md:h-18"
          }`}
      >
        <div className="container px-4 mx-auto max-w-7xl h-full">
          <div className="flex items-center justify-between h-full">
            {/* Left: Branding */}
            <div className="flex flex-col select-none">
              <Link
                href="/"
                className="text-base md:text-lg font-serif font-bold text-[#1F2022] hover:text-primary transition-colors leading-tight"
              >
                Rizwanul Islam Afraim
              </Link>
              <span className="text-[9px] md:text-[10px] text-[#5F5A52] font-sans font-medium max-w-[200px] sm:max-w-[280px] md:max-w-none leading-none mt-0.5">
                Systems for growth, operations, and product execution
              </span>
            </div>

            {/* Center/Desktop Navigation links */}
            <div className="hidden md:flex items-center gap-5 lg:gap-7">
              {navItems.map((item) => {
                const sectionId = item.href.replace("/#", "");
                const isActive = activeSection === sectionId || pathname.startsWith(item.href);

                if (item.name === "Solutions") {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`relative min-h-[44px] flex items-center px-1 text-xs lg:text-sm font-medium transition-colors ${isActive
                          ? "text-primary font-semibold"
                          : "text-[#1F2022]/70 hover:text-primary"
                          }`}
                      >
                        {item.name}
                        {isActive && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          />
                        )}
                      </Link>

                      <AnimatePresence>
                        {isDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute left-0 mt-0 w-64 bg-[#FFFDF8] border border-[#0F5132]/12 rounded-xl shadow-lg p-4 z-50 flex flex-col gap-2"
                          >
                            <Link
                              href="/solutions/gtm-operations"
                              className="p-2.5 rounded-lg hover:bg-[#EAF7EF] transition-colors text-left group"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <div className="text-xs font-bold text-[#171717] group-hover:text-[#0F5132]">GTM &amp; Operations</div>
                              <div className="text-[10px] text-[#5F655F]">CRM, e-commerce, and lead-gen systems.</div>
                            </Link>
                            <Link
                              href="/solutions/dynamic-platforms"
                              className="p-2.5 rounded-lg hover:bg-[#EAF7EF] transition-colors text-left group"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <div className="text-xs font-bold text-[#171717] group-hover:text-[#0F5132]">Dynamic Platforms</div>
                              <div className="text-[10px] text-[#5F655F]">CMS and reservation architectures.</div>
                            </Link>
                            <Link
                              href="/solutions/executive-brand"
                              className="p-2.5 rounded-lg hover:bg-[#EAF7EF] transition-colors text-left group"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              <div className="text-xs font-bold text-[#171717] group-hover:text-[#0F5132]">Executive Brand</div>
                              <div className="text-[10px] text-[#5F655F]">Thought leadership brand sites.</div>
                            </Link>
                            <div className="h-px bg-[#0F5132]/6 my-1" />
                            <Link
                              href="/solutions"
                              className="p-2 text-center text-xs font-bold text-[#0F5132] hover:underline"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              Browse All Solutions
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => handleNavClick(item.href)}
                    className={`relative min-h-[44px] flex items-center px-1 text-xs lg:text-sm font-medium transition-colors ${isActive
                      ? "text-primary font-semibold"
                      : "text-[#1F2022]/70 hover:text-primary"
                      }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right: CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#0F5132] text-white text-xs lg:text-sm font-medium hover:bg-[#168A4A] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                Start a Project
              </a>
              <Link
                href="/about"
                className="px-4 py-2 rounded-lg border border-[#0F5132]/20 bg-[#FFFDF8] text-[#1F2022] text-xs lg:text-sm font-medium hover:bg-[#EAF7EF] transition-colors"
              >
                About
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-[#1F2022]/70 hover:text-primary transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-[#FDFBF7] border-l border-[#E6D8C8] z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-6 pt-24">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const sectionId = item.href.replace("/#", "");
                    const isActive = activeSection === sectionId || pathname.startsWith(item.href);

                    if (item.name === "Solutions") {
                      return (
                        <div key={item.name} className="flex flex-col">
                          <Link
                            href={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-[#1F2022] hover:bg-[#FFFDF8] hover:text-primary"
                              }`}
                          >
                            {item.name}
                          </Link>
                          <div className="pl-6 border-l border-[#0F5132]/12 flex flex-col gap-1.5 mt-1.5 mb-3">
                            <Link
                              href="/solutions/gtm-operations"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                                pathname === "/solutions/gtm-operations"
                                  ? "bg-[#EAF7EF] text-[#0F5132] font-semibold"
                                  : "text-[#5F5A52] hover:text-[#0F5132] hover:bg-[#EAF7EF]/30"
                              }`}
                            >
                              GTM &amp; Operations
                            </Link>
                            <Link
                              href="/solutions/dynamic-platforms"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                                pathname === "/solutions/dynamic-platforms"
                                  ? "bg-[#EAF7EF] text-[#0F5132] font-semibold"
                                  : "text-[#5F5A52] hover:text-[#0F5132] hover:bg-[#EAF7EF]/30"
                              }`}
                            >
                              Dynamic Platforms
                            </Link>
                            <Link
                              href="/solutions/executive-brand"
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={`text-xs font-medium py-2 px-3 rounded-md transition-colors ${
                                pathname === "/solutions/executive-brand"
                                  ? "bg-[#EAF7EF] text-[#0F5132] font-semibold"
                                  : "text-[#5F5A52] hover:text-[#0F5132] hover:bg-[#EAF7EF]/30"
                              }`}
                            >
                              Executive Brand
                            </Link>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-[#1F2022] hover:bg-[#FFFDF8] hover:text-primary"
                          }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                <div className="border-t border-[#E6D8C8] pt-6 flex flex-col gap-3">
                  <a
                    href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-lg bg-[#0F5132] text-white text-center font-medium hover:bg-[#168A4A] transition-colors shadow-sm block text-sm"
                  >
                    Start a Project
                  </a>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full py-3 rounded-lg border border-[#0F5132]/20 bg-[#FFFDF8] text-[#1F2022] text-center font-medium hover:bg-[#EAF7EF] transition-colors block text-sm"
                  >
                    About
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
