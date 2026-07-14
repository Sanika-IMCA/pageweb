"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

interface CaseStudy {
  id: string;
  index: string;
  client: string;
  industry: string;
  systemBuilt: string;
  outcome: string;
  image: string;
  altText: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "outreach",
    index: "04",
    client: "Outreach Engine",
    industry: "Logistics",
    systemBuilt: "Workflow Automation & Dispatch Sequencer",
    outcome: "68% Open Rates",
    image: "/assets/outreach-engine.png",
    altText: "Outreach Engine campaign sequencer interface displaying multi-step automated dispatch node pathways, conversion funnel logs, and statistics dashboard.",
  },
  {
    id: "inbox",
    index: "11",
    client: "Founder Inbox",
    industry: "B2B Services",
    systemBuilt: "AI Email Agent & CRM Integration Hub",
    outcome: "4.2 hrs Saved/Day",
    image: "/assets/founder-inbox.png",
    altText: "Founder Inbox UI displaying semantic artificial intelligence triage summaries, email urgency flags, and automated draft replies.",
  },
  {
    id: "pipeline",
    index: "23",
    client: "Page Pipeline",
    industry: "SaaS Ops",
    systemBuilt: "High-Volume Lead Pipeline Scraper",
    outcome: "3.5x Volume Scale",
    image: "/assets/content-engine.png",
    altText: "Page Pipeline data compiler analytics displaying route scraping structures, RabbitMQ queues, and dispatcher load metrics.",
  },
  {
    id: "auditor",
    index: "42",
    client: "Brand Auditor",
    industry: "Finance & Compliance",
    systemBuilt: "Regulatory Document Scan Compiler",
    outcome: "99.4% Scan Accuracy",
    image: "/assets/brand-auditor.png",
    altText: "Brand Auditor visual scanner displaying browser capture outputs, OpenCV differential checks, and compliance reports.",
  },
  {
    id: "knowledgeflow",
    index: "25",
    client: "KnowledgeFlow AI",
    industry: "Enterprise Ops",
    systemBuilt: "Document Intelligence & Hybrid RAG",
    outcome: "99.2% Retrieval Accuracy",
    image: "/assets/knowledgeflow.png",
    altText: "KnowledgeFlow AI split-screen document intelligence dashboard displaying highlighted PDF text citations, inline notes annotations, responsive SVG charts, and interactive AI chat agent panel.",
  },
];

