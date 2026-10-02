"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const dot = dotRef.current;
      const ring = ringRef.current;
      if (!dot || !ring) return;

      document.body.classList.add("cursor-enhanced");
      gsap.set([dot, ring], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

      const setDotX = gsap.quickSetter(dot, "x", "px");
      const setDotY = gsap.quickSetter(dot, "y", "px");
      const ringX = gsap.quickTo(ring, "x", { duration: 0.075, ease: "power1.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.075, ease: "power1.out" });

      const onMove = (event: PointerEvent) => {
        setDotX(event.clientX);
        setDotY(event.clientY);
        ringX(event.clientX);
        ringY(event.clientY);
        if (dot.style.visibility === "hidden") gsap.set([dot, ring], { autoAlpha: 1 });
      };
      const onLeave = () => gsap.set([dot, ring], { autoAlpha: 0 });

      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);

      return () => {
        document.body.classList.remove("cursor-enhanced");
        window.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
      };
    });
  });

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 hidden overflow-hidden lg:block">
      <div ref={dotRef} className="pointer-events-none fixed left-0 top-0 h-2 w-2 rounded-full bg-white opacity-0" />
      <div ref={ringRef} className="pointer-events-none fixed left-0 top-0 h-7 w-7 rounded-full border border-white/40 bg-white/5 opacity-0" />
    </div>
  );
}
