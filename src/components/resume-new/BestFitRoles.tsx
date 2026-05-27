"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { Check, Target, TrendingUp, Cpu } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<number, any> = {
  0: Target,
  1: TrendingUp,
  2: Cpu,
};

export function BestFitRoles() {
  const { bestFitRoles } = resumeContent;

  return (
    <section className="py-24 bg-secondary/5">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Strategic Role Fit</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Optimized for high-impact roles where marketing fundamentals meet operational discipline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {bestFitRoles.map((role, i) => {
            const Icon = ICON_MAP[i] || Target;
            
            return (
              <motion.div
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group relative bg-background border border-border/50 rounded-3xl p-8 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-xl"
              >
                <div className="mb-6 inline-flex p-3 rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <Icon className="w-6 h-6" />
                </div>

                <h3 className="text-2xl font-bold mb-4 tracking-tight">{role.title}</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Target Roles</h4>
                    <div className="flex flex-wrap gap-2">
                      {role.bestFitFor.map(fit => (
                        <span key={fit} className="px-2 py-1 rounded-md bg-secondary/50 text-[11px] font-bold border border-border/50">
                          {fit}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Core Strengths</h4>
                    <ul className="space-y-2">
                      {role.strengths.map(strength => (
                        <li key={strength} className="flex items-center gap-2 text-sm text-foreground/80">
                          <Check className="w-4 h-4 text-primary" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3">Proof of Capability</h4>
                    <div className="p-3 rounded-xl bg-secondary/30 border border-border/30">
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        {role.proof.join(" • ")}
                      </p>
                    </div>
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
