import { Database as DatabaseIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { DarkGridBackdrop } from "@/shared/components/dark-grid-backdrop";
import { SectionHeader } from "@/shared/components/section-header";

interface DatabaseMessage {
  name: string;
  description: string;
  tableCount: number;
}

export const DatabaseCatalogSection = () => {
  const t = useTranslations("Databases");
  const items = t.raw("items") as DatabaseMessage[];

  return (
    <section
      id="databases"
      className="relative overflow-hidden bg-black px-4 py-24 md:px-8 md:py-32"
    >
      <DarkGridBackdrop />
      <div className="bg-brand/10 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeader
          variant="dark"
          className="mx-auto mb-20 max-w-3xl text-center"
          badge={t("badge")}
          title={
            <>
              {t("titleLine1")} <br />
              <span className="from-brand bg-linear-to-r to-cyan-400 bg-clip-text text-transparent">
                {t("titleLine2")}
              </span>
            </>
          }
          description={t("description")}
        />

        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((database) => (
            <div key={database.name} className="group flex gap-3 border-b border-white/10 pb-6">
              <div className="border-brand/30 bg-brand/10 text-brand group-hover:border-brand group-hover:bg-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 group-hover:text-white">
                <DatabaseIcon className="h-4 w-4" />
              </div>

              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-bold text-white">{database.name}</h3>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold text-zinc-300">
                    {database.tableCount} {database.tableCount === 1 ? t("table") : t("tables")}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400">{database.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
