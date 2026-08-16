"use client";

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { STUDIES_DB } from "@/lib/caseStudies";

interface CaseStudyContentProps {
  id: string;
}

export default function CaseStudyContent({ id }: CaseStudyContentProps) {
  const study = STUDIES_DB[id];

  const [simLogs, setSimLogs] = useState<string[]>(["CONSOLE READY. PRESS RUN TO INITIATE."]);
  const [isRunning, setIsRunning] = useState(false);

  if (!study) {
    notFound();
  }

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setSimLogs(["[0.0s] INITIALIZING SIMULATION RUNNER..."]);

    const steps = [
      { delay: 400, text: `[0.4s] ESTABLISHING API CONNECTIVITY TO ${study.client.toUpperCase()}...` },
      { delay: 800, text: "[0.8s] PARSING PIPELINE INCOMING TRIGGER CHANNELS..." },
      { delay: 1200, text: `[1.2s] EXECUTING ACTIONS ON NODES: [${study.systemDesign.join(" -> ")}]` },
      { delay: 1800, text: "[1.8s] INJECTING RANDOMIZED JITTER LATENCY OFFSET..." },
      { delay: 2400, text: `[2.4s] RUN COMPLETELY COMPILED! SYSTEM ONLINE.` },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setSimLogs((prev) => [...prev, step.text]);
        if (step.delay === 2400) {
          setIsRunning(false);
        }
      }, step.delay);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-28 pb-24 flex flex-col gap-12 relative z-10 select-none">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-micro font-mono text-muted-text">
          <Link href="/work" className="hover:text-primary-text transition-colors">&larr; BACK TO SELECTED WORK</Link>
        </div>

        {/* Case Study Header */}
        <div className="flex flex-col gap-4 border-b border-hairline pb-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-caption text-brass-accent font-mono font-bold uppercase">{study.category}</span>
            <span className="text-[0.62rem] font-mono text-muted-text bg-slate-100 border border-hairline/45 rounded px-2 py-0.5 font-bold uppercase select-none">
              {study.status}
            </span>
          </div>
          
          <h1 className="text-[2.25rem] sm:text-[3.25rem] font-bold text-primary-text font-display leading-none mt-1">
            {study.client}.
          </h1>
          
          <div className="border-l-2 border-brass-accent/30 pl-4 py-1 mt-2">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider block mb-1">
              THE OPERATIONAL PROBLEM WE SET OUT TO SOLVE
            </span>
            <p className="text-[0.98rem] text-primary-text font-display uppercase tracking-tight leading-snug">
              {study.problemHeadline}
            </p>
          </div>

          {/* Prototype Disclosure statement */}
          {study.status === "SAYAGAA PROTOTYPE" && (
            <div className="border border-brass-accent/25 bg-brass-accent/[0.02] p-5 rounded-2xl flex flex-col gap-1.5 mt-4 select-none">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                SAYAGAA PROTOTYPE DISCLOSURE
              </span>
              <p className="text-[0.8rem] text-muted-text font-semibold leading-relaxed">
                This system demonstrates how Sayagaa approaches a specific operational pattern. It is presented as a system prototype and should not be interpreted as a production client deployment.
              </p>
            </div>
          )}
        </div>

        {/* 01 / CONTEXT */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-hairline/25 pb-8">
          <div className="md:col-span-8 flex flex-col gap-3">
            <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              01 / CONTEXT
            </h3>
            <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
              {study.context}
            </p>
          </div>

          {/* Metadata Sidebar Card */}
          <div className="md:col-span-4 bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-4 font-mono text-micro">
            <div>
              <span className="text-muted-text/50 block mb-1 uppercase tracking-wider font-bold">Project Type</span>
              <p className="text-primary-text font-bold uppercase">{study.systemBuilt}</p>
            </div>
            <div className="border-t border-hairline/40 pt-2">
              <span className="text-muted-text/50 block mb-1 uppercase tracking-wider font-bold">Focus Area</span>
              <p className="text-primary-text font-bold uppercase">{study.category} OPERATIONS</p>
            </div>
            <div className="border-t border-hairline/40 pt-2">
              <span className="text-muted-text/50 block mb-1 uppercase tracking-wider font-bold">Status Classification</span>
              <p className="text-brass-accent font-extrabold uppercase">{study.status}</p>
            </div>
          </div>
        </div>

        {/* 02 / PROBLEM */}
        <div className="flex flex-col gap-3 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            02 / PROBLEM
          </h3>
          <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
            {study.problem}
          </p>
        </div>

        {/* 03 / RESEARCH */}
        <div className="flex flex-col gap-3 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            {study.researchTitle}
          </h3>
          <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
            {study.research}
          </p>
        </div>

        {/* 04 / FRICTION MAP DIAGRAM */}
        <div className="flex flex-col gap-4 border-b border-hairline/25 pb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              04 / {study.status === "SAYAGAA PROTOTYPE" ? "ILLUSTRATIVE SYSTEM FLOW" : "WORKFLOW NODES"}
            </h3>
            <p className="text-micro text-muted-text font-mono">
              Diagnostic flow map tracing friction points:
            </p>
          </div>
          
          <div className="p-6 bg-secondary-surface/40 border border-hairline/65 rounded-[1.5rem] flex flex-wrap gap-3 items-center justify-start">
            {study.frictionNodes.map((node, idx) => (
              <div key={node} className="flex items-center gap-2">
                <span className="bg-white border border-hairline/65 px-4 py-2 rounded-xl text-micro font-mono font-bold text-primary-text shadow-sm hover:border-brass-accent/35 transition-colors">
                  {node}
                </span>
                {idx < study.frictionNodes.length - 1 && (
                  <span className="text-brass-accent font-mono font-bold">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 05 / SYSTEM DESIGN */}
        <div className="flex flex-col gap-4 border-b border-hairline/25 pb-8">
          <div className="flex flex-col gap-1">
            <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              05 / SYSTEM DESIGN ARCHITECTURE
            </h3>
            <p className="text-micro text-muted-text font-mono">
              Systems‑engineered pipeline state machine:
            </p>
          </div>

          <div className="p-6 bg-secondary-surface/40 border border-brass-accent/20 rounded-[1.5rem] flex flex-wrap gap-3 items-center justify-start">
            {study.systemDesign.map((node, idx) => (
              <div key={node} className="flex items-center gap-2">
                <span className="bg-white border border-brass-accent/25 px-4 py-2 rounded-xl text-micro font-mono font-bold text-brass-accent shadow-sm hover:border-brass-accent/55 transition-colors">
                  {node}
                </span>
                {idx < study.systemDesign.length - 1 && (
                  <span className="text-brass-accent font-mono font-bold">&rarr;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 06 / SYSTEM BUILT COMPONENTS */}
        <div className="flex flex-col gap-6 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            06 / SYSTEM COMPONENTS BUILT
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {study.components.map((comp) => (
              <div key={comp.title} className="bg-white border border-hairline/60 p-5 rounded-2xl flex flex-col gap-1.5 shadow-sm">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                  {comp.title}
                </span>
                <p className="text-[0.8rem] text-muted-text font-semibold leading-relaxed">
                  {comp.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 07 / BEFORE & AFTER COMPARISON */}
        <div className="flex flex-col gap-4 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            07 / PROCESS COMPARISON (BEFORE VS. AFTER)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
            
            {/* Before Grid */}
            <div className="border border-red-500/15 bg-white/40 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
              <span className="text-micro font-mono text-accent-red font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                BEFORE (MANUAL PROCESS)
              </span>
              <div className="flex flex-col gap-1.5 font-mono text-[0.78rem] text-muted-text font-bold">
                {study.beforeFlow.map((node, idx) => (
                  <div key={node} className="flex flex-col gap-1.5">
                    <div className="bg-white border border-hairline/60 py-2.5 px-4 rounded-xl shadow-sm text-center">
                      {node}
                    </div>
                    {idx < study.beforeFlow.length - 1 && (
                      <span className="text-center text-accent-red/60 text-[0.85rem] leading-none">&darr;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* After Grid */}
            <div className="border border-brass-accent/25 bg-white/40 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-accent animate-pulse" />
                AFTER (SYSTEM PROCESS)
              </span>
              <div className="flex flex-col gap-1.5 font-mono text-[0.78rem] text-primary-text font-bold">
                {study.afterFlow.map((node, idx) => (
                  <div key={node} className="flex flex-col gap-1.5">
                    <div className="bg-white border border-brass-accent/20 py-2.5 px-4 rounded-xl shadow-sm text-center text-brass-accent">
                      {node}
                    </div>
                    {idx < study.afterFlow.length - 1 && (
                      <span className="text-center text-brass-accent text-[0.85rem] leading-none">&darr;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* 08 / IMPACT & RESULTS */}
        <div className="flex flex-col gap-6 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            08 / {study.impactTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {study.impact.map((result) => (
              <div key={result} className="bg-white border border-brass-accent/15 p-5 rounded-2xl flex flex-col gap-1.5 shadow-sm text-center justify-center min-h-[100px]">
                <span className="text-[0.82rem] font-mono font-bold text-brass-accent uppercase tracking-wider">
                  {result}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 mt-2">
            <span className="text-micro font-mono text-muted-text/50 uppercase tracking-wider font-bold">
              BUSINESS IMPLICATIONS
            </span>
            <ul className="flex flex-wrap gap-2 text-micro font-mono text-primary-text font-bold uppercase tracking-wider">
              {study.businessImpact.map((item) => (
                <li key={item} className="bg-white border border-hairline px-3.5 py-1.5 rounded-lg shadow-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 09 / TECHNICAL ARCHITECTURE & STACK */}
        <div className="flex flex-col gap-4 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            09 / TECHNICAL ARCHITECTURE & STACK
          </h3>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {study.techStack.map((tech) => (
              <span key={tech} className="bg-white border border-hairline/65 px-4 py-2 rounded-xl text-micro font-mono font-bold text-primary-text shadow-sm hover:border-brass-accent/35 transition-colors">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* 10 / WHAT WE LEARNED */}
        <div className="flex flex-col gap-3 border-b border-hairline/25 pb-8">
          <h3 className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            10 / WHAT WE LEARNED
          </h3>
          <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed italic">
            &ldquo;{study.lessons}&rdquo;
          </p>
        </div>

        {/* Interactive Simulator Box */}
        <div className="p-6 bg-secondary-surface/40 border border-hairline/65 rounded-[2rem] flex flex-col gap-4 shadow-sm">
          <div className="flex flex-col gap-1">
            <h3 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
              Interactive Sequence Simulator
            </h3>
            <p className="text-micro text-muted-text font-mono">
              Simulate sequence triggers executing invites, AI compilations, and sync schedulers.
            </p>
          </div>
          
          <button
            onClick={runSimulation}
            disabled={isRunning}
            className="bg-primary-text text-white hover:bg-brass-accent border border-primary-text hover:border-brass-accent font-mono text-micro font-bold uppercase py-3 px-6 rounded-xl transition-colors self-start cursor-pointer disabled:opacity-50"
          >
            {isRunning ? "Running Pipeline..." : "Run Sequence"}
          </button>
          
          <div className="bg-charcoal-base border border-hairline rounded-xl p-4 font-mono text-micro text-muted-text flex flex-col gap-2 min-h-[100px] select-text">
            {simLogs.map((log, idx) => (
              <div key={idx} className={idx === simLogs.length - 1 ? "text-brass-accent animate-pulse" : ""}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Project Navigation Links */}
        <div className="border-t border-hairline/45 pt-8 mt-4 flex flex-col sm:flex-row items-center justify-between gap-6 font-mono text-micro font-bold tracking-wider">
          <Link href={`/work/${study.previousProject.slug}`} className="text-muted-text hover:text-brass-accent transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-start">
            &larr; PREVIOUS: {study.previousProject.name}
          </Link>
          <Link href="/work" className="text-brass-accent hover:text-primary-text transition-colors">
            BACK TO SELECTED WORK
          </Link>
          <Link href={`/work/${study.nextProject.slug}`} className="text-muted-text hover:text-brass-accent transition-colors flex items-center gap-1.5 w-full sm:w-auto justify-end">
            NEXT: {study.nextProject.name} &rarr;
          </Link>
        </div>

        {/* Final Conversion CTA area */}
        <div className="w-full flex flex-col items-center justify-center text-center py-12 border-t border-hairline/45 mt-8 gap-4">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase">
            EXPLORE OPPORTUNITIES
          </span>
          <h4 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-primary-text font-display leading-tight uppercase select-none max-w-xl leading-snug">
            HAVE A SIMILAR OPERATIONAL PROBLEM?
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-2 items-center justify-center w-full sm:w-auto">
            <Link
              href="/scoping?type=audit"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-8 rounded-xl shadow hover:shadow-md transform active:scale-98 font-mono uppercase tracking-wider w-full sm:w-auto text-center"
            >
              START WITH THE AUDIT →
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3.5 px-8 rounded-xl shadow-sm hover:shadow active:scale-98 font-mono uppercase tracking-wider w-full sm:w-auto text-center"
            >
              SEE MORE WORK →
            </Link>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
