"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { FaGooglePlay } from "react-icons/fa";

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
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b border-transparent",
          scrolled
            ? "bg-white/90 backdrop-blur-xl py-3 shadow-sm border-slate-200/50"
            : "bg-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              onClick={closeMenu}
              className="flex items-center gap-3 group z-50"
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
                  scrolled ? "text-slate-900" : "text-white"
                )}
              >
                SQL Studio<span className="text-[#00BCD4]">.</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center justify-center space-x-1">
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:text-[#00BCD4]",
                    scrolled
                      ? "text-slate-600"
                      : "text-slate-300 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{label}</span>
                  <span className="absolute inset-0 bg-[#00BCD4]/10 rounded-full scale-0 transition-transform duration-300 ease-out hover:scale-100 origin-center z-0" />
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/download"
                className={cn(
                  "group relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg ",
                  scrolled
                    ? "bg-slate-900 text-white hover:bg-[#00BCD4]"
                    : "bg-white text-slate-950 hover:bg-slate-100"
                )}
              >
                <FaGooglePlay className="w-4 h-4 transition-transform duration-300 group-hover:rotate-[-15deg]" />
                <span>Download App</span>
              </Link>
            </div>

            <button
              onClick={toggleMenu}
              className={cn(
                "md:hidden relative z-50 p-2 focus:outline-none transition-colors duration-300",
                scrolled ? "text-slate-800" : "text-white"
              )}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </nav>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl transition-all duration-500 ease-in-out md:hidden flex flex-col justify-center items-center gap-8",
          mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-6">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={closeMenu}
              className="text-2xl font-bold text-slate-800 hover:text-[#00BCD4] transition-colors"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/download"
            onClick={closeMenu}
            className="mt-4 px-8 py-3 bg-[#00BCD4] text-white text-lg font-bold rounded-full shadow-lg shadow-[#00BCD4]/30 inline-flex items-center gap-2"
          >
            <FaGooglePlay className="w-5 h-5" />
            Download App
          </Link>
        </div>
      </div>
    </>
  );
};
