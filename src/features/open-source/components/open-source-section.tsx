import { ArrowRight, CheckCircle2, Code2, TestTube } from "lucide-react";
import { useTranslations } from "next-intl";

import { APP_REPOSITORY_URL } from "@/shared/lib/site";

const statIcons = [TestTube, CheckCircle2, Code2];

interface StatMessage {
  label: string;
  value: string;
}

interface ModuleMessage {
  name: string;
  description: string;
}

export const OpenSourceSection = () => {
  const t = useTranslations("OpenSource");
  const stats = t.raw("stats") as StatMessage[];
  const modules = t.raw("modules") as ModuleMessage[];

  return (
    <section
      id="open-source"
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full bg-slate-50 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-3xl text-center">
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

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-100 bg-white p-6 text-center"
              >
                {Icon && <Icon className="text-brand mx-auto mb-3 h-6 w-6" />}
                <div className="mb-1 text-3xl font-extrabold text-slate-900">{stat.value}</div>
                <div className="text-sm text-slate-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <div key={module.name} className="rounded-2xl border border-slate-100 bg-white p-6">
              <h3 className="mb-2 font-mono text-sm font-bold text-cyan-700">{module.name}</h3>
              <p className="text-sm leading-relaxed text-slate-600">{module.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={APP_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:border-brand/50 inline-flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-900 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-slate-800"
          >
            <span>{t("viewSource")}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
