"use client";

import React from "react";
import {
    LineChart,
    ShoppingCart,
    Newspaper,
    CalendarDays,
    UserCircle2,
    Search,
    Zap
} from "lucide-react";

// Setup the Icon Map
const IconMap: Record<string, React.ElementType> = {
    LineChart,
    ShoppingCart,
    Newspaper,
    CalendarDays,
    UserCircle2,
    Search,
    Zap
};

interface FloatingText {
    title: string;
    subtitle: string;
}

interface HollowGraphic3DProps {
    iconName: string;
    topLeft: FloatingText;
    bottomRight: FloatingText;
}

export function HollowGraphic3D({
    iconName,
    topLeft,
    bottomRight,
}: HollowGraphic3DProps) {
    const IconComponent = IconMap[iconName] || Zap;

    // Use a thick stroke for a solid graphic look
    const strokeWidth = 2.5;

    // Helper to split text into max 2 balanced lines
    const splitInTwo = (text: string) => {
        const words = text.split(' ');
        if (words.length <= 1) return [text];
        if (words.length === 2) return [words[0], words[1]];
        
        let minDiff = Infinity;
        let splitIdx = 1;
        
        for (let i = 1; i < words.length; i++) {
            const firstLine = words.slice(0, i).join(' ');
            const secondLine = words.slice(i).join(' ');
            const diff = Math.abs(firstLine.length - secondLine.length);
            if (diff < minDiff) {
                minDiff = diff;
                splitIdx = i;
            }
        }
        
        return [
            words.slice(0, splitIdx).join(' '),
            words.slice(splitIdx).join(' ')
        ];
    };

    return (
        <div className="relative w-full flex flex-col items-center justify-center gap-6 md:gap-8 group my-8 md:my-0">
            
            {/* Ambient Background Glow (Emerald Primary) scaled down */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary/5 blur-[100px] rounded-full mix-blend-screen scale-75 group-hover:bg-primary/12 group-hover:scale-90 transition-all duration-700 ease-out pointer-events-none" />

            {/* Top Left Typography: Positioned closer to the icon */}
            <div className="w-full text-left z-30 transition-transform duration-700 ease-out group-hover:-translate-x-2 group-hover:-translate-y-2 max-w-[280px] md:max-w-xs self-start lg:-ml-4">
                <div className="text-zinc-500 text-[8px] md:text-xs font-bold uppercase tracking-[0.2em] mb-0.5">
                    {topLeft.subtitle}
                </div>
                <div className="text-foreground font-sans font-black text-4xl md:text-5xl lg:text-6xl leading-[0.8] tracking-tighter drop-shadow-lg">
                    {splitInTwo(topLeft.title).map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
            </div>

            {/* Center Layer: The 3-Layer Stacked 3D CSS Effect */}
            <div className="relative flex items-center justify-center z-20 transition-transform duration-700 ease-out group-hover:scale-105 py-2">
                <div className="relative w-32 h-32 md:w-52 md:h-52 flex items-center justify-center">
                    
                    {/* Layer 3: Back */}
                    <div className="absolute inset-0 text-primary opacity-0 blur-[2px] transition-all duration-700 ease-out group-hover:opacity-20 group-hover:-translate-x-10 group-hover:translate-y-10">
                        <IconComponent className="w-full h-full" strokeWidth={strokeWidth} />
                    </div>

                    {/* Layer 2: Middle */}
                    <div className="absolute inset-0 text-primary opacity-0 transition-all duration-700 ease-out group-hover:opacity-40 group-hover:-translate-x-5 group-hover:translate-y-5">
                        <IconComponent className="w-full h-full" strokeWidth={strokeWidth} />
                    </div>

                    {/* Layer 1: Front */}
                    <div className="absolute inset-0 text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] z-10 transition-transform duration-700 ease-out group-hover:drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                        <IconComponent className="w-full h-full" strokeWidth={strokeWidth} />
                    </div>
                </div>
            </div>

            {/* Bottom Right Typography: Positioned closer to the icon */}
            <div className="w-full text-right z-30 transition-transform duration-700 ease-out group-hover:translate-x-2 group-hover:translate-y-2 flex flex-col items-end max-w-[280px] md:max-w-xs self-end lg:-mr-4">
                <div className="text-primary font-sans font-black text-4xl md:text-5xl lg:text-6xl leading-[0.8] tracking-tighter drop-shadow-lg mb-0.5">
                    {splitInTwo(bottomRight.title).map((line, i) => (
                        <div key={i}>{line}</div>
                    ))}
                </div>
                <div className="text-zinc-500 text-[8px] md:text-xs font-bold uppercase tracking-[0.2em]">
                    {bottomRight.subtitle}
                </div>
            </div>

        </div>
    );
}
