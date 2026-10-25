'use client';

import { useEffect, useState } from "react";

const steps = Array.from({ length: 11 }, (_, index) => index / 10);

export function PageProgress() {
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    const updateProgress = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollableHeight > 0 ? Math.max(0, Math.min(1, window.scrollY / scrollableHeight)) : null);
    };

    updateProgress();
    const observer = new ResizeObserver(updateProgress);
    observer.observe(document.body);
    observer.observe(document.documentElement);
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  if (progress === null) return null;

  const activeStep = Math.round(progress * (steps.length - 1));

  return (
    <>
      <div className="mobile-page-progress fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-1/2 z-40 flex h-7 -translate-x-1/2 items-center rounded border border-foreground/10 bg-background/50 px-4 text-foreground shadow-[0_2px_12px_rgb(0_0_0/0.04)] backdrop-blur-md md:hidden">
        <div className="relative flex h-7 w-36 items-center">
          <div aria-hidden="true" className="pointer-events-none relative flex h-3 w-full items-center justify-between">
            {steps.map((step, index) => {
              const distance = Math.abs(index - activeStep);
              return (
                <span
                  key={step}
                  className={`w-px rounded-full bg-current transition-all duration-200 motion-reduce:transition-none ${distance <= 1 ? "h-2 opacity-50" : "h-1 opacity-20"}`}
                />
              );
            })}
            <span className="absolute h-3 w-0.5 -translate-x-1/2 rounded-full bg-accent" style={{ left: `${progress * 100}%` }} />
          </div>
          <input
            type="range"
            min="0"
            max="100"
            step="1"
            value={Math.round(progress * 100)}
            aria-label="Page progress"
            aria-valuetext={`${Math.round(progress * 100)}% of page`}
            className="absolute -inset-y-2 left-0 h-11 w-full cursor-ew-resize opacity-0"
            onChange={(event) => window.scrollTo({
              top: (Number(event.target.value) / 100) * (document.documentElement.scrollHeight - window.innerHeight),
              behavior: "instant",
            })}
          />
        </div>
      </div>
      <nav
        aria-label="Page progress"
        className="fixed right-0 top-1/2 z-40 hidden w-8 -translate-y-1/2 flex-col md:flex xl:right-6"
      >
        {steps.map((progress, index) => {
          const distance = Math.abs(index - activeStep);
          const label = `Scroll to ${Math.round(progress * 100)}%`;

          return (
            <button
              key={index}
              type="button"
              aria-label={label}
              aria-current={distance === 0 ? "location" : undefined}
              title={label}
              className="group relative flex h-6 w-full items-center px-1 text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              onClick={() => window.scrollTo({
                top: progress * (document.documentElement.scrollHeight - window.innerHeight),
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
              })}
            >
              <span
                aria-hidden="true"
                className={`h-0.5 rounded-full bg-current transition-all duration-200 motion-reduce:transition-none group-hover:!w-full group-hover:!opacity-100 group-focus-visible:!w-full group-focus-visible:!opacity-100 ${
                  distance <= 1 ? "w-3.5 opacity-50 xl:w-4" : "w-2 opacity-20 xl:w-2.5"
                }`}
              />
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="pointer-events-none absolute left-1 top-full h-px w-1 -translate-y-1/2 bg-foreground/20 xl:w-1.5" />
              )}
            </button>
          );
        })}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-3 left-1 right-1">
          <span
            className="absolute h-0.5 w-5 -translate-y-1/2 rounded-full bg-foreground/90 xl:w-6"
            style={{ top: `${progress * 100}%` }}
          />
        </div>
      </nav>
    </>
  );
}
