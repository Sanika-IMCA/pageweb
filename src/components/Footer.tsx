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
        const fallback = new Date().toLocaleTimeString();
        setTimeStr(`ET ${fallback}`);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer id="contact" className="bg-charcoal-base border-t border-hairline py-32 px-6 md:px-12 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-24">
        
        {/* Strong Final CTA Section inside Footer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <span className="text-caption text-primary-text font-mono tracking-widest opacity-60">
              07 / INITIATE
            </span>
            <h2 className="text-[2.75rem] sm:text-[4rem] lg:text-[5.5rem] font-bold tracking-tight text-primary-text leading-[1.05]">
              Let&apos;s build something <br />
              <span className="underline decoration-1 underline-offset-8 decoration-blue-200">category-defining.</span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:pt-12 flex justify-start lg:justify-end">
            <MagneticButton>
              <Link
                href="/scoping"
                className="inline-flex items-center justify-center text-[1rem] font-bold text-charcoal-base bg-primary-text hover:bg-transparent hover:text-primary-text hover:border-primary-text transition-all duration-300 py-5 px-10 border border-transparent rounded-full"
              >
                Start a Project &rarr;
              </Link>
            </MagneticButton>
          </div>
        </div>

        {/* Letterhead columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-t border-hairline pt-16 mt-8">
          
          {/* Inquiry */}
          <div className="flex flex-col gap-4">
            <span className="text-caption text-muted-text font-mono">Inquiries</span>
            <div className="text-body-base flex flex-col gap-2 items-start font-medium">
              <a href="mailto:hello@sayaga.studio" className="hover:text-muted-text transition-colors">
                hello@sayaga.studio
              </a>
              <a href="tel:+13025550190" className="hover:text-muted-text transition-colors">
                +1 (302) 555-0190
              </a>
            </div>
          </div>

          {/* Offices */}
          <div className="flex flex-col gap-4">
            <span className="text-caption text-muted-text font-mono">Offices</span>
            <div className="text-body-base text-primary-text leading-relaxed font-medium">
              <p>Sayaga Studios Inc.</p>
              <p>1209 Delaware Ave</p>
              <p>Wilmington, DE 19806</p>
            </div>
          </div>

          {/* HQ Local Time */}
          <div className="flex flex-col gap-4">
            <span className="text-caption text-muted-text font-mono">HQ Time</span>
            <div className="text-[1.1rem] text-primary-text font-bold font-mono" aria-live="off">
              {timeStr}
            </div>
          </div>

          {/* Social Network */}
          <div className="flex flex-col gap-4">
            <span className="text-caption text-muted-text font-mono">Network</span>
            <div className="text-body-base flex flex-col gap-2 items-start font-medium">
              <a href="https://github.com/sayaga-studios" target="_blank" rel="noopener noreferrer" className="hover:text-muted-text transition-colors">
                GitHub
              </a>
              <a href="https://linkedin.com/company/sayaga-studios" target="_blank" rel="noopener noreferrer" className="hover:text-muted-text transition-colors">
                LinkedIn
              </a>
              <a href="https://twitter.com/sayaga_studios" target="_blank" rel="noopener noreferrer" className="hover:text-muted-text transition-colors">
                Twitter / X
              </a>
            </div>
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-micro text-muted-text pt-8 border-t border-hairline/30 gap-4 mt-8 font-mono">
          <span>&copy; {new Date().getFullYear()} SAYAGA STUDIOS INC. ALL RIGHTS RESERVED.</span>
          <span>BUILT FOR DIGITAL CRAFTSMANSHIP.</span>
        </div>

      </div>
    </footer>
  );
}
