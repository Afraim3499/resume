// Unified animation system for premium experience
import { Variants } from "framer-motion";

// Custom easing for premium feel
export const premiumEasing = [0.22, 1, 0.36, 1] as const;

// Fade up animation
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6, 
      ease: premiumEasing 
    }
  }
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5, 
      ease: premiumEasing 
    }
  }
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      ease: premiumEasing 
    }
  }
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: premiumEasing 
    }
  }
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 50 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.6, 
      ease: premiumEasing 
    }
  }
};

// Stagger container for children
export const staggerContainer: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Stagger container (faster)
export const staggerContainerFast: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

// Hover scale animation
export const hoverScale = {
  scale: 1.02,
  transition: { 
    duration: 0.3, 
    ease: premiumEasing 
  }
};

// Hover lift animation
export const hoverLift = {
  y: -8,
  transition: { 
    duration: 0.3, 
    ease: premiumEasing 
  }
};

// Rotate animation (for icons)
export const rotate = {
  rotate: 360,
  transition: { 
    duration: 20, 
    repeat: Infinity, 
    ease: "linear" 
  }
};

// Pulse animation
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Text reveal animation (word by word)
export const textReveal: Variants = {
  hidden: { 
    opacity: 0 
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

// Character reveal
export const characterReveal: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0 
  }
};

