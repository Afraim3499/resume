"use client";

import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { Mail, MessageSquare, ArrowRight } from "lucide-react";
import Link from "next/link";

export function ResumeCTA() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-primary/5 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -z-10" />
      
      <div className="container px-4 mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-background border border-border/50 rounded-[3rem] p-12 md:p-20 shadow-2xl relative"
        >
          <div className="inline-flex p-4 rounded-3xl bg-primary/5 text-primary mb-8">
            <MessageSquare className="w-10 h-10" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 tracking-tight leading-tight">
            Let&apos;s Build the <span className="text-gradient">Future of Your Brand</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            I am currently open to strategic roles where I can combine my marketing fundamentals with operational discipline.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/#contact">
              <Button size="lg" className="rounded-full px-10 h-14 text-lg font-bold shadow-xl shadow-primary/20">
                <Mail className="w-5 h-5 mr-3" />
                Get in Touch
                <ArrowRight className="w-5 h-5 ml-3" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
