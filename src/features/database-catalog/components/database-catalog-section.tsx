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
      className="relative overflow-hidden bg-white px-4 py-24 md:px-8 md:py-32"
    >
      <div className="bg-brand/5 pointer-events-none absolute top-0 left-1/2 h-96 w-full max-w-3xl -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-20 max-w-3xl text-center">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((database) => (
            <div
              key={database.name}
              className="group hover:border-brand/30 relative rounded-2xl border border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="border-brand/20 bg-brand/5 text-brand group-hover:border-brand group-hover:bg-brand flex h-10 w-10 items-center justify-center rounded-xl border transition-all duration-300 group-hover:text-white">
                  <DatabaseIcon className="h-5 w-5" />
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                  {database.tableCount} {database.tableCount === 1 ? t("table") : t("tables")}
                </span>
              </div>

              <h3 className="mb-1 text-lg font-bold text-slate-900">{database.name}</h3>

              <p className="text-sm leading-relaxed text-slate-500">{database.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
