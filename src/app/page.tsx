import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import ProblemRecognition from "@/components/ProblemRecognition";
import SymptomSystem from "@/components/SymptomSystem";
import WhoWeHelp from "@/components/WhoWeHelp";
import Qualification from "@/components/Qualification";
import Capabilities from "@/components/Capabilities";
import WhatWeInvestigate from "@/components/WhatWeInvestigate";
import Scenarios from "@/components/Scenarios";
import TrustLogos from "@/components/TrustLogos";
import CaseSnapshot from "@/components/CaseSnapshot";
import Industries from "@/components/Industries";
import WhatHappensAfter from "@/components/WhatHappensAfter";
import AuditSummary from "@/components/AuditSummary";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans">
      
      {/* 00 — Preloader Sequence */}
      <Preloader />

      {/* 01 — Header Nav */}
      <Navigation />

      {/* Main Body */}
      <main className="flex-1 w-full flex flex-col z-10">
        
        {/* Hero Block */}
        <div id="hero" className="w-full">
          <Hero />
        </div>

        {/* 02 — Problem Recognition Strip */}
        <ProblemRecognition />

        {/* 03 — Symptom -> System interactive diagnosis block */}
        <SymptomSystem />

        {/* 04 — Who We Help Strip */}
        <WhoWeHelp />

        {/* 05 — Qualification fit/no-fit checklist */}
        <Qualification />

        {/* 06 — What We Do In One Look */}
        <Capabilities />

        {/* 07 — What We Investigate checklist */}
        <WhatWeInvestigate />

        {/* 08 — Concrete Operational Blueprints */}
        <Scenarios />

        {/* 09 — Authority & Trust Band */}
        <TrustLogos />

        {/* 10 — Featured Case Snapshot */}
        <CaseSnapshot />

        {/* 11 — Sectors and Industries We Work In */}
        <Industries />

        {/* 12 — Reassurance Timeline */}
        <WhatHappensAfter />

        {/* 13 — Final Audit summary & Scoping CTA */}
        <AuditSummary />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
