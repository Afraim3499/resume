"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Target, Zap, LucideIcon } from "lucide-react";

export interface ImpactMetric {
    label: string;
    value: string;
    description: string;
    icon?: "trending" | "clock" | "target" | "zap";
}

interface ImpactMetricsProps {
    metrics: ImpactMetric[];
}

export function ImpactMetrics({ metrics }: ImpactMetricsProps) {
    if (!metrics || metrics.length === 0) return null;

    const getIcon = (type?: string) => {
        switch (type) {
            case "clock": return Clock;
            case "target": return Target;
            case "zap": return Zap;
            default: return TrendingUp;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 my-16"
        >
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold">Business Impact</h2>
                    <p className="text-sm text-muted-foreground">Operational outcomes delivered.</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric, index) => {
                    const Icon = getIcon(metric.icon);
                    return (
                        <MetricCard key={index} metric={metric} Icon={Icon} index={index} />
                    );
                })}
            </div>
        </motion.div>
    );
}

function MetricCard({ metric, Icon, index }: { metric: ImpactMetric, Icon: LucideIcon, index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, borderColor: "rgba(16, 185, 129, 0.4)" }}
            className="group relative p-8 rounded-2xl bg-gradient-to-br from-background via-emerald-500/5 to-transparent border border-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden"
        >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-start justify-between mb-6">
                    <div className="p-2 rounded-lg bg-background border border-emerald-500/10 text-emerald-500/70 group-hover:text-emerald-500 transition-colors">
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                        Confirmed
                    </span>
                </div>

                <div className="mt-auto">
                    <div className="text-4xl md:text-5xl font-bold text-foreground mb-2 tracking-tight">
                        {metric.value}
                    </div>
                    <div className="font-bold text-base text-foreground/90 mb-3 group-hover:text-emerald-500 transition-colors">
                        {metric.label}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                        {metric.description}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
