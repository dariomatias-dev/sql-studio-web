import { Languages as LanguagesIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/components/reveal";
import { SectionHeader } from "@/shared/components/section-header";

import { languages } from "../data/languages";

export const LanguagesSection = () => {
  const t = useTranslations("Languages");

  return (
    <section
      id="languages"
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-100 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          className="mx-auto mb-20 max-w-3xl text-center"
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

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {languages.map((language, index) => (
            <Reveal key={language.code} delay={index * 100} className="flex flex-col items-center">
              <div className="relative w-full max-w-56 overflow-hidden rounded-4xl border-4 border-slate-200 bg-white shadow-xl">
                <Image
                  src={language.screenshot}
                  alt={t("screenshotAlt", { language: language.name })}
                  width={280}
                  height={623}
                  className="w-full"
                />
              </div>
              <div className="mt-4 flex items-center gap-2">
                <LanguagesIcon className="text-brand h-4 w-4" />
                <span className="font-semibold text-slate-700">{language.name}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
