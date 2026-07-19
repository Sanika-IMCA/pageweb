import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";

export const metadata: Metadata = {
  title: "Work | Sayaga Studios — Business Systems & AI Engineering",
  description: "A scattered portfolio grid showcasing high-precision systems assets, dispatch sequencers, email triagers, and document compilers.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full pt-20">
        <CaseStudies />
      </main>

      <Footer />
    </div>
  );
}
