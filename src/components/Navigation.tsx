"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Keyboard Event Handlers (Escape to close and Focus Trapping)
  useEffect(() => {
    if (!isMenuOpen) {
      triggerRef.current?.focus();
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
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
    const firstLink = menuRef.current?.querySelector("a") as HTMLElement;
    firstLink?.focus();

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-hairline bg-charcoal-base/60 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
          
          {/* Logo on Left */}
          <Link
            href="/"
            className="flex items-center gap-2 text-primary-text font-sans font-bold tracking-tight text-[1.1rem] hover:opacity-80 transition-opacity"
          >
            <svg
              viewBox="0 0 32 32"
              className="w-5 h-5 stroke-current fill-none"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 6v20" />
              <path d="M10 6h8a7 7 0 0 1 0 14h-8" />
              <path d="M14 13h4" />
            </svg>
            <span className="font-display tracking-normal">SAYAGA</span>
          </Link>

          {/* Links & actions */}
          <div className="flex items-center gap-8">
            {/* Desktop links */}
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8 text-[0.85rem] font-semibold tracking-wide">
                <li>
                  <Link
                    href="/approach"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    How We Work
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Case Studies
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scoping"
                    className="text-muted-text hover:text-primary-text transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Desktop CTA Button */}
            <Link
              href="/scoping"
              className="hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-full border border-primary-text text-[0.8rem] font-bold text-white bg-primary-text hover:bg-white hover:text-primary-text hover:border-primary-text/45 transition-all duration-300 shadow-sm"
            >
              Request a Strategy Audit
            </Link>

            {/* Menu Hamburger Trigger */}
            <button
              ref={triggerRef}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 border border-hairline rounded-full hover:border-primary-text text-primary-text transition-colors cursor-pointer"
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
            className="fixed inset-0 bg-white/95 backdrop-blur-xl z-[99] flex flex-col justify-between p-8 md:p-16 border-b border-hairline"
          >
            {/* Header controls inside menu overlay */}
            <div className="flex justify-between items-center w-full max-w-7xl mx-auto">
              <span className="text-micro font-mono text-muted-text tracking-widest font-semibold">[ Sayaga.Navigation ]</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="p-2.5 border border-hairline rounded-full hover:border-primary-text text-primary-text transition-colors cursor-pointer"
                aria-label="Close navigation takeover"
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
                  <line x1="18" x2="6" y1="6" y2="18" />
                  <line x1="6" x2="18" y1="6" y2="18" />
                </svg>
              </button>
            </div>

            {/* Central Navigation Links */}
            <nav className="w-full max-w-4xl mx-auto flex flex-col justify-center flex-1 my-8">
              <ul className="flex flex-col gap-6 text-[2rem] md:text-[3rem] font-bold leading-none tracking-tight">
                <li>
                  <Link
                    href="/approach"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-primary-text transition-colors block py-2"
                  >
                    01 <span className="text-primary-text ml-4 font-display">How We Work</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-primary-text transition-colors block py-2"
                  >
                    02 <span className="text-primary-text ml-4 font-display">Services</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/work"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-primary-text transition-colors block py-2"
                  >
                    03 <span className="text-primary-text ml-4 font-display">Case Studies</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-primary-text transition-colors block py-2"
                  >
                    04 <span className="text-primary-text ml-4 font-display">About</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/scoping"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-muted-text hover:text-primary-text transition-colors block py-2"
                  >
                    05 <span className="text-primary-text ml-4 font-display">Contact</span>
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Bottom details inside menu overlay */}
            <div className="w-full max-w-7xl mx-auto border-t border-hairline pt-6 flex flex-col md:flex-row justify-between text-micro text-muted-text font-mono gap-4">
              <span>SAYAGA STUDIOS INC &copy; {new Date().getFullYear()}</span>
              <span>CRAFTING DIGITAL LANDSCAPES</span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
