"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

import type { UseEmblaCarouselType } from "embla-carousel-react";

const screenshots = [
  { src: "/screenshots/01_home.png", alt: "Home / SQL editor" },
  { src: "/screenshots/02_databases.png", alt: "Databases" },
  { src: "/screenshots/03_editor.png", alt: "SQL editor with an active database" },
  { src: "/screenshots/04_drawer.png", alt: "Navigation drawer" },
  { src: "/screenshots/05_visualizer.png", alt: "Database visualizer" },
  { src: "/screenshots/06_settings.png", alt: "Settings" },
  { src: "/screenshots/07_language_selector.png", alt: "Language selector" },
  { src: "/screenshots/08_theme_selector.png", alt: "Theme selector" },
  { src: "/screenshots/09_sql_suggestions_settings.png", alt: "SQL suggestions settings" },
  { src: "/screenshots/10_workspace_layout_settings.png", alt: "Workspace layout settings" },
];

export const ScreenshotsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);

  // Embla only exists after mount, so the first render where it becomes
  // available needs selectedIndex synced to it. Doing that here, during
  // render, avoids calling setState from inside an effect body just to
  // read an already-current value (see https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes).
  const [syncedApi, setSyncedApi] = useState<UseEmblaCarouselType[1]>(undefined);
  if (emblaApi !== syncedApi) {
    setSyncedApi(emblaApi);
    if (emblaApi) setSelectedIndex(emblaApi.selectedScrollSnap());
  }

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const handleSlideKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollPrev();
      }
    },
    [scrollNext, scrollPrev],
  );

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-8 md:py-12">
      <div className="z-10 w-full max-w-[1800px] perspective-[1000px]">
        <div
          className="overflow-visible"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="App screenshots"
        >
          <div className="flex touch-pan-y items-center">
            {screenshots.map(({ src, alt }, index) => {
              const isSelected = index === selectedIndex;

              return (
                <div
                  key={index}
                  className="relative min-w-0 flex-[0_0_75%] px-2 sm:flex-[0_0_50%] sm:px-4 md:flex-[0_0_35%] lg:flex-[0_0_25%]"
                  style={{ transformStyle: "preserve-3d" }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${screenshots.length}`}
                >
                  <button
                    type="button"
                    className="group relative w-full cursor-pointer transition-all duration-500 ease-out"
                    onClick={() => scrollTo(index)}
                    onKeyDown={handleSlideKeyDown}
                    style={{
                      transform: isSelected
                        ? "scale(1) translateZ(0)"
                        : "scale(0.85) translateZ(-20px)",
                      opacity: isSelected ? 1 : 0.4,
                      zIndex: isSelected ? 20 : 10,
                      filter: isSelected ? "grayscale(0%)" : "grayscale(100%)",
                    }}
                  >
                    <div className="relative overflow-hidden rounded-4xl border-[3px] border-slate-200 bg-white shadow-xl transition-all duration-300 sm:rounded-4xl sm:border-4 sm:shadow-2xl">
                      <div className="relative aspect-9/21 w-full bg-slate-50">
                        <Image
                          src={src}
                          alt={alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 75vw, (max-width: 768px) 50vw, (max-width: 1024px) 35vw, min(25vw, 450px)"
                          priority={index === 0}
                        />
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-50" />
                      </div>
                    </div>

                    <div
                      className={`absolute -bottom-6 left-1/2 h-4 w-3/4 -translate-x-1/2 rounded-[100%] bg-slate-400/30 blur-lg transition-all duration-500 sm:-bottom-10 sm:blur-xl ${
                        isSelected ? "scale-100 opacity-100" : "scale-75 opacity-0"
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="z-20 mt-8 flex max-w-[90vw] items-center gap-3 rounded-full border border-slate-100 bg-white/80 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-xl sm:max-w-none sm:gap-4 sm:p-2 md:mt-14">
        <button
          onClick={scrollPrev}
          className="group hover:bg-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 hover:text-white active:scale-95 sm:h-10 sm:w-10"
          aria-label="Previous slide"
        >
          <ArrowLeft className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
        </button>

        <div className="hidden items-center gap-2 px-2 sm:flex">
          {screenshots.map((_, i) => (
            <button
              key={i}
              className="relative flex h-6 w-6 cursor-pointer items-center justify-center"
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                  i === selectedIndex ? "bg-brand w-6" : "w-1.5 bg-slate-200 hover:bg-slate-300"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="min-w-15 px-2 text-center sm:hidden">
          <span className="text-sm font-semibold text-slate-600">
            {selectedIndex + 1} <span className="mx-1 text-slate-300">/</span> {screenshots.length}
          </span>
        </div>

        <button
          onClick={scrollNext}
          className="group hover:bg-brand flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-50 transition-all duration-300 hover:text-white active:scale-95 sm:h-10 sm:w-10"
          aria-label="Next slide"
        >
          <ArrowRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-white sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};
