import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealSquircle from "@/components/RevealSquircle";

export const metadata: Metadata = {
  title: "Build Log | Sayaga Studios — Business Systems & AI Engineering",
  description: "A public timeline documenting daily iterations, features shipped, technical challenges, and engineering lessons.",
};

interface LogItem {
  day: string;
  title: string;
  desc: string;
  features: string[];
  lessons: string;
}

const logItems: LogItem[] = [
  {
    day: "Day 24",
    title: "Sayaga Pipeline Campaign Sequencing",
    desc: "Configured randomized jitter delays between multi-channel triggers (LinkedIn requests and follow-up cold emails) to protect domain deliverability metrics.",
    features: ["Drag-and-drop Visual sequence editor", "Cron-based automation triggers", "Live conversion dashboard (open & reply logs)"],
    lessons: "Multi-channel campaigns achieve 3.5x higher conversion rates compared to standard email-only sequences.",
  },
  {
    day: "Day 18",
    title: "Founder Inbox Triage Queue",
    desc: "Solved GMail and Outlook API rate limits during high-frequency webhook sync by introducing a lightweight Redis cache serialization runner.",
    features: ["Active webhook pipeline for Gmail/Outlook", "Redis serialization processing queue", "Semantic summaries thread mapping"],
    lessons: "Webhooks with high payload spikes require background message queues to prevent gateway timeouts.",
  },
  {
    day: "Day 12",
    title: "Content Engine Scheduling",
    desc: "Completed the cron scheduler service, allowing articles compiled by our LLM drafts manager to publish automatically to LinkedIn and WordPress channels.",
    features: ["Node-cron automation triggers", "WordPress REST API publication bridge", "LinkedIn share API integration helper"],
    lessons: "API rate limits vary significantly between channels. LinkedIn limits updates to 5 sharing actions per day.",
  },
  {
    day: "Day 08",
    title: "Brand Auditor Visual Parser",
    desc: "Constructed the visual parsing algorithms to index layout designs. Integrated headless Chromium nodes to capture SaaS dashboards automatically.",
    features: ["Headless Chrome capture utility", "OpenCV-based color palette checker", "Compliance validation logic wrapper"],
    lessons: "Headless captures require dynamic timeouts to wait for React or Vue dashboards to render completely.",
  },
];

export default function LogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-28 pb-space-xxl flex flex-col gap-space-xl">
        
        {/* Intro */}
        <div className="flex flex-col gap-space-sm border-b border-hairline pb-space-lg">
          <span className="text-caption text-brass-accent">04 / Consistency</span>
          <h1 className="text-display-m lg:text-display-l">Build Log.</h1>
          <p className="text-body-l text-muted-text max-w-2xl">
            A public timeline documenting daily iterations, features shipped, technical challenges, and engineering lessons learned as we build software.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="flex flex-col gap-space-xl border-l border-hairline/30 pl-6 ml-2 md:pl-8 md:ml-4 relative">
          {logItems.map((item, idx) => (
            <RevealSquircle key={item.day} delay={idx * 0.1} className="relative w-full">
              
              {/* Timeline dot badge */}
              <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-charcoal-base border border-brass-accent z-10 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-brass-accent rounded-full animate-ping" />
              </div>

              {/* Card content */}
              <div className="bg-secondary-surface border border-hairline p-6 md:p-8 rounded flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="text-micro font-mono text-brass-accent font-semibold tracking-wider bg-charcoal-base border border-hairline px-2 py-0.5 rounded">
                    {item.day}
                  </span>
                </div>

                <h3 className="text-heading text-primary-text font-medium mt-1">
                  {item.title}
                </h3>
                
                <p className="text-body-base text-muted-text">
                  {item.desc}
                </p>

                {/* Features & Lessons splits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md border-t border-hairline/25 pt-space-sm mt-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-micro text-primary-text font-semibold uppercase tracking-widest font-mono">Features Shipped</span>
                    <ul className="list-disc pl-4 text-body-base text-muted-text flex flex-col gap-1">
                      {item.features.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-micro text-primary-text font-semibold uppercase tracking-widest font-mono">Lessons Learned</span>
                    <p className="text-body-base text-muted-text leading-relaxed">
                      {item.lessons}
                    </p>
                  </div>
                </div>

              </div>

            </RevealSquircle>
          ))}
        </div>

      </main>

      <Footer />
    </div>
  );
}
