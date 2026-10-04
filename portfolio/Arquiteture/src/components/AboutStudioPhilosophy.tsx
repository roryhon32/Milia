"use client";

import React from "react";
import Image from "next/image";
import Link from "@/components/PortfolioLink";
import { PHILOSOPHY_PRINCIPLES, STUDIO_BRAND } from "@/data/projects";

export default function AboutStudioPhilosophy() {
  return (
    <section
      id="estudio"
      className="py-20 md:py-32 bg-[#FBF9F5] border-t border-[#E8E4DC] relative"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Column 1: Studio Narrative (approx 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block font-medium">
              Sobre o Estúdio
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1B19] leading-[1.12]">
              Projetamos lugares,<br />
              não apenas construções.
            </h2>

            <p className="text-xs sm:text-sm text-[#635F57] font-light leading-relaxed">
              Acreditamos em uma arquitetura que parte do lugar, da rotina e
              dos gestos. Buscamos criar espaços que valorizam a luz, a
              materialidade e a relação com o entorno, sempre com um olhar
              contemporâneo e atemporal.
            </p>

            <div className="pt-2">
              <Link
                href="/#processo"
                className="gsap-btn inline-flex items-center gap-2 text-xs text-[#1C1B19] hover:text-[#7A7469] font-normal group will-change-transform"
              >
                <span className="link-editorial">Conheça nossa história</span>
                <span className="btn-arrow inline-block">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Column 2: Atmospheric Vertical Image (approx 3.5 cols) */}
          <div className="lg:col-span-4">
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] rounded-xs overflow-hidden bg-[#EAE5DA]">
              <Image
                src={STUDIO_BRAND.aboutImage}
                alt="Luz solar rasante sobre parede com textura de cal e sombra vegetal"
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover object-center editorial-img-hover"
              />
            </div>
          </div>

          {/* Column 3: Philosophy Principles (approx 3.5 cols) */}
          <div className="lg:col-span-3 space-y-8 lg:pl-4">
            {PHILOSOPHY_PRINCIPLES.map((principle) => (
              <div key={principle.number} className="space-y-1.5">
                <span className="font-serif text-2xl text-[#8C857B] block font-light">
                  {principle.number}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl text-[#1C1B19] font-normal">
                  {principle.title}
                </h3>
                <p className="text-xs text-[#635F57] font-light leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

