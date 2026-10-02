"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Project } from "@/types";
import { X, ArrowUpRight, Check } from "lucide-react";
import { contactUrl } from "@/data/siteConfig";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  const whatsappHref = contactUrl(`Olá! Estava analisando o projeto "${project.title}" no site da Milia Co. e gostaria de conversar sobre algo semelhante para a minha empresa.`);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md transition-opacity duration-300"
    >
      {/* Modal Dialog Card */}
      <div ref={dialogRef} className="relative w-full max-w-4xl max-h-[90vh] bg-[#121316] border border-white/15 text-neutral-100 flex flex-col overflow-hidden shadow-2xl z-10">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#0C0D0F]">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono-tech px-2.5 py-1 border border-white/20 text-neutral-300">
              {project.badge}
            </span>
            <span className="text-xs font-mono-tech text-neutral-400">
              {project.segment} • {project.year}
            </span>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de detalhes"
            className="p-1.5 text-neutral-400 hover:text-white border border-transparent hover:border-white/20 transition-all focus:outline-none focus:ring-1 focus:ring-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          <div>
            <h3 id="modal-title" className="text-2xl sm:text-4xl font-heading font-light text-white tracking-tight">
              {project.title}
            </h3>
            <p className="mt-2 text-base sm:text-lg text-neutral-400 font-normal">
              {project.subtitle}
            </p>
          </div>

          {/* Objective & Strategic Context */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-y border-white/10">
            <div>
              <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2">
                Objetivo do Projeto
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {project.objective}
              </p>
            </div>
            <div>
              <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2">
                Solução Estratégica & Design
              </p>
              <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deliverables List */}
          <div>
            <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-4">
              {project.badge === "Projeto ativo" ? "Entregáveis & Especificações Técnicas" : "Escopo ilustrativo & Especificações Técnicas"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white/[0.02] border border-white/[0.06]">
                  <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-neutral-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {project.badge === "Projeto ativo" && project.proof && (
            <div className="border-t border-white/10 pt-6 space-y-4">
              <div className="flex items-center gap-4">
                {project.proof.clientLogoSrc && <Image src={project.proof.clientLogoSrc} alt={`Logo de ${project.proof.clientName}`} width={96} height={48} className="max-h-12 w-auto object-contain" />}
                <p className="text-sm text-neutral-200">{project.proof.clientName}</p>
              </div>
              {project.proof.testimonial && (
                <blockquote className="border-l border-white/30 pl-4 text-sm text-neutral-300">
                  <p>“{project.proof.testimonial.quote}”</p>
                  <footer className="mt-2 text-xs text-neutral-400">{project.proof.testimonial.author}{project.proof.testimonial.role ? `, ${project.proof.testimonial.role}` : ""}</footer>
                </blockquote>
              )}
              {project.proof.verifiedOutcome && <p className="text-xs text-neutral-300">Resultado verificado: {project.proof.verifiedOutcome}</p>}
            </div>
          )}

          {/* Tech Stack Chips */}
          <div>
            <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-3">
              Stack Tecnológica
            </p>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono-tech px-3 py-1 bg-white/[0.04] border border-white/10 text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 sm:px-8 py-4 border-t border-white/10 bg-[#0C0D0F]">
          <span className="text-xs text-neutral-400 font-mono-tech">
            {project.badge === "Projeto ativo" ? "Detalhes apresentados conforme autorização do cliente." : "Estudo conceitual: este projeto ilustra uma proposta de interface e escopo."}
          </span>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-mono-tech uppercase text-xs tracking-wider hover:bg-neutral-200 transition-colors"
          >
            <span>Conversar sobre meu projeto</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
