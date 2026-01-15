"use client";

import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-28 md:pt-32">
            {/* Simple gradient background - Hidden on mobile for performance */}
            <div className="absolute inset-0 z-0 overflow-hidden hidden md:block">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
                {/* Profile Image */}
                <div className="mb-8">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                        <Image
                            src="/assets/rizwanul-islam-afraim.jpg"
                            alt="Rizwanul Islam Afraim - Legendary Digital Strategist and Developer"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 256px, (max-width: 1200px) 320px, 320px"
                            priority={true}
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                    Orchestrator of <span className="text-gradient">Intelligent Futures</span>.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg md:text-xl mb-8 leading-relaxed">
                    The <span className="text-foreground font-medium">Venture Architect</span> for visionary businesses.
                    <br />
                    I orchestrate precision, intelligence, and scale for those who demand unshakeable reliability.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8 border-foreground/20 text-foreground hover:bg-foreground/5"
                        onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        Explore Ventures
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full"
                        onClick={() => window.open('/resume', '_blank')}
                    >
                        <Download className="w-4 h-4 mr-2" /> Resume
                    </Button>
                </div>
            </div>
        </section>
    );
}
