"use client";

import Link from "next/link";
import { FaArrowUp, FaChevronRight } from "react-icons/fa";

import { socialLinks } from "@/constants/social-links";
import { PingIndicator } from "./ping-indicator";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-24 pb-12">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[#00BCD4]/40 to-transparent shadow-[0_0_15px_rgba(0,188,212,0.5)]" />

      <div className="pointer-events-none absolute -top-[300px] left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-[#00BCD4]/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="lg:max-w-md">
            <Link href="/" className="group mb-6 inline-block">
              <span className="text-3xl font-extrabold tracking-tight text-white transition-all duration-300 group-hover:text-[#00BCD4]">
                SQL Studio
                <span className="text-[#00BCD4] drop-shadow-[0_0_15px_rgba(0,188,212,0.5)]">.</span>
              </span>
            </Link>
            <p className="mb-8 max-w-sm text-sm leading-7 font-light text-zinc-400">
              The professional database client designed for modern developers. Manage your SQLite
              databases with speed, efficiency, and style directly from your mobile device.
            </p>

            <div className="inline-flex cursor-default items-center gap-3 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 backdrop-blur-md transition-colors hover:border-[#00BCD4]/30">
              <PingIndicator size={10} color="#10AF78" glow={false} />

              <span className="text-xs font-bold tracking-wider text-zinc-300">
                <span className="uppercase">Stable Release</span> v0.1.x
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/40 px-6 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-[#00BCD4]/30 hover:shadow-[0_0_30px_-10px_rgba(0,188,212,0.15)]"
          >
            <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-[#00BCD4]/0 via-[#00BCD4]/5 to-[#00BCD4]/0 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 text-sm font-medium text-zinc-300 group-hover:text-white">
              Back to Top
            </span>
            <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#00BCD4]/10 text-[#00BCD4] transition-all duration-300 group-hover:bg-[#00BCD4] group-hover:text-black">
              <FaArrowUp size={12} className="transition-transform group-hover:-translate-y-0.5" />
            </div>
          </button>
        </div>

        <div className="mb-20 grid grid-cols-2 gap-12 border-t border-white/5 pt-16 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              {["Features", "Screenshots", "Workflow", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="group flex items-center text-zinc-400 transition-colors duration-200 hover:text-[#00BCD4]"
                  >
                    <FaChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="group flex items-center text-zinc-400 transition-colors duration-200 hover:text-[#00BCD4]"
                >
                  <FaChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="group flex items-center text-zinc-400 transition-colors duration-200 hover:text-[#00BCD4]"
                >
                  <FaChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center text-zinc-400 transition-colors duration-200 hover:text-[#00BCD4]"
                >
                  <FaChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Contact Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Connect
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Built with passion for the SQL community.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-zinc-900 text-zinc-400 transition-all duration-300 hover:border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 hover:text-[#00BCD4] hover:shadow-[0_0_20px_-5px_rgba(0,188,212,0.2)]"
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-[#00BCD4]/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <Icon
                    size={20}
                    className="relative z-10 transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 text-sm md:flex-row">
          <p className="font-medium text-zinc-500">
            &copy; {currentYear} SQL Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-zinc-900/30 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/50">
            <span className="text-xs font-bold tracking-wider text-zinc-500 uppercase">
              Built by
            </span>
            <a
              href="https://github.com/dariomatias-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-zinc-200 transition-colors hover:text-[#00BCD4]"
            >
              Dário Matias
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
