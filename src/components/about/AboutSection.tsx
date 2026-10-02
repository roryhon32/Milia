"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".about-content", {
          opacity: 0,
          y: 30,
          duration: 0.9,
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
      id="sobre"
      ref={containerRef}
      className="relative py-24 lg:py-36 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Background Graphic Watermark */}
      <div className="absolute right-0 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/monogram-light.png"
          alt=""
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header Meta */}
        <div className="flex items-center justify-between pb-8 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
          <span>O ESTÚDIO</span>
          <span>FILOSOFIA & POSICIONAMENTO</span>
        </div>

        {/* Studio Manifesto Layout */}
        <div className="about-content grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 sm:pt-16">
          {/* Main Statement */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono-tech uppercase tracking-widest text-neutral-400 block">
              Manifesto
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-light tracking-tight text-white leading-tight">
              Um estúdio digital pequeno por{" "}
              <span className="italic font-serif font-normal text-neutral-300">escolha</span>.
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed font-normal pt-4">
              Não almejamos nos tornar uma fábrica industrial de sites operando em linha de produção genérica. Preferimos trabalhar com poucos projetos simultâneos para garantir proximidade real, atenção obsessiva a cada detalhe e uma execução técnica que nos dê orgulho de assinar.
            </p>
          </div>

          {/* Studio principles and delivery */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="p-6 bg-white/[0.02] border border-white/[0.08] space-y-2">
                <h3 className="text-sm font-heading font-medium text-white uppercase tracking-wider">
                  Sem intermediários ou ruído
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  Você conversa diretamente com quem pensa a estratégia e escreve o código. Menos reuniões protocolares, mais alinhamento e velocidade de execução.
                </p>
              </div>

              <div className="p-6 bg-white/[0.02] border border-white/[0.08] space-y-2">
                <h3 className="text-sm font-heading font-medium text-white uppercase tracking-wider">
                  Artesanato digital contemporâneo
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                  Cada componente, curva de easing de animação e linha tipográfica é calibrada para o ecossistema único da sua marca, evitando a sensação de template descartável.
                </p>
              </div>
            </div>

            <div className="pt-6 border-t border-white/[0.08]">
              <p className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400 mb-1">
                Do início à publicação
              </p>
              <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
                O estúdio conduz estratégia, design e desenvolvimento em um fluxo próximo, com clareza sobre cada etapa do projeto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
