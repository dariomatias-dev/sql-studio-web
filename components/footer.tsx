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
    <footer className="relative bg-black pt-24 pb-12 overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-[#00BCD4]/40 to-transparent shadow-[0_0_15px_rgba(0,188,212,0.5)]" />

      <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00BCD4]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-10">
          <div className="lg:max-w-md">
            <Link href="/" className="inline-block mb-6 group">
              <span className="text-3xl font-extrabold text-white tracking-tight transition-all duration-300 group-hover:text-[#00BCD4]">
                SQL Studio
                <span className="text-[#00BCD4] drop-shadow-[0_0_15px_rgba(0,188,212,0.5)]">
                  .
                </span>
              </span>
            </Link>
            <p className="text-zinc-400 text-sm leading-7 mb-8 font-light max-w-sm">
              The professional database client designed for modern developers.
              Manage your SQLite databases with speed, efficiency, and style
              directly from your mobile device.
            </p>

            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/10 backdrop-blur-md transition-colors hover:border-[#00BCD4]/30 cursor-default">
              <PingIndicator size={10} color="#10AF78" glow={false} />

              <span className="text-xs font-bold text-zinc-300 tracking-wider">
                <span className="uppercase">Stable Release</span> v0.1.x
              </span>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="group relative flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-md overflow-hidden hover:border-[#00BCD4]/30 hover:shadow-[0_0_30px_-10px_rgba(0,188,212,0.15)] transition-all duration-300"
          >
            <div className="absolute inset-0 bg-linear-to-r from-[#00BCD4]/0 via-[#00BCD4]/5 to-[#00BCD4]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="text-sm font-medium text-zinc-300 group-hover:text-white relative z-10">
              Back to Top
            </span>
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#00BCD4]/10 text-[#00BCD4] group-hover:bg-[#00BCD4] group-hover:text-black transition-all duration-300 relative z-10">
              <FaArrowUp
                size={12}
                className="group-hover:-translate-y-0.5 transition-transform"
              />
            </div>
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mb-20 border-t border-white/5 pt-16">
          <div>
            <h3 className="text-white font-bold mb-6 text-xs tracking-[0.2em] uppercase">
              Product
            </h3>
            <ul className="space-y-3 text-sm">
              {["Features", "Screenshots", "Workflow", "FAQ"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/#${item.toLowerCase()}`}
                    className="group flex items-center text-zinc-400 hover:text-[#00BCD4] transition-colors duration-200"
                  >
                    <FaChevronRight className="w-0 h-2.5 mr-0 opacity-0 group-hover:w-2.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 text-[#00BCD4]" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {item}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-bold mb-6 text-xs tracking-[0.2em] uppercase">
              Legal
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="group flex items-center text-zinc-400 hover:text-[#00BCD4] transition-colors duration-200"
                >
                  <FaChevronRight className="w-0 h-2.5 mr-0 opacity-0 group-hover:w-2.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 text-[#00BCD4]" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Privacy Policy
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="group flex items-center text-zinc-400 hover:text-[#00BCD4] transition-colors duration-200"
                >
                  <FaChevronRight className="w-0 h-2.5 mr-0 opacity-0 group-hover:w-2.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 text-[#00BCD4]" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Terms of Service
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="group flex items-center text-zinc-400 hover:text-[#00BCD4] transition-colors duration-200"
                >
                  <FaChevronRight className="w-0 h-2.5 mr-0 opacity-0 group-hover:w-2.5 group-hover:mr-2 group-hover:opacity-100 transition-all duration-300 text-[#00BCD4]" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    Contact Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <h3 className="text-white font-bold mb-6 text-xs tracking-[0.2em] uppercase">
              Connect
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Built with passion for the SQL community.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  className="group flex items-center justify-center w-11 h-11 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-[#00BCD4] hover:border-[#00BCD4]/30 hover:bg-[#00BCD4]/10 hover:shadow-[0_0_20px_-5px_rgba(0,188,212,0.2)] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-tr from-[#00BCD4]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Icon
                    size={20}
                    className="group-hover:scale-110 transition-transform relative z-10"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm border-t border-white/5 pt-10">
          <p className="text-zinc-500 font-medium">
            &copy; {currentYear} SQL Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-900/30 border border-white/5 backdrop-blur-sm hover:border-zinc-700 hover:bg-zinc-800/50 transition-all duration-300">
            <span className="text-zinc-500 text-xs uppercase tracking-wider font-bold">
              Built by
            </span>
            <a
              href="https://github.com/dariomatias-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-200 font-bold hover:text-[#00BCD4] transition-colors"
            >
              Dário Matias
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
