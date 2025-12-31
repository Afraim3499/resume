"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ProjectFilters } from "./ProjectFilters";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Projects() {
    const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

    return (
        <section id="projects" className="py-32 md:py-40 bg-background/85 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(16,185,129,0.08),transparent_50%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(168,85,247,0.08),transparent_50%)] pointer-events-none" />

            <div className="container px-4 mx-auto max-w-6xl relative z-10 overflow-x-hidden">
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
                        All Projects
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl heading-text mb-6">
                        Complete <span className="text-gradient">Portfolio</span>
                    </h2>
                    <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        A showcase of technical innovation and strategic execution.
                    </p>
                </motion.div>

                <ProjectFilters projects={projects} onFilterChange={setFilteredProjects} />

                {filteredProjects.length > 0 ? (
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="grid md:grid-cols-2 gap-6 lg:gap-8"
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div key={project.slug} variants={fadeUp}>
                                <ProjectCard project={project} index={index} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-12"
                    >
                        <p className="text-foreground/70">No projects found matching your filters.</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
