"use client";

import RevealSquircle from "./RevealSquircle";

export default function Difference() {
  return (
    <section id="difference" className="w-full bg-primary-text text-charcoal-base py-space-xxl px-6 border-y border-hairline relative z-10">
      <div className="max-w-4xl mx-auto flex flex-col gap-space-md justify-center items-center text-center">
        <span className="text-caption text-brass-accent tracking-widest font-mono font-medium block">
          07 / Difference
        </span>
        
        {/* Pull-quote text */}
        <RevealSquircle delay={0.1} className="w-full">
          <blockquote className="text-display-m lg:text-display-l font-display tracking-tight leading-tight max-w-3xl mt-4">
            &ldquo;Most companies ask, &lsquo;What do you want us to build?&rsquo; <br />
            We ask, <span className="italic text-brass-accent font-semibold">&lsquo;Why does this problem exist in the first place?&rsquo;</span>&rdquo;
          </blockquote>
        </RevealSquircle>
      </div>
    </section>
  );
}
