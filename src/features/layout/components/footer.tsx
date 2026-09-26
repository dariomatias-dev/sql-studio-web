"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { Link as LocaleLink } from "@/i18n/navigation";
import { PingIndicator } from "@/shared/components/ping-indicator";
import { APP_RELEASE_LABEL, APP_VERSION } from "@/shared/lib/app-release";
import { GITHUB_URL } from "@/shared/lib/site";

import { BackToTopButton } from "./back-to-top-button";
import { FooterLinkContent } from "./footer-link-content";
import { legalNavLinks } from "../data/legal-nav-links";
import { navLinks } from "../data/nav-links";
import { openSourceLinks } from "../data/open-source-links";
import { socialLinks } from "../data/social-links";

export const Footer = () => {
  const t = useTranslations("Nav");
  const tFooter = useTranslations("Footer");

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black pt-24 pb-12">
      <div className="absolute inset-0 mask-[radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="via-brand/40 shadow-glow-xs absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent to-transparent" />

      <div className="bg-brand/10 pointer-events-none absolute -top-75 left-1/2 h-75 w-150 -translate-x-1/2 rounded-full blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-20 flex flex-col items-start justify-between gap-10 lg:flex-row">
          <div className="lg:max-w-md">
            <LocaleLink href="/" className="group mb-6 inline-block">
              <span className="group-hover:text-brand text-3xl font-extrabold tracking-tight text-white transition-all duration-300">
                SQL Studio
                <span className="text-brand drop-shadow-glow-xs">.</span>
              </span>
            </LocaleLink>
            <p className="mb-8 max-w-sm text-sm leading-7 font-light text-zinc-400">
              {tFooter("tagline")}
            </p>

            <div className="hover:border-brand/30 inline-flex cursor-default items-center gap-3 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-2 backdrop-blur-md transition-colors">
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
              {tFooter("productHeading")}
            </h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <LocaleLink
                    href={href}
                    className="group hover:text-brand flex items-center text-zinc-400 transition-colors duration-200"
                  >
                    <FooterLinkContent>{t(labelKey)}</FooterLinkContent>
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              {tFooter("legalHeading")}
            </h3>
            <ul className="space-y-3 text-sm">
              {legalNavLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group hover:text-brand flex items-center text-zinc-400 transition-colors duration-200"
                  >
                    <FooterLinkContent>{tFooter(labelKey)}</FooterLinkContent>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              {tFooter("openSourceHeading")}
            </h3>
            <ul className="space-y-3 text-sm">
              {openSourceLinks.map(({ href, labelKey }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover:text-brand flex items-center text-zinc-400 transition-colors duration-200"
                  >
                    <FooterLinkContent>{tFooter(labelKey)}</FooterLinkContent>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="mb-6 text-xs font-bold tracking-[0.2em] text-white uppercase">
              {tFooter("connectHeading")}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              {tFooter("connectTagline")}
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="group hover:border-brand/30 hover:bg-brand/10 hover:text-brand hover:shadow-glow-sm relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/5 bg-zinc-900 text-zinc-400 transition-all duration-300"
                >
                  <div className="from-brand/10 absolute inset-0 bg-linear-to-tr to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
            &copy; {new Date().getFullYear()} SQL Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-2.5 rounded-full border border-white/5 bg-zinc-900/30 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-800/50">
            <span className="text-xs font-bold tracking-wider text-zinc-400 uppercase">
              {tFooter("builtBy")}
            </span>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand font-bold text-zinc-200 transition-colors"
            >
              Dário Matias
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
