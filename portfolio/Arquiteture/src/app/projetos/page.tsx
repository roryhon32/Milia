"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "@/components/PortfolioLink";
import { PROJECTS, STUDIO_BRAND } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageCreditsModal from "@/components/ImageCreditsModal";
import ContactModal from "@/components/ContactModal";

export default function ProjectsArchivePage() {
  const [activeFilter, setActiveFilter] = useState<string>("Todos");
  const [creditsOpen, setCreditsOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const categories = ["Todos", "Residencial", "Interiores"];

  const filteredProjects =
    activeFilter === "Todos"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <>
      <Header onOpenContact={() => setContactOpen(true)} />

      <main className="min-h-screen bg-[#FBF9F5] pt-28 md:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Header */}
          <div className="pb-8 mb-12 border-b border-[#E8E4DC]">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block mb-2 font-medium">
              Portfólio Conceitual
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#1C1B19] font-light">
              Projetos & Estudos Visuais
            </h1>
            <p className="text-xs sm:text-sm text-[#635F57] max-w-xl font-light mt-4 leading-relaxed">
              Seleção de estudos de caso e projetos conceituais contemporâneos,
              investigando a harmonia entre matéria natural, luz e proporção.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs px-4 py-1.5 rounded-full border transition-all cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#2A2926] text-[#FBF9F5] border-[#2A2926]"
                    : "bg-transparent text-[#635F57] border-[#D5CEC2] hover:border-[#1C1B19]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {filteredProjects.map((project) => (
              <article key={project.slug} className="group flex flex-col justify-between">
                <div>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="block relative w-full aspect-[16/11] rounded-xs overflow-hidden bg-[#EAE5DA] mb-4 shadow-xs"
                  >
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-center editorial-img-hover"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[9px] uppercase tracking-[0.16em] text-[#1C1B19]">
                      {project.conceptBadge}
                    </div>
                  </Link>

                  <div className="flex items-center justify-between text-xs text-[#8C857B] mb-1.5">
                    <span className="font-serif italic text-sm">
                      {project.number}
                    </span>
                    <span className="text-[11px]">
                      {project.category} • {project.location}, {project.state} • {project.year}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] font-light mb-2">
                    <Link
                      href={`/projetos/${project.slug}`}
                      className="hover:text-[#7A7469] transition-colors"
                    >
                      {project.title}
                    </Link>
                  </h2>

                  <p className="text-xs text-[#635F57] font-light leading-relaxed">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E8E4DC] flex justify-between items-center text-xs">
                  <span className="text-[11px] text-[#8C857B]">
                    Estudo de Arquitetura
                  </span>
                  <Link
                    href={`/projetos/${project.slug}`}
                    className="link-editorial text-xs font-normal text-[#1C1B19]"
                  >
                    Ver Estudo Completo →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Disclaimer at bottom of catalog */}
          <div className="mt-20 p-5 bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs text-xs text-[#635F57] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p>
              <strong className="text-[#1C1B19]">Nota:</strong> {STUDIO_BRAND.disclaimer}
            </p>
            <button
              onClick={() => setCreditsOpen(true)}
              className="text-xs text-[#1C1B19] font-medium whitespace-nowrap self-end sm:self-auto cursor-pointer"
            >
              Ver créditos de imagens ⌵
            </button>
          </div>
        </div>
      </main>

      <Footer onOpenCredits={() => setCreditsOpen(true)} />
      <ImageCreditsModal
        isOpen={creditsOpen}
        onClose={() => setCreditsOpen(false)}
      />
      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}

