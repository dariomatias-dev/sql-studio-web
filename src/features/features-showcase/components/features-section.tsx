import { Code, Database, LayoutDashboard, Lock, Palette, Play } from "lucide-react";

import { PingIndicator } from "@/shared/components/ping-indicator";

const features = [
  {
    icon: Code,
    title: "Smart SQL Editor",
    description:
      "Advanced syntax highlighting, auto-completion, and real-time error checking designed for a seamless mobile coding experience.",
  },
  {
    icon: Database,
    title: "SQLite Native",
    description:
      "Built specifically for SQLite. Connect, manage, and modify your local databases with native performance and zero latency.",
  },
  {
    icon: Play,
    title: "Execute & Visualize",
    description:
      "Run complex queries instantly. View results in beautiful, scrollable tables and analyze data with formatted outputs.",
  },
  {
    icon: Lock,
    title: "Pre-filled Practice",
    description:
      "Start coding immediately. Access a library of pre-populated databases to sharpen your skills without the hassle of setup.",
  },
  {
    icon: Palette,
    title: "Customizable UI",
    description:
      "Your environment, your rules. Switch between professional themes, adjust font sizes, and toggle layouts to match your workflow.",
  },
  {
    icon: LayoutDashboard,
    title: "Schema Explorer",
    description:
      "Navigate your database structure visually. Inspect tables, views, triggers, and indexes with an intuitive browser.",
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="relative overflow-hidden bg-white px-4 py-24 md:px-8">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[40px_40px]" />

      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00BCD4]/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-slate-100 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#00BCD4]/30 bg-[#00BCD4]/5 px-3 py-1 text-xs font-bold tracking-wider text-cyan-700 uppercase">
            Powerful Capabilities
          </div>
          <h2 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Engineered for <br />
            <span className="bg-linear-to-r from-[#00BCD4] to-cyan-600 bg-clip-text text-transparent">
              Modern Performance.
            </span>
          </h2>
          <p className="text-lg leading-relaxed font-light text-slate-500">
            SQL Studio combines the raw power of a desktop client with the elegance of a mobile app.
            Every pixel designed for efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-slate-100 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#00BCD4]/30 hover:shadow-[0_10px_40px_-10px_rgba(0,188,212,0.15)]"
            >
              <div className="relative mb-6 inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-[#00BCD4]/20 bg-[#00BCD4]/5 text-[#00BCD4] shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:border-[#00BCD4] group-hover:bg-[#00BCD4]">
                <feature.icon className="relative z-10 h-7 w-7 transition-colors duration-300 group-hover:text-white" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-[#00BCD4]">
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
