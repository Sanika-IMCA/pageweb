import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import ProcessSpine from "@/components/ProcessSpine";
import PageSpine from "@/components/PageSpine";
import Capabilities from "@/components/Capabilities";
import CaseStudies from "@/components/CaseStudies";
import Industries from "@/components/Industries";
import Difference from "@/components/Difference";
import PartnerNetwork from "@/components/PartnerNetwork";
import TrustLogos from "@/components/TrustLogos";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      
      {/* 00 — Preloader Sequence */}
      <Preloader />

      {/* 00 — Layout Spine Left Navigation */}
      <PageSpine />

      {/* 01 — Header Nav */}
      <Navigation />

      {/* Main Body (Shifted left margin padding on desktop to clear PageSpine columns) */}
      <main className="flex-1 w-full flex flex-col z-10 lg:pl-24">
        
        {/* 01 — Hero Block */}
        <div id="hero" className="w-full">
          <Hero />
        </div>

        {/* 02 — Philosophy Block */}
        <Philosophy />

        {/* 03 — Process Block */}
        <ProcessSpine />

        {/* 04 — Capabilities Block */}
        <Capabilities />

        {/* 05 — Case Studies Block */}
        <CaseStudies />

        {/* 06 — Industries Marquee */}
        <div id="industries">
          <Industries />
        </div>

        {/* 07 — Inverted Difference Block */}
        <div id="difference">
          <Difference />
        </div>

        {/* 08 — Partner Network Block */}
        <div id="partners">
          <PartnerNetwork />
        </div>

        {/* 09 — Trust Wall Marquee */}
        <div id="trust">
          <TrustLogos />
        </div>

      </main>

      {/* 10 — Letterhead Footer */}
      <div className="lg:pl-24">
        <Footer />
      </div>
    </div>
  );
}
