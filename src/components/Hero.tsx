"use client";


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
                            src="/assets/rizwanul-islam-afraim.webp"
                            alt="Rizwanul Islam Afraim - Legendary Digital Strategist and Developer"
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 450px) 450px, (max-width: 768px) 768px, (max-width: 1200px) 800px, 800px"
                            priority={true}
                            loading="eager"
                            fetchPriority="high"
                        />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
                    Your Vision Is <span className="text-red-500/90 dark:text-red-400">Chaos</span>.
                    <br />
                    I Architect It Into <span className="text-emerald-600 dark:text-emerald-400">Profit</span>.
                </h1>

                {/* Subtitle */}
                <p className="text-foreground/70 max-w-2xl mx-auto text-sm sm:text-lg md:text-xl mb-8 leading-relaxed px-2">
                    From strategy to deployment, I build robust tech platforms out of messy ideas.
                    <br className="hidden sm:block" />
                    Get <span className="text-foreground font-medium">twice the product quality</span>, at <span className="text-foreground font-medium">half the expense</span>, with <span className="text-foreground font-medium">zero struggle</span> on your end.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                        variant="primary"
                        size="lg"
                        className="rounded-full px-8 bg-primary text-primary-foreground hover:bg-primary/90"
                        onClick={() => window.open('https://cal.com/afraim', '_blank')} // Assuming user adds cal link, or scrolls to contact
                    >
                        Book a Free Consultation
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        className="rounded-full px-8"
                        onClick={() => document.getElementById('signature-work')?.scrollIntoView({ behavior: 'smooth' })}
                    >
                        See The Proof
                    </Button>
                </div>
            </div>
        </section>
    );
}
