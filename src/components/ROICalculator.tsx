"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Zap, Calculator } from "lucide-react";
import { Button } from "./ui/Button";

export function ROICalculator() {
    const [projectHours, setProjectHours] = useState(160); // 1 month approx
    const [marketRate, setMarketRate] = useState(40); // Standard agency/senior dev rate
    const afraimRate = 18; // Your effective rate (averaged/estimated) based on "half the expense" promise context

    const agencyCost = projectHours * marketRate;
    const afraimCost = projectHours * afraimRate;
    const savings = agencyCost - afraimCost;
    const savingsPercent = Math.round((savings / agencyCost) * 100);

    return (
        <section className="py-24 bg-secondary/5 border-y border-foreground/5 relative overflow-hidden">
            <div className="container px-4 mx-auto max-w-4xl">
                <div className="bg-background rounded-2xl shadow-xl border border-foreground/10 p-8 md:p-12 relative z-10">

                    <div className="text-center mb-10">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
                            <Calculator className="w-3 h-3" />
                            Maximize Your Capital
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">
                            The <span className="text-emerald-500">Value</span> Equation.
                        </h2>
                        <p className="text-foreground/70 max-w-lg mx-auto">
                            See how much runway you save by hiring an Architect who codes, rather than an expensive agency team.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">

                        {/* Input Controls */}
                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-foreground/80">Project Scale (Hours)</label>
                                    <span className="font-mono text-primary bg-primary/10 px-2 rounded">{projectHours} hrs</span>
                                </div>
                                <input
                                    type="range"
                                    min="40"
                                    max="1000"
                                    step="10"
                                    value={projectHours}
                                    onChange={(e) => setProjectHours(Number(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-xs text-foreground/40 mt-1">
                                    <span>MVP (40h)</span>
                                    <span>Enterprise (1000h)</span>
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-2">
                                    <label className="text-sm font-medium text-foreground/80">Typical Agency Hourly Rate</label>
                                    <span className="font-mono text-foreground/70">$ {marketRate} / hr</span>
                                </div>
                                <input
                                    type="range"
                                    min="25"
                                    max="150"
                                    step="5"
                                    value={marketRate}
                                    onChange={(e) => setMarketRate(Number(e.target.value))}
                                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-foreground/50"
                                />
                                <div className="flex justify-between text-xs text-foreground/40 mt-1">
                                    <span>Junior ($25)</span>
                                    <span>Premium Agency ($150)</span>
                                </div>
                            </div>

                            <div className="pt-4 p-4 bg-primary/5 rounded-lg border border-primary/10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                        <Zap className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase font-bold text-primary/80">Afraim&apos;s Efficiency Factor</p>
                                        <p className="text-sm text-foreground/70">
                                            ~${afraimRate}/hr equivalent due to full-stack speed & reusable architecture.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Results Display */}
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/5 blur-3xl rounded-full" />
                            <div className="relative bg-card p-6 rounded-xl border border-border shadow-lg space-y-6">

                                {/* Comparison Bars */}
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-foreground/60">Agency Cost</span>
                                            <span className="text-foreground font-mono">${agencyCost.toLocaleString()}</span>
                                        </div>
                                        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-foreground/30"
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-primary font-bold">With Afraim</span>
                                            <span className="text-primary font-mono font-bold">${afraimCost.toLocaleString()}</span>
                                        </div>
                                        <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-primary"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${(afraimCost / agencyCost) * 100}%` }}
                                                transition={{ type: "spring", stiffness: 100 }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border text-center">
                                    <p className="text-sm text-foreground/60 mb-1">Total Estimated Savings</p>
                                    <motion.div
                                        key={savings}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-4xl md:text-5xl font-bold text-emerald-500 font-mono tracking-tight"
                                    >
                                        ${savings.toLocaleString()}
                                    </motion.div>
                                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-bold">
                                        {savingsPercent > 0 ? `Save ${savingsPercent}% Budget` : "Competitive Pricing"}
                                    </div>
                                </div>

                                <Button
                                    onClick={() => window.open('https://cal.com/afraim', '_blank')}
                                    className="w-full mt-4"
                                    size="lg"
                                >
                                    Invest the Savings in Growth <Briefcase className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
