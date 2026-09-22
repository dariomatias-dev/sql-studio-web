import { useTranslations } from "next-intl";

import { SectionHeader } from "@/shared/components/section-header";

import { ScreenshotsCarousel } from "./screenshots-carousel";

export const ScreenshotsSection = () => {
  const t = useTranslations("Screenshots");

  return (
    <section id="screenshots" className="relative overflow-hidden bg-white pt-24 md:pt-32">
      <div className="bg-brand/5 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <SectionHeader
          className="mx-auto mb-6 max-w-3xl text-center"
          badge={t("badge")}
          title={
            <>
              {t("titleLine1")} <br />
              <span className="from-brand bg-linear-to-r to-cyan-600 bg-clip-text text-transparent">
                {t("titleLine2")}
              </span>
            </>
          }
          description={t("description")}
        />

        <ScreenshotsCarousel />
      </div>
    </section>
  );
};
