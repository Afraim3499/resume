"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Database, Rocket, Target, Zap, BarChart3, ArrowRight } from "lucide-react";
import { fadeUp, staggerContainer, hoverScale } from "@/lib/animations";

const stats = [
    {
        icon: Target,
        title: "Visionary Markets",
        subtitle: "Not Just Discovery",
        description: "I don't just find leads; I engineered the market for Gaari and PrimeSync. My strategies don't just compete—they define the playing field.",
        highlight: "engineered the market",
        companies: ["Gaari", "PrimeSync"],
        gradient: "from-emerald-500/20 via-emerald-500/10 to-transparent",
        borderColor: "border-emerald-500/30",
        iconColor: "text-emerald-400",
        bgPattern: "radial-gradient(circle_at_30%_50%,rgba(16,185,129,0.15),transparent_50%)",
    },
    {
        icon: Database,
        title: "Super Intelligence",
        subtitle: "1M+ Data Points",
        description: "Processed over 1 million data points for Quantanite with legendary accuracy. I turn raw chaos into intelligent, actionable business logic.",
        highlight: "legendary accuracy",
        companies: ["Quantanite"],
        gradient: "from-purple-500/20 via-purple-500/10 to-transparent",
        borderColor: "border-purple-500/30",
        iconColor: "text-purple-400",
        bgPattern: "radial-gradient(circle_at_70%_30%,rgba(168,85,247,0.15),transparent_50%)",
    },
    {
        icon: Users,
        title: "Unshakeable Reliability",
        subtitle: "Leadership at Scale",
        description: "As VP at NSUSS, I led 200+ people to execute events for 25,000+ attendees. When I build a system, it holds the weight of thousands without cracking.",
        highlight: "200+ people",
        companies: ["NSUSS"],
        gradient: "from-blue-500/20 via-blue-500/10 to-transparent",
        borderColor: "border-blue-500/30",
        iconColor: "text-blue-400",
        bgPattern: "radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.15),transparent_50%)",
    },
    {
        icon: Rocket,
        title: "Enduring Ventures",
        subtitle: "Strategic Orchestration",
        description: "I don't just launch; I architect legacy. From Gaari to Yagacalls, I design production ventures meant to scale into unicorns and dominate their niches.",
        highlight: "scale into unicorns",
        companies: ["Gaari", "The Trail", "Yagacalls"],
        gradient: "from-emerald-500/20 via-cyan-500/10 to-transparent",
        borderColor: "border-emerald-500/30",
        iconColor: "text-emerald-400",
        bgPattern: "radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.15),transparent_50%)",
    },
];

export function About() {
    return (
        <section id="about" className="py-32 bg-background/85 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.05),transparent)] pointer-events-none"></div>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(168,85,247,0.05),transparent)] pointer-events-none"></div>

            <div className="container px-4 mx-auto max-w-7xl relative z-10">
                {/* Section Header */}
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
                        className="inline-block px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-6"
                    >
                        The Approach
                    </motion.span>
                    <h2 className="text-5xl md:text-7xl lg:text-8xl heading-text mb-6">
                        Engineering <span className="text-gradient">Trust & Intelligence</span>
                    </h2>
                    <p className="text-foreground/70 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        A 360-degree perspective that transforms complexity into clear, scalable outcomes.
                        I combine high-velocity execution with unshakeable reliability to build systems that win.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
                >
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={stat.title}
                                variants={fadeUp}
                                viewport={{ once: true, margin: "-100px" }}
                                className="group relative"
                            >
                                <div className={`
                                    relative h-full rounded-2xl border ${stat.borderColor} 
                                    bg-gradient-to-br ${stat.gradient}
                                    backdrop-blur-sm overflow-hidden
                                    hover:border-opacity-60 transition-all duration-500
                                    hover:shadow-2xl hover:shadow-emerald-500/10
                                `}>
                                    {/* Background Pattern */}
                                    <div
                                        className="absolute inset-0 opacity-30"
                                        style={{ background: stat.bgPattern }}
                                    ></div>

                                    {/* Animated Background Gradient */}
                                    <motion.div
                                        className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                        animate={{
                                            backgroundPosition: ["0% 0%", "100% 100%"],
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative p-8 h-full flex flex-col">
                                        {/* Icon and Title Section */}
                                        <div className="flex items-start justify-between mb-6">
                                            <div className="flex items-center gap-4">
                                                <motion.div
                                                    className={`
                                                        p-4 rounded-xl bg-background/80 dark:bg-black/40 border ${stat.borderColor}
                                                        backdrop-blur-sm
                                                    `}
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    transition={{ type: "spring", stiffness: 300 }}
                                                >
                                                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                                                </motion.div>
                                                <div>
                                                    <h3 className="text-2xl font-bold text-foreground mb-1">
                                                        {stat.title}
                                                    </h3>
                                                    <p className="text-sm text-foreground/60">
                                                        {stat.subtitle}
                                                    </p>
                                                </div>
                                            </div>
                                            <motion.div
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                                whileHover={{ x: 5 }}
                                            >
                                                <ArrowRight className={`w-5 h-5 ${stat.iconColor}`} />
                                            </motion.div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-foreground/80 text-sm leading-relaxed flex-1 mb-4">
                                            {stat.description.split(stat.highlight).map((part, i, arr) => (
                                                <span key={i}>
                                                    {part}
                                                    {i < arr.length - 1 && (
                                                        <span className="text-foreground font-semibold">
                                                            {stat.highlight}
                                                        </span>
                                                    )}
                                                </span>
                                            ))}
                                        </p>

                                        {/* Companies Tags */}
                                        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-foreground/10 dark:border-white/10">
                                            {stat.companies.map((company, i) => (
                                                <motion.span
                                                    key={company}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: index * 0.1 + i * 0.05 }}
                                                    className={`
                                                        px-3 py-1 rounded-full text-xs font-medium
                                                        bg-background/80 dark:bg-black/40 border ${stat.borderColor}
                                                        ${stat.iconColor} backdrop-blur-sm
                                                        hover:scale-105 transition-transform
                                                    `}
                                                >
                                                    {company}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Hover Glow Effect */}
                                    <div className={`
                                        absolute inset-0 rounded-2xl
                                        bg-gradient-to-br ${stat.gradient}
                                        opacity-0 group-hover:opacity-20
                                        blur-xl transition-opacity duration-500
                                        -z-10
                                    `}></div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>

                {/* Bottom CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <p className="text-foreground/70 text-sm">
                        Every venture is a testament to <span className="text-foreground font-semibold">scalable thinking</span> and <span className="text-foreground font-semibold">strategic execution</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
