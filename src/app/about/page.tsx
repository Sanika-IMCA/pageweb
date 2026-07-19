import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealSquircle from "@/components/RevealSquircle";

export const metadata: Metadata = {
  title: "About | Sayaga Studios — Operations Research & Systems Engineering",
  description: "About Sanika and our operational research philosophy.",
};

const philosophyPoints = [
  {
    title: "We don't start with software, we start with your bottlenecks.",
    desc: "A custom dashboard or automation is useless if it automates a broken process. We audit the manual friction first.",
  },
  {
    title: "We believe every build must trace back to a clear operational pain.",
    desc: "Every database relation and automated run we deploy is designed to directly resolve a quantified time leak or revenue drain.",
  },
  {
    title: "We design solutions that your team can actually use, not just admire.",
    desc: "Technology is only valuable if operators adopt it. We prioritize ease-of-use and clear user training over overly complex tech stacks.",
  },
  {
    title: "We keep implementations lean and measurable.",
    desc: "We prioritize high-impact, low-complexity wins first. We target a 30-50% manual operations time reduction from the first release.",
  },
];

const industriesKnown = [
  {
    area: "HR Ops & Onboarding",
    detail: "Standardizing candidate flows, automating screening dispatch systems, and structuring contractor onboarding logs.",
  },
  {
    area: "Retail & Inventory Ops",
    detail: "Integrating supplier purchase order flows, inventory audits, and automatic reorder alerts to reduce manual stock tracing.",
  },
  {
    area: "Service & Consulting Ops",
    detail: "Automating lead scoping pipelines, client intake data flows, scheduling triggers, and payment milestone handovers.",
  },
  {
    area: "Admin-Heavy Workflows",
    detail: "Transitioning operations teams away from chaotic spreadsheets, WhatsApp tracking, and manual email copy-pasting.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      
      {/* Sticky Navigation */}
      <Navigation />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-40 pb-24 flex flex-col gap-16 relative z-10">
        
        {/* Intro Section */}
        <div className="flex flex-col gap-4 border-b border-hairline/60 pb-10">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">03 / WHO WE ARE</span>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none font-display">
            About Sanika & the company.
          </h1>
          <p className="text-body-l text-muted-text mt-2 leading-relaxed">
            We combine operational research, systems thinking, and partner integration tools to produce high‑ROI improvements for clients globally.
          </p>
        </div>

        {/* Founder Letter/Overview */}
        <RevealSquircle delay={0.15}>
          <div className="bg-secondary-surface border border-brass-accent/15 p-8 md:p-12 rounded-[2.5rem] flex flex-col gap-6 shadow-sm backdrop-blur-md relative overflow-hidden">
            {/* Subtle blue gradient halo background */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-accent-blue-light/30 border border-brass-accent/20 rounded-full blur-xl pointer-events-none" />

            <h2 className="text-[1.5rem] font-bold text-brass-accent font-display">
              Research-First Digital Systems
            </h2>
            <p className="text-body-base text-muted-text leading-relaxed font-semibold">
              Most digital agencies want to sell you a complex custom app or a bloated retainer package immediately. At **Sayaga Studios**, led by **Sanika**, we believe that is a receipt for waste. Before we write code or config, we study the truth of your operations.
            </p>
            <p className="text-body-base text-muted-text leading-relaxed font-semibold">
              We focus on mapping the absolute reality of how your team communicates, where data gets lost in spreadsheets, and where manual bottlenecks occur. We then deploy lightweight, robust pipelines that resolve these friction points.
            </p>

            <ul className="flex flex-col gap-4 mt-4 pt-6 border-t border-hairline/60">
              <li className="flex gap-3 items-center text-primary-text font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                Obsessed with understanding how businesses actually run.
              </li>
              <li className="flex gap-3 items-center text-primary-text font-bold">
                {/* Soft Red Accent bullet for key values */}
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red shadow-[0_0_8px_rgba(229,147,147,0.85)] shrink-0" />
                Focused on deep operational research before any build.
              </li>
              <li className="flex gap-3 items-center text-primary-text font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                Working with clients across multiple regions and industries.
              </li>
            </ul>
          </div>
        </RevealSquircle>

        {/* Our Philosophy */}
        <div className="flex flex-col gap-8 border-t border-hairline/60 pt-12">
          <div className="flex flex-col gap-1">
            <span className="text-[0.75rem] font-mono text-accent-red uppercase tracking-wider font-bold">OPERATIONAL CORE</span>
            <h2 className="text-[1.85rem] font-bold text-primary-text font-display">Our Philosophy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {philosophyPoints.map((item) => (
              <div key={item.title} className="p-6 bg-secondary-surface border border-brass-accent/15 rounded-2xl flex flex-col gap-2 shadow-sm backdrop-blur-md relative overflow-hidden">
                {/* Faint Red dot accent in the corner for visual consistency */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-accent-red/80 shadow-[0_0_6px_rgba(229,147,147,0.85)]" />
                <h4 className="text-body-base text-brass-accent font-bold leading-snug">{item.title}</h4>
                <p className="text-[0.9rem] text-muted-text leading-relaxed mt-1 font-semibold">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Industries known */}
        <div className="flex flex-col gap-8 border-t border-hairline/60 pt-12">
          <div className="flex flex-col gap-1">
            <span className="text-[0.75rem] font-mono text-brass-accent uppercase tracking-wider font-bold">DOMAINS</span>
            <h2 className="text-[1.85rem] font-bold text-primary-text font-display">Industries & Patterns We Know</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {industriesKnown.map((item) => (
              <div key={item.area} className="p-6 bg-secondary-surface border border-brass-accent/15 rounded-2xl flex flex-col gap-2 shadow-sm backdrop-blur-md relative overflow-hidden">
                {/* Tiny blue spotlight dot accent */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brass-accent/80" />
                <h4 className="text-body-base text-primary-text font-bold font-display">{item.area}</h4>
                <p className="text-[0.9rem] text-muted-text leading-relaxed mt-1 font-semibold">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How we work with you */}
        <div className="flex flex-col gap-6 border-t border-hairline/60 pt-12 bg-accent-blue-light/20 border border-brass-accent/15 p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-md">
          <div className="absolute -bottom-8 -right-8 w-24 h-24 bg-accent-blue-light/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col gap-1">
            <span className="text-[0.7rem] font-mono text-brass-accent uppercase tracking-wider font-bold">COLLABORATION GUIDE</span>
            <h2 className="text-[1.5rem] font-bold text-primary-text font-display leading-tight">How we work with you.</h2>
          </div>
          
          <ul className="flex flex-col gap-4 text-[0.95rem] text-muted-text leading-relaxed font-semibold">
            <li className="flex gap-3 items-start">
              <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
              <span><strong>Remote-Friendly Engagement</strong>: We work across multiple regions using clear async documentation, dashboard scoping reports, and recorded video updates.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-accent-red font-bold mt-0.5">&bull;</span>
              <span><strong>Clear Expectations</strong>: Strict milestone tracking. From intake form submission &rarr; Research Sprint &rarr; review video call &rarr; project roadmap &rarr; build release.</span>
            </li>
            <li className="flex gap-3 items-start">
              <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
              <span><strong>Structured Communication</strong>: We communicate clearly about database boundaries, tool lock-ins, and cost budgets—never hiding implementation details behind jargon.</span>
            </li>
          </ul>
        </div>

      </main>

      {/* Footer */}
      <Footer />
      
    </div>
  );
}