export default function CaseStudies() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const sectionRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  // Accessibility check for OS animation preferences
  const shouldReduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Parallax scroll coordination
  const { scrollYProgress } = useScroll({
    target: hasMounted ? sectionRef : undefined,
    offset: ["start end", "end start"],
  });

  // Vertical transform drifts for the masonry columns (bypassed if reduced motion is active)
  const col1Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : -60]);
  const col2Y = useTransform(scrollYProgress, [0, 1], [0, shouldReduceMotion ? 0 : 60]);

  // Lagging cursor position tracker for list row previews
  useEffect(() => {
    if (viewMode !== "list" || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const preview = previewRef.current;
      if (!preview) return;

      // Position the preview frame slightly shifted from cursor to avoid overlap conflicts
      gsap.to(preview, {
        x: e.clientX + 20,
        y: e.clientY - 80,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [viewMode, shouldReduceMotion]);

  return (
    <section
      ref={sectionRef}
      id="case-studies"
      className="py-space-xxl px-6 bg-charcoal-base border-t border-hairline overflow-hidden relative"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">

        {/* Section Header with Layout Toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-space-md">
          <div className="flex flex-col gap-space-xxs">
            <span className="text-caption text-brass-accent">05 / Featured Work</span>
            <h2 className="text-display-l">Case Studies</h2>
          </div>

          {/* Toggle buttons for Grid/List views */}
          <div className="flex items-center gap-2 p-1 border border-hairline rounded bg-secondary-surface self-end sm:self-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 text-micro font-mono tracking-wider rounded transition-colors duration-300 cursor-pointer ${viewMode === "grid"
                  ? "bg-brass-accent text-charcoal-base font-medium"
                  : "text-muted-text hover:text-primary-text"
                }`}
            >
              GRID
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 text-micro font-mono tracking-wider rounded transition-colors duration-300 cursor-pointer ${viewMode === "list"
                  ? "bg-brass-accent text-charcoal-base font-medium"
                  : "text-muted-text hover:text-primary-text"
                }`}
            >
              LIST
            </button>
          </div>
        </div>

        {/* Content Render Area */}
        <div className="mt-space-md">
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              /* GRID VIEW: Scattered Parallax Masonry */
              <motion.div
                key="grid-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-space-xl"
              >
                {/* Column 1 (Odd-indexed studies in 0-indexed code, i.e. 0, 2, 4) */}
                <motion.div style={{ y: col1Y }} className="flex flex-col gap-space-xl">
                  {caseStudies
                    .filter((_, idx) => idx % 2 === 0)
                    .map((project, idx) => (
                      <Link href={`/work/${project.id}`} key={project.id}>
                        <div className={`group relative w-full ${idx % 2 === 0 ? "aspect-[4/3]" : "aspect-square"} rounded border border-hairline overflow-hidden bg-secondary-surface cursor-pointer`}>
                          <Image
                            src={project.image}
                            alt={project.altText}
                            fill
                            sizes="(max-w-768px) 100vw, 50vw"
                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0"
                          />
                          {/* Hover Overlay info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-space-md">
                            <div className="flex justify-between items-start">
                              <span className="text-micro font-mono text-brass-accent">{project.index}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-caption text-brass-accent">{project.industry}</span>
                              <h3 className="text-heading text-primary-text leading-tight">{project.client}</h3>
                              <p className="text-micro text-muted-text font-mono mt-1">{project.systemBuilt}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </motion.div>

                {/* Column 2 (Even-indexed studies in 0-indexed code, i.e. 1, 3) */}
                <motion.div style={{ y: col2Y }} className="flex flex-col gap-space-xl pt-space-xl">
                  {caseStudies
                    .filter((_, idx) => idx % 2 === 1)
                    .map((project, idx) => (
                      <Link href={`/work/${project.id}`} key={project.id}>
                        <div className={`group relative w-full ${idx % 2 === 0 ? "aspect-square" : "aspect-[4/3]"} rounded border border-hairline overflow-hidden bg-secondary-surface cursor-pointer`}>
                          <Image
                            src={project.image}
                            alt={project.altText}
                            fill
                            sizes="(max-w-768px) 100vw, 50vw"
                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out filter grayscale group-hover:grayscale-0"
                          />
                          {/* Hover Overlay info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-space-md">
                            <div className="flex justify-between items-start">
                              <span className="text-micro font-mono text-brass-accent">{project.index}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-caption text-brass-accent">{project.industry}</span>
                              <h3 className="text-heading text-primary-text leading-tight">{project.client}</h3>
                              <p className="text-micro text-muted-text font-mono mt-1">{project.systemBuilt}</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                </motion.div>
              </motion.div>
            ) : (
              /* LIST VIEW: Scannable Row Layout */
              <motion.div
                key="list-view"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex flex-col border-t border-hairline"
              >
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-space-sm py-space-sm text-caption text-muted-text font-mono border-b border-hairline">
                  <div className="col-span-1">Catalog</div>
                  <div className="col-span-3">Client</div>
                  <div className="col-span-2">Industry</div>
                  <div className="col-span-4">System Built</div>
                  <div className="col-span-2 text-right">Outcome</div>
                </div>

                {/* Rows */}
                {caseStudies.map((project) => (
                  <Link href={`/work/${project.id}`} key={project.id} className="contents">
                    <div
                      onMouseEnter={() => setHoveredImage(project.image)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="grid grid-cols-12 gap-space-sm py-space-md items-center border-b border-hairline/40 hover:border-brass-accent transition-colors duration-300 group cursor-pointer"
                    >
                      <div className="col-span-1 text-micro text-brass-accent font-mono">{project.index}</div>
                      <div className="col-span-3 text-heading text-primary-text group-hover:text-brass-accent transition-colors">
                        {project.client}
                      </div>
                      <div className="col-span-2 text-body-base text-primary-text">{project.industry}</div>
                      <div className="col-span-4 text-body-base text-muted-text">{project.systemBuilt}</div>
                      <div className="col-span-2 text-right text-body-base font-semibold text-brass-accent font-mono">
                        {project.outcome}
                      </div>
                    </div>
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Stateful Lagging Hover Image Preview (List mode only) */}
        {viewMode === "list" && hoveredImage && !shouldReduceMotion && (
          <motion.div
            ref={previewRef}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-0 left-0 w-56 h-36 border border-hairline rounded overflow-hidden z-50 pointer-events-none bg-secondary-surface"
          >
            <Image
              src={hoveredImage}
              alt="Project preview"
              fill
              sizes="224px"
              className="object-cover"
            />
          </motion.div>
        )}

      </div>
    </section>
  );
}
