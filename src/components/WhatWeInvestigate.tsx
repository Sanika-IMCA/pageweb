"use client";

export default function WhatWeInvestigate() {
  const checklist = [
    {
      num: "01",
      title: "REPEATED WORK",
      desc: "Where people perform the same action repeatedly."
    },
    {
      num: "02",
      title: "MANUAL HANDOFFS",
      desc: "Where information moves from one person or tool to another manually."
    },
    {
      num: "03",
      title: "DUPLICATED DATA",
      desc: "Where the same information exists in multiple places."
    },
    {
      num: "04",
      title: "OPERATIONAL BLIND SPOTS",
      desc: "Where managers cannot easily see status, ownership, or exceptions."
    },
    {
      num: "05",
      title: "SYSTEM GAPS",
      desc: "Where existing software stops being sufficient for the way the business operates."
    }
  ];

  const handleScrollToMethodology = () => {
    // Scrolls to the approach / process spine timeline section
    const el = document.getElementById("what-this-can-look-like");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
            07 / DIAGNOSIS
          </span>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
            WHAT WE LOOK FOR<br />
            <span className="text-brass-accent">BEFORE WE BUILD.</span>
          </h2>
        </div>

        {/* Structured Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {checklist.map((item) => (
            <div
              key={item.num}
              className="bg-white border border-hairline/60 p-6 rounded-2xl flex flex-col gap-4 shadow-sm hover:border-brass-accent/30 transition-colors duration-300"
            >
              <div className="flex justify-between items-center border-b border-hairline/35 pb-3">
                <span className="text-micro font-mono text-brass-accent font-bold">
                  {item.num}
                </span>
                <span className="text-[0.55rem] font-mono text-muted-text/30 uppercase tracking-widest">
                  CHECK
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-[0.88rem] font-mono font-bold text-primary-text tracking-wider uppercase leading-snug">
                  {item.title}
                </h3>
                <p className="text-[0.8rem] text-muted-text font-semibold leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Block Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-hairline/45 pt-10 mt-2">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
              DELIVERABLE VALUE
            </span>
            <strong className="text-[1.35rem] text-primary-text font-display uppercase tracking-tight leading-snug">
              THE OUTPUT ISN&apos;T &ldquo;MORE SOFTWARE.&rdquo; IT&apos;S A CLEARER OPERATION.
            </strong>
          </div>

          <button
            onClick={handleScrollToMethodology}
            className="inline-flex items-center justify-center text-[0.8rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3.5 px-8 rounded-xl shadow-sm active:scale-98 font-mono uppercase tracking-wider w-full sm:w-auto text-center cursor-pointer"
          >
            SEE THE METHODOLOGY →
          </button>
        </div>

      </div>
    </section>
  );
}
