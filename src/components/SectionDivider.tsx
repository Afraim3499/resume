"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  variant?: "wave" | "morph" | "gradient";
  className?: string;
}

export function SectionDivider({ variant = "wave", className = "" }: SectionDividerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "20%" }); // Start animating slightly before it enters view

  if (variant === "wave") {
    return (
      <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20"
        >
          {isInView && (
            <motion.path
              fill="currentColor"
              className="text-background"
              initial={{ d: "M0,60 C300,20 600,100 900,60 C1050,40 1200,80 1200,60 L1200,120 L0,120 Z" }}
              animate={{
                d: [
                  "M0,60 C300,20 600,100 900,60 C1050,40 1200,80 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z",
                  "M0,60 C300,20 600,100 900,60 C1050,40 1200,80 1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </svg>
      </div>
    );
  }

  if (variant === "morph") {
    return (
      <div ref={ref} className={`relative w-full overflow-hidden ${className}`}>
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-20"
        >
          <defs>
            <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: "#8b5cf6", stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: "#10b981", stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          {isInView && (
            <motion.path
              fill="url(#dividerGradient)"
              initial={{ d: "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z" }}
              animate={{
                d: [
                  "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                  "M0,60 Q300,100 600,60 T1200,60 L1200,120 L0,120 Z",
                  "M0,60 Q300,20 600,60 T1200,60 L1200,120 L0,120 Z",
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          )}
        </svg>
      </div>
    );
  }

  // Gradient variant
  return (
    <div ref={ref} className={`relative w-full h-1 ${className}`}>
      {isInView && (
        <motion.div
          className="h-full w-full bg-gradient-to-r from-transparent via-primary to-transparent"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
    </div>
  );
}

