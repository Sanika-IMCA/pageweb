"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Step {
  num: string;
  title: string;
  focus: string;
  inputs: string;
  outputs: string;
  color: string;
  border: string;
  cardStyle: string;
  hasSparkles?: boolean;
}

const steps: Step[] = [
  {
    num: "01",
    title: "Discovery & Intake",
    focus: "Clarifying business models, targets, operational blockages, and identifying exactly what is breaking today.",
    inputs: "Intake form entries, existing docs, calls, current tools list.",
    outputs: "An initial 'Understanding Summary' in plain text to verify scope alignment.",
    color: "bg-brass-accent text-white border-brass-accent/10",
    border: "border-brass-accent/15",
    cardStyle: "bg-secondary-surface border-white/60",
  },
  {
    num: "02",
    title: "Workflow Mapping",
    focus: "Mapping the absolute customer journey and data pathways: Lead &rarr; Sale &rarr; Operations &rarr; Payment &rarr; Support.",
    inputs: "Operator interviews, shadowing notes, workflow logs.",
    outputs: "Detailed system node workflow diagrams and procedural maps.",
    color: "bg-brass-accent text-white border-brass-accent/10",
    border: "border-brass-accent/15",
    cardStyle: "bg-secondary-surface border-white/60",
  },
  {
    num: "03",
    title: "Pain & Leak Analysis",
    focus: "Categorizing operational headaches by impact: time wasted, lost revenue, and quality/onboarding leaks.",
    inputs: "Workflow map insights, team reports.",
    outputs: "A structured 'Pain & Impact Matrix' detailing severity metrics.",
    // Soft red color ONLY for Step 3 to highlight the operational problem zone
    color: "bg-accent-red text-white border-accent-red/20 shadow-[0_0_12px_rgba(229,147,147,0.7)]",
    border: "border-accent-red/35",
    cardStyle: "bg-accent-red-light/20 border-accent-red/45 shadow-[0_0_24px_rgba(229,147,147,0.06)]",
  },
  {
    num: "04",
    title: "Market & Tool Scan",
    focus: "Analyzing how similar global businesses solve these problems, identifying realistic tools without marketing hype.",
    inputs: "System specifications, market comparisons.",
    outputs: "A custom 'Landscape Snapshot' mapping recommended vendors and features.",
    color: "bg-brass-accent text-white border-brass-accent/10",
    border: "border-brass-accent/15",
    cardStyle: "bg-secondary-surface border-white/60",
  },
  {
    num: "05",
    title: "Opportunity Design",
    focus: "Turning identified operational pains into solutions: automations, custom API adapters, and light dashboards.",
    inputs: "Pains matrix, landscape comparison snapshot.",
    outputs: "A detailed 'Opportunity Portfolio' with 5-10 recommended build moves.",
    color: "bg-brass-accent text-white border-brass-accent/10",
    border: "border-brass-accent/15",
    cardStyle: "bg-accent-blue-light/40 border-brass-accent/35 shadow-[0_4px_16px_rgba(46,91,148,0.04)]",
    hasSparkles: true, // "High-impact" step gets subtle white dots / sparkles
  },
  {
    num: "06",
    title: "Roadmap & Build Plan",
    focus: "Organizing design opportunities into a structured, phased implementation roadmap (30–60–90 days).",
    inputs: "Selected design opportunities.",
    outputs: "A comprehensive project roadmap with exact dependencies and budgets.",
    color: "bg-brass-accent text-white border-brass-accent/10",
    border: "border-brass-accent/15",
    cardStyle: "bg-secondary-surface border-white/60",
  },
];

