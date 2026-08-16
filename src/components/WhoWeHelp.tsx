"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function WhoWeHelp() {
  const clientFits = [
    {
      num: "01",
      title: "FOUNDERS & OPERATORS",
      desc: "Drowning in manual work.",
    },
    {
      num: "02",
      title: "DISCONNECTED OPERATIONS",
      desc: "Spreadsheets, email, WhatsApp and disconnected tools running core operations.",
    },
    {
      num: "03",
      title: "GROWTH FRICTION",
      desc: "Operational complexity is beginning to slow growth.",
    },
    {
      num: "04",
      title: "UNKNOWN SYSTEM PROBLEM",
      desc: "The business knows something is broken but doesn't know what should actually be built.",
    },
    {
      num: "05",
      title: "READY TO IMPROVE",
      desc: "Teams willing to change workflows rather than blindly automate broken processes.",
    },
  ];

  const notFits = [
    "You already decided exactly what to build and only want someone to code it.",
    "You want a cheap feature built without understanding the underlying workflow.",
    "You're unwilling to share how your current operations actually work.",
    "You expect software to fix a broken process without changing the process itself.",
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent relative overflow-hidden">
      
      {/* Decorative vertical blueprint lines for technical editorial layout */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-hairline/35 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pl-4 md:pl-8">
        
        {/* Main Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-micro font-mono tracking-widest text-brass-accent font-bold uppercase">
                01 / WHO WE WORK WITH
              </span>
              <h2 className="text-[2.25rem] md:text-[3.25rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
                WHEN THE BUSINESS<br />
                OUTGROWS ITS SYSTEMS.
              </h2>
            </div>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-lg">
              We work best with businesses where operations have become more complicated than the systems running them.
            </p>
          </div>

          {/* Right Column: Diagnostic Visual Flow diagram */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end items-center w-full">
            <div className="w-full max-w-[500px] border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-6 shadow-sm backdrop-blur-[2px] relative overflow-hidden">
              {/* Technical background labels */}
              <div className="absolute top-4 left-6 text-[0.55rem] font-mono text-muted-text/30 uppercase">
                Systems Diagnostics // Process Model
              </div>
              
              <div className="w-full flex justify-center py-4">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 420 460"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="max-w-[420px]"
                >
                  <style>
                    {`
                      @keyframes dash {
                        to {
                          stroke-dashoffset: -20;
                        }
                      }
                      @keyframes pulseNode {
                        0%, 100% {
                          stroke-opacity: 0.3;
                          fill-opacity: 0.05;
                        }
                        50% {
                          stroke-opacity: 0.7;
                          fill-opacity: 0.12;
                        }
                      }
                      .flow-line {
                        stroke-dasharray: 4 4;
                        animation: dash 1s linear infinite;
                      }
                      .pulse-box {
                        animation: pulseNode 3s ease-in-out infinite;
                      }
                    `}
                  </style>

                  {/* Level 1 Nodes: Disconnected Inputs */}
                  <g transform="translate(0, 0)">
                    <rect x="25" y="30" width="80" height="30" rx="4" fill="#2e5b94" fillOpacity="0.05" stroke="#2e5b94" strokeWidth="0.75" />
                    <text x="65" y="48" fill="#0f172a" fontSize="8.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">EMAIL</text>

                    <rect x="145" y="30" width="80" height="30" rx="4" fill="#2e5b94" fillOpacity="0.05" stroke="#2e5b94" strokeWidth="0.75" />
                    <text x="185" y="48" fill="#0f172a" fontSize="8.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">WHATSAPP</text>

                    <rect x="265" y="30" width="95" height="30" rx="4" fill="#2e5b94" fillOpacity="0.05" stroke="#2e5b94" strokeWidth="0.75" />
                    <text x="312.5" y="48" fill="#0f172a" fontSize="8.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">SPREADSHEETS</text>
                  </g>

                  {/* Flow Lines to Manual Handoffs */}
                  <line x1="65" y1="60" x2="185" y2="120" stroke="#2e5b94" strokeWidth="0.75" strokeOpacity="0.3" className="flow-line" />
                  <line x1="185" y1="60" x2="185" y2="120" stroke="#2e5b94" strokeWidth="0.75" strokeOpacity="0.3" className="flow-line" />
                  <line x1="312.5" y1="60" x2="185" y2="120" stroke="#2e5b94" strokeWidth="0.75" strokeOpacity="0.3" className="flow-line" />

                  {/* Level 2 Node: Manual Handoffs */}
                  <g transform="translate(0, 0)">
                    <rect x="110" y="120" width="150" height="34" rx="6" fill="#2e5b94" fillOpacity="0.05" stroke="#2e5b94" strokeWidth="1" className="pulse-box" />
                    <text x="185" y="141" fill="#0f172a" fontSize="9" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.02em">MANUAL HANDOFFS</text>
                  </g>

                  {/* Flow Line to Operational Friction */}
                  <line x1="185" y1="154" x2="185" y2="210" stroke="#e59393" strokeWidth="0.75" strokeOpacity="0.4" className="flow-line" />

                  {/* Level 3 Node: Operational Friction */}
                  <g transform="translate(0, 0)">
                    <rect x="100" y="210" width="170" height="36" rx="6" fill="#f9dede" fillOpacity="0.15" stroke="#e59393" strokeWidth="1.25" strokeDasharray="3 3" />
                    <text x="185" y="232" fill="#e59393" fontSize="9" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">OPERATIONAL FRICTION</text>
                  </g>

                  {/* Flow Line to Sayagaa Audit */}
                  <line x1="185" y1="246" x2="185" y2="300" stroke="#2e5b94" strokeWidth="1" strokeOpacity="0.5" className="flow-line" />

                  {/* Level 4 Node: Sayagaa Audit */}
                  <g transform="translate(0, 0)">
                    <rect x="110" y="300" width="150" height="34" rx="6" fill="#2e5b94" fillOpacity="0.1" stroke="#2e5b94" strokeWidth="1.5" />
                    <text x="185" y="321" fill="#2e5b94" fontSize="9.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">SAYAGAA AUDIT</text>
                  </g>

                  {/* Flow Line to System Blueprint */}
                  <line x1="185" y1="334" x2="185" y2="390" stroke="#2e5b94" strokeWidth="1.25" strokeOpacity="0.6" className="flow-line" />

                  {/* Level 5 Node: System Blueprint */}
                  <g transform="translate(0, 0)">
                    {/* Double outline border for engineered stability */}
                    <rect x="92" y="390" width="186" height="38" rx="8" fill="#e1f3f8" fillOpacity="0.3" stroke="#2e5b94" strokeWidth="1.5" />
                    <rect x="95" y="393" width="180" height="32" rx="6" fill="none" stroke="#2e5b94" strokeWidth="0.5" strokeOpacity="0.5" />
                    <text x="185" y="413" fill="#2e5b94" fontSize="9.5" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle" letterSpacing="0.05em">SYSTEM BLUEPRINT</text>
                  </g>

                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Client Fit List (Operating Report Style) */}
        <div className="w-full flex flex-col border-t border-hairline/65 mb-24 max-w-5xl">
          {clientFits.map((fit, idx) => (
            <motion.div
              key={fit.num}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group border-b border-hairline/65 py-8 flex flex-col md:grid md:grid-cols-12 md:gap-8 items-start relative hover:bg-brass-accent/[0.012] transition-colors duration-300 pl-4 pr-6"
            >
              {/* Row number */}
              <div className="md:col-span-1 text-micro font-mono text-brass-accent font-bold mb-2 md:mb-0">
                {fit.num} &mdash;
              </div>

              {/* Fit Title */}
              <div className="md:col-span-4 text-body-base font-bold text-primary-text font-display tracking-tight uppercase">
                {fit.title}
              </div>

              {/* Description */}
              <div className="md:col-span-6 text-body-base text-muted-text font-semibold leading-relaxed">
                {fit.desc}
              </div>

              {/* Hover indicator arrow */}
              <div className="md:col-span-1 flex justify-end w-full absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 text-brass-accent hidden md:flex">
                <span className="text-[1.2rem] font-bold">&rarr;</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Not a Fit Section */}
        <div className="border border-hairline/45 bg-slate-50/50 rounded-[2.5rem] p-8 md:p-12 mb-20 max-w-5xl relative overflow-hidden backdrop-blur-[1px]">
          
          <div className="flex flex-col md:grid md:grid-cols-12 gap-8 items-start w-full">
            
            {/* Left side: Restrained warning diagnostic header */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <span className="text-micro font-mono tracking-widest text-muted-text/60 font-bold uppercase">
                OPERATIONAL DISCIPLINE
              </span>
              <h3 className="text-[1.5rem] md:text-[1.8rem] font-bold text-primary-text font-display uppercase tracking-tight">
                WHEN WE&apos;RE NOT THE RIGHT PARTNER
              </h3>
              <p className="text-[0.92rem] text-muted-text font-semibold leading-relaxed mt-1">
                We do our best work when we&apos;re involved before the solution has already been decided.
              </p>
            </div>

            {/* Right side: Rejection guidelines */}
            <div className="md:col-span-7 w-full flex flex-col gap-4">
              <span className="text-micro font-mono text-muted-text/45 uppercase tracking-wider mb-2 block font-semibold">
                PARTNERSHIP PARAMETERS
              </span>
              
              <ul className="flex flex-col gap-4">
                {notFits.map((item, idx) => (
                  <li
                    key={idx}
                    className={`flex gap-4 items-start ${idx > 0 ? "border-t border-hairline/35 pt-4" : ""}`}
                  >
                    <span className="text-muted-text/40 font-mono text-[1.1rem] leading-none select-none">&times;</span>
                    <span className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Transition CTA to entry service */}
        <div className="w-full flex flex-col items-center justify-center text-center py-12 border-t border-hairline/45 max-w-5xl mt-8">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
            DIAGNOSTICS FIRST
          </span>
          <h4 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase">
            Not sure what system you need?
          </h4>
          <p className="text-body-base text-muted-text max-w-md font-semibold mb-6">
            That&apos;s okay. You don&apos;t need to know the technical solution yet. The Strategy & Operations Audit exists specifically to find the problem first.
          </p>
          
          <Link
            href="/scoping?type=audit"
            className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-7 rounded-xl shadow-sm hover:shadow-md transform active:scale-98"
          >
            START A STRATEGY AUDIT
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
