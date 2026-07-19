"use client";

import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Preloader() {
  const [statusText, setStatusText] = useState("DISCOVER");
  const [lineWidth, setLineWidth] = useState("0%");
  const [nodes, setNodes] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSkipped, setIsSkipped] = useState(false);

  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Function to skip loader instantly
  const skipLoader = () => {
    if (isSkipped) return;
    setIsSkipped(true);
    
    // Clear all scheduled timeouts
    timeoutsRef.current.forEach((t) => clearTimeout(t));
    
    // Set final states
    setIsLocked(true);
    setStatusText("SAYAGA STUDIOS");
    setLineWidth("100%");
    setNodes([15, 25, 35, 40]);
    
    // Close overlay
    setIsVisible(false);
    sessionStorage.setItem("sayaga-preloaded", "true");
  };

  useEffect(() => {
    const hasPreloaded = sessionStorage.getItem("sayaga-preloaded");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (hasPreloaded || prefersReducedMotion) {
      // Returning visitor or reduced motion: trigger 400ms fade-out
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 400);
      timeoutsRef.current.push(timeout);
      return () => clearTimeout(timeout);
    }

    // Add skip triggers on window keydown and overlay clicks
    const handleKeyDown = () => skipLoader();
    window.addEventListener("keydown", handleKeyDown);

    // Sequence timelines
    // 0.0s - 0.6s: Line expands to 40%
    setLineWidth("40%");

    // 0.6s: Node 1 (15%) pops, status cycles to MAP
    timeoutsRef.current.push(
      setTimeout(() => {
        setNodes((prev) => [...prev, 15]);
        setStatusText("MAP");
      }, 600)
    );

    // 0.8s: Node 2 (25%) pops, status cycles to BUILD
    timeoutsRef.current.push(
      setTimeout(() => {
        setNodes((prev) => [...prev, 25]);
        setStatusText("BUILD");
      }, 800)
    );

    // 1.0s: Node 3 (35%) pops, status cycles to DEPLOY
    timeoutsRef.current.push(
      setTimeout(() => {
        setNodes((prev) => [...prev, 35]);
        setStatusText("DEPLOY");
      }, 1000)
    );

    // 1.2s: Node 4 (40%) pops, line expands to 100%, lock starts
    timeoutsRef.current.push(
      setTimeout(() => {
        setNodes((prev) => [...prev, 40]);
        setLineWidth("100%");
        setStatusText(""); // Soft transition to final label
      }, 1200)
    );

    // 1.35s: Display final logo "SAYAGA STUDIOS" in locked styling
    timeoutsRef.current.push(
      setTimeout(() => {
        setStatusText("SAYAGA STUDIOS");
        setIsLocked(true);
      }, 1350)
    );

    // 1.8s: Fade out preloader overlay
    timeoutsRef.current.push(
      setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("sayaga-preloaded", "true");
      }, 1800)
    );

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      timeoutsRef.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
          onClick={skipLoader}
          className="fixed inset-0 z-[9999] bg-charcoal-base flex flex-col justify-center items-center cursor-pointer select-none"
        >
          <div className="w-[320px] flex flex-col items-center gap-space-sm relative">
            {/* Status read-out / Logo */}
            <motion.div
              key={statusText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`h-[24px] text-center tracking-[0.15em] transition-all duration-300 ${
                isLocked
                  ? "font-display text-[1.4rem] text-brass-accent font-semibold tracking-wide"
                  : "font-mono text-[0.65rem] text-brass-accent uppercase"
              }`}
            >
              {statusText || "\u00A0"}
            </motion.div>

            {/* Hairline progress layout */}
            <div className="w-full h-[1px] bg-hairline relative">
              {/* Animated brass hairline */}
              <motion.div
                animate={{ width: lineWidth }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute top-0 left-1/2 -translate-x-1/2 h-[1px] bg-brass-accent"
              />

              {/* Node points container */}
              <div className="absolute inset-0">
                {nodes.map((nodeVal) => (
                  <motion.div
                    key={nodeVal}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ left: `${nodeVal}%` }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brass-accent rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
