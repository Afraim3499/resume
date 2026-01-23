"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { experience } from "@/data/experience";
import { ExternalLink, Building2 } from "lucide-react";

import { AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

// Helper to extract metrics from achievements
function extractMetrics(achievements: string[]) {
    const metrics: { value: string; label: string }[] = [];
    const numberPattern = /([\d,]+(?:\.\d+)?(?:\+|%|\/100)?)\s+([\w\s]+)/;

    for (const ach of achievements) {
        const match = ach.match(numberPattern);
        if (match && metrics.length < 3) {
            // Keep label short
            const label = match[2].trim().split(' ').slice(0, 3).join(' ');
            metrics.push({ value: match[1], label });
        }
    }
    return metrics;
}

export function Timeline() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [showAll, setShowAll] = useState(false);

    // Chronological order (Oldest -> Newest) as per user choice
    const chronologicalExperience = [...experience].reverse();

    const INITIAL_COUNT = 4;
    const displayedExperience = showAll ? chronologicalExperience : chronologicalExperience.slice(0, INITIAL_COUNT);
    const remainingCount = chronologicalExperience.length - INITIAL_COUNT;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section id="experience" className="py-24 md:py-32 bg-background relative overflow-hidden">
            <div className="container px-4 mx-auto max-w-4xl" ref={containerRef}>

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 md:mb-24 text-center md:text-left pl-0 md:pl-12"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                        Experience
                    </span>
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
                        Professional <span className="text-gradient">Journey</span>
                    </h2>
                    <p className="text-foreground/60 text-lg max-w-lg">
                        From rapid execution to strategic architecture.
                    </p>
                </motion.div>

                <div className="relative pl-4 md:pl-12">
                    {/* The Track Line (Background) */}
                    <div className="absolute left-4 md:left-12 top-0 bottom-0 w-0.5 bg-foreground/10" />

                    {/* The Progress Line (Foreground) */}
                    <motion.div
                        style={{ scaleY, transformOrigin: "top" }}
                        className="absolute left-4 md:left-12 top-0 bottom-0 w-0.5 bg-primary origin-top"
                    />

                    {/* Timeline Items */}
                    <div className="space-y-8">
                        {displayedExperience.map((exp, index) => (
                            <TimelineItem key={exp.id} exp={exp} index={index} />
                        ))}
                    </div>

                    {/* Show More Button */}
                    {!showAll && remainingCount > 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="relative mt-12 pl-12"
                        >
                            <div className="absolute left-[-1px] md:left-[-1px] top-6 w-3 h-3 rounded-full bg-primary/20 border border-primary animate-pulse" />
                            <div className="bg-gradient-to-b from-transparent to-background/50 pt-8 flex justify-center md:justify-start">
                                <button
                                    onClick={() => setShowAll(true)}
                                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-secondary/30 border border-foreground/10 hover:border-primary/30 hover:bg-secondary/50 transition-all duration-300"
                                >
                                    <span className="text-base font-medium text-foreground/80 group-hover:text-primary">
                                        View Full History
                                    </span>
                                    <span className="px-2 py-0.5 rounded-md bg-background/50 text-xs font-mono text-foreground/60">
                                        +{remainingCount} Roles
                                    </span>
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* End Marker */}
                    {showAll && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative mt-16 pl-8"
                        >
                            <div className="absolute left-[-5px] top-2 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                            <span className="text-lg font-serif font-bold text-foreground/80">Present & Beyond</span>
                        </motion.div>
                    )}
                </div>
            </div>
        </section>
    );
}

function TimelineItem({ exp, index }: { exp: typeof experience[0], index: number }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const metrics = extractMetrics(exp.achievements);
    const hasMetris = metrics.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="relative pl-12 md:pl-16 group"
        >
            {/* Connector Dot */}
            <div className={`absolute left-[-5px] md:left-[-5px] top-8 w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${isExpanded ? 'bg-primary border-primary scale-125' : 'bg-background border-foreground/30 group-hover:border-primary'}`} />

            <div
                className={`
                    relative rounded-2xl border transition-all duration-300 overflow-hidden
                    ${isExpanded
                        ? 'bg-secondary/10 border-primary/30 shadow-lg shadow-primary/5'
                        : 'bg-secondary/5 border-foreground/5 hover:border-primary/20 hover:bg-secondary/10 cursor-pointer'
                    }
                `}
                onClick={() => !isExpanded && setIsExpanded(true)}
            >
                {/* Header Section (Always Visible) */}
                <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                {exp.type === "founder" && (
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-[10px] uppercase font-bold tracking-wider">
                                        Founder
                                    </span>
                                )}
                                <span className="text-xs font-mono text-primary font-medium uppercase tracking-wider">
                                    {exp.startDate} — {exp.endDate}
                                </span>
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                                {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-foreground/70 mt-1 font-medium bg-transparent">
                                <Building2 className="w-4 h-4 opacity-70" />
                                {exp.company}
                                {exp.companyUrl && (
                                    <a
                                        href={exp.companyUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="ml-1 opacity-50 hover:opacity-100 transition-opacity p-1"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <ExternalLink className="w-3 h-3" />
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Impact Grid (Visible when not expanded, or if extracted) */}
                        {hasMetris && !isExpanded && (
                            <div className="flex gap-4 md:gap-6 mt-4 md:mt-0">
                                {metrics.map((m, i) => (
                                    <div key={i} className="text-left md:text-right">
                                        <div className="text-lg md:text-xl font-bold text-primary">{m.value}</div>
                                        <div className="text-[10px] uppercase tracking-wider text-foreground/50 font-medium">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Summary (Visible when NOT expanded) */}
                    {!isExpanded && (
                        <div className="mt-4 flex items-end justify-between">
                            <p className="text-foreground/60 text-sm line-clamp-2 max-w-2xl">
                                {exp.description}
                            </p>
                            <button
                                onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                                className="text-xs font-medium text-primary flex items-center gap-1 hover:underline pl-4 shrink-0"
                            >
                                Details <ChevronDown className="w-3 h-3" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-6 md:px-8 pb-8 pt-0 border-t border-foreground/5 mt-2">
                                {/* Full Impact Grid when Expanded */}
                                {hasMetris && (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 py-6">
                                        {metrics.map((m, i) => (
                                            <div key={i} className="p-3 rounded-lg bg-background/50 border border-foreground/5">
                                                <div className="text-2xl font-bold text-primary">{m.value}</div>
                                                <div className="text-xs text-foreground/60 font-medium">{m.label}</div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <p className="text-foreground/80 leading-relaxed mb-6 text-base">
                                    {exp.description}
                                </p>

                                <ul className="space-y-2 mb-8">
                                    {exp.achievements.map((ach, i) => (
                                        <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                            <span>{ach}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {exp.technologies.map(tech => (
                                        <span key={tech} className="px-2.5 py-1 rounded-md bg-primary/5 text-primary text-xs font-medium border border-primary/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); setIsExpanded(false); }}
                                    className="w-full py-2 flex items-center justify-center gap-2 text-sm text-foreground/40 hover:text-primary transition-colors border-t border-foreground/5 mt-4"
                                >
                                    Show Less <ChevronUp className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
