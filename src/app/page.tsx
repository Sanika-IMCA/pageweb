import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Capabilities from "@/components/Capabilities";
import CaseStudies from "@/components/CaseStudies";
import Difference from "@/components/Difference";
import PartnerNetwork from "@/components/PartnerNetwork";
import ProcessSpine from "@/components/ProcessSpine";
import TrustLogos from "@/components/TrustLogos";
import JournalSection from "@/components/JournalSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      
      {/* 00 — Preloader Sequence */}
      <Preloader />

      {/* 01 — Header Nav */}
      <Navigation />

      {/* Main Body */}
      <main className="flex-1 w-full flex flex-col z-10">
        
        {/* 01 — Hero Block */}
        <div id="hero" className="w-full">
          <Hero />
        </div>

        {/* 02 — Trusted by leading companies (logo strip) */}
        <div id="trust">
          <TrustLogos />
        </div>

        {/* 03 — Featured case studies */}
        <div id="work">
          <CaseStudies />
        </div>

        {/* 04 — Services */}
        <div id="services">
          <Capabilities />
        </div>

        {/* 05 — Client Testimonials */}
        <div id="difference">
          <Difference />
        </div>

        {/* 06 — Impact Numbers */}
        <div id="partners">
          <PartnerNetwork />
        </div>

        {/* 07 — Process */}
        <div id="process">
          <ProcessSpine />
        </div>

        {/* 08 — Journal */}
        <div id="journal">
          <JournalSection />
        </div>

      </main>

      {/* 10 — Footer */}
      <Footer />
    </div>
  );
}
