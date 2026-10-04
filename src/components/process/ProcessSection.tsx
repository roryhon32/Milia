"use client";

import React, { useRef, useState } from "react";
import { processData } from "@/data/process";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const stepElements = gsap.utils.toArray<HTMLElement>(".process-step-block");

        stepElements.forEach((step, index) => {
          ScrollTrigger.create({
              trigger: step,
              start: "top 60%",
              end: "bottom 40%",
              onEnter: () => setActiveStep(index),
              onEnterBack: () => setActiveStep(index),
          });
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="processo"
      ref={containerRef}
      className="relative py-14 lg:py-20 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>DO PRIMEIRO CONTATO À PUBLICAÇÃO</span>
          <span>FLUXO LINEAR SEM ATRITO</span>
        </div>

        {/* Section Layout with Sticky Left Column on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12">
          {/* Left Column (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start space-y-6">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
              [ 04 Etapas Claras ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-heading font-light tracking-tight text-white leading-tight">
              Como funciona. Simples de entender, claro para acompanhar.
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal">
              Você sabe o que acontece em cada etapa, participa da aprovação e entende o que será entregue antes de colocar o site no ar.
            </p>

            <div className="hidden lg:block pt-6 border-t border-white/[0.08]">
              <div className="flex items-center gap-3 text-xs font-mono-tech text-neutral-400">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>ETAPA ATIVA: 0{activeStep + 1} — {processData[activeStep]?.title}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Progressive Steps */}
          <div className="lg:col-span-7 space-y-12 sm:space-y-16">
            {processData.map((step, idx) => {
              const isActive = activeStep === idx;

              return (
                <div
                  key={step.number}
                  className={cn(
                    "process-step-block p-8 sm:p-10 border transition-all duration-500",
                    isActive
                      ? "border-white/30 bg-white/[0.03]"
                      : "border-white/[0.08] bg-transparent lg:opacity-60"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-4">
                    <span className="text-sm font-mono-tech text-neutral-400">
                      {step.number}
                    </span>
                    <span className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                      {step.duration}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-heading font-light text-white tracking-tight">
                    {step.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-mono-tech text-neutral-400 mt-1 uppercase tracking-wider">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-neutral-300 leading-relaxed mt-4 font-normal">
                    {step.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/[0.06]">
                    <p className="text-[10px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2">
                      Entregáveis desta fase
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {step.deliverables.map((d, dIdx) => (
                        <span
                          key={dIdx}
                          className="text-[11px] font-mono-tech px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] text-neutral-300"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

