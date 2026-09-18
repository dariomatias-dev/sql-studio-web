import { Database as DatabaseIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-size-[4rem_4rem] opacity-20" />
      <div className="bg-brand/10 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full mix-blend-screen blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
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
        </div>

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
