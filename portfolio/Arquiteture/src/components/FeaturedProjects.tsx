"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "@/components/PortfolioLink";
import { PROJECTS } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface FeaturedProjectsProps {
  onOpenCredits?: () => void;
}

export default function FeaturedProjects({ onOpenCredits }: FeaturedProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".project-item");
      items.forEach((item) => {
        const img = item.querySelector(".parallax-target");
        if (img) {
          gsap.fromTo(
            img,
            { y: -18, scale: 1.03 },
            {
              y: 18,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const [p1, p2, p3] = PROJECTS;

  return (
    <section
      id="projetos"
      ref={sectionRef}
      className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-24 pb-8 border-b border-[#E8E4DC]">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1B19] font-normal">
              Projetos em destaque
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end gap-6 md:max-w-md">
            <p className="text-xs text-[#635F57] font-light leading-relaxed">
              Cada projeto é um encontro entre lugar, pessoas, materiais e
              tempo. Conheça alguns estudos visuais que representam nossa
              abordagem.
            </p>
            <Link
              href="/projetos"
              className="gsap-btn text-xs px-4 py-2 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] font-normal whitespace-nowrap flex items-center gap-2 self-start sm:self-auto will-change-transform"
            >
              <span>Ver todos os projetos</span>
              <span className="btn-arrow text-xs inline-block">→</span>
            </Link>
          </div>
        </div>

        {/* ===================== PROJETO 01 (Casa Horizonte) ===================== */}
        <article className="project-item mb-24 md:mb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Metadata Left */}
            <div className="lg:col-span-3 space-y-4">
              <span className="font-serif text-xl text-[#8C857B] block font-light">
                {p1.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] font-normal">
                <Link
                  href={`/projetos/${p1.slug}`}
                  className="hover:text-[#7A7469] transition-colors"
                >
                  {p1.title}
                </Link>
              </h3>
              <div className="space-y-1 text-xs text-[#7A7469] font-light">
                <p>{p1.category}</p>
                <p>{p1.location}</p>
                <p>{p1.year}</p>
                <p className="font-normal text-[#1C1B19] pt-1">
                  {p1.conceptBadge}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/projetos/${p1.slug}`}
                  className="gsap-btn inline-flex items-center text-xs text-[#1C1B19] hover:text-[#7A7469] group will-change-transform"
                >
                  <span className="w-8 h-[1px] bg-[#1C1B19] group-hover:w-12 transition-all mr-1.5" />
                  <span className="btn-arrow inline-block">→</span>
                </Link>
              </div>
            </div>

            {/* Panoramic Image Right */}
            <div className="lg:col-span-9">
              <Link
                href={`/projetos/${p1.slug}`}
                className="group block relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xs bg-[#EAE5DA]"
              >
                <Image
                  src={p1.coverImage}
                  alt={p1.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="parallax-target object-cover object-center editorial-img-hover"
                />
              </Link>
            </div>
          </div>
        </article>

        {/* ===================== PROJETO 02 (Casa Pátio) ===================== */}
        <article className="project-item mb-24 md:mb-36">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Interior Living Image Left */}
            <div className="lg:col-span-9 order-2 lg:order-1">
              <Link
                href={`/projetos/${p2.slug}`}
                className="group block relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xs bg-[#EAE5DA]"
              >
                <Image
                  src={p2.coverImage}
                  alt={p2.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="parallax-target object-cover object-center editorial-img-hover"
                />
              </Link>
            </div>

            {/* Metadata Right */}
            <div className="lg:col-span-3 order-1 lg:order-2 space-y-4 lg:pl-6">
              <span className="font-serif text-xl text-[#8C857B] block font-light">
                {p2.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] font-normal">
                <Link
                  href={`/projetos/${p2.slug}`}
                  className="hover:text-[#7A7469] transition-colors"
                >
                  {p2.title}
                </Link>
              </h3>
              <div className="space-y-1 text-xs text-[#7A7469] font-light">
                <p>{p2.category}</p>
                <p>{p2.location}</p>
                <p>{p2.year}</p>
                <p className="font-normal text-[#1C1B19] pt-1">
                  {p2.conceptBadge}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/projetos/${p2.slug}`}
                  className="gsap-btn inline-flex items-center text-xs text-[#1C1B19] hover:text-[#7A7469] group will-change-transform"
                >
                  <span className="w-8 h-[1px] bg-[#1C1B19] group-hover:w-12 transition-all mr-1.5" />
                  <span className="btn-arrow inline-block">→</span>
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* ===================== PROJETO 03 (Casa Maré) ===================== */}
        <article className="project-item mb-20 md:mb-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Metadata Left */}
            <div className="lg:col-span-3 space-y-4">
              <span className="font-serif text-xl text-[#8C857B] block font-light">
                {p3.number}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1B19] font-normal">
                <Link
                  href={`/projetos/${p3.slug}`}
                  className="hover:text-[#7A7469] transition-colors"
                >
                  {p3.title}
                </Link>
              </h3>
              <div className="space-y-1 text-xs text-[#7A7469] font-light">
                <p>{p3.category}</p>
                <p>{p3.location}</p>
                <p>{p3.year}</p>
                <p className="font-normal text-[#1C1B19] pt-1">
                  {p3.conceptBadge}
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href={`/projetos/${p3.slug}`}
                  className="gsap-btn inline-flex items-center text-xs text-[#1C1B19] hover:text-[#7A7469] group will-change-transform"
                >
                  <span className="w-8 h-[1px] bg-[#1C1B19] group-hover:w-12 transition-all mr-1.5" />
                  <span className="btn-arrow inline-block">→</span>
                </Link>
              </div>
            </div>

            {/* Panoramic Image Right */}
            <div className="lg:col-span-9">
              <Link
                href={`/projetos/${p3.slug}`}
                className="group block relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-xs bg-[#EAE5DA]"
              >
                <Image
                  src={p3.coverImage}
                  alt={p3.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 75vw"
                  className="parallax-target object-cover object-center editorial-img-hover"
                />
              </Link>
            </div>
          </div>
        </article>

        {/* ===================== DISCLAIMER BAR ===================== */}
        <div className="bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start md:items-center gap-3.5 text-xs text-[#635F57] font-light leading-relaxed">
            <div className="w-6 h-6 rounded-full border border-[#C5BDAE] flex items-center justify-center flex-shrink-0 text-[11px] text-[#7A7469] font-serif">
              i
            </div>
            <p>
              <strong className="font-medium text-[#1C1B19]">
                Projeto demonstrativo.
              </strong>{" "}
              As imagens e projetos apresentados nesta página são utilizados
              exclusivamente para fins de conceito visual e apresentação de
              layout. Não representam obras executadas pelo profissional fictício
              apresentado.
            </p>
          </div>

          <button
            onClick={onOpenCredits}
            className="gsap-btn text-xs px-3.5 py-1.5 rounded-full border border-[#D5CEC2] hover:border-[#1C1B19] text-[#1C1B19] font-medium whitespace-nowrap flex items-center gap-1.5 self-end md:self-auto cursor-pointer will-change-transform"
          >
            <span>Ver créditos de imagens</span>
            <span className="btn-arrow text-[10px] inline-block">⌵</span>
          </button>
        </div>
      </div>
    </section>
  );
}

