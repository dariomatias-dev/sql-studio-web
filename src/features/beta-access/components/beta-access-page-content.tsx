import { useTranslations } from "next-intl";

import { PingIndicator } from "@/shared/components/ping-indicator";

import { BetaAccessForm } from "./beta-access-form";

interface StepMessage {
  step: string;
  title: string;
  description: string;
}

const BetaAccessPageContent = () => {
  const t = useTranslations("Download");
  const steps = t.raw("steps") as StepMessage[];

  return (
    <section className="relative flex min-h-screen flex-col items-center overflow-hidden bg-white pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]"></div>
      <div className="bg-brand/5 pointer-events-none absolute top-0 left-1/2 h-125 w-250 -translate-x-1/2 rounded-full blur-[130px]"></div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6">
        <div className="mb-12 text-center">
          <div className="mb-8 inline-flex cursor-default items-center gap-2.5 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-1.5 shadow-sm">
            <PingIndicator size={8.5} color="#EAB308" glow={false} />

            <span className="text-xs font-bold tracking-wider text-yellow-700 uppercase">
              {t("badge")}
            </span>
          </div>

          <h1 className="mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            {t("titleLine1")} <br />
            <span className="from-brand bg-linear-to-r to-cyan-600 bg-clip-text text-transparent">
              {t("titleLine2")}
            </span>
          </h1>

          <p className="mx-auto max-w-lg text-lg leading-relaxed text-slate-500">
            {t("description")}
          </p>
        </div>

        <BetaAccessForm />

        <div className="mt-12 w-full border-t border-slate-200 pt-8">
          <h2 className="mb-6 text-center font-semibold text-slate-900">{t("howItWorksTitle")}</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="group flex flex-col items-center gap-2 text-center">
                <span className="border-brand/20 bg-brand/10 mb-1 rounded-md border px-2 py-1 text-xs font-bold text-cyan-700">
                  {t("stepLabel")} {item.step}
                </span>
                <span className="text-sm font-bold text-slate-700">{item.title}</span>
                <span className="max-w-37.5 text-xs leading-relaxed text-slate-500">
                  {item.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BetaAccessPageContent;
