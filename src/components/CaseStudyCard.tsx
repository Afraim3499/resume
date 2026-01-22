"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, TrendingUp, Target, CheckCircle } from "lucide-react";
import type { CaseStudy } from "@/data/case-studies";

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  index: number;
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/case-studies/${caseStudy.slug}`}
        className="block p-6 rounded-xl bg-secondary/30 border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all hover:bg-secondary/40"
      >
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {caseStudy.title}
          </div>
          <ArrowRight className="w-5 h-5 text-foreground/70 group-hover:text-primary transition-colors flex-shrink-0" />
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
              <Target className="w-4 h-4" />
              Problem
            </div>
            <p className="text-sm text-foreground/70 line-clamp-2">{caseStudy.problem}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-sm text-foreground/60 mb-1">
              <CheckCircle className="w-4 h-4" />
              Solution
            </div>
            <p className="text-sm text-foreground/70 line-clamp-2">{caseStudy.solution}</p>
          </div>
        </div>

        {caseStudy.results.metrics.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {caseStudy.results.metrics.slice(0, 3).map((metric, idx) => (
              <span
                key={idx}
                className="px-2 py-1 text-xs rounded bg-primary/20 text-primary border border-primary/30"
              >
                {metric.label}: {metric.value}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <TrendingUp className="w-4 h-4" />
          {caseStudy.timeline}
        </div>
      </Link>
    </motion.article>
  );
}

