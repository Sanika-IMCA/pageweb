"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  // Keyboard Event Handlers (Escape to close and Focus Trapping)
  useEffect(() => {
    if (!isMenuOpen) {
      // Restore focus to menu button when closed
      triggerRef.current?.focus();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape closes menu
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        return;
      }

      // Tab Trapping
      if (e.key === "Tab") {
        if (!menuRef.current) return;
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab: Wrap from first to last
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          // Tab: Wrap from last to first
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Auto focus first link inside menu when opened
    const firstLink = menuRef.current?.querySelector("a") as HTMLElement;
    firstLink?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline bg-charcoal-base/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Wordmark logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-text font-sans font-semibold tracking-wide text-[0.95rem] hover:text-brass-accent transition-colors"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-5.5 h-5.5 stroke-current fill-none"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 6v20" />
              <path d="M10 6h8a7 7 0 0 1 0 14h-8" />
              <path d="M14 13h4" />
            </svg>
            <span>SAYAGA STUDIOS</span>
          </Link>

          {/* Links & actions */}
          <div className="flex items-center gap-space-md">
            {/* Desktop links - hidden below 1024px */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-space-sm text-caption">
                <li>
                  <Link
                    href="/work"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/log"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Build Log
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scoping"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Get Scoped
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Theme Toggler */}
            <button
              onClick={toggleTheme}
              className="p-2 border border-hairline rounded hover:border-brass-accent text-primary-text transition-colors cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                // Sun
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                // Moon
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Menu Trigger Trigger (Aria linked) */}
            <button
              ref={triggerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-hairline rounded hover:border-brass-accent text-primary-text transition-colors cursor-pointer"
              aria-expanded={isMenuOpen}
              aria-label="Toggle navigation takeover"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen Takeover Overlay Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            ref={menuRef}
            aria-hidden={!isMenuOpen}
            className="fixed inset-0 bg-charcoal-base/95 backdrop-blur-lg z-[99] flex flex-col justify-between p-6 md:p-12"
          >
            {/* Header controls inside menu overlay */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
              <span className="text-micro font-mono text-brass-accent tracking-widest">[ Sayaga.Takeover_Active ]</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2 border border-hairline rounded hover:border-brass-accent text-primary-text transition-colors cursor-pointer"
                aria-label="Close navigation takeover"
              >
                {/* Close X */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Central Navigation Links */}
            <nav className="w-full max-w-4xl mx-auto flex flex-col justify-center flex-1 my-space-lg">
              <ul className="flex flex-col gap-space-sm text-[2.5rem] md:text-[3.75rem] font-display leading-tight tracking-tight">
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-brass-accent transition-colors block py-1"
                  >
                    01 <span className="text-primary-text hover:text-brass-accent transition-colors ml-4">Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-brass-accent transition-colors block py-1"
                  >
                    02 <span className="text-primary-text hover:text-brass-accent transition-colors ml-4">Selected Work</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-brass-accent transition-colors block py-1"
                  >
                    03 <span className="text-primary-text hover:text-brass-accent transition-colors ml-4">Corporate Identity</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/log"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-brass-accent transition-colors block py-1"
                  >
                    04 <span className="text-primary-text hover:text-brass-accent transition-colors ml-4">Systems Build Log</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scoping"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-brass-accent transition-colors block py-1"
                  >
                    05 <span className="text-primary-text hover:text-brass-accent transition-colors ml-4">Scoping Form</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Bottom details inside menu overlay */}
            <div className="w-full max-w-7xl mx-auto border-t border-hairline/30 pt-6 flex flex-col md:flex-row justify-between text-micro text-muted-text font-mono gap-4">
              <span>SAYAGA STUDIOS INC &copy; {new Date().getFullYear()}</span>
              <span>OPERATIONAL SYSTEM COMPILING</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
