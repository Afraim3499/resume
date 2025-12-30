"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, FileText, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { caseStudies } from "@/data/case-studies";

export function ContentSection() {
  return (
    <section id="content" className="py-32 bg-background/85 relative overflow-hidden">
      <div className="container px-4 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-4">
            Insights & <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg">
            Technical articles, lessons learned, and detailed project case studies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Blog Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group relative"
          >
            <Link
              href="/blog"
              className="block h-full p-8 rounded-2xl border border-foreground/10 dark:border-white/5 bg-gradient-to-br from-background to-secondary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/20 border border-primary/30 group-hover:bg-primary/30 transition-colors">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Blog & Articles</h3>
                  <p className="text-sm text-foreground/60">{blogPosts.length} articles</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Technical insights, tutorials, and thoughts on web development, AI/ML, digital strategy, and leadership. 
                Learn from real-world experiences building production applications.
              </p>
              <div className="flex items-center gap-2 text-primary group-hover:gap-4 transition-all">
                <span className="font-medium">Explore Articles</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>

          {/* Case Studies Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="group relative"
          >
            <Link
              href="/case-studies"
              className="block h-full p-8 rounded-2xl border border-foreground/10 dark:border-white/5 bg-gradient-to-br from-background to-secondary/10 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500/30 transition-colors">
                  <FileText className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-1">Case Studies</h3>
                  <p className="text-sm text-foreground/60">{caseStudies.length} case studies</p>
                </div>
              </div>
              <p className="text-foreground/70 mb-6 leading-relaxed">
                Deep dives into real projects: problems solved, solutions implemented, and measurable results. 
                Learn from production applications including Gaari, The Trail, and Yagacalls.
              </p>
              <div className="flex items-center gap-2 text-emerald-400 group-hover:gap-4 transition-all">
                <span className="font-medium">View Case Studies</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

