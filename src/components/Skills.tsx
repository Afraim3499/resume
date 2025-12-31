"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories, type Skill, type SkillsByCategory, type SkillLevel } from "@/data/skills";
import { Code, Database, Cloud, Brain, Wrench, Layers } from "lucide-react";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

const categoryIcons = {
  frontend: Code,
  backend: Layers,
  database: Database,
  devops: Cloud,
  ai: Brain,
  tools: Wrench,
};

const categoryLabels = {
  frontend: "Frontend",
  backend: "Backend",
  database: "Database",
  devops: "DevOps",
  ai: "AI/ML",
  tools: "Tools",
};

const levelColors: Record<SkillLevel, string> = {
  expert: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  advanced: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  intermediate: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  beginner: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const levelLabels: Record<SkillLevel, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  beginner: "Beginner",
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<keyof SkillsByCategory | "all">("all");

  const displaySkills: Skill[] = selectedCategory === "all"
    ? Object.values(skills).flat()
    : skills[selectedCategory];

  return (
    <section id="skills" className="py-32 md:py-40 bg-background/85 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />

      <div className="container px-4 mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            Skills & Technologies
          </motion.span>
          <h2 className="text-5xl md:text-7xl lg:text-8xl heading-text mb-6">
            Technical <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            A comprehensive toolkit spanning frontend, backend, DevOps, AI/ML, and modern development tools.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === "all"
              ? "bg-primary text-primary-foreground"
              : "bg-foreground/5 dark:bg-white/5 text-foreground/70 hover:bg-foreground/10 dark:hover:bg-white/10 hover:text-foreground border border-foreground/10 dark:border-white/10"
              }`}
          >
            All Skills
          </button>
          {skillCategories.map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${selectedCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-foreground/5 dark:bg-white/5 text-foreground/70 hover:bg-foreground/10 dark:hover:bg-white/10 hover:text-foreground border border-foreground/10 dark:border-white/10"
                  }`}
              >
                <Icon className="w-4 h-4" />
                {categoryLabels[category]}
              </button>
            );
          })}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {displaySkills.map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group relative p-4 rounded-lg bg-secondary/30 border border-foreground/10 dark:border-white/5 hover:border-primary/50 transition-all hover:bg-secondary/40"
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded border ${levelColors[skill.level]}`}
                  >
                    {levelLabels[skill.level]}
                  </span>
                </div>
                {skill.projects.length > 0 && (
                  <div className="text-xs text-foreground/50 mt-1">
                    Used in {skill.projects.length} project{skill.projects.length > 1 ? "s" : ""}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 grid md:grid-cols-3 gap-6"
        >
          <div className="p-6 rounded-lg bg-secondary/30 border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {Object.values(skills).flat().length}+
            </div>
            <div className="text-foreground/70">Technologies</div>
          </div>
          <div className="p-6 rounded-lg bg-secondary/30 border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {Object.values(skills).flat().filter((s) => s.level === "expert").length}+
            </div>
            <div className="text-foreground/70">Expert Level</div>
          </div>
          <div className="p-6 rounded-lg bg-secondary/30 border border-foreground/10 dark:border-white/5 text-center">
            <div className="text-4xl font-bold text-primary mb-2">
              {skillCategories.length}
            </div>
            <div className="text-foreground/70">Categories</div>
          </div>
        </motion.div>

        {/* Next Horizon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-transparent to-primary/10 border border-foreground/10"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🎮</span>
            <h3 className="text-xl font-bold text-foreground">Next Horizon</h3>
          </div>
          <p className="text-foreground/70 leading-relaxed">
            Currently exploring <span className="text-primary font-medium">3D game development</span> with code-first approaches.
            While time constraints have delayed the first release, this space represents my next creative frontier—combining
            technical depth with immersive experiences. First game coming soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

