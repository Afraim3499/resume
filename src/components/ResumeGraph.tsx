"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Link from "next/link";
import { allSkills, Skill } from "@/data/skills";
import {
  Brain, BarChart3, Megaphone, Server, Terminal,
  Zap, X, ArrowUpRight, Search, LucideIcon, Sparkles
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   CATEGORY VISUAL SYSTEM
   Each category has:
   - hex:     the primary glow color (used for shadows, strokes, rings)
   - bg:      resting background tint
   - glow:    CSS box-shadow string for the "lit up" state
   - label, description, icon, solutionHref
   ═══════════════════════════════════════════════════ */
const CATEGORY_CONFIG: Record<string, {
  hex: string;
  bg: string;
  glow: string;
  icon: LucideIcon;
  label: string;
  description: string;
  solutionHref?: string;
}> = {
  gtm_operations: {
    hex: "#B45309",
    bg: "rgba(180,83,9,0.06)",
    glow: "0 0 18px 4px rgba(180,83,9,0.35), 0 0 4px 1px rgba(180,83,9,0.5)",
    icon: BarChart3,
    label: "GTM & Ops",
    description: "Lead routing, CRM pipelines, Meta CAPI, Google Merchant feeds, and voice agent integrations that drive revenue operations.",
    solutionHref: "/solutions/gtm-operations",
  },
  brand_execution: {
    hex: "#BE123C",
    bg: "rgba(190,18,60,0.06)",
    glow: "0 0 18px 4px rgba(190,18,60,0.35), 0 0 4px 1px rgba(190,18,60,0.5)",
    icon: Megaphone,
    label: "Brand",
    description: "Large-scale event operations (25,000+ audiences), competitor research, organic brand campaigns, and team/vendor coordination.",
    solutionHref: "/solutions/executive-brand",
  },
  digital_platforms: {
    hex: "#047857",
    bg: "rgba(4,120,87,0.06)",
    glow: "0 0 18px 4px rgba(4,120,87,0.35), 0 0 4px 1px rgba(4,120,87,0.5)",
    icon: Server,
    label: "Platforms",
    description: "Next.js pre-rendering, multi-stage CMS workflows, SEO/AEO frameworks, RAG chatbots, and automated testing pipelines.",
    solutionHref: "/solutions/dynamic-platforms",
  },
  systems_infrastructure: {
    hex: "#1D4ED8",
    bg: "rgba(29,78,216,0.06)",
    glow: "0 0 18px 4px rgba(29,78,216,0.35), 0 0 4px 1px rgba(29,78,216,0.5)",
    icon: Brain,
    label: "Infra",
    description: "PostgreSQL schema design, Supabase RLS security, API architecture, deterministic state locking, and Redis availability caching.",
  },
};

const SKILL_DISPLAY: Record<string, { short: string; lines: string[] }> = {
  "Timezone-Aware Lead Routing": { short: "Lead Routing", lines: ["Lead", "Routing"] },
  "Meta Conversions API (CAPI)": { short: "Meta CAPI", lines: ["Meta", "CAPI"] },
  "Google Merchant XML Feeds": { short: "Merchant Feeds", lines: ["Merchant", "Feeds"] },
  "Voice Agents & CRM Integration": { short: "Voice CRM", lines: ["Voice", "CRM"] },
  "Large-Scale Event Operations": { short: "Event Ops", lines: ["Event", "Ops"] },
  "Competitor & Market Research": { short: "Market Research", lines: ["Market", "Research"] },
  "Organic Brand Execution": { short: "Organic Brand", lines: ["Organic", "Brand"] },
  "Team & Vendor Coordination": { short: "Team & Vendor", lines: ["Team &", "Vendor"] },
  "4-Layer SEO Framework": { short: "SEO Framework", lines: ["SEO", "Framework"] },
  "Next.js Static Pre-Rendering": { short: "Next.js Static", lines: ["Next.js", "Static"] },
  "Multi-Stage Approval CMS": { short: "Approval CMS", lines: ["Approval", "CMS"] },
  "OpenAI RAG Chatbots": { short: "RAG Chatbots", lines: ["RAG", "Chatbots"] },
  "AWS S3 Media Ingestion": { short: "S3 Ingestion", lines: ["S3", "Ingestion"] },
  "Dynamic OG Image Generation": { short: "OG Images", lines: ["OG Image", "Gen"] },
  "Playwright E2E Testing": { short: "Playwright E2E", lines: ["Playwright", "E2E"] },
  "Database Schema Design": { short: "DB Schema", lines: ["DB", "Schema"] },
  "Supabase RLS Security": { short: "Supabase RLS", lines: ["Supabase", "RLS"] },
  "API Architecture Design": { short: "API Arch", lines: ["API", "Arch"] },
  "Deterministic State Locking": { short: "State Locking", lines: ["State", "Locking"] },
  "Redis Availability Caching": { short: "Redis Cache", lines: ["Redis", "Cache"] },
};

/* Helper: get a node's category key */
function getNodeCategory(node: SimNode): string | null {
  if (node.type === "category") return node.data?.cat ?? null;
  if (node.type === "skill") return node.parent ?? null;
  return null;
}

/* ─── SimNode ─── */
interface SimNode {
  id: string;
  type: "center" | "category" | "skill";
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  label: string;
  data?: { cat?: string } & Partial<Skill>;
  parent?: string;
  targetX: number;
  targetY: number;
}

/* ═══════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════ */
export function ResumeGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [selectedNode, setSelectedNode] = useState<SimNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [simNodes, setSimNodes] = useState<SimNode[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  useEffect(() => { setIsMounted(true); }, []);

  /* ─── Responsive Resize ─── */
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight || 600 });
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const centerX = dimensions.width / 2;
  const centerY = dimensions.height / 2;
  const isMobile = dimensions.width < 768;
  const categoryRadius = isMobile ? 120 : 230;
  const skillRadius = isMobile ? 65 : 100;

  /* ─── Search/Filter Matching ─── */
  const matchedNodeIds = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q && !activeFilter) return null;
    const ids = new Set<string>();
    allSkills.forEach((skill) => {
      const nameMatch = !q || skill.name.toLowerCase().includes(q);
      const catMatch = !activeFilter || skill.category === activeFilter;
      if (nameMatch && catMatch) {
        ids.add(`${skill.category}-${skill.name}`);
        ids.add(skill.category);
        ids.add("me");
      }
    });
    return ids.size > 0 ? ids : new Set<string>(["me"]);
  }, [searchQuery, activeFilter]);

  /* ─── Links ─── */
  const links = useMemo(() => {
    if (!isMounted) return [];
    const result: { source: string; target: string; type: "primary" | "secondary"; category: string }[] = [];
    const cats = Array.from(new Set(allSkills.map((s) => s.category)));
    cats.forEach((cat) => {
      result.push({ source: "me", target: cat, type: "primary", category: cat });
      allSkills.filter((s) => s.category === cat).forEach((skill) => {
        result.push({ source: cat, target: `${cat}-${skill.name}`, type: "secondary", category: cat });
      });
    });
    return result;
  }, [isMounted]);

  /* ─── Node Init ─── */
  useEffect(() => {
    if (!isMounted) return;
    const cats = Array.from(new Set(allSkills.map((s) => s.category)));
    const catAngleStep = (2 * Math.PI) / cats.length;
    const nodes: SimNode[] = [];

    nodes.push({
      id: "me", type: "center",
      x: centerX, y: centerY, vx: 0, vy: 0,
      size: isMobile ? 76 : 100,
      label: "ORCHESTRATOR",
      targetX: centerX,
      targetY: centerY,
    });

    cats.forEach((cat, i) => {
      const angle = i * catAngleStep - Math.PI / 2;
      const cx = centerX + Math.cos(angle) * categoryRadius;
      const cy = centerY + Math.sin(angle) * categoryRadius;

      nodes.push({
        id: cat, type: "category",
        x: cx,
        y: cy,
        vx: 0, vy: 0,
        size: isMobile ? 52 : 64,
        label: CATEGORY_CONFIG[cat]?.label || cat,
        data: { cat },
        targetX: cx,
        targetY: cy,
      });

      const catSkills = allSkills.filter((s) => s.category === cat);
      const sStep = (2 * Math.PI) / catSkills.length;
      catSkills.forEach((skill, j) => {
        const sA = j * sStep + angle + Math.PI;
        const sx = cx + Math.cos(sA) * skillRadius;
        const sy = cy + Math.sin(sA) * skillRadius;
        nodes.push({
          id: `${cat}-${skill.name}`, type: "skill",
          x: sx,
          y: sy,
          vx: 0, vy: 0,
          size: isMobile ? 44 : 56,
          label: skill.name,
          data: skill,
          parent: cat,
          targetX: sx,
          targetY: sy,
        });
      });
    });

    setSimNodes(nodes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, dimensions.width, dimensions.height]);

  /* ─── Physics Tick ─── */
  useEffect(() => {
    if (!isMounted || simNodes.length === 0) return;
    let animFrame: number;
    const snap = links;

    const tick = () => {
      setSimNodes((prev) => {
        if (prev.length === 0) return prev;
        const ns = prev.map((n) => ({ ...n }));

        // 1. Anchor Springs: Pull each node toward its original static resting coordinates
        ns.forEach((n) => {
          if (n.id === draggedNode) return;
          const dx = n.targetX - n.x;
          const dy = n.targetY - n.y;
          // Center is anchor-stiffer so it remains a solid pivot
          const anchorK = n.type === "center" ? 0.12 : 0.085;
          n.vx += dx * anchorK;
          n.vy += dy * anchorK;
        });

        // 2. Link Elasticity: Connected nodes pull on each other using elastic tension
        snap.forEach((link) => {
          const src = ns.find((n) => n.id === link.source);
          const tgt = ns.find((n) => n.id === link.target);
          if (!src || !tgt) return;

          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          // Desired distance is exactly the distance between their target static coordinates
          const targetDx = tgt.targetX - src.targetX;
          const targetDy = tgt.targetY - src.targetY;
          const desired = Math.sqrt(targetDx * targetDx + targetDy * targetDy) || 1;

          // Spring tension coefficient
          const str = link.type === "primary" ? 0.045 : 0.075;
          const f = (dist - desired) * str;
          const fx = (dx / dist) * f;
          const fy = (dy / dist) * f;

          if (src.id !== draggedNode) {
            src.vx += fx;
            src.vy += fy;
          }
          if (tgt.id !== draggedNode) {
            tgt.vx -= fx;
            tgt.vy -= fy;
          }
        });

        // 3. Collision Prevention: Keep them from overlapping or clumping together during interaction
        for (let i = 0; i < ns.length; i++) {
          for (let j = i + 1; j < ns.length; j++) {
            const a = ns[i], b = ns[j];
            const dx = b.x - a.x, dy = b.y - a.y;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            const minDist = (a.size + b.size) / 2 + 10;
            if (dist < minDist) {
              const overlap = minDist - dist;
              const force = overlap * 0.12;
              const fx = (dx / dist) * force;
              const fy = (dy / dist) * force;
              if (a.id !== draggedNode) { a.vx -= fx; a.vy -= fy; }
              if (b.id !== draggedNode) { b.vx += fx; b.vy += fy; }
            }
          }
        }

        // 4. Damping + Bound Updates
        ns.forEach((n) => {
          if (n.id === draggedNode) return;
          // Smooth damping keeps the snap-back clean and wobble-free
          n.vx *= 0.68;
          n.vy *= 0.68;

          n.x += n.vx;
          n.y += n.vy;

          const m = n.size / 2 + 10;
          if (n.x < m) { n.x = m; n.vx = 0; }
          if (n.x > dimensions.width - m) { n.x = dimensions.width - m; n.vx = 0; }
          if (n.y < m) { n.y = m; n.vy = 0; }
          if (n.y > dimensions.height - m) { n.y = dimensions.height - m; n.vy = 0; }
        });

        return ns;
      });
      animFrame = requestAnimationFrame(tick);
    };

    animFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted, draggedNode, dimensions.width, dimensions.height]);

  /* ─── Drag Handlers ─── */
  const handleMouseDown = useCallback((nodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDraggedNode(nodeId);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedNode || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setSimNodes((prev) =>
      prev.map((n) => n.id === draggedNode ? { ...n, x: e.clientX - rect.left, y: e.clientY - rect.top, vx: 0, vy: 0 } : n)
    );
  }, [draggedNode]);

  const handleMouseUpOrLeave = useCallback(() => setDraggedNode(null), []);

  /* ═══════════════════════════════════════════════════
     VISUAL STATE RESOLVER
     ═══════════════════════════════════════════════════ */
  type VisualState = "resting" | "lit" | "dragging" | "dimmed";

  const currentActiveCategory = useMemo(() => {
    if (activeFilter) return activeFilter;
    if (selectedNode) {
      if (selectedNode.type === "category") return selectedNode.id;
      if (selectedNode.type === "skill") return selectedNode.parent ?? null;
    }
    return null;
  }, [activeFilter, selectedNode]);

  const getNodeVisualState = useCallback((node: SimNode): VisualState => {
    // 1. Search query active -> prioritize search
    if (searchQuery.trim()) {
      if (matchedNodeIds) {
        if (!matchedNodeIds.has(node.id)) return "dimmed";
        return "lit";
      }
    }

    // 2. Dragged node takes priority
    if (draggedNode === node.id) return "dragging";
    if (draggedNode) {
      const dragNode = simNodes.find((n) => n.id === draggedNode);
      if (dragNode) {
        if (node.id === dragNode.parent || node.parent === draggedNode || (node.id === "me" && (dragNode.type === "category" || dragNode.type === "center"))) return "lit";
        if (node.type === "category" && dragNode.parent === node.id) return "lit";
      }
      return "dimmed";
    }

    // 3. Hovered node takes priority
    if (hoveredNode) {
      if (hoveredNode === node.id) return "lit";
      const hoverNode = simNodes.find((n) => n.id === hoveredNode);
      if (hoverNode) {
        if (node.id === hoverNode.parent || node.parent === hoveredNode || (node.id === "me" && (hoverNode.type === "category" || hoverNode.type === "skill")) || (node.type === "category" && hoverNode.parent === node.id)) return "lit";
      }
      return "dimmed";
    }

    // 4. Central node is selected -> light up everything
    if (selectedNode && (selectedNode.id === "me" || selectedNode.type === "center")) {
      return "lit";
    }

    // 5. Active category branch highlighted
    if (currentActiveCategory) {
      if (node.id === "me" || node.id === currentActiveCategory || node.parent === currentActiveCategory) {
        return "lit";
      }
      return "dimmed";
    }

    // 6. Selected node fallback
    if (selectedNode) {
      if (selectedNode.id === node.id) return "lit";
      return "dimmed";
    }

    return "resting";
  }, [searchQuery, matchedNodeIds, draggedNode, hoveredNode, selectedNode, currentActiveCategory, simNodes]);

  const getLinkVisualState = useCallback((source: string, target: string): VisualState => {
    // 1. Search query active -> prioritize search
    if (searchQuery.trim()) {
      if (matchedNodeIds) {
        return (matchedNodeIds.has(source) && matchedNodeIds.has(target)) ? "lit" : "dimmed";
      }
    }

    // 2. If central node is clicked, light up every ribbon/connection!
    if (selectedNode && (selectedNode.id === "me" || selectedNode.type === "center")) {
      return "lit";
    }

    // 3. Active category branch highlighting
    if (currentActiveCategory) {
      if (source === "me" && target === currentActiveCategory) {
        return "lit";
      }
      if (source === currentActiveCategory && target.startsWith(`${currentActiveCategory}-`)) {
        return "lit";
      }
      return "dimmed";
    }

    // 4. Dragging state path
    if (draggedNode) {
      if (source === draggedNode || target === draggedNode) return "lit";
      const dragNode = simNodes.find((n) => n.id === draggedNode);
      if (dragNode && dragNode.type === "skill" && source === "me" && target === dragNode.parent) {
        return "lit";
      }
      return "dimmed";
    }

    // 5. Hover state path
    if (hoveredNode) {
      if (source === hoveredNode || target === hoveredNode) return "lit";
      const hoverNode = simNodes.find((n) => n.id === hoveredNode);
      if (hoverNode && hoverNode.type === "skill" && source === "me" && target === hoverNode.parent) {
        return "lit";
      }
      return "dimmed";
    }

    return "resting";
  }, [searchQuery, matchedNodeIds, selectedNode, currentActiveCategory, draggedNode, simNodes, hoveredNode]);

  const categories = useMemo(() => Array.from(new Set(allSkills.map((s) => s.category))), []);

  /* ═══════════════════════════════════════════════════
     RENDER
     ═══════════════════════════════════════════════════ */
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      className="relative w-full h-[600px] md:h-[800px] bg-[#FFFDF8] border border-[#0F5132]/10 rounded-3xl overflow-hidden select-none"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f513205_1px,transparent_1px),linear-gradient(to_bottom,#0f513205_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* ─── Top Controls ─── */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-col md:flex-row items-start md:items-center gap-3">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F5132] text-white text-[10px] font-bold uppercase tracking-wider flex-shrink-0 shadow-md">
          <Zap className="w-3 h-3" /> Competency Map
        </div>
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#5F655F]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search skills…"
            className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-[#0F5132]/15 bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#0F5132]/20 text-[#171717] placeholder:text-[#5F655F]/50"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const cfg = CATEGORY_CONFIG[cat];
            if (!cfg) return null;
            const active = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  const isCurrentlyActive = activeFilter === cat;
                  const nextFilter = isCurrentlyActive ? null : cat;
                  setActiveFilter(nextFilter);
                  if (nextFilter) {
                    const parentNode = simNodes.find((n) => n.id === cat);
                    if (parentNode) {
                      setSelectedNode(parentNode);
                    }
                  } else {
                    setSelectedNode(null);
                  }
                }}
                className="px-2.5 py-1 text-[9px] md:text-[10px] font-bold uppercase tracking-wider rounded-full border transition-all duration-200"
                style={{
                  background: active ? cfg.hex : "rgba(255,253,248,0.8)",
                  color: active ? "#fff" : cfg.hex,
                  borderColor: active ? cfg.hex : `${cfg.hex}30`,
                }}
              >
                {cfg.label}
              </button>
            );
          })}
        </div>
      </div>

      {isMounted && simNodes.length > 0 && (
        <>
          {/* ─── SVG Links ─── */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              {/* Glow filters for each category */}
              {categories.map((cat) => {
                const cfg = CATEGORY_CONFIG[cat];
                if (!cfg) return null;
                return (
                  <filter key={cat} id={`glow-${cat}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feFlood floodColor={cfg.hex} floodOpacity="0.6" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="shadow" />
                    <feMerge>
                      <feMergeNode in="shadow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                );
              })}
              <filter id="glow-center" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor="#0F5132" floodOpacity="0.6" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="shadow" />
                <feMerge>
                  <feMergeNode in="shadow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {links.map((link, i) => {
              const source = simNodes.find((n) => n.id === link.source);
              const target = simNodes.find((n) => n.id === link.target);
              if (!source || !target) return null;

              const vs = getLinkVisualState(link.source, link.target);
              const cfg = CATEGORY_CONFIG[link.category];
              const litColor = cfg?.hex ?? "#0F5132";

              return (
                <line
                  key={i}
                  x1={source.x} y1={source.y}
                  x2={target.x} y2={target.y}
                  stroke={vs === "lit" || vs === "dragging" ? litColor : "#0f513210"}
                  strokeWidth={vs === "lit" || vs === "dragging" ? 2 : 0.6}
                  opacity={vs === "dimmed" ? 0.04 : 1}
                  filter={vs === "lit" ? `url(#glow-${link.category})` : undefined}
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>

          {/* ─── Nodes ─── */}
          {simNodes.map((node) => {
            const vs = getNodeVisualState(node);
            const cat = getNodeCategory(node);
            const cfg = cat ? CATEGORY_CONFIG[cat] : null;
            const isCenter = node.type === "center";
            const isCategory = node.type === "category";

            /* ── Compute inline styles per visual state ── */
            let bg: string;
            let border: string;
            let color: string;
            let shadow: string;
            let opacity: number;
            let scale: number;

            if (isCenter) {
              bg = "#0F5132";
              color = "#fff";
              border = "#0F5132";
              shadow = vs === "lit" || vs === "dragging"
                ? "0 0 28px 8px rgba(15,81,50,0.45), 0 0 6px 2px rgba(15,81,50,0.6)"
                : "0 2px 8px rgba(15,81,50,0.15)";
              opacity = vs === "dimmed" ? 0.25 : 1;
              scale = vs === "lit" || vs === "dragging" ? 1.08 : 1;
            } else if (isCategory && cfg) {
              bg = vs === "lit" || vs === "dragging" ? cfg.hex : "#FFFDF8";
              color = vs === "lit" || vs === "dragging" ? "#fff" : cfg.hex;
              border = cfg.hex;
              shadow = vs === "lit" || vs === "dragging" ? cfg.glow : "none";
              opacity = vs === "dimmed" ? 0.35 : vs === "resting" ? 0.85 : 1;
              scale = vs === "lit" || vs === "dragging" ? 1.1 : 1;
            } else {
              // Skill node
              const skill = node.data as Skill;
              const isExpert = skill?.level === "expert";
              bg = vs === "lit" || vs === "dragging"
                ? (cfg?.hex ?? "#0F5132")
                : "#FFFDF8";
              color = vs === "lit" || vs === "dragging"
                ? "#fff"
                : isExpert ? "#171717" : "#5A605B";
              border = vs === "lit" || vs === "dragging"
                ? (cfg?.hex ?? "#0F5132")
                : isExpert ? `${cfg?.hex ?? "#0F5132"}40` : "#0f513215";
              shadow = vs === "lit" || vs === "dragging"
                ? (cfg?.glow ?? "0 0 12px rgba(15,81,50,0.3)")
                : "none";
              opacity = vs === "dimmed" ? 0.35 : vs === "resting" ? (isExpert ? 0.9 : 0.65) : 1;
              scale = vs === "lit" || vs === "dragging" ? 1.12 : 1;
            }

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDown(node.id, e)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => {
                  if (node.type === "category") {
                    setSelectedNode(node);
                    setActiveFilter(node.id);
                  } else if (node.type === "center") {
                    setSelectedNode(node);
                    setActiveFilter(null);
                  } else {
                    setSelectedNode(node);
                  }
                }}
                title={node.label}
                aria-label={node.label}
                className="absolute flex items-center justify-center rounded-full cursor-grab active:cursor-grabbing select-none"
                style={{
                  width: node.size,
                  height: node.size,
                  left: node.x - node.size / 2,
                  top: node.y - node.size / 2,
                  background: bg,
                  color: color,
                  borderWidth: 2,
                  borderStyle: "solid",
                  borderColor: border,
                  boxShadow: shadow,
                  opacity: opacity,
                  transform: `scale(${scale})`,
                  transition: "box-shadow 0.3s ease, opacity 0.3s ease, background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
                  zIndex: vs === "dragging" ? 30 : vs === "lit" ? 20 : 10,
                }}
              >
                {isCenter ? (
                  <div className="text-center leading-none">
                    <span className="block text-[7px] md:text-[8px] font-bold tracking-wider opacity-70">THE</span>
                    <span className="block text-[9px] md:text-[11px] font-black tracking-tight mt-0.5">ORCHESTRATOR</span>
                  </div>
                ) : isCategory ? (
                  <div className="flex flex-col items-center gap-0.5">
                    {cfg?.icon && <cfg.icon className="w-4 h-4 md:w-5 md:h-5" />}
                    <span className="text-[6px] md:text-[7px] font-extrabold uppercase tracking-widest leading-none text-center px-1">
                      {node.label}
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center px-1 max-w-[92%] leading-[1.1]">
                    {(SKILL_DISPLAY[node.label]?.lines ?? [node.label]).map((line, idx) => (
                      <span key={idx} className="block text-[7.5px] md:text-[8.5px] font-extrabold break-words">
                        {line}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}

      {/* ═══ Detail Panel ═══ */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="absolute bottom-4 left-4 right-4 md:bottom-auto md:left-auto md:right-6 md:top-1/2 md:-translate-y-1/2 w-auto md:w-72 p-4 bg-[#FFFDF8] border border-[#0F5132]/12 rounded-2xl shadow-2xl z-50 flex flex-col gap-3"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedNode(null);
                setActiveFilter(null);
              }}
              className="absolute top-3 right-3 p-1 hover:bg-[#EAF7EF] rounded-full text-[#5F655F] hover:text-[#0F5132] transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Center */}
            {selectedNode.type === "center" && (
              <>
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-[#0F5132] text-white"><Sparkles className="w-4 h-4" /></div>
                  <div>
                    <h3 className="text-xs font-bold text-[#171717] leading-none">The Orchestrator</h3>
                    <span className="text-[9px] font-mono text-[#0F5132] uppercase tracking-wider block mt-1">Systems Builder & Ops Strategist</span>
                  </div>
                </div>
                <p className="text-[10px] text-[#5F655F] leading-relaxed">
                  Bridging marketing operations, brand execution, and digital product engineering into unified, revenue-generating systems.
                </p>
                <div className="border-t border-[#0F5132]/8 pt-2 flex flex-wrap gap-1">
                  <Link href="/resume" className="px-2 py-1 rounded bg-[#EAF7EF] text-[9px] font-semibold text-[#0F5132] border border-[#0F5132]/12 hover:border-[#0F5132]/30 transition-all flex items-center gap-0.5">
                    Full Resume <ArrowUpRight className="w-2.5 h-2.5" />
                  </Link>
                  <Link href="/projects" className="px-2 py-1 rounded bg-[#EAF7EF] text-[9px] font-semibold text-[#0F5132] border border-[#0F5132]/12 hover:border-[#0F5132]/30 transition-all flex items-center gap-0.5">
                    View Projects <ArrowUpRight className="w-2.5 h-2.5" />
                  </Link>
                </div>
              </>
            )}

            {/* Category */}
            {selectedNode.type === "category" && (() => {
              const catKey = selectedNode.data?.cat;
              const c = catKey ? CATEGORY_CONFIG[catKey] : null;
              if (!c) return null;
              return (
                <>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: c.hex, color: "#fff" }}>
                      <c.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#171717] leading-none">{c.label}</h3>
                      <span className="text-[9px] font-mono text-[#0F5132] uppercase tracking-wider block mt-1">Competency Domain</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#5F655F] leading-relaxed">{c.description}</p>
                  {c.solutionHref && (
                    <div className="border-t border-[#0F5132]/8 pt-2">
                      <Link href={c.solutionHref} className="text-[9px] font-bold hover:underline flex items-center gap-0.5" style={{ color: c.hex }}>
                        Explore Solutions <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </>
              );
            })()}

            {/* Skill */}
            {selectedNode.type === "skill" && (() => {
              const skill = selectedNode.data as Skill;
              const c = CATEGORY_CONFIG[selectedNode.parent ?? ""];
              return (
                <>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg" style={{ background: c?.hex ?? "#0F5132", color: "#fff" }}>
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-[#171717] leading-none">{selectedNode.label}</h3>
                      <span className="text-[9px] font-mono uppercase tracking-wider block mt-1" style={{ color: c?.hex ?? "#0F5132" }}>
                        {skill.level} capability
                      </span>
                    </div>
                  </div>

                  {skill.wikiId && (
                    <div className="border-t border-[#0F5132]/8 pt-2">
                      <Link href={`/wiki/${skill.wikiId}`} className="text-[9px] font-bold text-[#0F5132] hover:underline flex items-center gap-0.5">
                        View Wiki Definition &amp; Scope <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  <div className="border-t border-[#0F5132]/8 pt-3">
                    <h4 className="text-[9px] font-bold uppercase text-[#5F655F] mb-2 tracking-wider">Production Deployments</h4>
                    <div className="flex flex-wrap gap-1">
                      {skill.projects.map((p) => (
                        <Link
                          key={p.slug}
                          href={p.type === "project" ? `/projects/${p.slug}` : `/solutions/${p.slug}`}
                          className="px-2 py-1 rounded text-[9px] font-semibold border transition-all flex items-center gap-0.5"
                          style={{
                            background: `${c?.hex ?? "#0F5132"}10`,
                            color: c?.hex ?? "#0F5132",
                            borderColor: `${c?.hex ?? "#0F5132"}20`,
                          }}
                        >
                          {p.label} <ArrowUpRight className="w-2.5 h-2.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Legend ─── */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none hidden md:flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFFDF8] border border-[#0F5132]/20" />
          <span className="text-[9px] text-[#5F655F]/60 font-medium">Resting</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#0F5132]" style={{ boxShadow: "0 0 8px 2px rgba(15,81,50,0.4)" }} />
          <span className="text-[9px] text-[#5F655F]/60 font-medium">Active</span>
        </div>
        <span className="text-[9px] text-[#5F655F]/40 ml-2">Drag nodes · Click to inspect</span>
      </div>
    </div>
  );
}
