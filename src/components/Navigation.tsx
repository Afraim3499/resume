"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";
import ChevronDown from "lucide-react/dist/esm/icons/chevron-down";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Blog", href: "/blog" },
  { name: "Case Studies", href: "/case-studies" },
  { name: "Solutions", href: "/services", isDropdown: true },
  { name: "Resume", href: "/resume" },
];

const solutionLinks = [
  { name: "E-Commerce Platform", href: "/solutions/ecommerce-platform" },
  { name: "News & Media Hub", href: "/solutions/news-media-platform" },
  { name: "Booking & Fleet", href: "/solutions/booking-system" },
  { name: "Sales & CRM", href: "/solutions/crm-sales-system" },
  { name: "Personal Brand", href: "/solutions/personal-brand-website" },
  { name: "SEO & Lead Gen", href: "/solutions/seo-lead-generation" },
  { name: "View All Solutions →", href: "/services", isMain: true }
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isSolutionsHovered, setIsSolutionsHovered] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

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
    setIsMobileSolutionsOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsSolutionsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsSolutionsHovered(false);
    }, 150); // slight delay to make it forgiving
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
          }`}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-serif font-bold text-foreground hover:text-primary transition-colors"
            >
              Rizwanul Islam
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => {
                const sectionId = item.href.replace("/#", "");
                const isActive = 
                  activeSection === sectionId || 
                  pathname === item.href ||
                  (item.isDropdown && pathname.startsWith('/solutions'));

                if (item.isDropdown) {
                  return (
                    <div
                      key={item.name}
                      className="relative"
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      <button
                        className={`relative min-h-[44px] flex items-center gap-1 px-1 text-sm font-medium transition-colors ${isActive || isSolutionsHovered
                          ? "text-primary"
                          : "text-foreground/70 hover:text-foreground"
                          }`}
                        onClick={() => handleNavClick(item.href)}
                      >
                        {item.name}
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSolutionsHovered ? "rotate-180" : ""}`} />
                        {isActive && !isSolutionsHovered && (
                          <motion.div
                            layoutId="activeSection"
                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                          />
                        )}
                      </button>

                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {isSolutionsHovered && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-background border border-foreground/10 rounded-xl shadow-2xl overflow-hidden py-2"
                          >
                            {solutionLinks.map((link) => (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsSolutionsHovered(false)}
                                className={`block px-4 py-2.5 text-sm transition-colors ${link.isMain
                                  ? "text-primary font-semibold hover:bg-primary/10 mt-2 border-t border-foreground/5 pt-3"
                                  : "text-foreground/80 hover:text-primary hover:bg-secondary/50"
                                  }`}
                              >
                                {link.name}
                              </Link>
                            ))}
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
                    className={`relative min-h-[44px] min-w-[44px] flex items-center justify-center px-1 text-sm font-medium transition-colors ${isActive
                      ? "text-primary"
                      : "text-foreground/70 hover:text-foreground"
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
              <div className="hidden lg:flex items-center ml-2 mr-4">
                <a
                  href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20"
                >
                  Book a Consultation
                </a>
              </div>
              <div className="min-h-[44px] min-w-[44px] flex items-center justify-center">
                <ThemeToggle />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center p-2 text-foreground/70 hover:text-foreground transition-colors"
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
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-72 bg-background border-l border-foreground/10 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-2">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("/#", "");
                  const isActive = 
                    activeSection === sectionId || 
                    pathname === item.href ||
                    (item.isDropdown && pathname.startsWith('/solutions'));

                  if (item.isDropdown) {
                    return (
                      <div key={item.name} className="py-1">
                        <button
                          onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors font-medium ${isActive
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:bg-foreground/5"
                            }`}
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isMobileSolutionsOpen ? "rotate-180" : ""}`} />
                        </button>
                        <AnimatePresence>
                          {isMobileSolutionsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 pr-2 py-2 flex flex-col gap-1 border-l-2 border-foreground/5 ml-4 mt-1">
                                {solutionLinks.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    className={`block px-4 py-2.5 rounded-md text-sm transition-colors ${link.isMain
                                      ? "font-semibold text-primary mt-1"
                                      : "text-foreground/70 hover:text-foreground hover:bg-secondary/50"
                                      }`}
                                  >
                                    {link.name}
                                  </Link>
                                ))}
                              </div>
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
                      className={`block w-full text-left px-4 py-3 flex items-center rounded-lg transition-colors font-medium ${isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-foreground/5"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-6 mt-4 border-t border-foreground/10 flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/60">Theme</span>
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

