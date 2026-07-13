"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

export default function RouteTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const prevPathname = useRef(pathname);
  
  // Stored state rendering children currently shown on screen
  const [displayChildren, setDisplayChildren] = useState<React.ReactNode>(children);
  const overlayRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (prevPathname.current === pathname) {
      // Sync children initially or when path is same
      setDisplayChildren(children);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      setDisplayChildren(children);
      prevPathname.current = pathname;
      return;
    }

    if (shouldReduceMotion) {
      // Fast cross-fade for users with reduced motion preferences
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.2,
        onComplete: () => {
          setDisplayChildren(children);
          prevPathname.current = pathname;
          gsap.to(overlay, { opacity: 0, duration: 0.2 });
        },
      });
      return;
    }

    // GSAP Timeline to wipe exit, swap components under cover, and wipe enter
    const tl = gsap.timeline({
      onComplete: () => {
        prevPathname.current = pathname;
      },
    });

    // Wipe down overlay to fully cover the screen
    tl.to(overlay, {
      y: "0%",
      duration: 0.4,
      ease: "power3.inOut",
    });

    // Swap content under cover
    tl.add(() => {
      setDisplayChildren(children);
      window.scrollTo(0, 0); // Scroll new page back to top
    });

    // Wipe away overlay down to bottom
    tl.to(overlay, {
      y: "100%",
      duration: 0.4,
      ease: "power3.inOut",
    });

    // Instantly reset overlay back to top for next trigger
    tl.set(overlay, { y: "-100%" });

  }, [pathname, children, shouldReduceMotion]);

  return (
    <>
      {displayChildren}
      
      {/* Route wipe overlay panel */}
      <div
        ref={overlayRef}
        style={{ transform: shouldReduceMotion ? "none" : "translateY(-100%)", opacity: shouldReduceMotion ? 0 : 1 }}
        className="fixed top-0 left-0 w-full h-full bg-charcoal-base z-[9999] pointer-events-none border-b border-brass-accent"
      />
    </>
  );
}
