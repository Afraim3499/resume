"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { allSkills, Skill } from "@/data/skills";
import { Brain, Database, Globe, Layers, Server, Terminal, Zap, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// --- Configuration ---
const CENTER_X = 400;
const CENTER_Y = 300;
const CATEGORY_RADIUS = 160;
const SKILL_RADIUS = 100; // Radius around the category

// Category Colors & Icons
const CATEGORY_CONFIG: Record<string, { color: string; icon: LucideIcon; label: string }> = {
    frontend: { color: "text-blue-400 bg-blue-500/10 border-blue-500/50", icon: Globe, label: "Frontend" },
    backend: { color: "text-green-400 bg-green-500/10 border-green-500/50", icon: Server, label: "Backend" },
    database: { color: "text-orange-400 bg-orange-500/10 border-orange-500/50", icon: Database, label: "Data" },
    devops: { color: "text-purple-400 bg-purple-500/10 border-purple-500/50", icon: Layers, label: "DevOps" },
    ai: { color: "text-red-400 bg-red-500/10 border-red-500/50", icon: Brain, label: "AI & ML" },
    tools: { color: "text-gray-400 bg-gray-500/10 border-gray-500/50", icon: Terminal, label: "Tools" },
};

interface GraphNode {
    id: string;
    type: "center" | "category" | "skill";
    x: number;
    y: number;
    data?: unknown;
    parent?: string; // ID of parent for connections
}

export function ResumeGraph() {
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);

    // --- Generate Graph Layout ---
    const nodes: GraphNode[] = [];
    const links: { source: string; target: string; type: "primary" | "secondary" }[] = [];

    // 1. Center Node
    nodes.push({ id: "me", type: "center", x: CENTER_X, y: CENTER_Y });

    // 2. Category Nodes (Orbiting Center)
    const categories = Array.from(new Set(allSkills.map((s) => s.category)));
    const catAngleStep = (2 * Math.PI) / categories.length;

    categories.forEach((cat, i) => {
        const angle = i * catAngleStep;
        const cx = CENTER_X + Math.cos(angle) * CATEGORY_RADIUS;
        const cy = CENTER_Y + Math.sin(angle) * CATEGORY_RADIUS;

        nodes.push({ id: cat, type: "category", x: cx, y: cy, data: { label: CATEGORY_CONFIG[cat]?.label || cat, cat } });
        links.push({ source: "me", target: cat, type: "primary" });

        // 3. Skill Nodes (Orbiting Category)
        const catSkills = allSkills.filter((s) => s.category === cat);
        const skillAngleStep = (2 * Math.PI) / catSkills.length; // Spread full circle around category

        catSkills.forEach((skill, j) => {
            const sAngle = j * skillAngleStep + angle; // Add parent angle to rotate relative to center
            const sx = cx + Math.cos(sAngle) * (SKILL_RADIUS * 0.8); // Slightly tighter orbit
            const sy = cy + Math.sin(sAngle) * (SKILL_RADIUS * 0.8);

            nodes.push({ id: skill.name, type: "skill", x: sx, y: sy, data: skill, parent: cat });
            links.push({ source: cat, target: skill.name, type: "secondary" });
        });
    });

    return (
        <div className="relative w-full h-[700px] md:h-[800px] bg-background/50 border border-border/40 rounded-3xl overflow-hidden backdrop-blur-sm select-none">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Hint */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider animate-pulse">
                    <Zap className="w-4 h-4" /> Interactive Knowledge Graph
                </div>
                <p className="text-muted-foreground text-sm mt-2">Click nodes to inspect connections.</p>
            </div>

            {/* SVG Layer for Links */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {links.map((link, i) => {
                    const source = nodes.find((n) => n.id === link.source);
                    const target = nodes.find((n) => n.id === link.target);
                    if (!source || !target) return null;

                    const isHighlighted = hoveredNode === link.source || hoveredNode === link.target || selectedNode?.id === link.source || selectedNode?.id === link.target;

                    return (
                        <motion.line
                            key={i}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: 1,
                                opacity: isHighlighted ? 0.8 : 0.15,
                                strokeWidth: isHighlighted ? 2 : 1
                            }}
                            transition={{ duration: 1, delay: i * 0.01 }}
                            x1={source.x}
                            y1={source.y}
                            x2={target.x}
                            y2={target.y}
                            stroke="currentColor"
                            className={cn(
                                "text-foreground transition-all duration-300",
                                link.type === "primary" ? "text-primary" : "text-foreground"
                            )}
                        />
                    );
                })}
            </svg>

            {/* Nodes Layer */}
            {nodes.map((node, i) => {
                const isCenter = node.type === "center";
                const isCategory = node.type === "category";
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const config = isCategory ? CATEGORY_CONFIG[(node.data as any).cat] : null;

                // Adjust Node Appearance
                const size = isCenter ? 80 : isCategory ? 60 : 40;
                let className = "bg-secondary text-foreground border-border";

                if (isCenter) className = "bg-primary text-primary-foreground border-primary shadow-[0_0_50px_rgba(var(--primary),0.5)]";
                if (isCategory && config) className = config.color;
                if (node.type === "skill") {
                    // Check level for complexity
                    const skill = node.data as Skill;
                    className = skill.level === "expert" ? "bg-foreground text-background border-foreground font-bold" : "bg-card text-muted-foreground border-border/50";
                }

                const isActive = selectedNode?.id === node.id || hoveredNode === node.id || (selectedNode?.parent === node.id);
                if (isActive) className += " scale-110 z-20 shadow-xl ring-2 ring-primary ring-offset-2 ring-offset-background";

                // Dim others if something is hovered
                const isDimmed = (hoveredNode || selectedNode) && !isActive && hoveredNode !== node.parent && selectedNode?.id !== node.parent;

                return (
                    <motion.div
                        key={node.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{
                            scale: 1,
                            opacity: isDimmed ? 0.2 : 1,
                            x: node.x - size / 2, // Centering
                            y: node.y - size / 2
                        }}
                        transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.02 }}
                        whileHover={{ scale: 1.2 }}
                        className={cn(
                            "absolute flex items-center justify-center rounded-full border shadow-sm cursor-pointer transition-colors duration-200",
                            className
                        )}
                        style={{ width: size, height: size }}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        onClick={() => setSelectedNode(node)}
                    >
                        {isCenter ? (
                            <div className="text-center leading-none">
                                <span className="block text-xs font-bold opacity-70">THE</span>
                                <span className="block text-sm font-black tracking-tight">ARCHITECT</span>
                            </div>
                        ) : isCategory ? (
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            config?.icon ? <config.icon className="w-6 h-6" /> : <span>{(node.data as any).label}</span>
                        ) : (
                            // Skill Node: Show Icon or initial
                            <span className="text-[10px] font-bold px-1 text-center truncate w-full">{node.id}</span>
                        )}
                    </motion.div>
                );
            })}

            {/* Info Panel (Bottom Right) */}
            <AnimatePresence>
                {selectedNode && selectedNode.type === "skill" && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="absolute bottom-6 right-6 w-80 p-6 bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-2xl z-50 transform origin-bottom-right"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
                            className="absolute top-4 right-4 p-1 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 text-muted-foreground" />
                        </button>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                <Terminal className="w-5 h-5" />
                            </div>
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <h3 className="text-lg font-bold leading-none">{(selectedNode.data as any).name}</h3>
                                <span className="text-xs text-muted-foreground uppercase tracking-wider font-mono">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(selectedNode.data as any).level} Proficiency
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2">Used in Business Systems</h4>
                                <div className="flex flex-wrap gap-2">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(selectedNode.data as any).projects.map((p: string) => (
                                        <span key={p} className="px-2 py-1 rounded bg-secondary text-xs font-medium text-foreground border border-border/50">
                                            {p.charAt(0).toUpperCase() + p.slice(1)}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-border/50 flex justify-between items-center">
                                <span className="text-xs text-muted-foreground">WikiData Entity Linked</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
