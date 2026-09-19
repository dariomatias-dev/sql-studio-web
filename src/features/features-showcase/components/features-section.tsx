import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/components/reveal";

import { featureIcons } from "../data/features";

import type { FeatureMessage } from "../data/feature.types";

export const FeaturesSection = () => {
  const t = useTranslations("Features");
  const items = t.raw("items") as FeatureMessage[];

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]" />

      <div className="bg-brand/5 pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-100 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-20 max-w-3xl text-center">
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

        <div className="grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2">
          {items.map((feature, index) => {
            const Icon = featureIcons[index];

            return (
              <div key={feature.title} className="group flex gap-4 border-b border-slate-100 pb-8">
                <div className="border-brand/20 bg-brand/5 text-brand group-hover:border-brand group-hover:bg-brand flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:text-white">
                  {Icon && (
                    <Icon className="h-5 w-5 transition-colors duration-300 group-hover:text-white" />
                  )}
                </div>

                <div>
                  <h3 className="group-hover:text-brand mb-1 text-lg font-bold text-slate-900 transition-colors duration-200">
                    {feature.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-slate-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
