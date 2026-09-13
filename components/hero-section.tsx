import { ArrowRight, Database, Sparkles, WifiOff, Zap } from "lucide-react";
import Link from "next/link";

import { DownloadButton } from "./download-button";
import { PingIndicator } from "./ping-indicator";

export const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem] opacity-20" />

      <div className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-full -translate-x-1/2">
        <div className="animate-pulse-slow absolute top-[-100px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#00BCD4]/20 mix-blend-screen blur-[120px]" />
        <div className="absolute top-[-150px] left-1/2 h-[400px] w-[500px] translate-x-1/4 rounded-full bg-purple-500/10 mix-blend-screen blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
        <div className="absolute top-1/4 left-1/4 h-1 w-1 animate-ping rounded-full bg-white duration-[3s]" />
        <div className="absolute top-1/3 right-1/3 h-1 w-1 animate-pulse rounded-full bg-[#00BCD4] duration-[4s]" />
        <div className="absolute bottom-1/3 left-1/5 h-0.5 w-0.5 animate-ping rounded-full bg-white duration-[5s]" />
      </div>

      <div className="relative z-10 flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <div className="group relative mb-10 inline-flex cursor-default items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-zinc-900/50 px-5 py-2 shadow-lg shadow-[#00BCD4]/5 backdrop-blur-xl transition-all hover:border-[#00BCD4]/30 hover:bg-zinc-900/80">
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          <PingIndicator />

          <span className="pl-0.5 text-xs font-bold tracking-wider text-zinc-300 uppercase transition-colors group-hover:text-white md:text-sm">
            Native SQLite Client
          </span>
        </div>

        <h1 className="mb-8 text-6xl leading-[0.9] font-black tracking-tighter text-white drop-shadow-2xl md:text-8xl lg:text-9xl">
          SQL Studio <br />
          <span className="relative inline-block pb-2">
            <span className="pointer-events-none absolute inset-0 bg-[#00BCD4] opacity-20 blur-[60px]" />
            <span className="relative bg-linear-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Anywhere.
            </span>
          </span>
        </h1>

        <p className="mb-14 max-w-3xl text-lg leading-relaxed font-light text-zinc-400 md:text-2xl">
          The power of a desktop database client,{" "}
          <span className="font-medium text-zinc-200">re-engineered for touch.</span>
          <br className="hidden md:block" /> Fast, private, and 100% offline-first.
        </p>

        <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
          <DownloadButton />

          <Link
            href="#features"
            className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-10 py-5 text-lg font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:border-[#00BCD4]/50 hover:bg-zinc-900 hover:text-white"
          >
            <Sparkles className="h-5 w-5 text-zinc-500 transition-colors group-hover:text-[#00BCD4]" />
            <span>Explore Features</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:text-[#00BCD4]" />
          </Link>
        </div>

        <div className="mt-24 hidden w-full grid-cols-3 gap-6 border-t border-white/5 pt-10 md:grid md:gap-12">
          {[
            { icon: Database, label: "SQLite Native" },
            { icon: Zap, label: "Instant Query" },
            { icon: WifiOff, label: "Offline Ready" },
          ].map((feature, idx) => (
            <div key={idx} className="group flex cursor-default flex-col items-center gap-4">
              <div className="relative rounded-2xl border border-white/5 bg-zinc-900/50 p-3.5 transition-all duration-300 group-hover:border-[#00BCD4]/30 group-hover:bg-[#00BCD4]/5">
                <div className="absolute inset-0 bg-[#00BCD4] opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
                <feature.icon className="relative z-10 h-6 w-6 text-zinc-500 transition-colors group-hover:text-[#00BCD4]" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase transition-colors group-hover:text-zinc-200">
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
