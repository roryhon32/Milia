"use client";

import React, { useState, useRef } from "react";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function ServicesSection() {
  const [activeServiceId, setActiveServiceId] = useState<string>(servicesData[0].id);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".service-item", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
          duration: 0.9,
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
      id="servicos"
      ref={containerRef}
      className="relative py-14 lg:py-20 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>O QUE SUA EMPRESA PRECISA</span>
          <span>EXECUÇÃO DE ALTA PRECISÃO</span>
        </div>

        {/* Section Headline */}
        <div className="py-5 sm:py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Um site que apresenta, convence e facilita o contato.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-sm font-mono-tech text-neutral-400 uppercase tracking-widest">
              [ 05 Áreas de Especialidade ]
            </p>
          </div>
        </div>

        {/* Editorial Interactive Accordion List */}
        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {servicesData.map((service) => {
            const isOpen = activeServiceId === service.id;

            return (
              <div
                key={service.id}
                className={cn(
                  "service-item transition-colors duration-300",
                  isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
              >
                {/* Header Row (Clickable) */}
                <button
                  type="button"
                  onClick={() => setActiveServiceId(isOpen ? "" : service.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-6 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  <div className="flex items-baseline gap-6 sm:gap-12 flex-1">
                    <span className="text-xs sm:text-sm font-mono-tech text-neutral-400 group-hover:text-white transition-colors">
                      {service.number}
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-light tracking-tight text-white group-hover:translate-x-1 transition-transform duration-300">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-400 font-normal">
                        {service.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex-shrink-0 pr-2">
                    <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 group-hover:border-white group-hover:text-white transition-all">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </div>
                </button>

                {/* Expanded Editorial Content */}
                {isOpen && (
                  <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 border-t border-white/[0.04]">
                    <div className="lg:col-span-2 hidden lg:block" />
                    
                    <div className="lg:col-span-5 space-y-6">
                      <p className="text-base text-neutral-300 leading-relaxed font-normal">
                        {service.description}
                      </p>

                      <div className="pt-2">
                        <div className="p-4 bg-white/[0.02] border border-white/[0.08] space-y-2">
                          <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                            Impacto Comercial Direto
                          </p>
                          <p className="text-sm text-neutral-200 font-medium">
                            {service.impact}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                        Escopo & Entregáveis
                      </p>
                      <ul className="space-y-2.5">
                        {service.items.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4">
                        <a
                          href="#contato"
                          className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
                        >
                          <span>Solicitar proposta para este serviço</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
