"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Zap, Database, FileSpreadsheet, User, CheckCircle2 } from "lucide-react";

export function WorkflowEngine() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Transform chaos into order based on scroll
    const chaosOpacity = useTransform(scrollYProgress, [0.3, 0.6], [1, 0]);

    const orderOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
    const lineColor = useTransform(scrollYProgress, [0.4, 0.6], ["#ef4444", "#10b981"]);

    return (
        <div ref={containerRef} className="relative py-32 min-h-[600px] flex items-center justify-center overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_100%)] pointer-events-none" />

            <div className="relative w-full max-w-4xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative">

                    {/* LEFT: Chaos State (Manual) */}
                    <motion.div
                        style={{ opacity: chaosOpacity }}
                        className="text-center md:text-left relative z-10"
                    >
                        <div className="inline-block p-3 rounded-xl bg-red-500/10 text-red-500 mb-4 border border-red-500/20">
                            <FileSpreadsheet className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-red-400 mb-2">Manual Chaos</h3>
                        <div className="flex flex-col gap-2 opacity-70 text-sm">
                            <motion.div
                                animate={{ x: [0, 10, -5, 0], y: [0, -5, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 3 }}
                                className="flex items-center gap-2 text-red-300"
                            >
                                <User className="w-4 h-4" /> Data Entry
                            </motion.div>
                            <motion.div
                                animate={{ x: [0, -8, 4, 0], y: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                                className="flex items-center gap-2 text-red-300"
                            >
                                <FileSpreadsheet className="w-4 h-4" /> Excel Silos
                            </motion.div>
                        </div>
                    </motion.div>


                    {/* CENTER: The Transformation Engine */}
                    <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
                        <motion.div
                            style={{ rotate: useTransform(scrollYProgress, [0, 1], [0, 360]) }}
                            className="absolute inset-0 border-2 border-dashed border-foreground/20 rounded-full"
                        />
                        <div className="absolute inset-2 border border-foreground/10 rounded-full animate-pulse" />
                        <div className="p-4 rounded-full bg-primary/10 text-primary relative z-20 backdrop-blur-sm border border-primary/20">
                            <Zap className="w-8 h-8 md:w-10 md:h-10" />
                        </div>
                    </div>


                    {/* RIGHT: Order State (Automated) */}
                    <motion.div
                        style={{ opacity: orderOpacity }}
                        className="text-center md:text-right relative z-10"
                    >
                        <div className="inline-block p-3 rounded-xl bg-emerald-500/10 text-emerald-500 mb-4 border border-emerald-500/20">
                            <Database className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-emerald-400 mb-2">Automated Order</h3>
                        <div className="flex flex-col gap-2 text-sm justify-end items-center md:items-end">
                            <div className="flex items-center gap-2 text-emerald-300">
                                Unified Database <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-2 text-emerald-300">
                                Instant Sync <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div className="flex items-center gap-2 text-emerald-300">
                                Zero Latency <CheckCircle2 className="w-4 h-4" />
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Connecting Lines SVG */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30">
                    <motion.path
                        d="M 100 300 Q 400 100 700 300"
                        fill="none"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        style={{ stroke: lineColor }}
                    />
                </svg>

            </div>
        </div>
    );
}
