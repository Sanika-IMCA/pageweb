import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CaseStudies from "@/components/CaseStudies";

export const metadata: Metadata = {
  title: "Work | Sayagaa — AI Systems & Automation",
  description: "A public timeline documenting daily iterations, features shipped, technical challenges, and engineering lessons.",
};

export default function WorkPage() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full pt-20">
        <CaseStudies />
      </main>

      <Footer />
    </div>
  );
}
