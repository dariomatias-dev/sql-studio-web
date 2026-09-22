import { ArrowRight, Database, Sparkles, WifiOff, Zap } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { DarkGridBackdrop } from "@/shared/components/dark-grid-backdrop";
import { DownloadButton } from "@/shared/components/download-button";
import { PingIndicator } from "@/shared/components/ping-indicator";

export const HeroSection = () => {
  const t = useTranslations("Hero");

  const stats = [
    { icon: Database, label: t("sqliteNative") },
    { icon: Zap, label: t("instantQuery") },
    { icon: WifiOff, label: t("offlineReady") },
  ];

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black pt-24 pb-16">
      <DarkGridBackdrop />

      <div className="pointer-events-none absolute top-0 left-1/2 h-125 w-full -translate-x-1/2">
        <div className="animate-pulse-slow bg-brand/20 absolute -top-25 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]" />
        <div className="absolute -top-37.5 left-1/2 h-100 w-125 translate-x-1/4 rounded-full bg-purple-500/10 mix-blend-screen blur-[100px]" />
      </div>

      <div className="pointer-events-none absolute inset-0 h-full w-full opacity-40">
        <div className="absolute top-1/4 left-1/4 h-1 w-1 animate-ping rounded-full bg-white duration-3000" />
        <div className="bg-brand absolute top-1/3 right-1/3 h-1 w-1 animate-pulse rounded-full duration-4000" />
        <div className="absolute bottom-1/3 left-1/5 h-0.5 w-0.5 animate-ping rounded-full bg-white duration-5000" />
      </div>

      <div className="relative z-10 flex max-w-6xl flex-col items-center px-4 text-center md:px-6">
        <div className="group shadow-brand/5 hover:border-brand/30 relative mb-10 inline-flex cursor-default items-center gap-2.5 overflow-hidden rounded-full border border-white/10 bg-zinc-900/50 px-5 py-2 shadow-lg backdrop-blur-xl transition-all hover:bg-zinc-900/80">
          <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

          <PingIndicator />

          <span className="pl-0.5 text-xs font-bold tracking-wider text-zinc-300 uppercase transition-colors group-hover:text-white md:text-sm">
            {t("badge")}
          </span>
        </div>

        <h1 className="mb-8 text-6xl leading-[0.9] font-black tracking-tighter text-white drop-shadow-2xl md:text-7xl lg:text-8xl">
          {t("titleLine1")} <br />
          <span className="relative inline-block pb-2">
            <span className="bg-brand pointer-events-none absolute inset-0 opacity-20 blur-[60px]" />
            <span className="relative bg-linear-to-b from-white via-white to-zinc-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              {t("titleLine2")}
            </span>
          </span>
        </h1>

        <p className="mb-14 max-w-3xl text-lg leading-relaxed font-light text-zinc-400 md:text-2xl">
          {t("descriptionLead")}{" "}
          <span className="font-medium text-zinc-200">{t("descriptionStrong")}</span>
          <br className="hidden md:block" /> {t("descriptionRest")}
        </p>

        <div className="flex w-full flex-col items-center gap-6 sm:w-auto sm:flex-row">
          <DownloadButton />

          <Link
            href="#features"
            className="group hover:border-brand/50 inline-flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-black/50 px-10 py-5 text-lg font-medium text-zinc-300 backdrop-blur-md transition-all duration-300 hover:bg-zinc-900 hover:text-white"
          >
            <Sparkles className="group-hover:text-brand h-5 w-5 text-zinc-500 transition-colors" />
            <span>{t("exploreFeatures")}</span>
            <ArrowRight className="group-hover:text-brand h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-24 hidden w-full grid-cols-3 gap-6 border-t border-white/5 pt-10 md:grid md:gap-12">
          {stats.map((stat, idx) => (
            <div key={idx} className="group flex cursor-default flex-col items-center gap-4">
              <div className="group-hover:border-brand/30 group-hover:bg-brand/5 relative rounded-2xl border border-white/5 bg-zinc-900/50 p-3.5 transition-all duration-300">
                <div className="bg-brand absolute inset-0 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20" />
                <stat.icon className="group-hover:text-brand relative z-10 h-6 w-6 text-zinc-500 transition-colors" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-zinc-500 uppercase transition-colors group-hover:text-zinc-200">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
