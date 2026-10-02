"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const requirements = [
  {
    num: "01",
    title: "Carregar rápido",
    desc: "Carregamento otimizado para reduzir a espera e manter a navegação fluida.",
  },
  {
    num: "02",
    title: "Funcionar perfeitamente no celular",
    desc: "Botões confortáveis, leitura fluida e zero quebras horizontais em telas pequenas.",
  },
  {
    num: "03",
    title: "Aparecer no Google",
    desc: "SEO técnico estruturado na raiz do código para ser encontrado por quem busca com intenção de compra.",
  },
  {
    num: "04",
    title: "Direcionar visitantes",
    desc: "Hierarquia visual calculada para conduzir a leitura sem atrito ou sobrecarga de informação.",
  },
  {
    num: "05",
    title: "Gerar contatos",
    desc: "Arquitetura com pontos de contato estratégicos que facilitam a decisão de iniciar uma conversa.",
  },
  {
    num: "06",
    title: "Ser simples de manter",
    desc: "Base de código estável, moderna e documentada que não quebra a cada alteração de conteúdo.",
  },
];

export function DifferentialSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".diff-item", {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative py-24 lg:py-36 px-6 md:px-10 bg-[#0F1012] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>07 / 07 — DIFERENCIAL & PRINCÍPIOS</span>
          <span>RIGOR ALÉM DA ESTÉTICA</span>
        </div>

        {/* Big Typographic Statement */}
        <div className="py-14 sm:py-20 max-w-4xl">
          <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 block mb-4">
            Princípio Fundamental
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-[-0.035em] text-white leading-[1.08]">
            Cada detalhe deve trabalhar a favor do seu <span className="italic font-serif font-normal text-neutral-300">negócio</span>.
          </h2>
          <p className="mt-6 text-base sm:text-xl text-neutral-400 leading-relaxed font-normal">
            O visual ajuda a transmitir confiança. Para apoiar sua empresa, o site também precisa
            ser rápido, claro, fácil de usar e simples de manter. Estes são os seis pilares da nossa entrega:
          </p>
        </div>

        {/* 6 Requirements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/[0.08]">
          {requirements.map((req) => (
            <div
              key={req.num}
              className="diff-item group p-8 sm:p-10 border-r border-b border-white/[0.08] flex flex-col justify-between transition-colors duration-300 hover:bg-white/[0.02]"
            >
              <div className="space-y-4">
                <span className="text-xs font-mono-tech text-neutral-400 group-hover:text-white transition-colors block">
                  [{req.num}]
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-normal text-white">
                  {req.title}
                </h3>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed font-normal mt-6 border-t border-white/[0.04] pt-4">
                {req.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
