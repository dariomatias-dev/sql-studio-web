"use client";

import { ArrowUp } from "lucide-react";

export const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-[#00BCD4]/30 hover:shadow-[0_0_30px_-10px_rgba(0,188,212,0.15)]"
    >
      <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-[#00BCD4]/0 via-[#00BCD4]/5 to-[#00BCD4]/0 transition-transform duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 text-sm font-medium text-zinc-300 group-hover:text-white">
        Back to Top
      </span>
      <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#00BCD4]/10 text-[#00BCD4] transition-all duration-300 group-hover:bg-[#00BCD4] group-hover:text-black">
        <ArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
      </div>
    </button>
  );
};
