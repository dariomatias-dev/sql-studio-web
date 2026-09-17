"use client";

import { ArrowUp } from "lucide-react";

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="group hover:border-brand/30 hover:shadow-glow-lg relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-3.5 backdrop-blur-md transition-all duration-300"
    >
      <div className="from-brand/0 via-brand/5 to-brand/0 absolute inset-0 -translate-x-full bg-linear-to-r transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 text-sm font-medium text-zinc-300 group-hover:text-white">
        Back to Top
      </span>
      <div className="bg-brand/10 text-brand group-hover:bg-brand relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 group-hover:text-black">
        <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
};
