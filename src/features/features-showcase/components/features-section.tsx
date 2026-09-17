import { PingIndicator } from "@/shared/components/ping-indicator";

import { features } from "../data/features";

export const FeaturesSection = () => {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]" />

      <div className="bg-brand/5 pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-100 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="border-brand/30 bg-brand/5 mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase">
            Powerful Capabilities
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Engineered for <br />
            <span className="from-brand bg-linear-to-r to-cyan-600 bg-clip-text text-transparent">
              Modern Performance.
            </span>
          </h2>
          <p className="text-lg leading-relaxed font-light text-slate-500">
            Everything you need to practice SQL, built for touch and 100% offline.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group hover:border-brand/30 hover:shadow-glow-xl relative rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="border-brand/20 bg-brand/5 text-brand group-hover:border-brand group-hover:bg-brand relative mb-6 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                <feature.icon className="relative z-10 h-7 w-7 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="group-hover:text-brand mb-3 text-xl font-bold text-slate-900 transition-colors duration-200">
                {feature.title}
              </h3>

              <p className="text-sm leading-relaxed text-slate-600 group-hover:text-slate-700 md:text-base">
                {feature.description}
              </p>

              <PingIndicator className="absolute top-4 right-4" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
