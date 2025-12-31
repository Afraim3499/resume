"use client";

import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20 md:pt-0">
            {/* Simple gradient background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 max-w-4xl mx-auto text-center">
                {/* Profile Image */}
                <div className="mb-8">
                    <div className="relative inline-block w-40 h-40 md:w-48 md:h-48 rounded-full p-[2px] bg-gradient-to-tr from-primary via-accent to-transparent">
                        <div className="absolute inset-0 bg-background rounded-full m-[1px] overflow-hidden">
                            <Image
                                src="/assets/IMG_5210.jpg"
                                alt="Rizwanul Islam"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
                    The <span className="text-gradient">Strategist</span>.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg md:text-xl mb-8 leading-relaxed">
                    Rizwanul Islam (Afraim) — <span className="text-foreground font-medium">Founder, Strategist & Orchestrator</span>.
                    <br />
                    Building ventures that scale, leading teams that deliver, executing strategies that win.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full"
                        onClick={() => {
                            const element = document.getElementById('projects');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                    >
                        Explore Ventures <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full"
                        onClick={() => window.open('/assets/resume.pdf', '_blank')}
                    >
                        <Download className="w-4 h-4 mr-2" /> Resume
                    </Button>
                </div>
            </div>
        </section>
    );
}
