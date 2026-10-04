"use client";

import React from "react";
import Image from "next/image";
import { ARCHITECT_INFO } from "@/data/projects";

interface ArchitectSectionProps {
  onOpenContact?: () => void;
}

export default function ArchitectSection({ onOpenContact }: ArchitectSectionProps) {
  return (
    <section className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Architect Portrait (approx 4 cols) */}
          <div className="lg:col-span-4">
            <div className="relative w-full aspect-[4/5] rounded-xs overflow-hidden bg-[#EAE5DA]">
              <Image
                src={ARCHITECT_INFO.photo}
                alt="Retrato editorial de Lucas Andrade, Arquiteto e Fundador (Placeholder)"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center filter contrast-[1.03]"
              />
            </div>
          </div>

          {/* Column 2: Statement & Bio (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              O Arquiteto
            </span>

            <div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B19]">
                {ARCHITECT_INFO.name}
              </h2>
              <span className="text-xs text-[#7A7469] font-light block mt-1">
                {ARCHITECT_INFO.role}
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#635F57] font-light leading-relaxed">
              <p>{ARCHITECT_INFO.quote1}</p>
              <p>{ARCHITECT_INFO.quote2}</p>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="gsap-btn text-xs px-5 py-2.5 rounded-full bg-[#2A2926] hover:bg-[#1C1B19] text-[#FBF9F5] font-normal shadow-xs flex items-center gap-2 cursor-pointer will-change-transform"
              >
                <span>Falar comigo</span>
                <span className="btn-arrow inline-block">→</span>
              </button>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-btn text-xs px-5 py-2.5 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] font-normal flex items-center gap-1.5 will-change-transform"
              >
                <span>Instagram</span>
                <span className="btn-arrow text-[11px] inline-block">↗</span>
              </a>
            </div>
          </div>

          {/* Column 3: Professional Sheet & Placeholders (approx 3 cols) */}
          <div className="lg:col-span-3 space-y-6 text-xs text-[#635F57] font-light border-t lg:border-t-0 lg:border-l border-[#E8E4DC] pt-6 lg:pt-0 lg:pl-8">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1 font-medium">
                Formação
              </span>
              <p>{ARCHITECT_INFO.formation}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1 font-medium">
                Atuação
              </span>
              <p>{ARCHITECT_INFO.focus}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1 font-medium">
                Localização
              </span>
              <p>{ARCHITECT_INFO.location}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1 font-medium">
                Contato
              </span>
              <p>{ARCHITECT_INFO.email}</p>
              <p>{ARCHITECT_INFO.phone}</p>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1 font-medium">
                CAU
              </span>
              <p className="italic text-[#8C857B]">{ARCHITECT_INFO.cau}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
