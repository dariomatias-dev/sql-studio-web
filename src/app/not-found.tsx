import { ArrowLeft, FileQuestion } from "lucide-react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-white px-6">
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] bg-size-[24px_24px] opacity-40" />

      <div className="pointer-events-none absolute top-0 right-0 h-150 w-150 translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-b from-blue-50 to-transparent opacity-60 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-125 w-125 -translate-x-1/2 translate-y-1/2 rounded-full bg-linear-to-t from-cyan-50 to-transparent opacity-60 blur-3xl" />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <div className="relative mb-8 flex justify-center">
          <div className="absolute inset-0 -z-10 flex items-center justify-center">
            <span className="text-[12rem] leading-none font-black tracking-tighter text-slate-50 select-none md:text-[18rem]">
              404
            </span>
          </div>

          <div className="relative mt-12 flex h-32 w-32 items-center justify-center rounded-3xl border border-slate-100 bg-white shadow-xl md:mt-20 md:h-40 md:w-40">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-[#00BCD4]/10 to-transparent" />
            <FileQuestion className="h-12 w-12 text-[#00BCD4] md:h-16 md:w-16" />
          </div>
        </div>

        <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-6xl">
          Page not found
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-lg leading-relaxed text-slate-500 md:text-xl">
          The requested URL was not found on this server. It might have been moved or deleted.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border-2 border-slate-200 bg-transparent px-10 py-4 text-base font-bold text-slate-900 transition-colors duration-300 hover:border-slate-900 hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFoundPage;
