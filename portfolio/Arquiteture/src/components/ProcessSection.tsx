"use client";

import React from "react";
import Link from "@/components/PortfolioLink";
import { PROCESS_STAGES } from "@/data/projects";

export default function ProcessSection() {
  return (
    <section
      id="processo"
      className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 md:mb-20 pb-8 border-b border-[#E8E4DC]">
          <div className="lg:col-span-6 space-y-2">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              Como Trabalhamos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1B19] font-light leading-tight">
              Um processo<br />
              colaborativo e transparente.
            </h2>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <p className="text-xs text-[#635F57] font-light leading-relaxed max-w-sm">
              Acreditamos que um bom resultado nasce do diálogo. Nosso processo
              é claro, estruturado e adaptado a cada projeto.
            </p>
            <Link
              href="/#contato"
              className="text-xs text-[#1C1B19] hover:text-[#7A7469] font-normal whitespace-nowrap transition-colors flex items-center gap-1.5 self-start sm:self-auto"
            >
              <span>Saiba mais sobre o processo</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* 4 Steps in Horizontal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {PROCESS_STAGES.map((stage) => (
            <div key={stage.number} className="space-y-3">
              <span className="font-serif text-2xl md:text-3xl text-[#8C857B] font-light block">
                {stage.number}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1C1B19] font-light">
                {stage.title}
              </h3>
              <p className="text-xs text-[#635F57] font-light leading-relaxed">
                {stage.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

