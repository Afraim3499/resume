"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { fadeUp } from "@/lib/animations";

const SkillsMatrix = dynamic(() => import("@/components/SkillsMatrix").then(mod => mod.SkillsMatrix), {
  ssr: false
});

export function Skills() {
  return (
    <section id="skills" className="py-32 md:py-40 bg-background/95 relative overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            Technical Arsenal
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl heading-text mb-6">
            Technical <span className="text-gradient">Matrix</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            A comprehensive visual interface of my technical capabilities and systems expertise.
          </p>
        </motion.div>

        <SkillsMatrix />

        {/* Next Horizon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-8 rounded-2xl bg-gradient-to-r from-background via-secondary/10 to-background border border-foreground/5 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4 text-2xl">
            🚀
          </div>
          <div className="text-xl font-bold text-foreground mb-2">Next Horizon</div>
          <p className="text-foreground/70 leading-relaxed">
            Currently exploring <span className="text-primary font-medium">3D game development</span> and <span className="text-primary font-medium">Agentic AI</span> architectures.
            Blending immersive code-first experiences with intelligent autonomy.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

