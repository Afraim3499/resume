"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface ImageHover3DProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

export function ImageHover3D({
  src,
  alt,
  width = 400,
  height = 300,
  className = "",
}: ImageHover3DProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = e.clientX - centerX;
    const y = e.clientY - centerY;

    setRotateX((y / rect.height) * 10);
    setRotateY((x / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-xl ${className}`}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        animate={{
          rotateX,
          rotateY,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative" style={{ width, height }}>
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover"
            style={{
              transform: "translateZ(20px)",
            }}
          />
        </div>
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 opacity-0 pointer-events-none"
        animate={{
          opacity: Math.abs(rotateX) + Math.abs(rotateY) > 0 ? 0.3 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}

