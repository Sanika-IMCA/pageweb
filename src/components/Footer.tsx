"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  const [timeStr, setTimeStr] = useState("ET 12:00:00 AM");

  useEffect(() => {
    const updateTime = () => {
      try {
        const date = new Date();
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        const formatted = formatter.format(date);
        setTimeStr(`ET ${formatted}`);
      } catch (err) {
        // Fallback if timezone not supported
        const fallback = new Date().toLocaleTimeString();
        setTimeStr(`ET ${fallback}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="footer" className="bg-charcoal-base border-t border-hairline py-space-xl px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        
        {/* Closing Editorial Headline */}
        <div className="flex flex-col gap-space-md max-w-3xl">
          <span className="text-caption text-brass-accent">Let's Connect</span>
          <h2 className="text-display-l">
            Let's build the system that <span className="font-semibold italic text-brass-accent">runs your business</span> &mdash; before your competitors do.
          </h2>
        </div>

        {/* signature 3D render placeholder */}
        <div className="w-full aspect-[21/9] bg-secondary-surface border border-hairline rounded relative overflow-hidden">
          <Image
            src="/assets/wave-bg.png"
            alt="Sleek layered waves graphic representing corporate business systems coming online."
            fill
            sizes="100vw"
            className="object-cover opacity-50 hover:opacity-75 transition-opacity duration-700 ease-out"
          />
        </div>

        {/* Letterhead-style column layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg border-t border-hairline pt-space-lg">
          <div className="flex flex-col gap-space-xs">
            <span className="text-caption text-muted-text">Inquiries</span>
            <div className="text-body-base flex flex-col gap-1 items-start">
              <MagneticButton>
                <a href="mailto:hello@page.studio" className="hover:text-brass-accent transition-colors block py-1">
                  hello@page.studio
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="tel:+13025550190" className="hover:text-brass-accent transition-colors block py-1">
                  +1 (302) 555-0190
                </a>
              </MagneticButton>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="text-caption text-muted-text">Offices</span>
            <div className="text-body-base text-primary-text leading-relaxed">
              <p>Page Studios Inc.</p>
              <p>1209 Delaware Ave</p>
              <p>Wilmington, DE 19806</p>
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="text-caption text-muted-text">HQ Time</span>
            <div className="text-micro text-primary-text font-medium" aria-live="off">
              {timeStr}
            </div>
          </div>

          <div className="flex flex-col gap-space-xs">
            <span className="text-caption text-muted-text">Network</span>
            <div className="text-body-base flex flex-col gap-1 items-start">
              <MagneticButton>
                <a href="https://github.com/page-studios" target="_blank" rel="noopener noreferrer" className="hover:text-brass-accent transition-colors block py-1">
                  GitHub
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://linkedin.com/company/page-studios" target="_blank" rel="noopener noreferrer" className="hover:text-brass-accent transition-colors block py-1">
                  LinkedIn
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href="https://twitter.com/page_studios" target="_blank" rel="noopener noreferrer" className="hover:text-brass-accent transition-colors block py-1">
                  Twitter / X
                </a>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Plain-spoken dry closing paragraph */}
        <div className="border-t border-hairline pt-space-md mt-space-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-space-md">
          <p className="text-body-base text-muted-text max-w-xl">
            Page Studios is shaped by systems engineers who care deeply about operational systems and the rigor behind them. We operate in real time.
          </p>
          <div className="flex flex-wrap gap-x-space-md gap-y-2 text-caption text-muted-text">
            <Link href="/work" className="hover:text-primary-text transition-colors">Selected Work</Link>
            <Link href="/about" className="hover:text-primary-text transition-colors">About Page</Link>
            <Link href="/approach" className="hover:text-primary-text transition-colors">Our Process</Link>
            <Link href="/log" className="hover:text-primary-text transition-colors">Build Log</Link>
          </div>
        </div>

        {/* Small copyright at bottom */}
        <div className="flex flex-col sm:flex-row justify-between text-micro text-muted-text pt-space-xs border-t border-hairline/40">
          <span>&copy; {new Date().getFullYear()} PAGE STUDIOS INC. ALL RIGHTS RESERVED.</span>
          <span>BUILT WITH OPERATIONAL RIGOR.</span>
        </div>

      </div>
    </footer>
  );
}
