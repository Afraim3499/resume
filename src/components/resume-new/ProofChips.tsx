"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Zap, Award, GraduationCap, Database, Users, Calendar } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, any> = {
  "BBA in Marketing": GraduationCap,
  "1M+ Data Points Processed": Database,
  "200+ People Coordinated": Users,
  "12+ Events Organized": Calendar,
  "2x Employee of the Month": Award,
  "Full-stack Digital Platforms Built": Zap,
};

export function ProofChips() {
  const { proofChips } = resumeContent;

  return (
    <section className="py-12 bg-secondary/5 border-y border-border/50">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {proofChips.map((chip, i) => {
            const Icon = ICON_MAP[chip.label] || CheckCircle2;
            
            return (
              <motion.div
                key={chip.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-background border border-border/40 shadow-sm hover:shadow-md hover:border-primary/30 transition-all group"
              >
                <div className="p-2 rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold tracking-tight">{chip.label}</span>
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                      {chip.verificationStatus.replace("-", " ")}
                    </span>
                    <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
