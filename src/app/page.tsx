import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import WhoWeHelp from "@/components/WhoWeHelp";
import Capabilities from "@/components/Capabilities";
import Scenarios from "@/components/Scenarios";
import TrustLogos from "@/components/TrustLogos";
import CaseSnapshot from "@/components/CaseSnapshot";
import Industries from "@/components/Industries";

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

        {/* Who We Help Strip */}
        <WhoWeHelp />

        {/* What We Do In One Look */}
        <Capabilities />

        {/* Concrete Operational Blueprints */}
        <Scenarios />

        {/* Authority & Trust Band */}
        <TrustLogos />

        {/* Featured Case Snapshot */}
        <CaseSnapshot />

        {/* Sectors and Industries We Work In */}
        <Industries />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
