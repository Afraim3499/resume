"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { skills, skillCategories, type Skill } from "@/data/skills";
import { Cpu } from "lucide-react";





import { TechRadar } from "@/components/TechRadar";

export function SkillsMatrix() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const allSkills = Object.values(skills).flat();
    const displaySkills = activeCategory
        ? skills[activeCategory as keyof typeof skills]
        : allSkills;

    return (
        <div className="w-full">
            {/* Tech Radar DNA Visual */}
            <div className="mb-12">
                <TechRadar onCategoryHighlight={(cat) => setActiveCategory(cat === activeCategory ? null : cat)} />
            </div>

            {/* HUD Controls / Filters */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {["all", ...skillCategories].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat === "all" ? null : cat)}
                        className={`
               relative px-6 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300
               ${(activeCategory === cat || (cat === 'all' && activeCategory === null))
                                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "bg-secondary/30 text-foreground/80 hover:bg-secondary/50 hover:text-foreground border border-foreground/10"}
             `}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* The Matrix Grid */}
            <motion.div
                layout
                className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 perspective-1000"
            >
                <AnimatePresence mode="popLayout">
                    {displaySkills.map((skill) => (
                        <SkillNode
                            key={`${skill.name}-${skill.category}`}
                            skill={skill}
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Decorative HUD Elements */}
            <div className="mt-16 border-t border-foreground/10 pt-8 flex justify-between items-center text-xs font-mono text-foreground/30 uppercase tracking-widest">
                <div>System Status: Online</div>
                <div className="flex gap-4">
                    <span>Nodes: {allSkills.length}</span>
                    <span>Optimized</span>
                </div>
            </div>
        </div>
    );
}

// Simplified SkillNode to reduce DOM depth
function SkillNode({ skill }: { skill: Skill }) {
    const isExpert = skill.level === 'expert';

    // Magnetic effect logic integrated to reduce wrapper
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const { height, width, left, top } = rect;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);
            x.set(middleX * 0.1);
            y.set(middleY * 0.1);
        }
    }

    function handleMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            layout
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", duration: 0.5 }}
            className={`
              group relative h-full min-h-[120px] p-6 rounded-xl border transition-all duration-300
              flex flex-col justify-between overflow-hidden cursor-crosshair
              ${isExpert
                    ? "bg-primary/5 border-primary/20 hover:border-primary/60 hover:shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.3)]"
                    : "bg-secondary/10 border-foreground/5 hover:border-foreground/20 hover:bg-secondary/20"}
              before:absolute before:inset-0 before:opacity-[0.03] before:pointer-events-none before:bg-[size:10px_10px] 
              before:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]
            `}
        >
            {/* Corner spans removed for DOM optimization - relying on border/hover effects */}

            <div className="relative z-10 flex justify-between items-start">
                <Cpu className={`w-5 h-5 ${isExpert ? 'text-primary' : 'text-foreground/40'} group-hover:rotate-90 transition-transform duration-700`} />
                <span className={`text-[10px] uppercase tracking-wider font-mono ${isExpert ? 'text-primary/70' : 'text-foreground/30'}`}>
                    {skill.level}
                </span>
            </div>

            <div className="relative z-10 mt-4">
                <div className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {skill.name}
                </div>
                {/* Simplified bar */}
                <div className="mt-2 h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${isExpert ? 'bg-primary' : 'bg-foreground/40'}`}
                        initial={{ width: 0 }}
                        whileInView={{ width: isExpert ? '95%' : '60%' }}
                        transition={{ duration: 1, delay: 0.2 }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
