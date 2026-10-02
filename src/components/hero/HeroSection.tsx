"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { contactUrl, siteConfig } from "@/data/siteConfig";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          all: "(min-width: 0px)",
          finePointer: "(hover: hover) and (pointer: fine)",
        },
        (context) => {
          const { reduceMotion, finePointer } = context.conditions as { reduceMotion: boolean; finePointer: boolean };

          if (reduceMotion) {
            // Immediate reveal if user prefers reduced motion
            gsap.set(".hero-line, .hero-sub, .hero-cta, .hero-badge", {
              opacity: 1,
              y: 0,
              scale: 1,
            });
            gsap.set(".hero-watermark", { opacity: 0.14, y: 0, scale: 1 });
            return;
          }

          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

          // Background watermark subtle scale & reveal
          tl.fromTo(
            watermarkRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 0.14, scale: 1, duration: 1.4, ease: "power2.out" },
            0
          );

          // Top badge reveal
          tl.fromTo(
            ".hero-badge",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.2
          );

          // Headline lines reveal through clipping masks
          tl.fromTo(
            ".hero-line",
            { y: "110%", opacity: 0 },
            { y: "0%", opacity: 1, duration: 0.9, stagger: 0.12 },
            0.3
          );

          // Subtext reveal
          tl.fromTo(
            ".hero-sub",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8 },
            0.7
          );

          // CTAs & indicators
          tl.fromTo(
            ".hero-cta",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 },
            0.9
          );

          // Subtle floating reaction on watermark via gentle mouse tracking
          if (!finePointer) return;

          const moveX = gsap.quickTo(watermarkRef.current, "x", { duration: 1.5, ease: "power1.out" });
          const moveY = gsap.quickTo(watermarkRef.current, "y", { duration: 1.5, ease: "power1.out" });
          const handleMouseMove = (e: MouseEvent) => {
            if (!watermarkRef.current) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 20;
            const y = (e.clientY / innerHeight - 0.5) * 20;
            moveX(x);
            moveY(y);
          };

          window.addEventListener("mousemove", handleMouseMove);
          return () => window.removeEventListener("mousemove", handleMouseMove);
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] lg:min-h-screen flex flex-col justify-between pt-32 pb-12 px-6 md:px-10 overflow-hidden bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      {/* Discrete Architectural Monogram Watermark */}
      <div
        ref={watermarkRef}
        aria-hidden="true"
        className="hero-watermark absolute -right-16 top-1/4 w-[380px] md:w-[620px] lg:w-[780px] aspect-square pointer-events-none select-none opacity-0"
      >
        <Image
          src="/monogram-light.png"
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 380px, (max-width: 1200px) 620px, 780px"
          className="object-contain filter grayscale contrast-125"
        />
      </div>

      {/* Top Meta Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-4">
        <div className="hero-badge inline-flex items-center gap-3 py-1.5 px-3 border border-white/10 bg-white/[0.02]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white" />
          </span>
          <span className="text-[11px] font-mono-tech tracking-wider uppercase text-neutral-300">
            Estúdio Digital Independente • Projetos Selecionados
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-10 lg:py-16">
        <div className="max-w-5xl">
          {/* Main Headline with Mask Clip Reveal */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] font-heading font-light tracking-[-0.035em] text-white leading-[1.06]">
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">Sites que transformam</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">
                presença digital em
              </span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="hero-line block">
                <span className="italic font-serif font-normal text-white underline decoration-white/30 underline-offset-8">oportunidades</span>.
              </span>
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mt-8 max-w-2xl">
            <p className="hero-sub text-base sm:text-lg md:text-xl text-neutral-400 font-normal leading-relaxed">
              {siteConfig.subtext}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-10 sm:mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href={contactUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta group relative inline-flex items-center gap-3 px-7 py-4 bg-white text-black font-mono-tech uppercase text-xs tracking-wider transition-all duration-300 hover:bg-neutral-200"
            >
              <span>Quero meu site</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#projetos"
              className="hero-cta group inline-flex items-center gap-3 px-6 py-4 border border-white/20 text-neutral-300 font-mono-tech uppercase text-xs tracking-wider transition-all duration-300 hover:text-white hover:border-white"
            >
              <span>Ver projetos</span>
              <span className="text-neutral-500 group-hover:text-white transition-colors">↓</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Technical Bar & Minimalist Scroll Indicator */}
      <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-neutral-500">
        <div className="flex items-center gap-6">
          <span>01 / 07 — INTRO</span>
          <span className="hidden md:inline text-neutral-600">•</span>
          <span className="hidden md:inline">ENGENHARIA & DESIGN INDEPENDENTE</span>
        </div>

        <a
          href="#proposta-de-valor"
          className="group inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <span className="tracking-widest uppercase text-[11px]">Rolar para explorar</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
