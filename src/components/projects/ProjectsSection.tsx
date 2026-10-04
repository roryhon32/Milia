"use client";

import React, { useState, useRef } from "react";
import { projectsData } from "@/data/projects";
import { Project } from "@/types";
import { ProjectPreviewMockup } from "./ProjectPreviewMockup";
import { ProjectModal } from "./ProjectModal";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { contactUrl } from "@/data/siteConfig";

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          all: "(min-width: 0px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduceMotion, isDesktop } = context.conditions as {
            reduceMotion: boolean;
            isDesktop: boolean;
          };

          if (reduceMotion) return;

          const cards = gsap.utils.toArray<HTMLElement>(".project-card");
          cards.forEach((card) => {
            const visual = card.querySelector(".project-visual");
            const info = card.querySelector(".project-info");

            if (isDesktop && visual) {
              gsap.fromTo(
                visual,
                { y: 30, opacity: 0.8 },
                {
                  y: -20,
                  opacity: 1,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                }
              );
            }

            if (isDesktop && info) {
              gsap.from(info, {
                opacity: 0,
                y: 20,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 75%",
                },
              });
            }
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <>
      <section
        id="projetos"
        ref={containerRef}
        className="relative py-14 lg:py-20 px-6 md:px-10 bg-[#0C0D0F] border-b border-white/[0.08]"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header Meta */}
          <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] text-xs font-mono-tech text-neutral-400">
            <span>PROJETOS & ESTUDOS</span>
            <span>DESIGN & EXPERIÊNCIA DIGITAL</span>
          </div>

          {/* Section Headline */}
          <div className="py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-light tracking-[-0.03em] text-white leading-tight">
                Veja o que podemos criar para sua empresa.
              </h2>
            </div>
            <div className="lg:col-span-4 lg:text-right">
              <p className="text-xs font-mono-tech text-neutral-400">
                Duas experiências completas para explorar antes de pedir sua proposta.
              </p>
            </div>
          </div>

          {/* Projects Large Viewport Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pt-4">
            {projectsData.map((project) => (
              <div
                key={project.id}
                className="project-card flex flex-col gap-5"
              >
                {/* Visual Showcase (Occupies 7 cols on desktop) */}
                <div
                  className="w-full"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    data-cursor-text="Ver Case"
                    aria-label={`Explorar estudo de caso: ${project.title}`}
                    className="project-visual group relative block text-left aspect-[16/10] w-full overflow-hidden border border-white/10 bg-[#16171A] cursor-pointer transition-transform duration-500 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-white"
                  >
                    {project.imageSrc ? <Image src={project.imageSrc} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /> : <ProjectPreviewMockup project={project} />}

                    {/* Interactive Hover Overlay Label */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                      <span className="px-5 py-2.5 bg-white text-black font-mono-tech uppercase text-xs tracking-wider inline-flex items-center gap-2">
                        <span>Explorar estudo de caso</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </button>
                </div>

                {/* Project Info & Metadata (Occupies 5 cols on desktop) */}
                <div
                  className="project-info w-full space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono-tech px-2.5 py-0.5 border border-white/20 text-neutral-300">
                      {project.badge}
                    </span>
                    <span className="text-xs font-mono-tech text-neutral-400">
                      {project.segment}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-heading font-light tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-neutral-400 font-normal">
                      {project.subtitle}
                    </p>
                  </div>

                  <div className="space-y-2 py-3 border-y border-white/[0.08]">
                    <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400">
                      Objetivo Estratégico
                    </p>
                    <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                      {project.objective}
                    </p>
                  </div>

                  {/* Services Delivered Chips */}
                  <div>
                    <p className="text-[11px] font-mono-tech uppercase tracking-wider text-neutral-400 mb-2">
                      {project.badge === "Projeto ativo" ? "Serviços executados" : "Escopo proposto"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((srv, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-mono-tech px-2.5 py-1 bg-white/[0.03] border border-white/[0.08] text-neutral-300"
                        >
                          {srv}
                        </span>
                      ))}
                    </div>
                  </div>

                  {project.previewUrl && <a href={project.previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-black px-5 py-3 text-sm hover:bg-neutral-200">Abrir site completo <ArrowUpRight className="w-4 h-4" /></a>}
                  {/* Trigger Action */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-wider text-white border-b border-white pb-1 hover:text-neutral-300 hover:border-neutral-300 transition-colors"
                    >
                      <span>Ver detalhes</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-5 border-t border-white/[0.08] pt-8 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-relaxed text-neutral-400">Explore as demonstrações completas. Projetos de portfólio apresentados como estudos, sem resultados comerciais atribuídos.</p>
            <a href={contactUrl("Olá! Vi os projetos da Milia Co. e gostaria de conversar sobre algo assim para meu negócio.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border-b border-white pb-1 text-xs font-mono-tech uppercase tracking-wider text-white hover:text-neutral-300 transition-colors">
              Quero algo assim para meu negócio <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Detail Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

