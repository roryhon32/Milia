import React from "react";
import { Project } from "@/types";
import { ShieldCheck, Sun, Compass } from "lucide-react";

interface MockupProps {
  project: Project;
}

export function ProjectPreviewMockup({ project }: MockupProps) {
  if (project.id === "lumina-oral") {
    return (
      <div className="w-full h-full bg-[#18191B] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden font-sans border border-white/10">
        {/* Subtle decorative background lines */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        {/* Mockup Top Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            <span className="font-heading tracking-widest text-xs uppercase text-white font-medium">
              Lumina Oral Architecture
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-6 text-[11px] font-mono-tech text-neutral-400">
            <span>PROCEDIMENTOS</span>
            <span>CORPO CLÍNICO</span>
            <span>TECNOLOGIA GUIADA</span>
          </div>
          <span className="text-[11px] font-mono-tech px-2.5 py-1 border border-white/20 text-neutral-200">
            Agendamento Privado
          </span>
        </div>

        {/* Mockup Hero Editorial Area */}
        <div className="my-auto py-8 relative z-10 max-w-xl">
          <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400 block mb-2">
            Reabilitação & Estética Dentofacial
          </span>
          <h4 className="text-2xl sm:text-4xl font-heading font-light tracking-tight text-white leading-tight">
            A harmonia natural do sorriso através da precisão digital.
          </h4>
          <p className="mt-3 text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
            Tratamentos odontológicos integrados à simetria facial. Escaneamento 3D intraoral e cerâmicas puras confeccionadas com tecnologia microscópica.
          </p>
        </div>

        {/* Mockup Bottom Feature Strip */}
        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-4 relative z-10 text-[11px]">
          <div>
            <p className="text-neutral-500 font-mono-tech uppercase text-[9px]">Tecnologia</p>
            <p className="text-neutral-200 font-medium mt-0.5">Escaneamento Guiado</p>
          </div>
          <div>
            <p className="text-neutral-500 font-mono-tech uppercase text-[9px]">Especialidade</p>
            <p className="text-neutral-200 font-medium mt-0.5">Implantes & Lentes</p>
          </div>
          <div>
            <p className="text-neutral-500 font-mono-tech uppercase text-[9px]">Localização</p>
            <p className="text-neutral-200 font-medium mt-0.5">Jardins & Moema</p>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === "studio-vertice") {
    return (
      <div className="w-full h-full bg-[#111215] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden font-sans border border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />

        {/* Mockup Top Navigation */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="font-heading font-light tracking-tighter text-sm uppercase text-white">
              Studio Vértice
            </span>
            <span className="text-[10px] font-mono-tech text-neutral-400">/ 2025</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono-tech text-neutral-400">
            <span>RESIDENCIAIS</span>
            <span>COMERCIAIS</span>
            <span>MANIFESTO</span>
          </div>
        </div>

        {/* Architectural Elevation Composition */}
        <div className="my-auto py-6 relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
              Obra Selecionada • Casa Açucena
            </span>
            <h4 className="text-xl sm:text-3xl font-heading font-light tracking-tight text-white">
              Concreto aparente, madeira nativa e permeabilidade visual.
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Estruturas suspensas que respeitam a topografia natural do terreno, capturando a luz solar nas quatro estações.
            </p>
          </div>
          <div className="h-40 border border-white/10 bg-white/[0.02] flex items-center justify-center p-4 relative">
            <div className="w-full h-full border border-dashed border-white/20 flex flex-col items-center justify-center text-center">
              <Compass className="w-6 h-6 text-neutral-400 mb-1" />
              <span className="text-[10px] font-mono-tech text-neutral-400 tracking-wider">
                PLANTA & VOLUMETRIA 1:50
              </span>
            </div>
          </div>
        </div>

        {/* Mockup Bottom Details */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10 text-[11px] font-mono-tech text-neutral-400">
          <span>ÁREA CONSTRUÍDA: 680M²</span>
          <span>CURADORIA MONOGRÁFICA</span>
        </div>
      </div>
    );
  }

  if (project.id === "aura-solar") {
    return (
      <div className="w-full h-full bg-[#131518] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden font-sans border border-white/10">
        <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />

        {/* Top Navbar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-amber-400" />
            <span className="font-heading font-medium tracking-wide text-xs uppercase text-white">
              Aura Soluções Solares
            </span>
          </div>
          <span className="text-[10px] font-mono-tech px-2 py-0.5 border border-amber-400/30 text-amber-300">
            Simulador Ativo
          </span>
        </div>

        {/* Interactive Payback Matrix Simulation */}
        <div className="my-auto py-4 relative z-10 space-y-4">
          <div>
            <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
              Geração Distribuída B2B & Agronegócio
            </span>
            <h4 className="text-xl sm:text-2xl font-heading font-light tracking-tight text-white mt-1">
              Redução de custos operacionais e previsibilidade energética.
            </h4>
          </div>

          {/* Metric Bar Preview */}
          <div className="grid grid-cols-3 gap-3 p-4 bg-white/[0.03] border border-white/10">
            <div>
              <p className="text-[10px] font-mono-tech text-neutral-400 uppercase">Economia Prevista</p>
              <p className="text-lg sm:text-xl font-heading font-medium text-emerald-400 mt-0.5">Até 95%</p>
            </div>
            <div>
              <p className="text-[10px] font-mono-tech text-neutral-400 uppercase">Payback Médio</p>
              <p className="text-lg sm:text-xl font-heading font-medium text-white mt-0.5">3.2 Anos</p>
            </div>
            <div>
              <p className="text-[10px] font-mono-tech text-neutral-400 uppercase">Garantia Linear</p>
              <p className="text-lg sm:text-xl font-heading font-medium text-neutral-200 mt-0.5">25 Anos</p>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 relative z-10 text-[11px] font-mono-tech text-neutral-400">
          <span>ENGENHARIA HOMOLOGADA</span>
          <span className="text-neutral-300">SIMULAÇÃO SEM COMPROMISSO →</span>
        </div>
      </div>
    );
  }

  // Default: Vanguard Perícias
  return (
    <div className="w-full h-full bg-[#121316] text-neutral-100 flex flex-col justify-between p-6 sm:p-10 select-none relative overflow-hidden font-sans border border-white/10">
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

      {/* Top Navbar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-neutral-300" />
          <span className="font-heading font-medium tracking-wide text-xs uppercase text-white">
            Vanguard Engenharia & Perícias
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-neutral-400">
          CREA / IBAPE CONFORME
        </span>
      </div>

      {/* Forensic Engineering Content */}
      <div className="my-auto py-6 relative z-10 space-y-3">
        <span className="text-[10px] font-mono-tech uppercase tracking-widest text-neutral-400">
          Auditoria Técnica & Perícias Judiciais
        </span>
        <h4 className="text-xl sm:text-3xl font-heading font-light tracking-tight text-white leading-snug">
          Rigor científico e conformidade normativa para decisões jurídicas de alto valor.
        </h4>
        <p className="text-xs sm:text-sm text-neutral-400 max-w-lg leading-relaxed">
          Inspeções prediais, laudos cautelares de vizinhança e diagnóstico de patologias do concreto segundo normas NBR 13752 e NBR 16747.
        </p>
      </div>

      {/* Bottom Technical Stamps */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-t border-white/10 pt-4 relative z-10 text-[10px] font-mono-tech text-neutral-400">
        <div>LAUDOS ESTRUTURAIS</div>
        <div>PERÍCIAS CAUTELARES</div>
        <div>AVALIAÇÃO DE IMÓVEIS</div>
        <div className="text-right sm:text-right text-neutral-200">ABNT / NBR ATIVO</div>
      </div>
    </div>
  );
}
