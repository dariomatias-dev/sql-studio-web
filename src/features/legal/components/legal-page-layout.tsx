import { Calendar } from "lucide-react";

import { PageHeaderBackdrop } from "@/shared/components/page-header-backdrop";

interface LegalPageLayoutProps {
  icon: React.ReactNode;
  title: string;
  lastUpdated: string;
  intro: React.ReactNode;
  children: React.ReactNode;
}

export const LegalPageLayout = ({
  icon,
  title,
  lastUpdated,
  intro,
  children,
}: LegalPageLayoutProps) => (
  <section className="relative min-h-screen overflow-hidden bg-white pt-32 pb-24">
    <PageHeaderBackdrop />

    <div className="relative z-10 mx-auto max-w-3xl px-6">
      <div className="mb-16 border-b border-slate-100 pb-12 text-center">
        <div className="bg-brand/5 text-brand ring-brand/20 mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl ring-1">
          {icon}
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>

        <div className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-50 px-4 py-2 text-sm font-medium text-slate-500">
          <Calendar className="h-4 w-4" />
          <span>Last Updated: {lastUpdated}</span>
        </div>
      </div>

      <div className="prose prose-slate prose-lg max-w-none text-slate-600">
        <div className="mb-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-sm md:text-base">
          <p className="mb-0">{intro}</p>
        </div>

        <div className="space-y-12">{children}</div>
      </div>
    </div>
  </section>
);