export default function ApproachPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      
      {/* Navigation */}
      <Navigation />

      {/* Hero Header */}
      <header className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Soft Background Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-accent-blue-light/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-accent-red-light/30 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-6 text-center relative z-10">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
            OUR METHODOLOGY
          </span>
          <h1 className="text-[2.75rem] sm:text-[3.75rem] font-bold tracking-tight text-primary-text leading-tight font-display">
            We don&apos;t start with tools. <br />
            We start with the truth.
          </h1>
          <p className="text-body-l text-muted-text max-w-2xl mx-auto leading-relaxed mt-2">
            Every software product we build is preceded by operational research. We map workflows, audit bottlenecks, and identify leaks first—ensuring every dollar you spend builds exactly what your operators need.
          </p>
        </div>
      </header>

      {/* Step by Step Timeline */}
      <main className="flex-1 py-16 px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto flex flex-col gap-16">
          
          <div className="border-b border-hairline/60 pb-6 flex items-center justify-between">
            <h2 className="text-[1.85rem] font-bold text-primary-text font-display">
              The 6-Step Research Timeline
            </h2>
            <span className="text-micro font-mono text-muted-text font-bold">
              [ DIAGRAM LAB ]
            </span>
          </div>

          {/* Timeline Stack */}
          <div className="flex flex-col gap-12 relative">
            {/* Light blue vertical line connecting steps */}
            <div className="absolute top-12 bottom-12 left-6 sm:left-10 w-[1px] bg-brass-accent/15 z-0" />

            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`border p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm backdrop-blur-md relative overflow-hidden z-10 ${step.cardStyle}`}
              >
                {/* Visual Glow Sparkles (For Step 5 Opportunity Design) */}
                {step.hasSparkles && (
                  <>
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_#fff]" />
                    <div className="absolute bottom-6 right-8 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_#fff] opacity-80" />
                  </>
                )}

                {/* Step Numeral Header */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-micro font-mono font-bold ${step.color}`}>
                      {step.num}
                    </span>
                    <span className="text-micro font-mono text-muted-text font-bold">STAGE &mdash;</span>
                  </div>
                  <span className={`text-[0.7rem] font-mono border rounded-full px-3 py-1 font-semibold uppercase tracking-wider ${step.color} ${step.border}`}>
                    {step.title}
                  </span>
                </div>

                {/* Focus text */}
                <p className="text-body-base text-primary-text font-semibold leading-relaxed">
                  {step.focus}
                </p>

                {/* Inputs / Outputs rows */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-hairline/50 text-[0.9rem]">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">What we use (Inputs):</span>
                    <p className="text-muted-text leading-relaxed font-semibold">{step.inputs}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 border-l border-hairline/30 pl-0 md:pl-6">
                    <span className="text-micro font-mono text-brass-accent uppercase tracking-wider font-bold">What you get (Outputs):</span>
                    <p className="text-primary-text leading-relaxed font-semibold">{step.outputs}</p>
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

          {/* What you get deliverables section */}
          <section className="py-16 border-t border-hairline mt-12 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">DELIVERABLES</span>
              <h2 className="text-[1.85rem] font-bold text-primary-text font-display">What you get from us.</h2>
              <p className="text-body-base text-muted-text mt-1 max-w-xl">
                Every research sprint compiles into absolute, actionable assets that you own forever.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="bg-secondary-surface border border-white/60 p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
                <h3 className="text-body-base font-bold text-primary-text font-display">Business Research Map</h3>
                <p className="text-[0.9rem] text-muted-text leading-relaxed">
                  A high-fidelity Notion document detailing your target operations, workflow limits, and opportunity rankings.
                </p>
              </div>

              <div className="bg-secondary-surface border border-white/60 p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
                <h3 className="text-body-base font-bold text-primary-text font-display">System Node Diagrams</h3>
                <p className="text-[0.9rem] text-muted-text leading-relaxed">
                  Detailed vector architecture diagrams tracing exactly how data, files, and users interact across platforms.
                </p>
              </div>

              <div className="bg-secondary-surface border border-white/60 p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
                <h3 className="text-body-base font-bold text-primary-text font-display">Pain & Severity Matrix</h3>
                <p className="text-[0.9rem] text-muted-text leading-relaxed">
                  An analytical breakdown showing where your team loses hours weekly, categorized by impact severity.
                </p>
              </div>

              <div className="bg-secondary-surface border border-white/60 p-6 rounded-2xl flex flex-col gap-2 shadow-sm">
                <h3 className="text-body-base font-bold text-primary-text font-display">30-60-90 Build Roadmap</h3>
                <p className="text-[0.9rem] text-muted-text leading-relaxed">
                  An implementation blueprint outlining quick automation wins first, followed by custom feature releases.
                </p>
              </div>

            </div>
          </section>

          {/* Why this works section */}
          <section className="py-16 border-t border-hairline flex flex-col gap-8">
            <h2 className="text-[1.85rem] font-bold text-primary-text font-display">Why this works.</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>No more guessing</strong> which tools or developers to buy. You see the layout plan before writing code.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent-red font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Stakeholder alignment</strong> is absolute. We build agreement on what needs fixing before setting a timeline.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Revenue protection</strong> is prioritized. We resolve operational leaks and free high-value people from manual tasks first.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Tool stack independence</strong>. Partner tools and builds fit into your custom plan, not the other way around.
                </p>
              </li>
            </ul>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
