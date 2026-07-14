"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

interface StudyData {
  client: string;
  projectType: string;
  timeline: string;
  outcome: string;
  clientState: string;
  description: string;
  problem: string;
  solution: string;
  techStack: string[];
  features: string[];
  challenge: string;
  results: string;
  diagramNodes: string[];
}

export const STUDIES_DB: { [key: string]: StudyData } = {
  outreach: {
    client: "Outreach Engine",
    projectType: "Workflow Automation",
    timeline: "3 Weeks",
    outcome: "68% Open Rates",
    clientState: "B2B Outreach Division",
    description: "An automated multi-channel campaign sequencer platform connecting sales targets, CRM actions, and lead validation flows.",
    problem: "Sales reps spent hours formatting contacts, uploading lists, copying templates, and tracking responses across disconnected tools.",
    solution: "We engineered an automated lead sequencer sync engine mapping lead actions between CRM pipelines and email responders dynamically.",
    techStack: ["Node.js", "CRM API", "Postgres", "Redis Queue"],
    features: ["Automated CRM Lead Triggers", "Sequence path branches", "Real-time reply scrapers"],
    challenge: "Handling bulk payloads during webhook imports triggered sync timeouts. We built an elastic queue worker to serialize runs.",
    results: "Outreach campaigns achieved stable 68% open rates, scaling conversation lists with zero admin delay.",
    diagramNodes: ["Webhook Import", "Validation", "Jitter Delay", "Email Dispatch"],
  },
  inbox: {
    client: "Founder Inbox",
    projectType: "AI Agent Platform",
    timeline: "5 Weeks",
    outcome: "4.2 hrs Saved/Day",
    clientState: "Fast-growth Tech Startup",
    description: "An AI-powered email triage agent that logs incoming leads, compiles summaries, and auto-drafts replies.",
    problem: "Founders were overwhelmed by hundreds of inquiry emails daily, missing hot sales leads amidst generic cold outreach.",
    solution: "We built a webhook listener connecting Gmail/Outlook API feeds to a semantic classification pipeline, auto-sorting inputs.",
    techStack: ["Next.js", "OpenAI API", "Redis Cache", "Gmail API"],
    features: ["Semantic Email Summarizer", "Auto-Draft responses", "Urgency level tags"],
    challenge: "High frequency webhook updates triggered API throttling. We implemented Redis caching to serialize batch tasks.",
    results: "Founders saved over 4 hours daily, logging hot leads into Hubspot instantly with automated draft replies ready.",
    diagramNodes: ["API Webhook", "Redis Buffer", "OpenAI Summary", "CRM Sync"],
  },
  pipeline: {
    client: "Page Pipeline",
    projectType: "Custom Software",
    timeline: "4 Weeks",
    outcome: "3.5x Volume Scale",
    clientState: "B2B Logistics Agency",
    description: "High-volume data compilation pipelines automating freight lead routing and schedule compilations.",
    problem: "Operators manually searched freight indexes and copied route updates to spreadsheet trackers, delaying dispatch schedules.",
    solution: "We coded an automated database compilation runner scraping index data and matching routes using custom optimization logic.",
    techStack: ["TypeScript", "Scraper Node", "MongoDB", "RabbitMQ"],
    features: ["Route Parser Scrapers", "Optimized dispatcher match", "Live routing table UI"],
    challenge: "Web layout alterations on source indexes broke structural query targets. We integrated selector tolerance logic.",
    results: "Compiled route throughput scaled by 3.5x, removing manual dispatch spreadsheet tasks completely.",
    diagramNodes: ["Index Scraper", "Route Match", "RabbitMQ Queue", "Dispatch Dashboard"],
  },
  auditor: {
    client: "Brand Auditor",
    projectType: "Compliance Scanner",
    timeline: "6 Weeks",
    outcome: "99.4% Scan Accuracy",
    clientState: "Finance & Compliance Office",
    description: "A regulatory visual and content scanner capturing and auditing SaaS layout assets automatically.",
    problem: "Manual visual brand auditing across hundreds of product layouts was slow, error-prone, and failed legal standards.",
    solution: "We built visual parsing algorithms using headless Chromium nodes to inspect dashboard layout structures and colors.",
    techStack: ["Chromium Nodes", "OpenCV", "React.js", "S3 Storage"],
    features: ["Headless Chrome captures", "Visual difference analysis", "PDF audit reports generator"],
    challenge: "Dynamic React layouts caused screenshot captures to execute before elements loaded. We built selector checks.",
    results: "Auditing scans achieved 99.4% accuracy, completing visual regulatory compliance reviews in seconds.",
    diagramNodes: ["Headless Browser", "React Render Hook", "OpenCV Match", "PDF Compiler"],
  },
  knowledgeflow: {
    client: "KnowledgeFlow AI",
    projectType: "Document Intelligence",
    timeline: "8 Weeks",
    outcome: "99.2% Retrieval Accuracy",
    clientState: "Enterprise Intelligence Office",
    description: "A secure, role-restricted document intelligence platform integrating hybrid search (BM25 + pgvector RRF) and local annotation databases.",
    problem: "Corporate intelligence analysts spent weeks searching hundreds of contracts and compliance documents, risking privacy leaks with commercial API providers.",
    solution: "We engineered a secure offline hybrid search (BM25 + vector embeddings) combined with localized notes annotation toolsets and customized usage graphs.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Celery"],
    features: ["RAG Chat with Citations", "Zustand Multi-pane Workspace", "Interactive Highlights & Annotations", "Telemetry & Storage Allocation Charts"],
    challenge: "Apple Silicon C-API compilation conflicts with Python 3.14 forced us to deploy Python 3.11.15. Additionally, React 19 RC peer warnings required building custom responsive SVG charts.",
    results: "Analytics compilation and notes databases respond in under 100ms, scaling enterprise intelligence operations securely.",
    diagramNodes: ["Document Upload", "S3 Storage", "Celery Parser", "pgvector RRF", "Citation Chat"],
  },
};

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
      { delay: 1200, text: `[1.2s] EXECUTING ACTIONS ON NODES: [${study.diagramNodes.join(" -> ")}]` },
      { delay: 1800, text: "[1.8s] INJECTING RANDOMIZED JITTER LATENCY OFFSET..." },
      { delay: 2400, text: `[2.4s] RUN COMPLETELY COMPILED! OUTCOME STABILIZED AT: ${study.outcome.toUpperCase()}` },
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

      {/* Dossier frame with layout margin */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-28 pb-space-xxl flex flex-col gap-space-xl">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-caption text-muted-text">
          <Link href="/work" className="hover:text-primary-text transition-colors">&larr; Selected Work</Link>
        </div>

        {/* Case Study Header */}
        <div className="flex flex-col gap-space-sm border-b border-hairline pb-space-lg">
          <span className="text-caption text-brass-accent">{study.projectType}</span>
          <h1 className="text-display-m lg:text-display-l">{study.client}.</h1>
          <p className="text-body-l text-muted-text max-w-2xl mt-1">
            {study.description}
          </p>
        </div>

        {/* Overview Row & Metadata Panel */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-lg items-start border-b border-hairline/25 pb-space-lg">
          <div className="md:col-span-8 flex flex-col gap-4">
            <h3 className="text-heading text-primary-text">Overview</h3>
            <p className="text-body-base text-muted-text leading-relaxed">
              {study.description} {study.problem}
            </p>
          </div>

          <div className="md:col-span-4 bg-secondary-surface border border-hairline p-6 rounded flex flex-col gap-4 font-mono text-micro">
            <div>
              <span className="text-muted-text block mb-1">Project Type</span>
              <p className="text-primary-text font-semibold">{study.projectType}</p>
            </div>
            <div className="border-t border-hairline/40 pt-2">
              <span className="text-muted-text block mb-1">Timeline</span>
              <p className="text-primary-text font-semibold">{study.timeline}</p>
            </div>
            <div className="border-t border-hairline/40 pt-2">
              <span className="text-muted-text block mb-1">Core Outcome</span>
              <p className="text-brass-accent font-bold text-caption">{study.outcome}</p>
            </div>
            <div className="border-t border-hairline/40 pt-2">
              <span className="text-muted-text block mb-1">Client State</span>
              <p className="text-primary-text font-semibold">{study.clientState}</p>
            </div>
          </div>
        </div>

        {/* Problem and Solution breakdown */}
        <div className="flex flex-col gap-space-md max-w-3xl">
          <div>
            <h2 className="text-heading text-primary-text mb-2">The Problem</h2>
            <p className="text-body-base text-muted-text leading-relaxed">{study.problem}</p>
          </div>

          <div className="mt-space-md">
            <h2 className="text-heading text-primary-text mb-2">The Solution & Engineering Process</h2>
            <p className="text-body-base text-muted-text leading-relaxed">{study.solution}</p>
          </div>

          {/* SVG Diagram Node drawing */}
          <div className="my-space-md p-6 bg-secondary-surface border border-hairline rounded">
            <span className="text-micro text-muted-text block mb-4">Pipeline Logic Wireframe</span>
            <div className="flex flex-wrap md:flex-nowrap gap-4 items-center justify-between mt-2">
              {study.diagramNodes.map((node, nodeIdx) => (
                <div key={node} className="flex items-center gap-2 w-full md:w-auto">
                  <div className="p-3 bg-charcoal-base border border-hairline rounded font-mono text-micro text-primary-text text-center w-full md:w-auto">
                    {node}
                  </div>
                  {nodeIdx < study.diagramNodes.length - 1 && (
                    <span className="text-brass-accent hidden md:inline">&rarr;</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Tech tags */}
          <div>
            <h3 className="text-caption text-brass-accent block mb-2">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {study.techStack.map((tag) => (
                <span key={tag} className="text-micro font-mono bg-secondary-surface border border-hairline px-3 py-1 rounded text-primary-text">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="mt-space-md">
            <h3 className="text-heading text-primary-text mb-2">Key Features</h3>
            <ul className="list-disc pl-4 flex flex-col gap-1 text-body-base text-muted-text">
              {study.features.map((feat) => <li key={feat}>{feat}</li>)}
            </ul>
          </div>

          {/* Engineering challenge */}
          <div className="mt-space-md">
            <h2 className="text-heading text-primary-text mb-2">Engineering Challenges</h2>
            <p className="text-body-base text-muted-text leading-relaxed">{study.challenge}</p>
          </div>

          {/* Results */}
          <div className="mt-space-md">
            <h2 className="text-heading text-primary-text mb-2">Outcome</h2>
            <p className="text-body-base text-muted-text leading-relaxed">{study.results}</p>
          </div>

          {/* Simulation Console Box */}
          <div className="mt-space-lg p-6 bg-secondary-surface border border-hairline rounded flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <h3 className="text-heading text-primary-text">Interactive Sequence Simulator</h3>
              <p className="text-micro text-muted-text font-mono">
                Simulate sequence triggers executing invites, AI compilations, and sync schedulers.
              </p>
            </div>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="bg-primary-text text-charcoal-base hover:bg-brass-accent hover:text-charcoal-base font-mono text-micro font-semibold py-2.5 px-4 border border-hairline rounded transition-colors self-start cursor-pointer disabled:opacity-50"
            >
              {isRunning ? "Running Pipeline..." : "Run Sequence"}
            </button>
            <div className="bg-charcoal-base border border-hairline rounded p-4 font-mono text-micro text-muted-text flex flex-col gap-2 min-h-[100px] select-text">
              {simLogs.map((log, idx) => (
                <div key={idx} className={idx === simLogs.length - 1 ? "text-brass-accent animate-pulse" : ""}>
                  {log}
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
