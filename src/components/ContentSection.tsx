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

      {/* Industry Recognition Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-24 pt-16 border-t border-foreground/5"
      >
        <div className="text-center mb-12">
          <span className="text-secondary-foreground bg-secondary px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
            Industry Recognition
          </span>
          <h3 className="text-3xl font-serif font-bold">
            Featured <span className="text-gradient">By The Community</span>
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Medium Article */}
          <a
            href="https://kalababascrypto.medium.com/beyond-hello-world-meet-the-architect-reimagining-dhakas-digital-infrastructure-41482724e196"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-2xl bg-background border border-foreground/10 dark:border-white/5 hover:border-black/20 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-black rounded-lg text-white">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.82 24 12z" />
                </svg>
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-black transition-colors">Beyond "Hello World"</h4>
            <p className="text-foreground/70 text-sm mb-4">
              "Meet The Architect Reimagining Dhaka's Digital Infrastructure" — An independent deep-dive into the engineering philosophy behind Gaari.
            </p>
            <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider mt-auto">Read on Medium</span>
          </a>

          {/* Dev.to Profile */}
          <a
            href="https://dev.to/rizwanul_islam_afraim"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col p-6 rounded-2xl bg-background border border-foreground/10 dark:border-white/5 hover:border-black/20 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-black rounded-lg text-white">
                <img src="https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg" alt="Dev.to" className="w-6 h-6 invert brightness-0" />
              </div>
              <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-black transition-colors" />
            </div>
            <h4 className="text-xl font-bold mb-2 group-hover:text-black transition-colors">Technical Authority</h4>
            <p className="text-foreground/70 text-sm mb-4">
              Read my architectural breakdowns on System Design, RAG pipelines, and building for scale.
            </p>
            <span className="text-xs font-medium text-foreground/50 uppercase tracking-wider mt-auto">Visit Digital HQ</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}

