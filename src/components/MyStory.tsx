"use client";

import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

const milestones = [
    {
        year: "2016",
        title: "The Pivot That Started It All",
        description: "At 16, I thought poultry farming would make me a millionaire. After months of hands-on research and experiments, reality hit. The returns weren't there. But that \"failure\" taught me something invaluable: test fast, pivot faster.",
        icon: "🐔",
    },
    {
        year: "2017",
        title: "Trading the Markets",
        description: "Found my next laboratory: financial markets. Trading across crypto, stocks, and forex taught me a brutal truth—emotion loses, strategy wins.",
        icon: "📈",
    },
    {
        year: "2018",
        title: "First Marketing Gig",
        description: "Running social media for The Serial Griller in Chattogram. Learning that a good product means nothing if nobody knows about it.",
        icon: "🍔",
    },
    {
        year: "2022",
        title: "Vibrance: The Seasonal Win",
        description: "Co-founded a seasonal clothing line. One season. Hefty returns. Proof that timing and execution beat perfection.",
        icon: "👕",
    },
    {
        year: "2022-24",
        title: "1 Million Data Points",
        description: "Processing a million+ data points at Quantanite with 99% accuracy. Learning that scale requires discipline.",
        icon: "📊",
    },
    {
        year: "2023-24",
        title: "Leading 200 People",
        description: "As VP of Programs at NSUSS, led 200+ volunteers to execute events with 25,000+ attendees. Viral performances. Celebrity acknowledgements. The lesson: systems scale, individuals don't.",
        icon: "👥",
    },
    {
        year: "2025",
        title: "The Founder Era",
        description: "Gaari (car rental platform) and The Trail (news platform)—ventures designed to scale into unicorns with solid operational foundations.",
        icon: "🚀",
    },
];

export function MyStory() {
    return (
        <section id="story" className="py-32 bg-background relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.03),transparent)] pointer-events-none" />

            <div className="container px-4 mx-auto max-w-5xl relative z-10">
                {/* Section Header */}
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
                        The Journey
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl heading-text mb-6">
                        From <span className="text-gradient">Poultry Farming</span> to <span className="text-gradient">Advanced Venture Architect</span>
                    </h2>
                    <p className="text-foreground/70 text-lg md:text-xl max-w-2xl mx-auto">
                        Every pivot was a lesson. Every failure, a foundation.
                    </p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={staggerContainer}
                    className="relative"
                >
                    {/* Timeline Line */}
                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={milestone.year}
                            variants={fadeUp}
                            className={`relative flex items-start gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Content */}
                            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"} pl-20 md:pl-0`}>
                                <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2">
                                    {milestone.year}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                    {milestone.title}
                                </h3>
                                <p className="text-foreground/70 leading-relaxed">
                                    {milestone.description}
                                </p>
                            </div>

                            {/* Timeline Node */}
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-background border-2 border-primary flex items-center justify-center text-lg z-10">
                                {milestone.icon}
                            </div>

                            {/* Empty space for alternating layout */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Philosophy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20 p-8 rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-accent/10 border border-primary/20"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                        My Philosophy
                    </h3>
                    <p className="text-foreground/80 text-lg leading-relaxed">
                        I don&apos;t micromanage—I orchestrate. As an Operations Expert, I build the vision, assemble the team, and create advanced systems that run without me.
                        <span className="block mt-4 text-primary font-medium">
                            The goal? Build unicorns with solid operational foundations and data strategy.
                        </span>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
