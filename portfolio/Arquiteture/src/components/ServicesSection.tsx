"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/components/PortfolioLink";
import { SERVICES } from "@/data/projects";

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevService = () => {
    setActiveIndex((prev) => (prev === 0 ? SERVICES.length - 1 : prev - 1));
  };

  const nextService = () => {
    setActiveIndex((prev) => (prev === SERVICES.length - 1 ? 0 : prev + 1));
  };

  const currentService = SERVICES[activeIndex];

  return (
    <section
      id="servicos"
      className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Column 1: Editorial Introduction (approx 4.5 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              Serviços
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B19] leading-[1.15]">
              Do conceito<br />
              à realidade.
            </h2>

            <p className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed">
              Oferecemos soluções completas em arquitetura e interiores, sempre
              com um olhar atento à funcionalidade, estética e contexto de cada
              projeto.
            </p>

            <div className="pt-2">
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 text-xs text-[#1C1B19] hover:text-[#7A7469] font-normal transition-colors group"
              >
                <span className="link-editorial">Conheça nossos serviços</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Column 2: Interactive Services List (approx 3.5 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <ul className="space-y-3.5">
              {SERVICES.map((service, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <li key={service.id}>
                    <button
                      onClick={() => setActiveIndex(idx)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`text-left w-full flex items-center gap-3 text-xs sm:text-sm transition-all duration-300 py-1 cursor-pointer ${
                        isActive
                          ? "text-[#1C1B19] font-medium translate-x-1"
                          : "text-[#8C857B] hover:text-[#1C1B19] font-light"
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1C1B19] flex-shrink-0" />
                      <span className="font-light">{service.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Photographic Preview with Counter and Controls (approx 4 cols) */}
          <div className="lg:col-span-4 flex flex-col items-end">
            <div className="relative w-full aspect-[4/3] rounded-xs overflow-hidden bg-[#EAE5DA] shadow-xs">
              <Image
                key={currentService.image}
                src={currentService.image}
                alt={currentService.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center transition-opacity duration-500"
              />

              {/* Counter Badge */}
              <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-xs px-2.5 py-1 text-[10px] text-[#1C1B19] font-mono rounded-xs">
                {`0${activeIndex + 1} / 0${SERVICES.length}`}
              </div>

              {/* Navigation Arrows */}
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button
                  onClick={prevService}
                  aria-label="Serviço anterior"
                  className="gsap-btn w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1C1B19] flex items-center justify-center text-xs shadow-xs cursor-pointer will-change-transform"
                >
                  <span className="btn-arrow inline-block">←</span>
                </button>
                <button
                  onClick={nextService}
                  aria-label="Próximo serviço"
                  className="gsap-btn w-8 h-8 rounded-full bg-white/90 hover:bg-white text-[#1C1B19] flex items-center justify-center text-xs shadow-xs cursor-pointer will-change-transform"
                >
                  <span className="btn-arrow inline-block">→</span>
                </button>
              </div>
            </div>

            <p className="text-[11px] text-[#7A7469] font-light mt-3 text-right max-w-xs leading-relaxed">
              {currentService.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

