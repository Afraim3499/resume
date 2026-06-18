"use client";

import { ReactNode, useEffect } from "react";

type LenisInstance = {
    raf: (time: number) => void;
    destroy: () => void;
};

export function SmoothScroll({ children }: { children: ReactNode }) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

        if (prefersReducedMotion || coarsePointer) {
            return;
        }

        let frameId = 0;
        let cancelled = false;
        let lenis: LenisInstance | null = null;
        const win = window as Window & { lenis?: LenisInstance };

        async function startSmoothScroll() {
            const { default: Lenis } = await import("lenis");

            if (cancelled) {
                return;
            }

            lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: "vertical",
                gestureOrientation: "vertical",
                smoothWheel: true,
            });
            win.lenis = lenis;

            function raf(time: number) {
                lenis?.raf(time);
                frameId = requestAnimationFrame(raf);
            }

            frameId = requestAnimationFrame(raf);
        }

        startSmoothScroll();

        return () => {
            cancelled = true;
            if (frameId) {
                cancelAnimationFrame(frameId);
            }
            lenis?.destroy();
            delete win.lenis;
        };
    }, []);

    return <>{children}</>;
}
