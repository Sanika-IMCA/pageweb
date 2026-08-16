"use client";

import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-48 pb-24 flex flex-col justify-center items-center text-center relative z-10">
        <div className="flex flex-col gap-6 max-w-md items-center border border-hairline/60 bg-secondary-surface p-12 rounded-[2.5rem] shadow-sm backdrop-blur-md">
          <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            ERROR 404
          </span>
          <h1 className="text-[2.25rem] sm:text-[3rem] font-bold tracking-tight text-primary-text leading-none font-display uppercase">
            PAGE NOT FOUND.
          </h1>
          <p className="text-[0.92rem] text-muted-text font-semibold leading-relaxed">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-3.5 px-8 rounded-xl shadow active:scale-98 font-mono uppercase tracking-wider"
            >
              Return to Sayagaa &rarr;
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
