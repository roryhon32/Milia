import React from "react";
import { HeroSection } from "@/components/hero/HeroSection";
import { ValuePropSection } from "@/components/value-prop/ValuePropSection";
import { ServicesSection } from "@/components/services/ServicesSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { BusinessValueSection } from "@/components/business-value/BusinessValueSection";
import { SeoSection } from "@/components/seo/SeoSection";
import { AudienceSection } from "@/components/audience/AudienceSection";
import { ProcessSection } from "@/components/process/ProcessSection";
import { DifferentialSection } from "@/components/differential/DifferentialSection";
import { TechSection } from "@/components/tech/TechSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { AboutSection } from "@/components/about/AboutSection";
import { FaqSection } from "@/components/faq/FaqSection";
import { CtaSection } from "@/components/cta/CtaSection";

export default function HomePage() {
  return (
    <>
      {/* 01. Hero Section */}
      <HeroSection />

      {/* 02. Proposta de Valor */}
      <ValuePropSection />

      {/* 03. Serviços Especializados */}
      <ServicesSection />

      {/* 04. Casos Selecionados & Estudos de Interface */}
      <ProjectsSection />

      <BusinessValueSection />
      <SeoSection />

      {/* 05. Segmentos & Para Quem Criamos */}
      <AudienceSection />

      {/* 06. Processo Linear de Desenvolvimento */}
      <ProcessSection />

      {/* 07. Diferencial & Princípios de Engenharia */}
      <DifferentialSection />

      {/* 08. Tecnologia & Confiabilidade */}
      <TechSection />

      {/* 09. Planos & Investimento Transparente */}
      <PricingSection />

      {/* 10. Sobre o Estúdio Milia Co. */}
      <AboutSection />

      {/* 11. FAQ & Dúvidas Frequentes */}
      <FaqSection />

      {/* 12. Chamada Final para Ação */}
      <CtaSection />
    </>
  );
}
