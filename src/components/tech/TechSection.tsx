"use client";

import React, { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

const techStack = [
  {
    name: "React & Next.js",
    role: "Arquitetura Web Moderna",
    desc: "A base técnica utilizada pelas maiores empresas de tecnologia do mundo para entregar carregamento quase instantâneo.",
  },
  {
    name: "TypeScript",
    role: "Segurança de Código",
    desc: "Tipagem estática rigorosa que previne erros em tempo de execução e garante robustez contínua.",
  },
  {
    name: "GSAP & ScrollTrigger",
    role: "Motion Design de Precisão",
    desc: "Animações cuidadosas, com menos movimento em dispositivos móveis e respeito à preferência de acessibilidade.",
  },
  {
    name: "Infraestrutura Global",
    role: "Edge Hosting & SSL",
    desc: "Hospedagem e distribuição de conteúdo escolhidas conforme as necessidades de cada projeto.",
  },
  {
    name: "Analytics & Telemetria",
    role: "Rastreamento Comercial",
    desc: "Métricas completas configuradas via GA4 e Meta Pixel para entender exatamente de onde vêm seus clientes.",
  },
  {
    name: "SEO Técnico Nativo",
    role: "Indexação Semântica",
    desc: "Tags Open Graph, Schema.org estruturado e renderização server-side projetada para motores de busca.",
  },
];

export function TechSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".tech-item", {
          opacity: 0,
          y: 20,
          stagger: 0.06,
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
      ref={containerRef}
      className="relative py-20 lg:py-28 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/[0.08]">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400">
              Engenharia & Confiabilidade
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-light text-white tracking-tight">
              Tecnologia moderna para garantir que seu site nunca te deixe na mão.
            </h2>
          </div>
          <div>
            <p className="text-xs font-mono-tech text-neutral-400">
              ZERO TEMPLATES FRÁGEIS • ZERO DEPENDÊNCIA DE PLUGINS VULNERÁVEIS
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-12">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="tech-item p-6 border border-white/[0.08] bg-white/[0.015] hover:border-white/20 transition-colors duration-300"
            >
              <div className="flex items-center justify-between gap-2 mb-3">
                <h3 className="text-base sm:text-lg font-heading font-normal text-white">
                  {tech.name}
                </h3>
                <span className="text-[10px] font-mono-tech uppercase text-neutral-400">
                  {tech.role}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                {tech.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
