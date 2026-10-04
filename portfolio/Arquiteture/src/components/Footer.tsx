"use client";

import React from "react";
import Link from "@/components/PortfolioLink";
import { STUDIO_BRAND } from "@/data/projects";

interface FooterProps {
  onOpenCredits?: () => void;
}

export default function Footer({ onOpenCredits }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FBF9F5] text-[#1C1B19] border-t border-[#E8E4DC] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top Navigation Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[#E8E4DC]">
          {/* Logo */}
          <Link
            href="/"
            className="flex flex-col items-start focus:outline-none"
            aria-label="Lumière Arquitetura"
          >
            <span className="font-serif text-2xl tracking-[0.16em] font-light text-[#1C1B19]">
              {STUDIO_BRAND.name}
            </span>
            <span className="font-sans text-[8px] uppercase tracking-[0.35em] text-[#8C857B] mt-[-3px]">
              {STUDIO_BRAND.subtitle}
            </span>
          </Link>

          {/* Center Navigation */}
          <nav
            className="flex flex-wrap items-center gap-6 lg:gap-8 text-xs text-[#555047]"
            aria-label="Navegação secundária"
          >
            <Link href="/#projetos" className="link-editorial hover:text-[#1C1B19]">
              Projetos
            </Link>
            <Link href="/#estudio" className="link-editorial hover:text-[#1C1B19]">
              Estúdio
            </Link>
            <Link href="/#servicos" className="link-editorial hover:text-[#1C1B19]">
              Serviços
            </Link>
            <Link href="/#processo" className="link-editorial hover:text-[#1C1B19]">
              Processo
            </Link>
            <Link href="/#contato" className="link-editorial hover:text-[#1C1B19]">
              Contato
            </Link>
          </nav>

          {/* Right Socials */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-[#555047]">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial hover:text-[#1C1B19]"
            >
              Instagram
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial hover:text-[#1C1B19]"
            >
              Pinterest
            </a>
            <a
              href={`https://wa.me/${STUDIO_BRAND.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="link-editorial hover:text-[#1C1B19]"
            >
              WhatsApp
            </a>
            <a
              href={`mailto:${STUDIO_BRAND.contact.email}`}
              className="link-editorial hover:text-[#1C1B19]"
            >
              E-mail
            </a>
          </div>
        </div>

        {/* Bottom Disclaimer & Credits Row */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-[11px] text-[#8C857B] font-light leading-relaxed">
          <div className="whitespace-nowrap">
            © {currentYear} {STUDIO_BRAND.fullName}. Projeto demonstrativo.
          </div>

          <div className="max-w-2xl text-[10px] leading-relaxed">
            {STUDIO_BRAND.disclaimer}
          </div>

          <div>
            <button
              onClick={onOpenCredits}
              className="gsap-btn link-editorial text-[#1C1B19] font-medium whitespace-nowrap cursor-pointer will-change-transform"
            >
              Créditos de imagens
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

