"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { pricingPlans, pricingDisclaimer } from "@/data/pricing";
import { contactUrl } from "@/data/siteConfig";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function PricingSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pricing-column", {
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
      id="planos"
      ref={containerRef}
      className="relative py-14 lg:py-20 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>INVESTIMENTO & PLANOS</span>
          <span>TRANSPARÊNCIA COMERCIAL</span>
        </div>

        {/* Section Headline */}
        <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Seu site profissional a partir de {pricingPlans[0].startingPrice}.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs font-mono-tech text-neutral-400">
              PLANOS COMO PONTO DE PARTIDA • PROPOSTA CONFORME O ESCOPO
            </p>
          </div>
        </div>

        {/* 2 Editorial Columns (No Generic Checkmark Tables) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-l border-white/[0.08]">
          {pricingPlans.map((plan) => {
            const whatsappPlanUrl = contactUrl(`Olá! Tenho interesse no plano ${plan.name} da Milia Co. e gostaria de entender melhor como funciona.`);

            return (
              <div
                key={plan.id}
                className={cn(
                  "pricing-column p-8 sm:p-10 border-r border-b border-white/[0.08] flex flex-col justify-between transition-colors duration-300",
                  plan.id === "essencial" ? "bg-white/[0.03]" : "hover:bg-white/[0.015]"
                )}
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
                      Plano {plan.name}
                    </span>
                    {plan.id === "essencial" && (
                      <span className="border border-white/20 px-2 py-0.5 text-[10px] font-mono-tech text-neutral-300">
                        Para começar
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 mb-6">
                    {plan.previousStartingPrice && (
                      <p className="text-xs font-mono-tech text-neutral-500">
                        De <s className="decoration-white/30">{plan.previousStartingPrice}</s>
                      </p>
                    )}
                    <p className="text-xs font-mono-tech text-neutral-400 uppercase">A partir de</p>
                    <p className="text-4xl sm:text-5xl font-heading font-light text-white tracking-tight">
                      {plan.startingPrice}
                    </p>
                    {plan.firstYearHosting && (
                      <div className="pt-4 space-y-1.5">
                        <p className="text-sm font-medium text-neutral-100">{plan.firstYearHosting}</p>
                        <p className="text-[11px] leading-relaxed text-neutral-400">{plan.renewalTerms}</p>
                      </div>
                    )}
                  </div>

                  <p className="text-sm font-medium text-neutral-200 mb-2 font-body">
                    {plan.tagline}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal mb-8">
                    {plan.description}
                  </p>

                  <div className="pt-6 border-t border-white/[0.08] space-y-4">
                    <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                      O que está incluído
                    </p>
                    <ul className="space-y-3">
                      {plan.scope.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-10 pt-6 border-t border-white/[0.08] space-y-4">
                  <div className="text-xs text-neutral-400">
                    <span className="font-mono-tech uppercase text-[10px] text-neutral-400 block mb-1">
                      Ideal para
                    </span>
                    {plan.idealFor}
                  </div>

                  <a
                    href={whatsappPlanUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "w-full py-3.5 px-4 font-mono-tech uppercase text-xs tracking-wider inline-flex items-center justify-center gap-2 transition-all duration-300",
                      plan.id === "essencial"
                        ? "bg-white text-black hover:bg-neutral-200"
                        : "border border-white/20 text-white hover:border-white hover:bg-white/5"
                    )}
                  >
                    <span>Conversar sobre o {plan.name}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scope Disclaimer */}
        <div className="mt-8 text-center sm:text-left">
          <p className="text-xs font-mono-tech text-neutral-400">
            * {pricingDisclaimer}
          </p>
        </div>
        <div className="mt-8 text-center sm:text-right">
          <a href={contactUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-white/50 pb-1 text-xs font-mono-tech uppercase tracking-wider text-neutral-200 hover:text-white hover:border-white transition-colors">
            Conversar sobre meu projeto <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

