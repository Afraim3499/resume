"use client";


import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-16 md:pt-20 pb-8">
            {/* Simple gradient background - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
                {/* Profile Image */}
                <div className="mb-4">
                    <div className="relative w-32 h-32 md:w-44 md:h-44 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/10 shadow-xl">
                        <Image
                            src="/assets/rizwanul-islam-afraim.webp"
                            alt="Rizwanul Islam Afraim - Lead Systems Architect"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 128px, 176px"
                            priority={true}
                            loading="eager"
                            fetchPriority="high"
                        />
                    </div>
                </div>
                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 tracking-tight leading-tight">
                    Your Vision Is <span className="text-red-500/90 dark:text-red-400">Chaos</span>.
                    <br />
                    I Architect It Into <span className="text-emerald-600 dark:text-emerald-400">Infrastructure</span>.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground/70 max-w-2xl mx-auto text-sm md:text-base lg:text-lg mb-8 leading-relaxed px-4 font-serif">
                    Venture Architect & Tech Strategist mapping the shifts in <span className="text-primary font-medium italic underline decoration-primary/30">agentic AI and coordination economics</span>.
                    <br className="hidden sm:block" />
                    I build autonomous systems that turn modern tech trends into production-grade platform ventures.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 py-5 text-sm md:text-base bg-primary text-white hover:bg-primary/90 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 w-full sm:w-auto"
                        onClick={() => window.open('https://calendar.app.google/GYA3R9Ct4Aq5Qu74A', '_blank')}
                    >
                        Schedule a Strategic Consult
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 py-5 text-sm md:text-base border-foreground/10 hover:bg-secondary/50 backdrop-blur-sm transition-all w-full sm:w-auto"
                        onClick={() => document.getElementById('signature-work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        View Signature Work
                    </Button>
                </div>
            </div>
        </section>
    );
}
