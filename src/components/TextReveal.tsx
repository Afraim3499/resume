"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface TextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  mode?: "word" | "character" | "line";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  duration = 0.5,
  mode = "word",
}: TextRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Convert children to string - handle React nodes
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (node === null || node === undefined) return "";
    if (Array.isArray(node)) {
      return node.map(extractText).join("");
    }
    if (typeof node === "object" && "props" in node) {
      // React element - extract children
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return extractText((node as any).props?.children ?? "");
    }
    return String(node);
  };

  const textContent = extractText(children);

  if (mode === "word") {
    const words = textContent.split(" ");
    return (
      <div ref={ref} className={className}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration,
              delay: delay + i * 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </div>
    );
  }

  if (mode === "character") {
    const characters = textContent.split("");
    return (
      <div ref={ref} className={className}>
        {characters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: duration * 0.1,
              delay: delay + i * 0.02,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    );
  }

  // Line mode
  const lines = textContent.split("\n");
  return (
    <div ref={ref} className={className}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration,
            delay: delay + i * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {line}
        </motion.div>
      ))}
    </div>
  );
}

