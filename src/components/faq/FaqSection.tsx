"use client";

import React, { useState, useRef } from "react";
import { Plus, Minus } from "lucide-react";
import { faqData } from "@/data/faq";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(faqData[0].id);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".faq-item", {
          opacity: 0,
          y: 20,
          stagger: 0.05,
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
      id="faq"
      ref={containerRef}
      className="relative py-24 lg:py-36 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>DÚVIDAS FREQUENTES</span>
          <span>TRANSPARÊNCIA TOTAL</span>
        </div>

        {/* Section Headline */}
        <div className="py-12 sm:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light tracking-[-0.03em] text-white leading-tight">
              Perguntas frequentes antes de iniciar uma parceria.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <p className="text-xs font-mono-tech text-neutral-400">
              RESPOSTAS DIRETAS SEM JARGÕES TÉCNICOS
            </p>
          </div>
        </div>

        {/* Minimalist Accordion List */}
        <div className="border-t border-white/[0.08] divide-y divide-white/[0.08]">
          {faqData.map((faq, idx) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={cn(
                  "faq-item transition-colors duration-300",
                  isOpen ? "bg-white/[0.02]" : "hover:bg-white/[0.01]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  aria-expanded={isOpen}
                  className="w-full py-7 sm:py-8 flex items-center justify-between gap-6 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white"
                >
                  <div className="flex items-baseline gap-4 sm:gap-8">
                    <span className="text-xs font-mono-tech text-neutral-400 group-hover:text-white transition-colors">
                      0{idx + 1}
                    </span>
                    <h3 className="text-lg sm:text-2xl font-heading font-normal text-white group-hover:translate-x-1 transition-transform duration-300">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="w-7 h-7 flex-shrink-0 rounded-full border border-white/20 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white transition-all">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-8 pt-1 pl-8 sm:pl-16 max-w-3xl">
                    <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
                      {faq.answer}
                    </p>
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
