"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { skills, type SkillsByCategory } from "@/data/skills";

const LEVEL_SCORES = {
    expert: 100,
    advanced: 75,
    intermediate: 50,
    beginner: 25,
};

interface TechRadarProps {
    onCategoryHighlight?: (category: string | null) => void;
}

export function TechRadar({ onCategoryHighlight }: TechRadarProps) {
    const radarData = useMemo(() => {
        const categories = Object.keys(skills) as (keyof SkillsByCategory)[];
        return categories.map((cat) => {
            const categorySkills = skills[cat];
            const totalScore = categorySkills.reduce((acc, skill) => acc + LEVEL_SCORES[skill.level], 0);
            const average = Math.round(totalScore / categorySkills.length);
            return { category: cat, value: average };
        });
    }, []);

    // Radar Chart Config
    const size = 300;
    const center = size / 2;
    const radius = 100;
    const angleStep = (Math.PI * 2) / radarData.length;

    const points = radarData.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2; // Start from top
        const valueRadius = (d.value / 100) * radius;
        const x = center + Math.cos(angle) * valueRadius;
        const y = center + Math.sin(angle) * valueRadius;
        return `${x},${y}`;
    }).join(" ");

    const axisPoints = radarData.map((_, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const x = center + Math.cos(angle) * radius;
        const y = center + Math.sin(angle) * radius;
        return { x, y, label: radarData[i].category };
    });

    return (
        <div className="flex flex-col items-center justify-center py-8">
            <h3 className="text-xl font-mono font-bold text-primary mb-2 tracking-widest uppercase text-xs opacity-70">
                SYSTEM DIAGNOSTIC: COMPETENCY MAP
            </h3>
            <div className="relative w-[300px] h-[300px]">
                {/* Radar Chart SVG */}
                <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                    {/* Background Grid (Concentric Pentagons/Hexagons) */}
                    {[0.25, 0.5, 0.75, 1].map((scale, i) => (
                        <polygon
                            key={i}
                            points={axisPoints.map(p => {
                                const x = center + (p.x - center) * scale;
                                const y = center + (p.y - center) * scale;
                                return `${x},${y}`;
                            }).join(" ")}
                            fill="none"
                            stroke="currentColor"
                            className="text-foreground/5"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axis Lines */}
                    {axisPoints.map((p, i) => (
                        <line
                            key={i}
                            x1={center}
                            y1={center}
                            x2={p.x}
                            y2={p.y}
                            stroke="currentColor"
                            className="text-foreground/10"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Data Polygon */}
                    <motion.polygon
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 0.6, scale: 1 }}
                        transition={{ duration: 1, type: "spring" }}
                        points={points}
                        fill="rgba(var(--primary-rgb), 0.2)"
                        stroke="rgba(var(--primary-rgb), 0.8)"
                        strokeWidth="2"
                    />

                    {/* Data Points */}
                    {radarData.map((d, i) => {
                        const angle = i * angleStep - Math.PI / 2;
                        const valueRadius = (d.value / 100) * radius;
                        const x = center + Math.cos(angle) * valueRadius;
                        const y = center + Math.sin(angle) * valueRadius;

                        return (
                            <motion.circle
                                key={i}
                                cx={x}
                                cy={y}
                                r="6"
                                className="fill-primary cursor-pointer hover:stroke-foreground/20 hover:stroke-4"
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                onClick={() => onCategoryHighlight?.(d.category)}
                                whileHover={{ scale: 1.5 }}
                            />
                        );
                    })}

                    {/* Labels */}
                    {axisPoints.map((p, i) => {
                        // Push labels out a bit
                        const labelX = center + (p.x - center) * 1.35;
                        const labelY = center + (p.y - center) * 1.35;

                        return (
                            <g key={i} onClick={() => onCategoryHighlight?.(p.label)} className="cursor-pointer group">
                                <rect
                                    x={labelX - 30}
                                    y={labelY - 10}
                                    width="60"
                                    height="20"
                                    fill="transparent"
                                />
                                <text
                                    x={labelX}
                                    y={labelY}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-[10px] uppercase font-bold fill-foreground/60 tracking-wider group-hover:fill-primary transition-colors"
                                >
                                    {p.label}
                                </text>
                            </g>
                        );
                    })}
                </svg>
            </div>

            <p className="text-center text-xs text-foreground/40 mt-4 max-w-xs leading-relaxed">
                Interact with nodes to filter the matrix below.
            </p>
        </div>
    );
}
