"use client";

import React from "react";
import Image from "next/image";
import { STUDIO_BRAND } from "@/data/projects";

interface FinalCTAProps {
  onOpenContact?: () => void;
}

export default function FinalCTA({ onOpenContact }: FinalCTAProps) {
  const whatsappUrl = `https://wa.me/${STUDIO_BRAND.contact.whatsapp}?text=Olá,%20gostaria%20de%20conversar%20sobre%20um%20projeto%20com%20a%20Lumière%20Arquitetura.`;
  const emailUrl = `mailto:${STUDIO_BRAND.contact.email}?subject=Novo%20Projeto%20-%20Lumière%20Arquitetura`;

  return (
    <section
      id="contato"
      className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left Column: Courtyard with Olive Tree Photo (approx 5.5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-xs overflow-hidden bg-[#EAE5DA] shadow-xs">
              <Image
                src={STUDIO_BRAND.contactImage}
                alt="Pátio contemporâneo com oliveira e planos de pedra em luz suave"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-center editorial-img-hover"
              />
            </div>
          </div>

          {/* Right Column: Contact Message & Action Buttons (approx 6.5 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              Contato
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#1C1B19] leading-[1.12]">
              Vamos conversar<br />
              sobre o seu projeto?
            </h2>

            <p className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed max-w-lg">
              Conte um pouco sobre o espaço que você deseja criar. Será um
              prazer entender o seu projeto.
            </p>

            {/* Buttons Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onOpenContact}
                className="gsap-btn text-xs px-6 py-3 rounded-full bg-[#2A2926] hover:bg-[#1C1B19] text-[#FBF9F5] font-normal shadow-xs flex items-center gap-2 cursor-pointer will-change-transform"
              >
                <span>Iniciar conversa</span>
                <span className="btn-arrow inline-block">→</span>
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-btn text-xs px-5 py-3 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] font-normal will-change-transform"
              >
                WhatsApp
              </a>

              <a
                href={emailUrl}
                className="gsap-btn text-xs px-5 py-3 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] font-normal will-change-transform"
              >
                E-mail
              </a>
            </div>

            {/* Location Label */}
            <div className="pt-6 border-t border-[#E8E4DC] flex items-center gap-4 text-xs text-[#8C857B]">
              <span className="w-6 h-[1px] bg-[#C5BDAE]" />
              <div className="flex flex-col font-light text-[11px] leading-tight">
                <span className="text-[#1C1B19]">Salvador, BA</span>
                <span>e todo o Brasil</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
