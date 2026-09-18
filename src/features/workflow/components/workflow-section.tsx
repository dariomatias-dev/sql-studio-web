import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { stepColors, stepIcons } from "../data/workflow-icons";

interface StepMessage {
  title: string;
  description: string;
}

export const WorkflowSection = () => {
  const t = useTranslations("Workflow");
  const steps = t.raw("steps") as StepMessage[];

  return (
    <section id="workflow" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-16 lg:flex-row lg:gap-24">
          <div className="lg:w-1/2">
            <div className="bg-brand/10 mb-8 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase">
              {t("badge")}
            </div>

            <h2 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
              {t("titleLine1")} <br />
              <span className="from-brand bg-linear-to-r to-cyan-600 bg-clip-text text-transparent">
                {t("titleLine2")}
              </span>
            </h2>

            <p className="mb-16 max-w-lg text-lg leading-relaxed font-light text-slate-500">
              {t("description")}
            </p>

            <div className="relative space-y-12">
              <div className="absolute top-4 bottom-4 left-6.75 w-0.5 bg-linear-to-b from-slate-200 via-slate-200 to-transparent" />

              {steps.map((step, index) => {
                const Icon = stepIcons[index];
                const color = stepColors[index];

                return (
                  <div key={step.title} className="group relative flex gap-8">
                    <div className="relative shrink-0">
                      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <div
                          className={`absolute inset-0 bg-linear-to-br ${color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                        />
                        {Icon && (
                          <Icon className="group-hover:text-brand h-6 w-6 text-slate-600 transition-colors duration-300" />
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <h3 className="group-hover:text-brand mb-3 flex items-center gap-2 text-xl font-bold text-slate-900 transition-colors duration-300">
                        {step.title}
                        <ArrowRight className="text-brand h-4 w-4 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                      </h3>
                      <p className="max-w-md text-base leading-relaxed text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative flex w-full justify-center lg:w-1/2 lg:justify-end">
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-3/2 w-3/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/20 blur-[120px]" />

            <div className="relative z-10">
              <div className="relative rounded-[2.5rem] border-8 border-slate-950 bg-slate-950 shadow-2xl">
                <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-slate-950" />

                <Image
                  src="/screenshots/03_editor.png"
                  alt={t("mockupAlt")}
                  width={320}
                  height={712}
                  className="relative z-10 rounded-4xl"
                />

                <div className="absolute -right-12 bottom-20 z-30 animate-bounce duration-3000">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/50 bg-white/90 p-4 pr-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="mb-0.5 text-xs font-bold tracking-wider text-slate-400 uppercase">
                        {t("statusLabel")}
                      </p>
                      <p className="text-sm font-bold text-slate-900">{t("queryExecuted")}</p>
                    </div>
                  </div>
                </div>

                <div className="absolute top-32 -left-8 z-30">
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 shadow-xl backdrop-blur-xl">
                    <div className="mb-2 flex items-center gap-3">
                      <div className="h-3 w-3 rounded-full bg-red-500" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500" />
                      <div className="h-3 w-3 rounded-full bg-green-500" />
                    </div>
                    <div className="w-32 space-y-2">
                      <div className="h-2 w-full rounded-full bg-slate-700" />
                      <div className="h-2 w-2/3 rounded-full bg-slate-700" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
