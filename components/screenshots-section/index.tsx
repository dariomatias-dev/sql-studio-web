import { ScreenshotsCarousel } from "./screenshots-carousel";

export const ScreenshotsSection = () => {
  return (
    <section id="screenshots" className="relative overflow-hidden bg-white pt-24 md:pt-32">
      <div className="pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full bg-[#00BCD4]/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-6 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00BCD4]/30 bg-[#00BCD4]/5 px-3 py-1 text-xs font-bold tracking-wider text-[#00BCD4] uppercase">
            Interface Design
          </div>

          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Built for <br />
            <span className="bg-linear-to-r from-[#00BCD4] to-cyan-600 bg-clip-text text-transparent">
              Speed & Precision.
            </span>
          </h2>

          <p className="text-lg leading-relaxed font-light text-slate-500">
            A powerful interface that feels native. Clean layout, intuitive navigation, and
            optimized for one-handed use.
          </p>
        </div>

        <ScreenshotsCarousel />
      </div>
    </section>
  );
};
