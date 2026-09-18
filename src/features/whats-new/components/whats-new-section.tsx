import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { APP_VERSION } from "@/shared/lib/app-release";

interface ReleaseMessage {
  version: string;
  date: string;
  highlights: string[];
}

export const WhatsNewSection = () => {
  const t = useTranslations("WhatsNew");
  const releases = t.raw("releases") as ReleaseMessage[];

  return (
    <section
      id="whats-new"
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-50 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
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
        </div>

        <div className="relative space-y-12">
          <div className="absolute top-4 bottom-4 left-6.75 w-0.5 bg-linear-to-b from-slate-200 via-slate-200 to-transparent" />

          {releases.map((release) => (
            <div key={release.version} className="relative flex gap-8">
              <div className="relative shrink-0">
                <div className="border-brand/30 bg-brand/5 relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border font-mono text-sm font-bold text-cyan-700">
                  v{release.version}
                </div>
              </div>

              <div className="pt-2">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{release.date}</h3>
                  {release.version === APP_VERSION && (
                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      {t("current")}
                    </span>
                  )}
                </div>
                <ul className="space-y-2">
                  {release.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <Check className="text-brand mt-1 h-4 w-4 shrink-0" />
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
