"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SalesLoginPage() {
  const [accessKey, setAccessKey] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/internal/sales/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: accessKey })
      });

      const data = await res.json();
      if (data.success) {
        router.push("/internal/sales");
      } else {
        setErrorMsg(data.message || "Invalid access key token");
      }
    } catch (err: unknown) {
      setErrorMsg("Network compilation error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-base text-primary-text font-sans flex items-center justify-center p-6">
      
      {/* Decorative frame overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(46, 91, 148, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(46, 91, 148, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px"
        }}
      />

      <div className="w-full max-w-md bg-secondary-surface border border-hairline p-8 sm:p-10 rounded-[2rem] relative z-10 flex flex-col gap-6 shadow-xl">
        
        <div className="flex flex-col gap-2">
          <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            SAYAGAA OPERATIONS
          </span>
          <h2 className="text-[1.85rem] font-bold text-primary-text font-display leading-tight uppercase">
            SALES PIPELINE LOGIN
          </h2>
          <p className="text-micro text-muted-text font-mono leading-relaxed mt-1">
            Access credentials required for the internal prospecting registry.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[0.62rem] font-mono text-muted-text font-bold uppercase tracking-wider">
              OPERATOR ACCESS TOKEN
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={accessKey}
              onChange={(e) => setAccessKey(e.target.value)}
              className="bg-charcoal-base border border-hairline rounded-xl px-4 py-3 text-micro font-mono text-primary-text placeholder-muted-text/30 focus:border-brass-accent outline-none transition-colors"
            />
          </div>

          {errorMsg && (
            <span className="text-micro font-mono text-accent-red font-bold uppercase">
              {errorMsg}
            </span>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent text-white font-mono text-micro font-bold py-3.5 rounded-xl transition-all duration-300 transform active:scale-98 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? "AUTHORIZING..." : "ACCESS WORKSPACE →"}
          </button>
        </form>

        {/* Identity Provider Warning / Setup Details (Section 30) */}
        <div className="border border-brass-accent/15 bg-brass-accent/[0.01] rounded-2xl p-5 flex flex-col gap-2 font-mono text-[0.62rem] text-muted-text leading-relaxed">
          <span className="text-brass-accent font-bold uppercase tracking-wider block">
            AUTHENTICATION DEPENDENCY NOTICE
          </span>
          <p>
            For production deployment, this area must integrate with a secure identity provider such as NextAuth.js or Clerk.
          </p>
          <div className="border-t border-hairline/40 pt-2 mt-1">
            <span className="text-primary-text block font-bold">REQUIRED CONFIGURATION:</span>
            <code className="text-brass-accent text-[0.58rem] mt-0.5 block select-all">
              INTERNAL_SALES_KEY=your-secure-secret-token
            </code>
          </div>
        </div>

      </div>
    </div>
  );
}
