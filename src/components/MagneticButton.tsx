"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
}

export function MagneticButton({
  children,
  className = "",
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;


    const strength = 0.3;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  const baseStyles = {
    primary: "bg-foreground text-background hover:bg-primary",
    secondary: "bg-primary text-white hover:bg-primary/90",
    outline: "bg-transparent border-2 border-foreground/20 text-foreground hover:border-primary hover:text-primary",
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        x: xSpring,
        y: ySpring,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative min-w-[44px] min-h-[44px] inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium transition-colors overflow-hidden group ${baseStyles[variant]} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {variant === "primary" && (
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        )}
      </span>

      {/* Shimmer effect */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      )}
    </motion.button>
  );
}

