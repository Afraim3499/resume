"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface Compass3DProps {
  size?: number;
  className?: string;
}

export function Compass3D({ size = 120, className = "" }: Compass3DProps) {
  const compassRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!compassRef.current) return;
      
      const rect = compassRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const rotateX = (y / rect.height) * 20;
      const rotateY = (x / rect.width) * 20;
      
      compassRef.current.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        ref={compassRef}
        width={size}
        height={size}
        viewBox="0 0 200 200"
        className="transition-transform duration-300 ease-out"
        style={{ transformStyle: "preserve-3d" }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="compassGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#059669", stopOpacity: 1 }} />
          </linearGradient>
          <linearGradient id="compassGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#34d399", stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
          </linearGradient>
          <radialGradient id="compassGlow" cx="50%" cy="50%">
            <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 0.8 }} />
            <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 0 }} />
          </radialGradient>
          
          {/* Filters for depth */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Outer Ring - 3D effect */}
        <motion.circle
          cx="100"
          cy="100"
          r="95"
          fill="none"
          stroke="url(#compassGradient1)"
          strokeWidth="2"
          opacity="0.3"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Middle Ring */}
        <motion.circle
          cx="100"
          cy="100"
          r="85"
          fill="none"
          stroke="url(#compassGradient2)"
          strokeWidth="1.5"
          opacity="0.5"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "100px 100px" }}
        />

        {/* Main Compass Body - 3D Sphere */}
        <g filter="url(#glow)">
          {/* Base Circle with gradient */}
          <circle
            cx="100"
            cy="100"
            r="70"
            fill="url(#compassGradient1)"
            opacity="0.9"
          />
          
          {/* Highlight for 3D effect */}
          <ellipse
            cx="85"
            cy="75"
            rx="30"
            ry="25"
            fill="rgba(255,255,255,0.3)"
          />
          
          {/* Shadow for depth */}
          <ellipse
            cx="115"
            cy="125"
            rx="30"
            ry="25"
            fill="rgba(0,0,0,0.2)"
          />
        </g>

        {/* North Arrow - 3D */}
        <motion.g
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 100 30 L 110 50 L 100 45 L 90 50 Z"
            fill="#ffffff"
            opacity="0.95"
            filter="url(#glow)"
          />
          <path
            d="M 100 30 L 105 40 L 100 38 L 95 40 Z"
            fill="#10b981"
            opacity="0.8"
          />
        </motion.g>

        {/* South Arrow */}
        <motion.g
          animate={{ y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <path
            d="M 100 170 L 110 150 L 100 155 L 90 150 Z"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#glow)"
          />
        </motion.g>

        {/* East Arrow */}
        <motion.g
          animate={{ x: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <path
            d="M 170 100 L 150 110 L 155 100 L 150 90 Z"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#glow)"
          />
        </motion.g>

        {/* West Arrow */}
        <motion.g
          animate={{ x: [0, -3, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        >
          <path
            d="M 30 100 L 50 110 L 45 100 L 50 90 Z"
            fill="#ffffff"
            opacity="0.7"
            filter="url(#glow)"
          />
        </motion.g>

        {/* Center Point - 3D Sphere */}
        <circle
          cx="100"
          cy="100"
          r="12"
          fill="url(#compassGradient2)"
          filter="url(#glow)"
        />
        <circle
          cx="100"
          cy="100"
          r="8"
          fill="#ffffff"
          opacity="0.9"
        />
        <circle
          cx="95"
          cy="95"
          r="3"
          fill="rgba(255,255,255,0.6)"
        />

        {/* Grid Lines for depth */}
        <g opacity="0.2">
          <line x1="100" y1="30" x2="100" y2="170" stroke="#ffffff" strokeWidth="0.5" />
          <line x1="30" y1="100" x2="170" y2="100" stroke="#ffffff" strokeWidth="0.5" />
          <line x1="60" y1="60" x2="140" y2="140" stroke="#ffffff" strokeWidth="0.5" />
          <line x1="140" y1="60" x2="60" y2="140" stroke="#ffffff" strokeWidth="0.5" />
        </g>

        {/* Floating particles */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = 80;
          const x = 100 + Math.cos(angle) * radius;
          const y = 100 + Math.sin(angle) * radius;
          
          return (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="#10b981"
              opacity="0.6"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.25,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>
    </motion.div>
  );
}

