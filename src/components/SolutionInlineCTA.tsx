"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Solution } from "@/data/solutions";

interface SolutionInlineCTAProps {
    solution: Solution;
}

export function SolutionInlineCTA({ solution }: SolutionInlineCTAProps) {
    return (
        <div className="my-12 p-8 md:p-10 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/30 border border-primary/20 relative overflow-hidden group">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                <div className="w-32 h-32 bg-primary blur-[60px] rounded-full" />
            </div>

            <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 items-center justify-between">
                <div className="flex-1 space-y-3 text-center md:text-left">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold border border-primary/30 uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        Related Solution
                    </div>
                    <h3 className="text-2xl font-bold font-serif text-white">
                        {solution.title}
                    </h3>
                    <p className="text-foreground/80 text-sm md:text-base max-w-xl">
                        {solution.subtitle}
                    </p>
                </div>
                <div className="shrink-0 w-full md:w-auto">
                    <Link
                        href={`/solutions/${solution.slug}`}
                        className="flex items-center justify-center w-full md:w-auto px-6 py-3 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20 group/btn"
                    >
                        View Solution Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
