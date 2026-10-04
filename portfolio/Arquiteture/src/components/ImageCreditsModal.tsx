"use client";

import React from "react";
import { IMAGE_CREDITS } from "@/data/projects";

interface ImageCreditsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageCreditsModal({
  isOpen,
  onClose,
}: ImageCreditsModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FBF9F5] border border-[#E8E4DC] rounded-xs max-w-3xl w-full p-8 md:p-10 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl text-[#7A7469] hover:text-[#1C1B19] focus:outline-none transition-colors"
          aria-label="Fechar modal"
        >
          ✕
        </button>

        <div className="mb-6 pb-4 border-b border-[#E8E4DC]">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block mb-1">
            Transparência & Direitos
          </span>
          <h3 className="font-serif text-2xl md:text-3xl text-[#1C1B19] font-light">
            Créditos das Fotografias
          </h3>
          <p className="text-xs text-[#635F57] mt-1 font-light leading-relaxed">
            Este site é um projeto demonstrativo de design e arquitetura. Todas
            as fotografias utilizadas são de uso gratuito e legalmente
            reutilizáveis, obtidas via Wikimedia Commons e Poly Haven (Creative Commons e Domínio Público).
          </p>
        </div>

        <div className="divide-y divide-[#E8E4DC]">
          {IMAGE_CREDITS.map((credit) => (
            <div
              key={credit.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-medium text-[#1C1B19] block mb-0.5">
                  {credit.subject}
                </span>
                <span className="text-[#7A7469] font-light">
                  Fotografia por{" "}
                  <strong className="font-normal text-[#1C1B19]">
                    {credit.photographer}
                  </strong>{" "}
                  • Plataforma: {credit.platform}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] text-[#8C857B]">
                  {credit.license}
                </span>
                <a
                  href={credit.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gsap-btn px-3 py-1 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] text-[11px] font-normal will-change-transform flex items-center gap-1"
                >
                  <span>Ver fonte</span>
                  <span className="btn-arrow text-[10px] inline-block">↗</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#E8E4DC] flex justify-end">
          <button
            onClick={onClose}
            className="gsap-btn px-6 py-2.5 rounded-full bg-[#2A2926] text-[#FBF9F5] text-xs font-normal hover:bg-[#1C1B19] cursor-pointer will-change-transform"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
