"use client";

import React, { useRef } from "react";
import { audienceSegments } from "@/data/audience";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function AudienceSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".audience-item", {
          opacity: 0,
          y: 20,
          stagger: 0.06,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-36 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>05 / 07 — SEGMENTOS & ATUAÇÃO</span>
          <span>QUEM CONFIA NA MILIA CO.</span>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Para empresas onde credibilidade, imagem e precisão técnica são inegociáveis.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs font-mono-tech text-neutral-400">
              Projetos pensados para a jornada de compra de cada nicho de atuação.
            </p>
          </div>
        </div>

        {/* Typographic Composition - 2 Column or 4 Column Editorial Grid without generic icons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/[0.08]">
          {audienceSegments.map((segment, idx) => (
            <div
              key={segment.id}
              className="audience-item group p-6 sm:p-8 border-r border-b border-white/[0.08] flex flex-col justify-between min-h-[220px] transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div>
                <span className="text-[11px] font-mono-tech text-neutral-400 group-hover:text-white transition-colors block mb-4">
                  0{idx + 1}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-white group-hover:translate-x-1 transition-transform duration-300">
                  {segment.title}
                </h3>
                <p className="text-xs text-neutral-400 mt-2 font-normal">
                  {segment.tagline}
                </p>
              </div>

              <div className="pt-6 mt-auto">
                <p className="text-xs text-neutral-400 leading-relaxed border-t border-white/[0.05] pt-3">
                  {segment.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
