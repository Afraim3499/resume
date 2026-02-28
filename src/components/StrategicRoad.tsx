"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { experience } from "@/data/experience";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { Building2, Zap, Target, TrendingUp, ShieldCheck, Rocket, Briefcase, LucideIcon } from "lucide-react";

const phaseIcons: Record<string, LucideIcon> = {
    GENESIS: Target,
    SCALE: TrendingUp,
    COMMAND: ShieldCheck,
    FOUNDRY: Zap,
    GROWTH: Rocket,
    APEX: Briefcase,
};

const phaseGradients: Record<string, string> = {
    GENESIS: "from-blue-500/20 via-blue-500/5 to-transparent",
    SCALE: "from-purple-500/20 via-purple-500/5 to-transparent",
    COMMAND: "from-emerald-500/20 via-emerald-500/5 to-transparent",
    FOUNDRY: "from-orange-500/20 via-orange-500/5 to-transparent",
    GROWTH: "from-cyan-500/20 via-cyan-500/5 to-transparent",
    APEX: "from-yellow-500/20 via-yellow-500/5 to-transparent",
};

export function StrategicRoad() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Sort experience newest to oldest for the list, but chronological for the road
    const chronologicalExp = [...experience].reverse();

    return (
        <div className="relative py-24 bg-background/50 overflow-hidden" ref={containerRef}>
            {/* Background Decorative Element */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/5 -translate-y-1/2 z-0" />

            <div className="container px-4 mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="mb-20 text-center"
                >
                    <motion.span variants={fadeUp} className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
                        Strategic Road
                    </motion.span>
                    <motion.h2 variants={fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
                        Mission <span className="text-gradient">Architecture</span>
                    </motion.h2>
                    <motion.p variants={fadeUp} className="text-foreground/60 text-lg max-w-2xl mx-auto">
                        A linear progression from tactical execution to high-stakes venture orchestration.
                        Each phase represents a distinct shift in operational scale and technical complexity.
                    </motion.p>
                </motion.div>

                {/* Horizontal Scroll Area */}
                <div className="flex flex-col gap-12">
                    {chronologicalExp.map((exp, index) => (
                        <RoadItem key={exp.id} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function RoadItem({ exp, index }: { exp: typeof experience[0], index: number }) {
    const Icon = exp.phase ? phaseIcons[exp.phase] : Briefcase;
    const gradient = exp.phase ? phaseGradients[exp.phase] : "from-gray-500/20 to-transparent";

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="relative grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-start group"
        >
            {/* Phase Column */}
            <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-background border border-foreground/10 group-hover:border-primary/50 transition-colors`}>
                        {Icon && <Icon className="w-5 h-5 text-primary" />}
                    </div>
                    <span className="text-xs font-black tracking-[0.2em] text-foreground/40 uppercase">
                        {exp.phase}
                    </span>
                </div>
                <div className="h-px w-full bg-foreground/10 mt-2" />
                <span className="text-sm font-mono text-primary font-bold">
                    {exp.startDate} — {exp.endDate}
                </span>
            </div>

            {/* Content Column */}
            <div className={`p-8 rounded-3xl border border-foreground/5 bg-gradient-to-br ${gradient} backdrop-blur-sm relative overflow-hidden group-hover:border-primary/20 transition-all duration-500`}>
                {/* Decorative Background Metric */}
                {exp.phaseTitle && (
                    <div className="absolute top-4 right-8 font-black text-6xl opacity-[0.03] select-none uppercase tracking-tighter pointer-events-none">
                        {exp.phaseTitle}
                    </div>
                )}

                <div className="relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                        <div>
                            <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                {exp.role}
                            </h3>
                            <div className="flex items-center gap-2 text-foreground/70 font-medium lowercase">
                                <Building2 className="w-4 h-4 opacity-50" />
                                {exp.company}
                            </div>
                        </div>

                        {/* Metrics Bubble */}
                        {exp.metrics && exp.metrics.length > 0 && (
                            <div className="flex gap-4">
                                {exp.metrics.map((m, i) => (
                                    <div key={i} className="text-right px-4 py-2 rounded-xl bg-background/40 border border-foreground/5 backdrop-blur-md">
                                        <div className="text-xl font-black text-primary leading-none mb-1">{m.value}</div>
                                        <div className="text-[10px] uppercase font-bold tracking-widest text-foreground/40">{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <p className="text-foreground/70 text-lg leading-relaxed mb-8 max-w-4xl">
                        {exp.description}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
                        {exp.achievements.map((ach, i) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
                                <div className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                                <span>{ach}</span>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                            <span key={tech} className="px-3 py-1 rounded-lg bg-foreground/5 text-foreground/50 border border-transparent hover:border-foreground/10 hover:text-foreground/80 transition-all text-[11px] font-bold uppercase tracking-wider">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
