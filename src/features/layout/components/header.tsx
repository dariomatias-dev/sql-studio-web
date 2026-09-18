"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";

import { Link, usePathname } from "@/i18n/navigation";
import { GooglePlayIcon } from "@/shared/icons";
import { cn } from "@/shared/lib/cn";
import "@/shared/lib/suppress-dev-warnings";

import { LanguageSwitcher } from "./language-switcher";
import { navLinks } from "../data/nav-links";

export const Header = () => {
  const t = useTranslations("Nav");
  const tHeader = useTranslations("Header");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  // Every page but the home page has a light background from the first
  // paint, so the header must render solid immediately there — no flash of
  // white-on-white text while waiting for an effect to run. Only the home
  // page's dark hero needs the header to start transparent and turn solid
  // on scroll.
  const [scrolled, setScrolled] = useState(!isHomePage);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuId = useId();

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => setScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  useEffect(() => {
    // Fixes B5: without this, resizing to desktop with the menu open leaves the page scroll-locked.
    const desktopQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) setMobileMenuOpen(false);
    };

    handleChange(desktopQuery);
    desktopQuery.addEventListener("change", handleChange);

    return () => desktopQuery.removeEventListener("change", handleChange);
  }, []);

  // The mobile menu overlay is an opaque light panel, so the header above
  // it must read as solid while it's open, even on the home page.
  const solid = scrolled || mobileMenuOpen;

  return (
    <Dialog.Root open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full border-b border-transparent transition-all duration-500",
          solid
            ? "border-slate-200/50 bg-white/90 py-3 shadow-sm backdrop-blur-xl"
            : "bg-transparent py-6",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="group z-50 flex items-center gap-3"
            >
              <div className="relative">
                <Image
                  src="/icons/sql_studio.png"
                  alt="SQL Studio Logo"
                  width={40}
                  height={40}
                  className="drop-shadow-sm"
                />
              </div>
              <span
                className={cn(
                  "text-2xl font-extrabold tracking-tight transition-colors duration-300",
                  solid ? "text-slate-900" : "text-white",
                )}
              >
                SQL Studio<span className="text-brand">.</span>
              </span>
            </Link>

            <div className="hidden items-center justify-center space-x-1 md:flex">
              {navLinks
                .filter((link) => link.primary)
                .map(({ href, labelKey }) => (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "hover:text-brand relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300",
                      solid ? "text-slate-600" : "text-slate-300 hover:text-white",
                    )}
                  >
                    <span className="relative z-10">{t(labelKey)}</span>
                    <span className="bg-brand/10 absolute inset-0 z-0 origin-center scale-0 rounded-full transition-transform duration-300 ease-out hover:scale-100" />
                  </Link>
                ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <LanguageSwitcher variant={solid ? "light" : "dark"} />

              <Link
                href="/download"
                className={cn(
                  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg",
                  solid
                    ? "hover:bg-brand bg-slate-900 text-white"
                    : "bg-white text-slate-950 hover:bg-slate-100",
                )}
              >
                <GooglePlayIcon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-15" />
                <span>{tHeader("downloadApp")}</span>
              </Link>
            </div>

            <Dialog.Trigger asChild>
              <button
                aria-label="Open menu"
                aria-controls={mobileMenuId}
                className={cn(
                  "focus-visible:ring-brand relative z-50 rounded-md p-2 transition-colors duration-300 focus-visible:ring-2 focus-visible:outline-none md:hidden",
                  solid ? "text-slate-800" : "text-white",
                )}
              >
                <Menu className="h-7 w-7" />
              </button>
            </Dialog.Trigger>
          </nav>
        </div>
      </header>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 md:hidden" />

        <Dialog.Content
          id={mobileMenuId}
          className={cn(
            "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-2xl duration-500 md:hidden",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:slide-out-to-top",
          )}
        >
          <Dialog.Title className="sr-only">Navigation menu</Dialog.Title>

          <Dialog.Close asChild>
            <button
              aria-label="Close menu"
              className="focus-visible:ring-brand absolute top-6 right-4 p-2 text-slate-800 focus-visible:ring-2 focus-visible:outline-none"
            >
              <X className="h-7 w-7" />
            </button>
          </Dialog.Close>

          <div className="flex flex-col items-center space-y-6">
            {navLinks.map(({ href, labelKey }) => (
              <Dialog.Close key={href} asChild>
                <Link
                  href={href}
                  className="hover:text-brand text-2xl font-bold text-slate-800 transition-colors"
                >
                  {t(labelKey)}
                </Link>
              </Dialog.Close>
            ))}

            <LanguageSwitcher
              variant="light"
              className="mt-2"
              onNavigate={() => setMobileMenuOpen(false)}
            />

            <Dialog.Close asChild>
              <Link
                href="/download"
                className="bg-brand shadow-brand/30 mt-4 inline-flex items-center gap-2 rounded-full px-8 py-3 text-lg font-bold text-white shadow-lg"
              >
                <GooglePlayIcon className="h-5 w-5" />
                {tHeader("downloadApp")}
              </Link>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
