"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { STUDIO_BRAND } from "@/data/projects";
import gsap from "gsap";

interface HeroProps {
  onExploreProjects?: () => void;
}

const SLOGANS = [
  "Espaços que atravessam o tempo.",
  "Arquitetura pensada para viver melhor.",
  "Arquitetura que nasce do lugar.",
  "A matéria que respira com a luz.",
  "A harmonia silenciosa do essencial.",
];

export default function Hero({ onExploreProjects }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Typewriting state
  const [phraseIndex, setPhraseIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(SLOGANS[0]);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [isPaused, setIsPaused] = React.useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || isPaused) return;

    const currentFullText = SLOGANS[phraseIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentFullText.length) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length + 1));
        }, 70);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 2800);
      }
    } else {
      if (displayText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayText(currentFullText.slice(0, displayText.length - 1));
        }, 32);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % SLOGANS.length);
        }, 450);
      }
    }

    return () => clearTimeout(timeoutId);
  }, [displayText, isDeleting, phraseIndex, isPaused]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        imageWrapperRef.current,
        { clipPath: "inset(5% 3% 5% 3%)", scale: 1.04, opacity: 0.85 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "expo.out",
        }
      );

      tl.fromTo(
        tagsRef.current,
        { opacity: 0, y: -8 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=1.0"
      );

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1.1 },
        "-=0.8"
      );

      tl.fromTo(
        [subtitleRef.current, ctaRef.current],
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        "-=0.6"
      );

      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7 },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    if (onExploreProjects) {
      onExploreProjects();
      return;
    }
    const section = document.getElementById("projetos");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] pt-28 md:pt-36 pb-12 px-6 md:px-12 max-w-7xl mx-auto flex flex-col justify-between"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
        {/* Left Column: Typography */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-7 z-10">
          {/* Top Tags */}
          <div
            ref={tagsRef}
            className="flex items-center gap-6 text-[10px] uppercase tracking-[0.25em] text-[#8C857B] font-light"
          >
            <span>{STUDIO_BRAND.topTags[0]}</span>
            <span>{STUDIO_BRAND.topTags[1]}</span>
            <span>{STUDIO_BRAND.topTags[2]}</span>
          </div>

          {/* Big Editorial Headline with Typewriting Animation */}
          <div
            className="min-h-[170px] sm:min-h-[220px] md:min-h-[250px] lg:min-h-[280px] flex flex-col justify-start select-none group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8C857B] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B19]/70 animate-pulse" />
              <span>Manifesto 0{phraseIndex + 1} / 0{SLOGANS.length}</span>
            </div>

            <h1
              ref={headlineRef}
              className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal text-[#1C1B19] tracking-tight leading-[1.08] cursor-pointer"
              onClick={() => {
                setIsDeleting(true);
                setDisplayText("");
                setPhraseIndex((prev) => (prev + 1) % SLOGANS.length);
                setIsDeleting(false);
              }}
              title="Clique para alternar o manifesto"
            >
              <span>{displayText}</span>
              <span
                className={`inline-block w-[3px] sm:w-[4px] h-[0.82em] bg-[#1C1B19] ml-1.5 align-baseline rounded-full ${
                  !isDeleting && displayText.length === SLOGANS[phraseIndex].length
                    ? "animate-pulse"
                    : "opacity-100"
                }`}
                aria-hidden="true"
              />
            </h1>
          </div>

          {/* Subheadline */}
          <p
            ref={subtitleRef}
            className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed max-w-sm"
          >
            {STUDIO_BRAND.subheadline}
          </p>

          {/* CTA: Circular Border with Arrow + Label */}
          <div ref={ctaRef} className="pt-2">
            <button
              onClick={scrollToProjects}
              className="gsap-btn group inline-flex items-center gap-3.5 text-xs text-[#1C1B19] hover:text-[#7A7469] cursor-pointer will-change-transform"
            >
              <div className="w-8 h-8 rounded-full border border-[#BDB5A6] group-hover:border-[#1C1B19] flex items-center justify-center transition-colors duration-300">
                <span className="btn-arrow text-xs font-light inline-block">
                  →
                </span>
              </div>
              <span className="font-light tracking-[0.02em]">
                Conheça nossos projetos
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Hero Photograph */}
        <div className="lg:col-span-7">
          <div
            ref={imageWrapperRef}
            className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:aspect-[16/10] overflow-hidden rounded-xs bg-[#EAE5DA] shadow-xs"
          >
            <Image
              src={STUDIO_BRAND.heroImage}
              alt="Casa contemporânea à beira-mar com piscina de borda infinita e planos de concreto"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-center editorial-img-hover"
            />
            {/* Dark badge container on bottom right as in mockup */}
            <div className="absolute bottom-6 right-6 text-right bg-black/40 backdrop-blur-xs px-3.5 py-2 text-white rounded-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium block">
                CASA HORIZONTE
              </span>
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/90 block">
                Projeto conceito
              </span>
              <span className="text-[9px] uppercase tracking-[0.14em] text-white/80 block">
                Bahia, 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div
        ref={scrollRef}
        className="pt-8 flex items-end justify-between text-[9px] uppercase tracking-[0.25em] text-[#8C857B] border-t border-[#E8E4DC] mt-8"
      >
        <div className="flex flex-col gap-1 items-start">
          <span className="leading-tight">SCROLL</span>
          <span className="leading-tight">PARA EXPLORAR</span>
          <span className="w-[1px] h-6 bg-[#C5BDAE] mt-1" />
        </div>

        <div className="hidden sm:block text-right pb-1">
          <span>Estúdio de Arquitetura Contemporânea</span>
        </div>
      </div>
    </section>
  );
}
