"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-transparent border-t border-hairline py-28 px-6 md:px-12 relative z-10 select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">

        {/* Footer Top Conversion Callout */}
        <div className="border-b border-hairline/50 pb-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 w-full">
          <div className="flex flex-col gap-1.5 max-w-xl">
            <span className="text-[0.65rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
              10 / INITIATE
            </span>
            <h4 className="text-[1.85rem] sm:text-[2.25rem] font-bold text-primary-text font-display leading-tight uppercase tracking-tight">
              HAVE AN OPERATIONAL PROBLEM<br />
              WORTH SOLVING?
            </h4>
          </div>

          <Link
            href="/scoping?type=audit"
            className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-4 px-8 rounded-xl shadow transform active:scale-98 font-mono uppercase tracking-wider whitespace-nowrap"
          >
            START WITH THE AUDIT →
          </Link>
        </div>

        {/* Engineering Letterhead Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start pt-4">
          
          {/* Column 1: Brand details (5 cols) */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary-text font-bold text-[1.05rem]">
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
              <span className="font-display uppercase tracking-tight">SAYAGAA</span>
            </div>
            
            <p className="text-[0.9rem] font-bold text-primary-text font-display uppercase tracking-tight max-w-sm">
              SYSTEMS ENGINEERING FOR OPERATIONS-HEAVY BUSINESSES.
            </p>
            <p className="text-[0.78rem] text-muted-text/85 font-semibold leading-relaxed max-w-sm italic">
              &ldquo;We would rather build the right system than build more software.&rdquo;
            </p>
            
            <div className="text-[0.7rem] font-mono text-muted-text/60 uppercase tracking-widest flex flex-wrap gap-x-3 gap-y-1">
              <span>Research.</span>
              <span>&middot;</span>
              <span>Architecture.</span>
              <span>&middot;</span>
              <span>Build.</span>
              <span>&middot;</span>
              <span>Optimization.</span>
            </div>
          </div>

          {/* Column 2: Navigation Links (3 cols) */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <span className="text-[0.62rem] font-mono text-brass-accent uppercase tracking-widest font-bold">
              INDEX
            </span>
            <ul className="flex flex-col gap-2.5 text-[0.82rem] font-bold font-mono text-muted-text">
              <li>
                <Link href="/work" className="hover:text-primary-text transition-colors">
                  WORK
                </Link>
              </li>
              <li>
                <Link href="/approach" className="hover:text-primary-text transition-colors">
                  METHOD
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-text transition-colors">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/scoping?type=audit" className="hover:text-primary-text transition-colors text-brass-accent">
                  START AN AUDIT
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Timezone Info (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[0.62rem] font-mono text-brass-accent uppercase tracking-widest font-bold">
              INQUIRIES & REGION
            </span>
            <div className="flex flex-col gap-2.5 text-[0.82rem] font-mono font-bold text-muted-text">
              <a href="mailto:workwithsayagaa@gmail.com" className="hover:text-primary-text transition-colors break-words">
                workwithsayagaa@gmail.com
              </a>
              <span className="block text-[0.72rem] text-muted-text/50 uppercase">
                REMOTE-FIRST / WORKING GLOBALLY
              </span>
            </div>
          </div>

          {/* Column 4: Networks (2 cols) */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <span className="text-[0.62rem] font-mono text-brass-accent uppercase tracking-widest font-bold">
              NETWORKS
            </span>
            <div className="flex flex-col gap-2.5 text-[0.82rem] font-mono font-bold text-muted-text">
              <a href="https://github.com/sayaga-studios" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-colors">
                GITHUB
              </a>
              <a href="https://linkedin.com/company/sayaga-studios" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-colors">
                LINKEDIN
              </a>
              <a href="https://twitter.com/sayaga_studios" target="_blank" rel="noopener noreferrer" className="hover:text-primary-text transition-colors">
                TWITTER / X
              </a>
            </div>
          </div>

        </div>

        {/* Global Client Footprint strip */}
        <div className="border-t border-hairline/45 pt-8 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-micro font-mono">
          <span className="text-brass-accent uppercase tracking-wider font-bold">
            WORKING WITH OPERATORS ACROSS
          </span>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-muted-text font-bold uppercase tracking-wider">
            <span>US</span>
            <span className="text-muted-text/30">/</span>
            <span>UK</span>
            <span className="text-muted-text/30">/</span>
            <span>EU</span>
            <span className="text-muted-text/30">/</span>
            <span>UAE</span>
            <span className="text-muted-text/30">/</span>
            <span>SINGAPORE</span>
            <span className="text-muted-text/30">/</span>
            <span>CANADA</span>
            <span className="text-muted-text/30">/</span>
            <span>AUSTRALIA</span>
          </div>
        </div>

        {/* Bottom Legal & Copyright columns */}
        <div className="border-t border-hairline/35 pt-8 flex flex-col sm:flex-row justify-between items-center text-micro text-muted-text/60 font-mono gap-4">
          <div className="flex items-center gap-6">
            <span>&copy; 2026 SAYAGAA. ALL RIGHTS RESERVED.</span>
            
            {/* Soft desaturated placeholder legal links */}
            <div className="flex items-center gap-3 border-l border-hairline/35 pl-6">
              <span className="cursor-not-allowed hover:text-muted-text/80 transition-colors">PRIVACY</span>
              <span>/</span>
              <span className="cursor-not-allowed hover:text-muted-text/80 transition-colors">TERMS</span>
            </div>
          </div>
          
          <span className="text-[0.62rem] uppercase tracking-widest text-brass-accent font-bold">
            BUILT FOR DIGITAL CRAFTSMANSHIP.
          </span>
        </div>

      </div>
    </footer>
  );
}
