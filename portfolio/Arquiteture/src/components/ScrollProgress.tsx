"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState<number>(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const updateScrollProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? Math.min(Math.max(scrollTop / scrollHeight, 0), 1) : 0;

      const currentPercent = Math.round(progress * 100);
      setPercent(currentPercent);

      if (barRef.current) {
        if (prefersReducedMotion) {
          barRef.current.style.transform = `scaleX(${progress})`;
        } else {
          gsap.to(barRef.current, {
            scaleX: progress,
            duration: 0.2,
            ease: "power1.out",
            overwrite: "auto",
          });
        }
      }

      // Smoothly fade badge in when scrolled > 3%, fade out at very top
      if (badgeRef.current && !prefersReducedMotion) {
        if (scrollTop > 80) {
          gsap.to(badgeRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(badgeRef.current, {
            opacity: 0,
            y: 10,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    window.addEventListener("scroll", updateScrollProgress, { passive: true });
    window.addEventListener("resize", updateScrollProgress);
    updateScrollProgress();

    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      window.removeEventListener("resize", updateScrollProgress);
    };
  }, []);

  return (
    <>
      {/* Top Fixed Progress Track */}
      <div
        className="fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-[#EAE5DA]/50"
        aria-hidden="true"
      >
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#8C857B] via-[#4A463F] to-[#1C1B19] origin-left scale-x-0 will-change-transform"
        />
      </div>

      {/* Discreet floating editorial indicator (bottom right) */}
      <div
        ref={badgeRef}
        className="fixed bottom-6 right-6 z-40 pointer-events-none opacity-0 translate-y-2 hidden sm:flex items-center gap-2 bg-[#FBF9F5]/90 backdrop-blur-md border border-[#E5E0D6] px-2.5 py-1 rounded-full shadow-[0_4px_16px_-4px_rgba(0,0,0,0.06)] text-[10px] text-[#7A7469] font-mono tracking-wider select-none transition-shadow"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B19]/70 animate-pulse" />
        <span>{percent.toString().padStart(2, "0")}%</span>
      </div>
    </>
  );
}
