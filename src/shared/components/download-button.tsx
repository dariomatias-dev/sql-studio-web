import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { GooglePlayIcon } from "@/shared/icons";

export const DownloadButton = () => {
  const t = useTranslations("DownloadButton");

  return (
    <Link
      href="/download"
      className="group hover:shadow-glow-md focus:ring-brand/30 relative inline-flex items-center gap-4 rounded-xl bg-white px-8 py-3.5 font-semibold text-black shadow-xl transition-all duration-300 hover:bg-zinc-100 focus:ring-4 focus:outline-none md:px-10 md:py-4"
    >
      <GooglePlayIcon className="text-brand text-2xl transition-transform duration-500 ease-out group-hover:-rotate-15 md:text-3xl" />

      <div className="flex flex-col items-start gap-0.5 leading-none">
        <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase transition-colors group-hover:text-zinc-700">
          {t("downloadOn")}
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
          Google Play
        </span>
      </div>
    </Link>
  );
};
