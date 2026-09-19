"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/shared/lib/cn";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

// Fades and slides content up on scroll into view. Starts visible (matching
// SSR/no-JS output); if it turns out to be below the fold, it hides itself
// instantly (no transition) so a scan or screen reader never catches it
// mid-fade, then animates back in once actually scrolled into view.
export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          setVisible(true);
          observer.unobserve(el);
        } else {
          setVisible(false);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        animated && "transition-all duration-700 ease-out",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
