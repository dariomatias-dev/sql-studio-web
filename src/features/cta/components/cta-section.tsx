import { Check, ShieldCheck } from "lucide-react";

import { DownloadButton } from "@/shared/components/download-button";
import { PingIndicator } from "@/shared/components/ping-indicator";

export const CtaSection = () => {
  return (
    <section
      id="cta"
      className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-20 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 h-full w-full">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px] opacity-20" />

        <div className="animate-pulse-slow absolute top-0 left-1/2 h-64 w-full max-w-3xl -translate-x-1/2 rounded-full bg-[#00BCD4]/10 opacity-50 mix-blend-screen blur-[100px]" />
        <div className="animate-pulse-slow absolute right-0 bottom-0 h-100 w-100 rounded-full bg-purple-900/10 opacity-30 mix-blend-screen blur-[120px]" />
      </div>

      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[#00BCD4]/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <div className="mb-8 inline-flex cursor-default items-center gap-x-3 rounded-full border border-white/10 bg-zinc-900/40 p-1.5 pr-4 pl-2 shadow-lg ring-1 shadow-[#00BCD4]/5 ring-white/5 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-zinc-900/60 hover:ring-white/10">
          <span className="flex items-center justify-center rounded-full bg-[#00BCD4]/10 px-2.5 py-0.5 text-[10px] font-bold tracking-wide text-[#00BCD4] uppercase ring-1 ring-[#00BCD4]/20 ring-inset">
            Beta
          </span>
          <div className="h-4 w-px bg-white/10" />
          <span className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight text-zinc-300">
            v0.1.x
            <PingIndicator />
          </span>
        </div>

        <h2 className="mb-6 text-4xl leading-[1.1] font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          SQL power in your <br />
          <span className="bg-linear-to-b from-white via-zinc-200 to-zinc-600 bg-clip-text text-transparent">
            pocket.
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          The database client designed for touch. Query, edit, and visualize your data with the
          speed of a desktop app, entirely for free.
        </p>

        <div className="flex flex-col items-center justify-center gap-8">
          <DownloadButton />

          <div className="flex flex-col items-center gap-4 text-sm font-medium text-zinc-500 sm:flex-row sm:gap-6">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[#00BCD4]" />
              No account required
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-zinc-800 sm:block" />
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-[#00BCD4]" />
              100% Free & Private
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
