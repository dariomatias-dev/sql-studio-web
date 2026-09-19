import { ArrowRight, CheckCircle2, Code2, TestTube } from "lucide-react";
import { useTranslations } from "next-intl";

import { Reveal } from "@/shared/components/reveal";
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
      className="relative overflow-hidden bg-black px-4 py-24 md:px-8 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem] opacity-20" />
      <div className="bg-brand/10 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/50 px-3 py-1 text-xs font-bold tracking-wider text-zinc-300 uppercase">
            {t("badge")}
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
            {t("titleLine1")} <br />
            <span className="from-brand bg-linear-to-r to-cyan-400 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h2>
          <p className="text-lg leading-relaxed font-light text-zinc-400">{t("description")}</p>
        </Reveal>

        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat, index) => {
            const Icon = statIcons[index];

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 text-center"
              >
                {Icon && <Icon className="text-brand mx-auto mb-3 h-6 w-6" />}
                <div className="mb-1 text-3xl font-extrabold text-white">{stat.value}</div>
                <div className="text-sm text-zinc-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map((module) => (
            <div
              key={module.name}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6"
            >
              <h3 className="text-brand mb-2 font-mono text-sm font-bold">{module.name}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{module.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={APP_REPOSITORY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-base font-semibold text-black transition-colors duration-300 hover:bg-zinc-100"
          >
            <span>{t("viewSource")}</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};
