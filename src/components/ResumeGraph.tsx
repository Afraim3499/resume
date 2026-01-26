"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { allSkills, Skill } from "@/data/skills";
import { Brain, Database, Globe, Layers, Server, Terminal, Zap, X, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

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
    parent?: string;
}

export function ResumeGraph() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const [scale, setScale] = useState(1);
    const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    // Mount detection (runs once)
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
    }, []);

    // Responsive Resize Handler
    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { clientWidth, clientHeight } = containerRef.current;
                setDimensions({ width: clientWidth, height: clientHeight });
                setScale(Math.min(1, Math.max(0.6, clientWidth / 1200)));
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // --- Generate Graph Layout (Dynamic) ---
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;

    const isMobile = dimensions.width < 768;
    const categoryRadius = isMobile ? Math.min(dimensions.width * 0.35, 160) : 220 * scale;
    const skillRadius = isMobile ? 55 : 90 * scale;

    const nodes: GraphNode[] = [];
    const links: { source: string; target: string; type: "primary" | "secondary" }[] = [];

    nodes.push({ id: "me", type: "center", x: centerX, y: centerY });

    if (isMounted) {
        const categories = Array.from(new Set(allSkills.map((s) => s.category)));
        const catAngleStep = (2 * Math.PI) / categories.length;

        categories.forEach((cat, i) => {
            const angle = i * catAngleStep - Math.PI / 2;
            const cx = centerX + Math.cos(angle) * categoryRadius;
            const cy = centerY + Math.sin(angle) * categoryRadius;

            nodes.push({ id: cat, type: "category", x: cx, y: cy, data: { label: CATEGORY_CONFIG[cat]?.label || cat, cat } });
            links.push({ source: "me", target: cat, type: "primary" });

            const catSkills = allSkills.filter((s) => s.category === cat);
            const skillAngleStep = (2 * Math.PI) / catSkills.length;

            catSkills.forEach((skill, j) => {
                const sAngle = j * skillAngleStep + angle + Math.PI;
                const sx = cx + Math.cos(sAngle) * skillRadius;
                const sy = cy + Math.sin(sAngle) * skillRadius;

                const skillNodeId = `${cat}-${skill.name}`;
                nodes.push({ id: skillNodeId, type: "skill", x: sx, y: sy, data: skill, parent: cat });
                links.push({ source: cat, target: skillNodeId, type: "secondary" });
            });
        });
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full h-[600px] md:h-[900px] bg-background/50 border border-border/40 rounded-3xl overflow-hidden backdrop-blur-sm select-none"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Hint */}
            <div className="absolute top-6 left-6 z-10 pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider animate-pulse">
                    <Zap className="w-4 h-4" /> Interactive Knowledge Graph
                </div>
                <p className="text-muted-foreground text-sm mt-2 hidden md:block">Click nodes to inspect connections.</p>
            </div>

            {isMounted && (
                <>
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
                                    initial={{ pathLength: 0, opacity: 0, strokeWidth: 1 }}
                                    animate={{
                                        pathLength: 1,
                                        opacity: isHighlighted ? 0.6 : 0.1,
                                        strokeWidth: isHighlighted ? 2 : 1
                                    }}
                                    x1={source.x}
                                    y1={source.y}
                                    x2={target.x}
                                    y2={target.y}
                                    stroke="currentColor"
                                    className={cn(
                                        "transition-colors duration-300",
                                        link.type === "primary" ? "text-primary" : "text-border"
                                    )}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes Layer */}
                    {nodes.map((node) => {
                        const isCenter = node.type === "center";
                        const isCategory = node.type === "category";
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const config = isCategory ? CATEGORY_CONFIG[(node.data as any).cat] : null;

                        const baseSize = isCenter ? 80 : isCategory ? 50 : 35;
                        const size = baseSize * (isMobile ? 0.7 : scale);

                        let className = "bg-secondary text-foreground border-border";

                        if (isCenter) className = "bg-primary text-primary-foreground border-primary shadow-[0_0_50px_rgba(var(--primary),0.5)]";
                        if (isCategory && config) className = config.color;
                        if (node.type === "skill") {
                            const skill = node.data as Skill;
                            className = skill.level === "expert" ? "bg-card text-foreground border-primary/50 font-medium" : "bg-card/80 text-muted-foreground border-border/30";
                        }

                        const isActive = selectedNode?.id === node.id || hoveredNode === node.id || (selectedNode?.parent === node.id);
                        if (isActive) className += " z-20 shadow-xl ring-2 ring-primary ring-offset-2 ring-offset-background";

                        const isDimmed = (hoveredNode || selectedNode) && !isActive && hoveredNode !== node.parent && selectedNode?.id !== node.parent;

                        return (
                            <motion.div
                                key={node.id}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: isActive ? 1.3 : 1,
                                    opacity: isDimmed ? 0.1 : 1,
                                    x: node.x - size / 2,
                                    y: node.y - size / 2
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25
                                }}
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
                                        <span className="block text-[10px] md:text-xs font-bold opacity-70">THE</span>
                                        <span className="block text-xs md:text-sm font-black tracking-tight">ARCHITECT</span>
                                    </div>
                                ) : isCategory ? (
                                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                    config?.icon ? <config.icon className="w-5 h-5 md:w-6 md:h-6" /> : <span>{(node.data as any).label}</span>
                                ) : (
                                    <span className="text-[9px] md:text-[10px] whitespace-nowrap px-1 max-w-full overflow-hidden text-ellipsis">
                                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                        {(node.data as any).name}
                                    </span>
                                )}
                            </motion.div>
                        );
                    })}
                </>
            )}

            {/* Info Panel - Right Center on Desktop, Bottom on Mobile */}
            <AnimatePresence>
                {selectedNode && selectedNode.type === "skill" && (
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 20, scale: 0.95 }}
                        className="absolute 
                            bottom-3 left-3 right-3 
                            md:bottom-auto md:left-auto md:right-4 md:top-1/2 md:-translate-y-1/2
                            w-auto md:w-56
                            p-3 bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-xl z-50"
                    >
                        <button
                            onClick={(e) => { e.stopPropagation(); setSelectedNode(null); }}
                            className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-full transition-colors"
                        >
                            <X className="w-3 h-3 text-muted-foreground" />
                        </button>

                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 rounded-md bg-primary/10 text-primary">
                                <Terminal className="w-4 h-4" />
                            </div>
                            <div>
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                <h3 className="text-sm font-bold leading-none">{(selectedNode.data as any).name}</h3>
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-mono">
                                    {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                    {(selectedNode.data as any).level}
                                </span>
                            </div>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-bold uppercase text-muted-foreground mb-1">Used In</h4>
                            <div className="flex flex-wrap gap-1">
                                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                                {(selectedNode.data as any).projects.map((p: string) => (
                                    <span key={p} className="px-1.5 py-0.5 rounded bg-secondary text-[10px] font-medium text-foreground border border-border/50">
                                        {p.charAt(0).toUpperCase() + p.slice(1)}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
