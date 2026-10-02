"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, MessageSquare, Send } from "lucide-react";
import { contactUrl, hasWhatsApp, siteConfig } from "@/data/siteConfig";
import { pricingPlans } from "@/data/pricing";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

export function CtaSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    projectType: pricingPlans[0].name,
    message: "",
  });

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.from(".cta-element", {
          opacity: 0,
          y: 30,
          stagger: 0.1,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá! Vim pelo site da Milia Co. Meu nome é ${formData.name}. Tipo de projeto: ${formData.projectType}. Mensagem: ${formData.message || "Gostaria de agendar um diagnóstico."} (Contato: ${formData.emailOrPhone})`;
    window.location.href = contactUrl(text);
  };

  return (
    <section
      id="contato"
      ref={containerRef}
      className="relative py-28 lg:py-40 px-6 md:px-10 bg-[#0A0B0C] border-b border-white/[0.08] overflow-hidden"
    >
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

      {/* Decorative Monogram Graphic Accent */}
      <div className="absolute -left-20 bottom-0 w-96 h-96 opacity-[0.03] pointer-events-none select-none">
        <Image
          src="/monogram-light.png"
          alt=""
          fill
          sizes="384px"
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Headline & WhatsApp Direct */}
          <div className="lg:col-span-7 space-y-8">
            <div className="cta-element inline-flex items-center gap-2.5 py-1 px-3 border border-white/10 text-neutral-400 text-xs font-mono-tech uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>CONVERSE COM O ESTÚDIO</span>
            </div>

            <h2 className="cta-element text-4xl sm:text-6xl lg:text-7xl font-heading font-light tracking-[-0.035em] text-white leading-[1.08]">
              Vamos colocar seu negócio <span className="italic font-serif font-normal text-neutral-300">no ar</span>.
            </h2>

            <p className="cta-element text-base sm:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
              Conte o que sua empresa precisa. Vamos entender o escopo, indicar o caminho mais adequado e preparar uma proposta clara para o seu projeto.
            </p>

            {/* Primary Action Button: WhatsApp */}
            <div className="cta-element pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-text={hasWhatsApp ? "WhatsApp" : "E-mail"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-mono-tech uppercase text-xs tracking-wider transition-all duration-300 hover:bg-neutral-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Conversar sobre meu projeto</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <span className="text-xs font-mono-tech text-neutral-400">
                {hasWhatsApp ? "Atendimento direto com o estúdio" : "Contato por e-mail com o estúdio"}
              </span>
            </div>
          </div>

          {/* Quick Contact / Briefing Form */}
          <div className="lg:col-span-5 cta-element">
            <div className="p-8 sm:p-10 border border-white/10 bg-[#121316] relative">
              <h3 className="text-xl font-heading font-light text-white mb-2">
                Prepare um briefing inicial
              </h3>
              <p className="text-xs text-neutral-400 mb-6 font-normal">
                Prefere enviar os dados do seu projeto por escrito? O briefing será aberto no seu aplicativo de {hasWhatsApp ? "WhatsApp" : "e-mail"}.
              </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="briefing-name" className="block text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-1">
                      Seu Nome ou Empresa
                    </label>
                    <input
                      id="briefing-name"
                      type="text"
                      required
                      placeholder="Ex: Dra. Mariana / Studio Arq"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="briefing-contact" className="block text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-1">
                      WhatsApp ou E-mail
                    </label>
                    <input
                      id="briefing-contact"
                      type="text"
                      required
                      placeholder="Ex: (11) 98765-4321 ou contato@empresa.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-white/[0.03] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="briefing-scope" className="block text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-1">
                      Escopo Pretendido
                    </label>
                    <select
                      id="briefing-scope"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#121316] border border-white/10 text-sm text-neutral-200 focus:outline-none focus:border-white transition-colors"
                    >
                      {pricingPlans.map((plan) => (
                        <option key={plan.id} value={plan.name}>Plano {plan.name} (a partir de {plan.startingPrice})</option>
                      ))}
                      <option value="Automação ou Sistema">Automação ou Sistema Específico</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="briefing-message" className="block text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-1">
                      Mensagem ou Detalhes (Opcional)
                    </label>
                    <textarea
                      id="briefing-message"
                      rows={3}
                      placeholder="Conte um pouco sobre sua empresa e seu objetivo..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-2 bg-white/[0.03] border border-white/10 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-white text-black font-mono-tech uppercase text-xs tracking-wider inline-flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors"
                  >
                    <span>Preparar briefing</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
