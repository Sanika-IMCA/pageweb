"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Monitor scroll offsets to toggle solid backing styles
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation & Focus Trapping inside mobile menu
  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === "Tab") {
        if (!menuRef.current) return;
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex="0"]'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            last.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === last) {
            first.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  // Utility to determine if a menu path is currently active
  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? "border-b border-hairline bg-charcoal-base/90 backdrop-blur-md py-4" 
            : "border-b border-transparent bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo on Left (Returns to Homepage) */}
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-text font-sans font-bold tracking-tight text-[1.05rem] hover:opacity-85 transition-opacity"
            aria-label="Sayagaa Home"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 stroke-current fill-none text-brass-accent"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 4 C21.5 11, 24 16, 24 20 A 8 8 0 0 1 8 20 C 8 16, 10.5 11, 16 4 Z" />
              <circle cx="16" cy="20" r="3.5" />
            </svg>
            <span className="font-display tracking-tight uppercase">SAYAGAA</span>
          </Link>

          {/* Right Navigation & Trigger Controls */}
          <div className="flex items-center gap-8">
            
            {/* Desktop Navigation Link Checklist */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-[0.82rem] font-bold tracking-wider font-mono">
                <li>
                  <Link
                    href="/work"
                    className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:transition-transform after:duration-300 ${
                      isActive("/work") 
                        ? "text-brass-accent after:scale-x-100" 
                        : "text-muted-text hover:text-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left"
                    }`}
                  >
                    WORK
                  </Link>
                </li>
                <li>
                  <Link
                    href="/approach"
                    className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:transition-transform after:duration-300 ${
                      isActive("/approach") 
                        ? "text-brass-accent after:scale-x-100" 
                        : "text-muted-text hover:text-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left"
                    }`}
                  >
                    METHOD
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className={`transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:transition-transform after:duration-300 ${
                      isActive("/about") 
                        ? "text-brass-accent after:scale-x-100" 
                        : "text-muted-text hover:text-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left"
                    }`}
                  >
                    ABOUT
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Desktop Strategy Audit Primary CTA */}
            <Link
              href="/scoping?type=audit"
              className="hidden md:inline-flex items-center justify-center px-5.5 py-2 rounded-xl border border-primary-text text-[0.78rem] font-bold text-white bg-primary-text hover:bg-brass-accent hover:border-brass-accent transition-all duration-300 shadow-sm active:scale-98 font-mono uppercase tracking-wider"
            >
              START A STRATEGY AUDIT →
            </Link>

            {/* Mobile Takeover Hamburger Menu Button */}
            <button
              ref={triggerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 border border-hairline rounded-lg hover:border-brass-accent text-primary-text transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-brass-accent/30"
              aria-expanded={isMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              <span className="text-[0.72rem] font-mono font-bold tracking-wider mr-1 select-none">
                {isMenuOpen ? "CLOSE" : "MENU"}
              </span>
            </button>
            
          </div>
        </div>

        {/* Mobile Dropdown Panel Container (Under header bar) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute top-full left-0 right-0 bg-charcoal-base/95 backdrop-blur-md border-b border-hairline py-8 px-6 flex flex-col gap-6 md:hidden shadow-lg select-none"
            >
              <nav className="flex flex-col gap-4 font-mono font-bold text-[1.1rem]">
                <Link
                  href="/work"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 border-b border-hairline/35 flex justify-between items-center ${
                    isActive("/work") ? "text-brass-accent" : "text-primary-text"
                  }`}
                >
                  <span>WORK</span>
                  <span className="text-micro opacity-40">01</span>
                </Link>

                <Link
                  href="/approach"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 border-b border-hairline/35 flex justify-between items-center ${
                    isActive("/approach") ? "text-brass-accent" : "text-primary-text"
                  }`}
                >
                  <span>METHOD</span>
                  <span className="text-micro opacity-40">02</span>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className={`py-2 border-b border-hairline/35 flex justify-between items-center ${
                    isActive("/about") ? "text-brass-accent" : "text-primary-text"
                  }`}
                >
                  <span>ABOUT</span>
                  <span className="text-micro opacity-40">03</span>
                </Link>

                <Link
                  href="/scoping?type=audit"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center text-[0.85rem] font-bold text-white bg-primary-text hover:bg-brass-accent py-3.5 px-6 rounded-xl transition-all duration-300 w-full mt-4 font-mono uppercase tracking-wider text-center"
                >
                  START A STRATEGY AUDIT →
                </Link>
              </nav>

              <div className="text-[0.62rem] font-mono text-muted-text/40 tracking-wider text-center mt-2">
                SAYAGAA &middot; REMOTE-FIRST &middot; WORKING GLOBALLY
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </header>
    </>
  );
}
