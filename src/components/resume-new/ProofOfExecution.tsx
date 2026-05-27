"use client";

import { resumeContent } from "@/data/resume-content";
import { motion } from "framer-motion";
import { CheckCircle2, TrendingUp, Users, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProofOfExecution() {
  const { proofOfExecution } = resumeContent;

  return (
    <section className="py-24 bg-secondary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full -z-10" />
      
      <div className="container px-4 mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 tracking-tight">Proof of Execution</h2>
            <p className="text-muted-foreground text-lg">
              Hard numbers and verified outcomes across marketing, operations, and digital product building.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border/50 text-xs font-bold uppercase tracking-widest text-primary shadow-sm">
            <CheckCircle2 className="w-4 h-4" /> Verified Outcomes
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proofOfExecution.map((proof, i) => (
            <motion.div
              key={proof.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-background border border-border/50 rounded-3xl p-8 hover:shadow-xl hover:border-primary/30 transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 rounded-2xl bg-secondary/50 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  {proof.title.includes("People") ? <Users className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
                </div>
                <div className="px-2 py-1 rounded bg-primary/5 text-[10px] font-black uppercase tracking-widest text-primary border border-primary/10">
                  {proof.verificationStatus.replace("-", " ")}
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3 tracking-tight">{proof.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                {proof.shortDescription}
              </p>

              {proof.expandedWording && (
                <div className="mt-auto p-4 rounded-xl bg-secondary/20 border border-border/30 flex gap-3">
                  <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <p className="text-[11px] leading-relaxed text-foreground/70 font-medium italic">
                    {proof.expandedWording}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
