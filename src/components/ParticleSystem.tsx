"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  type: "primary" | "accent" | "neutral";
  baseSize: number;
  pulsePhase: number;
  angle: number;
  speed: number;
}

const colorPalette = {
  primary: [
    "rgba(16, 185, 129, 0.8)",   // emerald-500 - very visible
    "rgba(5, 150, 105, 0.7)",    // emerald-600
    "rgba(34, 211, 153, 0.85)",   // emerald-400
    "rgba(52, 211, 153, 0.8)",    // emerald-400 variant
  ],
  accent: [
    "rgba(139, 92, 246, 0.7)",   // violet-500 - very visible
    "rgba(124, 58, 237, 0.65)",   // violet-600
    "rgba(167, 139, 250, 0.8)",  // violet-400
    "rgba(196, 181, 253, 0.7)",  // violet-300
  ],
  neutral: [
    "rgba(255, 255, 255, 0.6)",  // white - very visible
    "rgba(255, 255, 255, 0.5)",  // white dimmed
    "rgba(255, 255, 255, 0.7)",  // white bright
  ],
};

export function ParticleSystem({ count = 60 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    setMounted(true);
    
    // Wait for canvas to be mounted before initializing
    const checkCanvas = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        // Canvas not ready yet, retry
        setTimeout(checkCanvas, 50);
        return;
      }
      
      initializeCanvas(canvas);
    };
    
    const initializeCanvas = (canvas: HTMLCanvasElement) => {
      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) {
        console.error("ParticleSystem: Could not get 2d context");
        return;
      }

      const resize = () => {
        if (!canvas) return;
        // Get the section container dimensions
        const section = canvas.closest("section");
        if (section) {
          const rect = section.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
        } else {
          // Fallback to viewport
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
        // Reinitialize particles on resize
        initParticles();
      };
      
      const initParticles = () => {
        if (!canvas || !canvas.width || !canvas.height) {
          setTimeout(initParticles, 100);
          return;
        }
        
        particlesRef.current = Array.from({ length: count }, (_, i) => {
          const type = i % 3 === 0 ? "primary" : i % 3 === 1 ? "accent" : "neutral";
          const colors = colorPalette[type];
          const baseSize = type === "primary" ? 3.0 : type === "accent" ? 2.5 : 2.0;
          const speed = 0.15 + Math.random() * 0.25;
          const angle = Math.random() * Math.PI * 2;
          
          return {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: baseSize + Math.random() * 1.5,
            baseSize,
            opacity: 0.6 + Math.random() * 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            type,
            pulsePhase: Math.random() * Math.PI * 2,
            angle: angle,
            speed,
          };
        });
        
        console.log(`ParticleSystem: Initialized ${particlesRef.current.length} particles on canvas ${canvas.width}x${canvas.height}`);
      };

      resize();
      window.addEventListener("resize", resize);

      // Mouse tracking
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
        mouseRef.current.active = true;
      };

      const handleMouseLeave = () => {
        mouseRef.current.active = false;
      };

      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);

      const animate = () => {
        if (!ctx || !canvas || !canvas.width || !canvas.height) {
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        
        if (particlesRef.current.length === 0) {
          initParticles();
          animationFrameRef.current = requestAnimationFrame(animate);
          return;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update and draw particles
        particlesRef.current.forEach((particle, i) => {
          const angleVariation = particle.type === "primary" 
            ? 0.015 
            : particle.type === "accent" 
            ? 0.02 
            : 0.01;
          
          particle.angle += (Math.random() - 0.5) * angleVariation;
          
          const driftX = Math.sin(particle.pulsePhase * 0.5) * 0.1;
          const driftY = Math.cos(particle.pulsePhase * 0.3) * 0.1;
          
          particle.vx = Math.cos(particle.angle) * particle.speed + driftX;
          particle.vy = Math.sin(particle.angle) * particle.speed + driftY;
          
          particle.vx *= 0.98;
          particle.vy *= 0.98;

          // Mouse interaction
          if (mouseRef.current.active) {
            const dx = particle.x - mouseRef.current.x;
            const dy = particle.y - mouseRef.current.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
              const force = (120 - distance) / 120;
              const normalizedDx = dx / distance;
              const normalizedDy = dy / distance;
              
              particle.vx += normalizedDx * force * 0.3;
              particle.vy += normalizedDy * force * 0.3;
            }
          }

          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;

          // Pulse animation
          particle.pulsePhase += 0.015;
          const pulseSize = particle.baseSize + Math.sin(particle.pulsePhase) * 0.15;
          const currentSize = Math.max(0.5, pulseSize);

          // Draw particle with glow
          const glowRadius = currentSize * 3;
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius
          );
          
          const baseOpacity = particle.color.match(/[\d.]+(?=\)$)/)?.[0] || "0.8";
          gradient.addColorStop(0, particle.color);
          gradient.addColorStop(0.5, particle.color.replace(/[\d.]+\)$/g, `${parseFloat(baseOpacity) * 0.5})`));
          gradient.addColorStop(1, "transparent");

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, glowRadius, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          // Core particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, currentSize, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();
        });

        // Draw connections
        particlesRef.current.forEach((particle, i) => {
          particlesRef.current.slice(i + 1).forEach((other) => {
            const dx = particle.x - other.x;
            const dy = particle.y - other.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const maxDistance = 120;

            if (distance < maxDistance) {
              const opacity = (1 - distance / maxDistance) * 0.5;
              const gradient = ctx.createLinearGradient(
                particle.x,
                particle.y,
                other.x,
                other.y
              );

              if (particle.type === "primary" && other.type === "primary") {
                gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(34, 211, 153, ${opacity * 1.2})`);
                gradient.addColorStop(1, `rgba(16, 185, 129, ${opacity})`);
              } else if (particle.type === "accent" && other.type === "accent") {
                gradient.addColorStop(0, `rgba(139, 92, 246, ${opacity})`);
                gradient.addColorStop(0.5, `rgba(167, 139, 250, ${opacity * 1.2})`);
                gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity})`);
              } else if (particle.type === "primary" && other.type === "accent") {
                gradient.addColorStop(0, `rgba(16, 185, 129, ${opacity * 0.6})`);
                gradient.addColorStop(0.3, `rgba(52, 211, 153, ${opacity * 0.8})`);
                gradient.addColorStop(0.5, `rgba(139, 92, 246, ${opacity * 0.8})`);
                gradient.addColorStop(0.7, `rgba(167, 139, 250, ${opacity * 0.6})`);
                gradient.addColorStop(1, `rgba(139, 92, 246, ${opacity * 0.6})`);
              } else if (particle.type === "neutral" || other.type === "neutral") {
                gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity * 0.4})`);
                gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.4})`);
              } else {
                const color1 = particle.type === "primary" ? "16, 185, 129" : "139, 92, 246";
                const color2 = other.type === "primary" ? "16, 185, 129" : "139, 92, 246";
                gradient.addColorStop(0, `rgba(${color1}, ${opacity * 0.7})`);
                gradient.addColorStop(1, `rgba(${color2}, ${opacity * 0.7})`);
              }

              const lineWidth = 1.5 + (1 - distance / maxDistance) * 2.0;

              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.strokeStyle = gradient;
              ctx.lineWidth = lineWidth;
              ctx.stroke();
            }
          });
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      // Start animation
      const startAnimation = () => {
        if (particlesRef.current.length === 0) {
          initParticles();
        }
        if (particlesRef.current.length > 0) {
          animate();
        } else {
          setTimeout(startAnimation, 50);
        }
      };
      
      startAnimation();

      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    };
    
    // Start checking for canvas
    checkCanvas();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [count]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[2]"
      width={typeof window !== "undefined" ? window.innerWidth : 1920}
      height={typeof window !== "undefined" ? window.innerHeight : 1080}
      style={{ 
        mixBlendMode: "normal",
        opacity: 1,
        width: "100%",
        height: "100%"
      }}
    />
  );
}
