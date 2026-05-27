"use client";

import { resumeContent } from "@/data/resume-content";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Download, Mail, Presentation } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ResumeHero() {
  const { hero } = resumeContent;

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-10%] w-[30%] h-[30%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-8 border border-primary/20"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for Strategic Roles
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight"
          >
            {hero.name}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-sans font-medium text-gradient mb-8"
          >
            {hero.headline}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed font-sans"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            {hero.ctas.map((cta, i) => {
              const isPrimary = cta.primary;
              const Icon = i === 0 ? Download : i === 1 ? Presentation : Mail;

              return (
                <Link key={cta.label} href={cta.href}>
                  <Button
                    variant={isPrimary ? "primary" : "outline"}
                    size="lg"
                    className={cn(
                      "rounded-full px-8 h-12 text-base font-medium",
                      isPrimary ? "font-bold shadow-lg shadow-primary/20" : ""
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {cta.label}
                    {isPrimary && <ArrowRight className="w-4 h-4 ml-2" />}
                  </Button>
                </Link>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
