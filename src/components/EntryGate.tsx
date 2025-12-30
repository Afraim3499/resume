"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Compass3D } from "./3D/Compass3D";

interface EntryGateProps {
  onEnter: () => void;
}

export function EntryGate({ onEnter }: EntryGateProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    // Check if user has seen entry gate before
    const hasSeenGate = localStorage.getItem("hasSeenEntryGate");
    
    if (hasSeenGate === "true") {
      setIsVisible(false);
      onEnter();
      return;
    }

    // Allow skip after 2 seconds
    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, 2000);

    // Auto-enter after 4 seconds
    const autoEnterTimer = setTimeout(() => {
      handleEnter();
    }, 4000);

    return () => {
      clearTimeout(skipTimer);
      clearTimeout(autoEnterTimer);
    };
  }, [onEnter]);

  const handleEnter = () => {
    localStorage.setItem("hasSeenEntryGate", "true");
    setIsVisible(false);
    setTimeout(() => {
      onEnter();
    }, 500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-background flex items-center justify-center overflow-hidden"
        >
          {/* Animated Background */}
          <div className="absolute inset-0">
            {/* Gradient Orbs */}
            <motion.div
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                x: [0, -80, 0],
                y: [0, -60, 0],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[120px]"
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center px-4">
            {/* 3D Compass Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
              className="mb-12"
            >
              <Compass3D size={160} className="mx-auto" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight">
                Entering <span className="text-gradient">Strategic Mode</span>
              </h1>
              <p className="text-foreground/70 text-lg md:text-xl max-w-md mx-auto mb-8">
                Where strategy meets execution
              </p>
            </motion.div>

            {/* Enter Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <motion.button
                onClick={handleEnter}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-foreground text-background hover:bg-primary transition-colors overflow-hidden"
              >
                <span className="relative z-10 font-medium">Enter Portfolio</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="relative z-10"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
                
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.button>
            </motion.div>

            {/* Skip hint */}
            {canSkip && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handleEnter}
                className="mt-6 text-sm text-foreground/50 hover:text-foreground transition-colors"
              >
                Skip intro
              </motion.button>
            )}
          </div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

