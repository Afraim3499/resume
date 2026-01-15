"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { ExternalLink } from "lucide-react";

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Reverse to show chronological order (oldest first)
    const chronologicalExperience = [...experience].reverse();

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth spring for better feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Calculate total cards width for proper transform
    // Title (40vw) + Start marker (200px) + Cards (500px each * count) + End marker (20vw)
    const cardCount = chronologicalExperience.length;
    const totalWidth = `${-((cardCount * 520) + 400)}px`;

    const x = useTransform(smoothProgress, [0, 1], ["0px", totalWidth]);

    return (
        <section id="experience" className="relative bg-background">
            {/* Scroll container - height determines scroll duration */}
            <div ref={containerRef} className="relative h-[500vh]">

                {/* Sticky viewport */}
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">

                    <motion.div
                        style={{ x }}
                        className="flex items-center gap-8 md:gap-12 pl-8 md:pl-20"
                    >
                        {/* Title Card */}
                        <div className="min-w-[90vw] md:min-w-[45vw] h-[70vh] flex flex-col justify-center shrink-0">
                            <div className="max-w-lg">
                                <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                                    Experience
                                </span>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-tight">
                                    Professional <br /> <span className="text-gradient">Journey</span>
                                </h2>
                                <p className="text-foreground/60 text-base md:text-lg max-w-md leading-relaxed mb-8">
                                    A curated timeline of roles and ventures that shaped my path.
                                </p>

                                <div className="flex items-center gap-3 text-sm font-medium text-foreground/60">
                                    <div className="w-8 h-[1px] bg-foreground/30" />
                                    <span className="uppercase tracking-wider text-xs">Scroll to explore</span>
                                    <motion.div
                                        animate={{ x: [0, 8, 0] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="text-primary"
                                    >
                                        →
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline Start Marker */}
                        <div className="flex flex-col items-center justify-center min-w-[100px] shrink-0">
                            <div className="w-3 h-3 rounded-full bg-primary/50 mb-4" />
                            <span className="text-xs uppercase tracking-widest text-foreground/70 font-mono">Start</span>
                        </div>

                        {/* Timeline Cards */}
                        {chronologicalExperience.map((exp, index) => (
                            <TimelineCard key={exp.id} exp={exp} index={index} isLast={index === chronologicalExperience.length - 1} />
                        ))}

                        {/* Timeline End Marker */}
                        <div className="flex flex-col items-center justify-center min-w-[200px] md:min-w-[300px] shrink-0">
                            <div className="w-12 h-[2px] bg-gradient-to-r from-primary to-transparent mb-4" />
                            <span className="text-2xl md:text-3xl font-serif text-foreground/80">Present</span>
                            <span className="text-xs text-foreground/70 uppercase tracking-widest mt-2">& Beyond</span>
                        </div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}

function TimelineCard({ exp, index, isLast }: { exp: typeof experience[0], index: number, isLast: boolean }) {
    return (
        <div className="relative group shrink-0">
            {/* Connector Line */}
            <div className="absolute top-1/2 -left-6 md:-left-12 w-6 md:w-12 h-[2px] bg-foreground/10 group-hover:bg-primary/30 transition-colors" />

            {/* Card */}
            <div className="
                w-[80vw] md:w-[420px]
                h-[65vh] min-h-[450px] max-h-[550px]
                p-6 md:p-8
                rounded-2xl
                bg-secondary/20 backdrop-blur-sm
                border border-foreground/10
                hover:border-primary/40 hover:bg-secondary/30
                transition-all duration-300
                flex flex-col
                overflow-hidden
            ">
                {/* Header */}
                <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-primary font-medium uppercase">
                            {exp.startDate} — {exp.endDate}
                        </span>
                        {exp.type === "founder" && (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[9px] uppercase font-bold">
                                Founder
                            </span>
                        )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                        {exp.role}
                    </h3>

                    <div className="flex items-center gap-1.5 text-sm text-foreground/70 font-medium mt-1">
                        {exp.company}
                        {exp.companyUrl && <ExternalLink className="w-3 h-3 opacity-50" />}
                    </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-4 line-clamp-3">
                    {exp.description}
                </p>

                {/* Achievements */}
                <div className="flex-1 overflow-y-auto pr-2 mb-4">
                    <ul className="space-y-2">
                        {exp.achievements.slice(0, 4).map((ach, i) => (
                            <li key={i} className="flex items-start gap-2 text-foreground/70 text-xs leading-relaxed">
                                <div className="w-1 h-1 rounded-full bg-primary/70 mt-1.5 shrink-0" />
                                <span className="line-clamp-2">{ach}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Tech Tags */}
                <div className="pt-4 border-t border-foreground/5 mt-auto">
                    <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.slice(0, 4).map(tech => (
                            <span key={tech} className="bg-background/50 px-2 py-1 rounded text-[10px] text-foreground/70 border border-foreground/10">
                                {tech}
                            </span>
                        ))}
                        {exp.technologies.length > 4 && (
                            <span className="text-[10px] text-foreground/60 px-1">+{exp.technologies.length - 4}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Timeline Node */}
            <div className="absolute top-1/2 -left-[5px] -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-background border-2 border-primary/60 z-10 group-hover:scale-150 group-hover:border-primary transition-all" />
        </div>
    );
}
