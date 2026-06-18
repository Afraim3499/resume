"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true); // Default to true to prevent flash
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check for touch device
    const checkTouchDevice = () => {
      return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      );
    };

    // Check for reduced motion preference
    const checkReducedMotion = () => {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    };

    setIsTouchDevice(checkTouchDevice()); // eslint-disable-line react-hooks/set-state-in-effect
    setPrefersReducedMotion(checkReducedMotion());
    setMounted(true);

    // Don't attach listeners if touch device or reduced motion
    if (checkTouchDevice() || checkReducedMotion()) {
      return;
    }

    const updateCursor = (e: MouseEvent) => {
      pointerRef.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);

      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = requestAnimationFrame(() => {
        const { x, y } = pointerRef.current;
        const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        if (cursorRef.current) cursorRef.current.style.transform = transform;
        if (ringRef.current) ringRef.current.style.transform = transform;
        if (dotRef.current) dotRef.current.style.transform = transform;
        frameRef.current = null;
      });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target;
      if (!target || !(target instanceof Element)) return;

      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        (target as Element).closest("a") ||
        (target as Element).closest("button") ||
        (target as Element).closest("[data-cursor-hover]")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOut = () => setIsVisible(false);

    // Use passive listeners for better scroll performance
    window.addEventListener("mousemove", updateCursor, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { capture: true, passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { capture: true, passive: true });
    document.addEventListener("mousedown", handleMouseDown, { passive: true });
    document.addEventListener("mouseup", handleMouseUp, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseout", handleMouseOut);
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Don't render on touch devices or if reduced motion is preferred
  if (!mounted || isTouchDevice || prefersReducedMotion) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div
          className={`w-6 h-6 rounded-full border-2 transition-[opacity,transform,border-color,background-color] duration-150 ${isHovering ? "border-primary bg-primary/20" : "border-foreground bg-transparent"
            }`}
          style={{
            transform: `scale(${isClicking ? 0.8 : isHovering ? 1.5 : 1})`,
            opacity: isVisible ? 1 : 0,
          }}
        />
      </div>

      {/* Outer Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] hidden md:block will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div
          className={`w-12 h-12 rounded-full border transition-[opacity,transform,border-color] duration-200 ${isHovering ? "border-primary/30" : "border-foreground/20"
            }`}
          style={{
            transform: `scale(${isClicking ? 0.9 : isHovering ? 1.2 : 1})`,
            opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
          }}
        />
      </div>

      {/* Trailing Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] hidden md:block will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
      >
        <div
          className="w-2 h-2 rounded-full bg-primary"
          style={{
            transform: `scale(${isHovering ? 1.5 : 1})`,
            opacity: isVisible ? (isHovering ? 0.8 : 0.4) : 0,
          }}
        />
      </div>
    </>
  );
}
