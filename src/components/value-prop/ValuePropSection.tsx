"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const valuePillars = [
  {
    index: "01",
    label: "Estratégia",
    lead: "Posicionamento claro e objetivo comercial direto.",
    detail:
      "Antes de qualquer linha de código ou layout, mapeamos por que o seu cliente compra e o que ele precisa ler para tomar a decisão sem hesitar.",
  },
  {
    index: "02",
    label: "Performance",
    lead: "Carregamento otimizado para conexões móveis.",
    detail:
      "Otimizamos assets, scripts e fontes para reduzir o tempo de espera e oferecer uma experiência responsiva.",
  },
  {
    index: "03",
    label: "SEO Técnico",
    lead: "Visibilidade orgânica onde a busca tem intenção.",
    detail:
      "Arquitetura semântica rigorosa com Schema.org, metadados sociais e sitemaps dinâmicos para colocar seu negócio no radar do Google.",
  },
  {
    index: "04",
    label: "Conversão",
    lead: "Atenção convertida em contatos e propostas.",
    detail:
      "Hierarquia visual pensada para conduzir o visitante do primeiro interesse até o clique no WhatsApp ou preenchimento de formulário.",
  },
  {
    index: "05",
    label: "Integração",
    lead: "Conexão sem atrito com sua operação de vendas.",
    detail:
      "WhatsApp Business inteligente, CRMs, planilhas automáticas e rastreamento completo de métricas no Google Analytics e Meta.",
  },
  {
    index: "06",
    label: "Tecnologia",
    lead: "Engenharia de software moderna, sem templates frágeis.",
    detail:
      "Desenvolvido com a mesma tecnologia utilizada pelas maiores empresas de tecnologia do mundo: Next.js, React e TypeScript.",
  },
];

export function ValuePropSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".pillar-row", {
          opacity: 0,
          y: 24,
          stagger: 0.08,
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
      id="proposta-de-valor"
      ref={containerRef}
      className="relative py-24 lg:py-36 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>02 / 07 — PROPOSTA DE VALOR</span>
          <span>ESTRUTURA & MÉTODO</span>
        </div>

        {/* Editorial Top Headline Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 pb-16">
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light tracking-[-0.03em] text-white leading-[1.12]">
              A Milia Co. não cria apenas{" "}
              <span className="italic font-serif font-normal text-neutral-300">páginas bonitas</span>.
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed font-normal">
              Beleza sem estratégia é apenas enfeite estético. Criamos presença digital sólida que une
              direção de arte minuciosa, velocidade extrema e arquitetura construída para transformar
              visitas em oportunidades comerciais concretas.
            </p>
          </div>
        </div>

        {/* Editorial Horizontal Dividers / Pillar List - No Clunky Cards */}
        <div className="border-t border-white/[0.08]">
          {valuePillars.map((pillar) => (
            <div
              key={pillar.index}
              className="pillar-row group py-8 sm:py-10 border-b border-white/[0.08] grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline transition-colors duration-300 hover:bg-white/[0.015]"
            >
              <div className="md:col-span-2 flex items-center gap-3">
                <span className="text-xs font-mono-tech text-neutral-400 group-hover:text-white transition-colors">
                  [{pillar.index}]
                </span>
                <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
                  {pillar.label}
                </span>
              </div>
              <div className="md:col-span-5">
                <h3 className="text-lg sm:text-xl font-heading font-normal text-white group-hover:translate-x-1 transition-transform duration-300">
                  {pillar.lead}
                </h3>
              </div>
              <div className="md:col-span-5">
                <p className="text-sm text-neutral-400 leading-relaxed font-normal">
                  {pillar.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
