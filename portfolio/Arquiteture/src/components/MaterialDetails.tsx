"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { MATERIALS_LIST } from "@/data/projects";

export default function MaterialDetails() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const offset = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column (approx 4.5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              Materialidade
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B19] leading-[1.15]">
              Elementos que<br />
              contam histórias.
            </h2>

            <p className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed">
              Trabalhamos com matérias naturais e soluções que envelhecem bem,
              criando atmosferas acolhedoras e atemporais.
            </p>

            {/* Left Circular Arrow Button as in mockup */}
            <div className="pt-2">
              <button
                onClick={() => scroll("left")}
                aria-label="Rolar para esquerda"
                className="gsap-btn w-8 h-8 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] flex items-center justify-center text-xs text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white cursor-pointer will-change-transform"
              >
                <span className="btn-arrow inline-block">←</span>
              </button>
            </div>
          </div>

          {/* Right Column: 4 Square Cards with Right Arrow Button (approx 7.5 cols) */}
          <div className="lg:col-span-8 flex items-center gap-3">
            <div
              ref={scrollRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 hide-scrollbar snap-x snap-mandatory flex-grow"
            >
              {MATERIALS_LIST.map((mat) => (
                <div
                  key={mat.name}
                  className="flex-shrink-0 w-[150px] sm:w-[175px] md:w-[195px] snap-start group cursor-pointer"
                >
                  <div className="relative w-full aspect-square rounded-xs overflow-hidden bg-[#EAE5DA] mb-2.5">
                    <Image
                      src={mat.image}
                      alt={mat.name}
                      fill
                      sizes="195px"
                      className="object-cover object-center editorial-img-hover"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#1C1B19]">
                    <span className="font-light">{mat.name}</span>
                    <span className="text-[11px] text-[#8C857B] transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Circular Arrow Button as in mockup */}
            <button
              onClick={() => scroll("right")}
              aria-label="Rolar para direita"
              className="gsap-btn w-8 h-8 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] hidden sm:flex items-center justify-center text-xs text-[#1C1B19] hover:bg-[#1C1B19] hover:text-white flex-shrink-0 cursor-pointer will-change-transform"
            >
              <span className="btn-arrow inline-block">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
