"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

interface RevealSquircleProps {
  children: React.ReactNode;
  delay?: number; // Delay in seconds
  className?: string;
}

export default function RevealSquircle({ children, delay = 0, className = "" }: RevealSquircleProps) {
  const shouldReduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Standard spring/morph transition variants
  const morphVariants = {
    hidden: {
      scale: 0.25,
      borderRadius: "50%",
      opacity: 0,
    },
    visible: {
      scale: 1,
      borderRadius: "4px",
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1] as const, // cubic-bezier(0.22, 1, 0.36, 1) matching §7b
        delay: delay,
      },
    },
  };

  // Safe fallback variant for reduced motion settings
  const fadeVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const,
        delay: delay,
      },
    },
  };

  // Don't render until mounted to prevent SSR hydration mismatch on client queries
  if (!hasMounted) {
    return <div className={`opacity-0 ${className}`}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={shouldReduceMotion ? fadeVariants : morphVariants}
      className={`overflow-hidden origin-center ${className}`}
    >
      {children}
    </motion.div>
  );
}
