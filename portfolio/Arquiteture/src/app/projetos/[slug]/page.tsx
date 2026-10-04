import React from "react";
import Image from "next/image";
import Link from "@/components/PortfolioLink";
import { notFound } from "next/navigation";
import { PROJECTS, STUDIO_BRAND } from "@/data/projects";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Projeto Não Encontrado — Lumière Arquitetura",
    };
  }

  return {
    title: `${project.title} — ${project.category} (${project.conceptBadge}) | Lumière`,
    description: project.overview,
    openGraph: {
      title: `${project.title} — Lumière Arquitetura`,
      description: project.tagline,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = PROJECTS[projectIndex];
  const nextProject = PROJECTS[(projectIndex + 1) % PROJECTS.length];

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#FBF9F5] pt-28 md:pt-36 pb-24">
        {/* Project Breadcrumb & Editorial Header */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-10">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] text-[#8C857B] mb-6">
            <Link href="/" className="hover:text-[#1C1B19] transition-colors">
              Início
            </Link>
            <span>/</span>
            <Link
              href="/projetos"
              className="hover:text-[#1C1B19] transition-colors"
            >
              Projetos
            </Link>
            <span>/</span>
            <span className="text-[#1C1B19]">{project.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-[#E8E4DC]">
            <div>
              <div className="flex items-baseline gap-4 mb-2">
                <span className="font-serif text-2xl text-[#8C857B] italic">
                  {project.number}
                </span>
                <span className="text-xs uppercase tracking-[0.18em] text-[#1C1B19] font-medium">
                  {project.category} • {project.location}, {project.state}
                </span>
                <span className="text-[11px] px-2.5 py-0.5 bg-[#F4F0E6] text-[#635F57] rounded-xs border border-[#E5E0D6]">
                  {project.conceptBadge}
                </span>
              </div>
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#1C1B19] tracking-tight">
                {project.title}
              </h1>
            </div>

            <p className="text-xs sm:text-sm text-[#635F57] font-light max-w-md leading-relaxed">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Hero Photographic Bleed */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-16 md:mb-24">
          <div className="relative w-full aspect-[16/10] sm:aspect-[21/10] rounded-xs overflow-hidden bg-[#EAE5DA] shadow-xs">
            <Image
              src={project.coverImage}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-[#8C857B] mt-3 px-1">
            <span>{project.gallery[0]?.caption || project.tagline}</span>
            <span>
              {project.location} • Concepção {project.year}
            </span>
          </div>
        </div>

        {/* Technical Data & Concept Columns */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Specs Column */}
            <div className="lg:col-span-4 bg-[#F4F0E6] p-8 rounded-xs border border-[#E5E0D6] space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#E0DACE]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] font-medium">
                  Ficha do Estudo
                </span>
                <span className="text-[10px] text-[#8C857B]">Conceito</span>
              </div>

              <dl className="space-y-3.5 text-xs">
                {project.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between items-baseline border-b border-[#E8E4DC] pb-2"
                  >
                    <dt className="text-[#8C857B]">{spec.label}</dt>
                    <dd className="font-medium text-[#1C1B19] text-right">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="pt-2">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-2 font-medium">
                  Materialidade
                </span>
                <ul className="space-y-1.5 text-xs text-[#635F57]">
                  {project.materials.map((mat) => (
                    <li key={mat} className="flex items-start gap-2">
                      <span className="text-[#1C1B19] mt-0.5">•</span>
                      <span>{mat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Narrative Concept Column */}
            <div className="lg:col-span-8 space-y-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block mb-3 font-medium">
                  Partido Arquitetônico
                </span>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1C1B19] font-light leading-snug mb-5">
                  Estudo de volumetria, ventilação e integração com a paisagem.
                </h2>
                <p className="text-sm text-[#635F57] font-light leading-relaxed mb-5">
                  {project.overview}
                </p>
                <p className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed">
                  {project.conceptText}
                </p>
              </div>

              {/* Disclaimer inside individual project */}
              <div className="p-6 bg-[#FBF9F5] rounded-xs border border-[#E8E4DC] text-xs text-[#7A7469] leading-relaxed">
                <p>
                  <strong className="text-[#1C1B19] font-medium">
                    Nota de Transparência:
                  </strong>{" "}
                  {STUDIO_BRAND.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Photographic Essay Grid */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 mb-20 md:mb-32">
          <div className="pb-4 mb-10 border-b border-[#E8E4DC] flex justify-between items-baseline">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[#8C857B]">
              Ensaio Visual
            </span>
            <span className="text-xs text-[#8C857B]">
              {project.gallery.length} Registros Visuais
            </span>
          </div>

          <div className="space-y-10">
            {project.gallery.slice(1).map((item, idx) => (
              <div key={idx} className="group">
                <div className="relative w-full aspect-[16/10] rounded-xs overflow-hidden bg-[#EAE5DA]">
                  <Image
                    src={item.url}
                    alt={item.caption}
                    fill
                    sizes="100vw"
                    className="object-cover object-center editorial-img-hover"
                  />
                </div>
                <p className="text-xs text-[#7A7469] font-light mt-2.5 px-1 italic font-serif">
                  {item.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Next Project Teaser */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-12 border-t border-[#E8E4DC]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C857B] block mb-1">
                Próximo Estudo
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] font-light">
                <Link
                  href={`/projetos/${nextProject.slug}`}
                  className="hover:text-[#7A7469] transition-colors"
                >
                  {nextProject.title} ({nextProject.year}) →
                </Link>
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/projetos"
                className="gsap-btn px-5 py-2.5 border border-[#D5CEC2] hover:border-[#1C1B19] rounded-full text-xs text-[#1C1B19] font-normal will-change-transform"
              >
                Voltar aos Projetos
              </Link>
              <a
                href={`https://wa.me/${STUDIO_BRAND.contact.whatsapp}?text=Olá,%20gostei%20do%20estudo%20${encodeURIComponent(project.title)}%20e%20gostaria%20de%20conversar.`}
                target="_blank"
                rel="noopener noreferrer"
                className="gsap-btn px-5 py-2.5 bg-[#2A2926] text-[#FBF9F5] hover:bg-[#1C1B19] rounded-full text-xs font-normal will-change-transform flex items-center gap-1.5"
              >
                <span>Conversar Sobre Este Conceito</span>
                <span className="btn-arrow inline-block">→</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

