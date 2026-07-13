"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";

interface SpineItem {
  id: string;
  label: string;
}

const spineItems: SpineItem[] = [
  { id: "hero", label: "01" },
  { id: "philosophy", label: "02" },
  { id: "process", label: "03" },
  { id: "capabilities", label: "04" },
  { id: "case-studies", label: "05" },
  { id: "industries", label: "06" },
  { id: "difference", label: "07" },
  { id: "partners", label: "08" },
  { id: "trust", label: "09" },
  { id: "footer", label: "10" },
];

export default function PageSpine() {
  const [activeSection, setActiveSection] = useState("hero");
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;

      for (const item of spineItems) {
        const el = document.getElementById(item.id);
        if (!el) continue;

        const top = el.offsetTop;
        const height = el.offsetHeight;

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial execution

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Top Progress Bar */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-brass-accent origin-left z-50 lg:hidden"
      />

      {/* Desktop Left-Spine Indicator Column */}
      <div className="fixed left-0 top-0 bottom-0 w-24 hidden lg:flex flex-col items-center justify-center border-r border-hairline/45 z-40 bg-charcoal-base pointer-events-none">
        <div className="flex flex-col gap-8 items-center">
          {spineItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="pointer-events-auto flex flex-col items-center gap-1 group cursor-pointer"
              >
                {/* Numeral label */}
                <span
                  className={`text-micro font-mono tracking-widest transition-all duration-300 ${
                    isActive
                      ? "text-brass-accent scale-110 font-semibold"
                      : "text-muted-text/60 group-hover:text-primary-text"
                  }`}
                >
                  {item.label}
                </span>

                {/* Connecting hairline tick indicator */}
                <div
                  className={`w-[1px] transition-all duration-300 ${
                    isActive
                      ? "h-8 bg-brass-accent"
                      : "h-4 bg-hairline group-hover:bg-muted-text/30"
                  }`}
                />
              </a>
            );
          })}
        </div>
      </div>
    </>
  );
}
