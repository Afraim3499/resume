"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { fadeUp, scaleIn, premiumEasing } from "@/lib/animations";
import { FloatingShapes } from "./3D/FloatingShapes";
import { TextReveal } from "./TextReveal";
import { MagneticButton } from "./MagneticButton";


export function Hero() {
    const ref = useRef(null);
    const isInView = useInView(ref);

    return (
        <section ref={ref} className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden bg-background/85 antialiased">
            {/* Enhanced Ambient Backgrounds - Layer 0 (bottom) */}
            <div className="absolute inset-0 z-0">
                {isInView && (
                    <>
                        <motion.div
                            animate={{
                                x: [0, 100, 0],
                                y: [0, 50, 0],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]"
                        />
                        <motion.div
                            animate={{
                                x: [0, -80, 0],
                                y: [0, -60, 0],
                                scale: [1, 1.3, 1],
                            }}
                            transition={{
                                duration: 25,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]"
                        />
                    </>
                )}
            </div>

            {/* Spotlight Effect - Layer 0 */}
            <div className="absolute md:top-0 md:left-20 md:h-screen w-full md:w-[600px] h-[500px] bg-gradient-to-b from-primary/20 dark:from-white/10 to-transparent blur-[120px] pointer-events-none z-0 transform -rotate-12 translate-y-[-20%]" />



            {/* Floating 3D Shapes - Layer 1 */}
            <FloatingShapes count={15} />

            {/* Content - Layer 10 (top) */}
            <div className="container relative z-10 p-4 max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: premiumEasing }}
                    className="mb-8"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3, ease: premiumEasing }}
                        className="relative inline-block w-40 h-40 md:w-48 md:h-48 rounded-full p-[2px] bg-gradient-to-tr from-primary via-accent to-transparent"
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0 rounded-full"
                        />
                        <div className="absolute inset-0 bg-background rounded-full m-[1px] overflow-hidden">
                            <Image
                                src="/assets/IMG_5210.jpg"
                                alt="Rizwanul Islam"
                                width={192}
                                height={192}
                                className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-500 scale-105"
                                priority
                            />
                        </div>
                    </motion.div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, ease: premiumEasing }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl display-text mb-6 md:mb-8"
                >
                    <span className="block sm:inline">
                        <TextReveal mode="word" delay={0.2} className="inline">
                            The{" "}
                        </TextReveal>
                    </span>
                    <span className="text-gradient block sm:inline">
                        <TextReveal mode="word" delay={0.3} className="inline">
                            Strategist
                        </TextReveal>
                    </span>
                    <TextReveal mode="word" delay={0.4} className="inline">
                        .
                    </TextReveal>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: premiumEasing }}
                    className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg md:text-xl font-light tracking-wide mb-8 md:mb-12 leading-relaxed px-4"
                >
                    <TextReveal mode="word" delay={0.5}>
                        Rizwanul Islam (Afraim) —{" "}
                        <span className="text-foreground font-medium">Founder, Strategist & Executioner</span>.
                    </TextReveal>
                    <br />
                    <TextReveal mode="word" delay={0.7}>
                        Building ventures that scale, leading teams that deliver, executing strategies that win.
                    </TextReveal>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8, ease: premiumEasing }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 px-4"
                >
                    <MagneticButton
                        variant="primary"
                        onClick={() => {
                            const element = document.getElementById('signature-work') || document.getElementById('projects');
                            if (element) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            }
                        }}
                    >
                        Explore Ventures
                    </MagneticButton>
                    <MagneticButton
                        variant="outline"
                        onClick={() => window.open('/assets/resume.pdf', '_blank')}
                    >
                        <Download className="w-4 h-4" /> Resume
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Background Grid - Layer 0 */}
            <div className="absolute inset-0 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 dark:opacity-20 pointer-events-none mix-blend-overlay"></div>
        </section>
    );
}
