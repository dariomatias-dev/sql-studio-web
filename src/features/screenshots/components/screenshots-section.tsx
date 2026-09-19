import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/components/reveal";

import { ScreenshotsCarousel } from "./screenshots-carousel";

export const ScreenshotsSection = () => {
  const t = useTranslations("Screenshots");

  return (
    <section id="screenshots" className="relative overflow-hidden bg-white pt-24 md:pt-32">
      <div className="bg-brand/5 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <Reveal className="mx-auto mb-6 max-w-3xl text-center">
          <div className="border-brand/30 bg-brand/5 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase">
            {t("badge")}
          </div>

          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {t("titleLine1")} <br />
            <span className="from-brand bg-linear-to-r to-cyan-600 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h2>

          <p className="text-lg leading-relaxed font-light text-slate-500">{t("description")}</p>
        </Reveal>

        <ScreenshotsCarousel />
      </div>
    </section>
  );
};
