"use client";

import React, { useEffect } from "react";
import gsap from "gsap";

export default function GsapHoverProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  useEffect(() => {
    // Check for reduced motion preference or touch devices
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (prefersReducedMotion || isTouch) return;

    // Track attached elements to prevent duplicate listeners
    const cleanups: Array<() => void> = [];

    const attachHoverToButton = (el: HTMLElement) => {
      if (el.dataset.gsapHoverAttached === "true") return;
      el.dataset.gsapHoverAttached = "true";

      // Look for inner arrow or icon
      const arrow = el.querySelector<HTMLElement>(
        ".btn-arrow, [data-arrow], svg, span:last-child"
      );

      const onMouseMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Subtle magnetic displacement (subtle 0.18 factor)
        const deltaX = (e.clientX - centerX) * 0.18;
        const deltaY = (e.clientY - centerY) * 0.18;

        gsap.to(el, {
          x: deltaX,
          y: deltaY,
          duration: 0.35,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (arrow && arrow !== el) {
          const arrowIsLeft = arrow.textContent?.includes("←");
          const arrowX = arrowIsLeft ? -3 + deltaX * 0.3 : 4 + deltaX * 0.3;
          gsap.to(arrow, {
            x: arrowX,
            y: deltaY * 0.2,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const onMouseEnter = () => {
        gsap.to(el, {
          scale: 1.035,
          boxShadow: "0 6px 20px -6px rgba(28,27,25,0.18)",
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (arrow && arrow !== el) {
          const arrowIsLeft = arrow.textContent?.includes("←");
          gsap.to(arrow, {
            x: arrowIsLeft ? -4 : 4,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      };

      const onMouseLeave = () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          scale: 1,
          boxShadow: "0 0px 0px 0px rgba(0,0,0,0)",
          duration: 0.65,
          ease: "elastic.out(1, 0.4)",
          overwrite: "auto",
        });

        if (arrow && arrow !== el) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const onMouseDown = () => {
        gsap.to(el, {
          scale: 0.96,
          duration: 0.15,
          ease: "power2.inOut",
          overwrite: "auto",
        });
      };

      const onMouseUp = () => {
        gsap.to(el, {
          scale: 1.035,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      el.addEventListener("mousemove", onMouseMove);
      el.addEventListener("mouseenter", onMouseEnter);
      el.addEventListener("mouseleave", onMouseLeave);
      el.addEventListener("mousedown", onMouseDown);
      el.addEventListener("mouseup", onMouseUp);

      cleanups.push(() => {
        el.removeEventListener("mousemove", onMouseMove);
        el.removeEventListener("mouseenter", onMouseEnter);
        el.removeEventListener("mouseleave", onMouseLeave);
        el.removeEventListener("mousedown", onMouseDown);
        el.removeEventListener("mouseup", onMouseUp);
        delete el.dataset.gsapHoverAttached;
      });
    };

    const scanAndAttach = () => {
      // Select all interactive buttons and styled CTA links
      const buttons = document.querySelectorAll<HTMLElement>(
        "button, .gsap-btn, a.rounded-full, [data-gsap-btn]"
      );
      buttons.forEach((btn) => {
        // Skip hidden or disabled elements
        if (btn.classList.contains("no-gsap") || btn.hasAttribute("disabled"))
          return;
        attachHoverToButton(btn);
      });
    };

    scanAndAttach();

    // Observe DOM mutations for dynamically mounted buttons (e.g. modals, carousels)
    const observer = new MutationObserver(() => {
      scanAndAttach();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  return <>{children}</>;
}
