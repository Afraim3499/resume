"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  shape: "circle" | "triangle" | "square" | "hexagon";
}

export function FloatingShapes({ count = 12 }: { count?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const shapes: FloatingShape[] = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 20 + Math.random() * 60,
    duration: 15 + Math.random() * 20,
    delay: Math.random() * 5,
    shape: ["circle", "triangle", "square", "hexagon"][Math.floor(Math.random() * 4)] as any,
  }));

  const renderShape = (shape: FloatingShape) => {
    const baseProps = {
      fill: "url(#shapeGradient)",
      opacity: 0.1 + Math.random() * 0.15,
      filter: "url(#shapeBlur)",
    };

    switch (shape.shape) {
      case "circle":
        return (
          <motion.circle
            key={shape.id}
            cx={shape.x}
            cy={shape.y}
            r={shape.size / 2}
            {...baseProps}
            animate={{
              y: [shape.y, shape.y - 30, shape.y],
              x: [shape.x, shape.x + (Math.random() - 0.5) * 20, shape.x],
              rotate: [0, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        );
      case "triangle":
        return (
          <motion.polygon
            key={shape.id}
            points={`${shape.x},${shape.y - shape.size / 2} ${shape.x - shape.size / 2},${shape.y + shape.size / 2} ${shape.x + shape.size / 2},${shape.y + shape.size / 2}`}
            {...baseProps}
            animate={{
              y: [shape.y, shape.y - 25, shape.y],
              x: [shape.x, shape.x + (Math.random() - 0.5) * 15, shape.x],
              rotate: [0, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        );
      case "square":
        return (
          <motion.rect
            key={shape.id}
            x={shape.x - shape.size / 2}
            y={shape.y - shape.size / 2}
            width={shape.size}
            height={shape.size}
            {...baseProps}
            animate={{
              y: [shape.y, shape.y - 35, shape.y],
              x: [shape.x, shape.x + (Math.random() - 0.5) * 18, shape.x],
              rotate: [0, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        );
      case "hexagon":
        const hexPoints = Array.from({ length: 6 }, (_, i) => {
          const angle = (i * 60 - 30) * (Math.PI / 180);
          return `${shape.x + Math.cos(angle) * shape.size / 2},${shape.y + Math.sin(angle) * shape.size / 2}`;
        }).join(" ");
        return (
          <motion.polygon
            key={shape.id}
            points={hexPoints}
            {...baseProps}
            animate={{
              y: [shape.y, shape.y - 28, shape.y],
              x: [shape.x, shape.x + (Math.random() - 0.5) * 16, shape.x],
              rotate: [0, 360],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              delay: shape.delay,
              ease: "easeInOut",
            }}
          />
        );
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
          </linearGradient>
          <filter id="shapeBlur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>
        {shapes.map(renderShape)}
      </svg>
    </div>
  );
}

