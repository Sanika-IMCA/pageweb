import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import RevealSquircle from "@/components/RevealSquircle";

export const metadata: Metadata = {
  title: "About | Sayaga Studios — Business Systems & AI Engineering",
  description: "A letter explaining our methodology, values, team background, and operational focus.",
};

const trajectoryPhases = [
  {
    phase: "Phase 01",
    title: "Product Studio",
    desc: "We partner with founders and business operators to transform concepts into working production software in weeks.",
  },
  {
    phase: "Phase 02",
    title: "Internal Products",
    desc: "We build, test, and co-found our own software tools and automated platforms, spinning out independent teams.",
  },
  {
    phase: "Phase 03",
    title: "Open Source",
    desc: "We compile and release core scraper libraries, classification utilities, and layout frameworks to the developer ecosystem.",
  },
  {
    phase: "Phase 04",
    title: "Community",
    desc: "We Build in Public, hosting workshops, publishing engineering lessons learned, and sharing technical essays.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-28 pb-space-xxl flex flex-col gap-space-xl">
        
        {/* Intro */}
        <div className="flex flex-col gap-space-sm border-b border-hairline pb-space-lg">
          <span className="text-caption text-brass-accent">03 / Corporate Identity</span>
          <h1 className="text-display-m lg:text-display-l">Our Story.</h1>
          <p className="text-body-l text-muted-text max-w-2xl">
            Ideas are cheap. Engineering reliable business software is hard. A letter explaining our values, who we partner with, and where we are heading.
          </p>
        </div>

        {/* Founder Letter Container */}
        <RevealSquircle delay={0.15}>
          <div className="bg-secondary-surface border border-hairline p-8 md:p-12 rounded flex flex-col gap-space-sm max-w-3xl">
            <p className="text-body-base text-primary-text font-semibold">Dear Operator,</p>
            <p className="text-body-base text-muted-text leading-relaxed">
              Every company starts with an idea. Every idea starts on a page. But most ideas never get beyond that page.
            </p>
            <p className="text-body-base text-muted-text leading-relaxed">
              We founded <strong>Sayaga Studios</strong> to change that. Having spent years in the tech ecosystem, we grew tired of seeing ambitious companies get bogged down in agency bureaucracy, over-engineered architectures, and standard outsourcing pitfalls. You don't need a presentation slide deck; you need working software in your users' hands.
            </p>
            <p className="text-body-base text-muted-text leading-relaxed">
              We are a business systems and AI engineering studio. We do not position ourselves as an automation agency, a web design shop, or an AI wrapper factory. We are builders who partner with ambition. We design premium interfaces, map structured database schemas, and write high-leverage code to solve actual operational challenges.
            </p>

            <h3 className="text-heading text-primary-text font-medium mt-space-sm">Who We Partner With</h3>
            <p className="text-body-base text-muted-text leading-relaxed">
              We work with ambitious founders, startups, businesses, operators, and creators who understand that technology should build leverage, remove friction, and solve real bottlenecks. If you prioritize visual craft, absolute speed, and code cleanliness over corporate meetings, you are in the right place.
            </p>

            <h3 className="text-heading text-primary-text font-medium mt-space-sm">The Next Decade</h3>
            <p className="text-body-base text-muted-text leading-relaxed">
              Our long-term roadmap is clear. We are starting as a product studio, helping ambition launch. In the next phase, we will co-found internal software products as a venture studio. Ultimately, we are building an integrated ecosystem of SaaS products and tools designed to create leverage for operators globally.
            </p>
            <p className="text-body-base text-muted-text leading-relaxed">
              Every great product starts somewhere. Let's turn your page into a product.
            </p>

            <div className="mt-8 border-t border-hairline pt-6 flex flex-col gap-1">
              <p className="text-body-base text-primary-text font-semibold">The Founding Team</p>
              <p className="text-micro text-brass-accent font-semibold tracking-widest uppercase">SAYAGA STUDIOS</p>
            </div>
          </div>
        </RevealSquircle>

        {/* Trajectory Phases */}
        <div className="flex flex-col gap-space-md border-t border-hairline pt-space-lg mt-space-md">
          <div className="flex flex-col gap-space-xxs">
            <span className="text-caption text-brass-accent">Ecosystem</span>
            <h2 className="text-display-m">The SAYAGA Trajectory.</h2>
            <p className="text-body-base text-muted-text max-w-2xl mt-1">
              We are building something much larger than a typical services agency. The SAYAGA ecosystem is designed to systematically evolve from design execution to venture building.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md mt-space-sm">
            {trajectoryPhases.map((item) => (
              <div key={item.phase} className="p-space-sm bg-secondary-surface border border-hairline rounded flex flex-col gap-space-xxs">
                <span className="text-micro font-mono text-brass-accent font-semibold">{item.phase}</span>
                <h4 className="text-heading text-primary-text font-medium">{item.title}</h4>
                <p className="text-body-base text-muted-text leading-relaxed mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
