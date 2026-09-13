"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

import { GooglePlayIcon } from "@/components/icons";
import { useHeaderTransparency } from "@/context/header-transparency-context";
import { cn } from "@/lib/utils";
import { navLinks } from "@/constants/nav-links";

export const Header = () => {
  const { enabled, setEnabled } = useHeaderTransparency();

  const prevEnabled = useRef(true);

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenuActions = useCallback(() => {
    setEnabled(prevEnabled.current);

    document.body.style.overflow = "";
  }, [setEnabled]);

  const openMenuActions = useCallback(() => {
    prevEnabled.current = enabled;

    setEnabled(false);

    document.body.style.overflow = "hidden";
  }, [enabled, setEnabled]);

  const toggleMenu = useCallback(() => {
    if (mobileMenuOpen) {
      closeMenuActions();
    } else {
      openMenuActions();
    }

    setMobileMenuOpen(!mobileMenuOpen);
  }, [mobileMenuOpen, openMenuActions, closeMenuActions]);

  const closeMenu = useCallback(() => {
    if (!mobileMenuOpen) return;

    closeMenuActions();

    setMobileMenuOpen(false);
  }, [mobileMenuOpen, closeMenuActions]);

  useEffect(() => {
    if (!enabled) {
      requestAnimationFrame(() => setScrolled(true));
      return;
    }

    const handleScroll = () => setScrolled(window.scrollY > 0);

    window.addEventListener("scroll", handleScroll);
    requestAnimationFrame(handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [enabled]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 z-50 w-full border-b border-transparent transition-all duration-500",
          scrolled
            ? "border-slate-200/50 bg-white/90 py-3 shadow-sm backdrop-blur-xl"
            : "bg-transparent py-6",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <Link href="/" onClick={closeMenu} className="group z-50 flex items-center gap-3">
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
                  scrolled ? "text-slate-900" : "text-white",
                )}
              >
                SQL Studio<span className="text-[#00BCD4]">.</span>
              </span>
            </Link>

            <div className="hidden items-center justify-center space-x-1 md:flex">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 hover:text-[#00BCD4]",
                    scrolled ? "text-slate-600" : "text-slate-300 hover:text-white",
                  )}
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute inset-0 z-0 origin-center scale-0 rounded-full bg-[#00BCD4]/10 transition-transform duration-300 ease-out hover:scale-100" />
                </Link>
              ))}
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Link
                href="/download"
                className={cn(
                  "group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 hover:shadow-lg",
                  scrolled
                    ? "bg-slate-900 text-white hover:bg-[#00BCD4]"
                    : "bg-white text-slate-950 hover:bg-slate-100",
                )}
              >
                <GooglePlayIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                <span>Download App</span>
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className={cn(
                "relative z-50 p-2 transition-colors duration-300 focus:outline-none md:hidden",
                scrolled ? "text-slate-800" : "text-white",
              )}
            >
              {mobileMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </nav>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden",
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0",
        )}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 transition-colors hover:text-[#00BCD4]"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/download"
            onClick={closeMenu}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-[#00BCD4] px-8 py-3 text-lg font-bold text-white shadow-lg shadow-[#00BCD4]/30"
          >
            <GooglePlayIcon className="h-5 w-5" />
            Download App
          </Link>
        </div>
      </div>
    </>
  );
};
