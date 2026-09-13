import Link from "next/link";
import { FaGooglePlay } from "react-icons/fa";

export const DownloadButton = () => {
  return (
    <Link
      href="/download"
      className="group relative inline-flex items-center gap-4 rounded-xl bg-white px-8 py-3.5 font-semibold text-black shadow-xl transition-all duration-300 hover:bg-zinc-100 hover:shadow-[0_0_30px_-5px_rgba(0,188,212,0.3)] focus:ring-4 focus:ring-[#00BCD4]/30 focus:outline-none md:px-10 md:py-4"
    >
      <FaGooglePlay className="text-2xl text-[#00BCD4] transition-transform duration-500 ease-out group-hover:rotate-[-15deg] md:text-3xl" />

      <div className="flex flex-col items-start gap-0.5 leading-none">
        <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase transition-colors group-hover:text-zinc-700">
          Download on
        </span>
        <span className="text-lg font-bold tracking-tight text-slate-900 md:text-xl">
          Google Play
        </span>
      </div>
    </Link>
  );
};
