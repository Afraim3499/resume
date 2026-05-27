"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";

export function BrandExecutiveReadiness() {
  const { brandExecutiveReadiness } = resumeContent;

  return (
    <section className="py-24">
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 tracking-tight">
              {brandExecutiveReadiness.title}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Practical readiness to support large-scale brand teams in market research, campaign planning, and on-ground execution.
            </p>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <ShieldCheck className="w-10 h-10 text-primary shrink-0" />
              <p className="text-sm font-medium leading-relaxed">
                Positions as a high-discipline associate capable of handling ATL/BTL coordination and digital campaign tracking from day one.
              </p>
            </div>
          </motion.div>

          <div className="space-y-4">
            {brandExecutiveReadiness.items.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border/50 hover:bg-secondary/5 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 p-1 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 tracking-tight">{item.label}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
