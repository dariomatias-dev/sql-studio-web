import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { PingIndicator } from "@/shared/components/ping-indicator";
import { APP_RELEASE_LABEL, APP_VERSION } from "@/shared/lib/app-release";
import { APP_REPOSITORY_URL, GITHUB_URL } from "@/shared/lib/site";

import { BackToTopButton } from "./back-to-top-button";
import { CopyrightYear } from "./copyright-year";
import { socialLinks } from "../data/social-links";

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-24 pb-12">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-[#00BCD4]/40 to-transparent shadow-[0_0_15px_rgba(0,188,212,0.5)]" />

      <div className="pointer-events-none absolute -top-75 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full bg-[#00BCD4]/10 blur-[120px]" />

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
              <PingIndicator size={10} color="#EAB308" glow={false} />

              <span className="text-xs font-bold tracking-wider text-zinc-300">
                <span className="uppercase">{APP_RELEASE_LABEL}</span> v{APP_VERSION}
              </span>
            </div>
          </div>

          <BackToTopButton />
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
                    <ChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
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
                  <ChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
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
                  <ChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
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
                  <ChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    Contact Support
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Open Source
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { href: APP_REPOSITORY_URL, label: "Source Code" },
                { href: `${APP_REPOSITORY_URL}/issues`, label: "Issues" },
                {
                  href: `${APP_REPOSITORY_URL}/blob/main/docs/contributing.md`,
                  label: "Contributing Guide",
                },
              ].map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center text-zinc-400 transition-colors duration-200 hover:text-[#00BCD4]"
                  >
                    <ChevronRight className="mr-0 h-2.5 w-0 text-[#00BCD4] opacity-0 transition-all duration-300 group-hover:mr-2 group-hover:w-2.5 group-hover:opacity-100" />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              Connect
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Built with passion for the SQL community.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
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
          <p className="font-medium text-zinc-400">
            &copy; <CopyrightYear /> SQL Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-zinc-900/30 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/50">
            <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
              Built by
            </span>
            <a
              href={GITHUB_URL}
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
