"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Menu from "lucide-react/dist/esm/icons/menu";
import X from "lucide-react/dist/esm/icons/x";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { name: "Home", href: "/#hero" },
  { name: "About", href: "/#about" },
  { name: "Manifesto", href: "/manifesto" },
  { name: "Services", href: "/services" },
  { name: "Wiki", href: "/wiki" },
  { name: "My Story", href: "/#story" },
  { name: "Skills", href: "/#skills" },
  { name: "Experience", href: "/#experience" },
  { name: "Projects", href: "/#projects" },
  { name: "Contact", href: "/#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Cancel any pending animation frame
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Throttle with requestAnimationFrame
      rafRef.current = requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);

        // Update active section based on scroll position
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

    // Use passive listener for better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

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

  if (pathname !== "/") {
    return null; // Don't show navigation on project detail pages
  }

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
                const isActive = activeSection === sectionId;
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
              className="fixed top-0 right-0 bottom-0 w-64 bg-background border-l border-foreground/10 z-50 md:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-4">
                {navItems.map((item) => {
                  const sectionId = item.href.replace("/#", "");
                  const isActive = activeSection === sectionId;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => handleNavClick(item.href)}
                      className={`block w-full text-left px-4 py-2 min-h-[44px] flex items-center rounded-lg transition-colors ${isActive
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-foreground/70 hover:text-foreground hover:bg-foreground/5"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 border-t border-foreground/10">
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

