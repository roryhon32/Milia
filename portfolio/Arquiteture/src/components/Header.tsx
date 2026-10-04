"use client";

import React, { useState, useEffect } from "react";
import Link from "@/components/PortfolioLink";
import { STUDIO_BRAND } from "@/data/projects";

interface HeaderProps {
  onOpenContact?: () => void;
}

export default function Header({ onOpenContact }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Projetos", href: "/#projetos" },
    { label: "Estúdio", href: "/#estudio" },
    { label: "Serviços", href: "/#servicos" },
    { label: "Processo", href: "/#processo" },
    { label: "Contato", href: "/#contato" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-4 bg-[#FBF9F5]/95 backdrop-blur-md border-b border-[#E8E4DC] shadow-[0_2px_12px_-8px_rgba(0,0,0,0.03)]"
            : "py-6 md:py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex flex-col items-start focus:outline-none"
            aria-label="Lumière Arquitetura Início"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-[0.18em] font-normal text-[#1C1B19]">
              {STUDIO_BRAND.name}
            </span>
            <span className="font-sans text-[8px] uppercase tracking-[0.38em] text-[#8C857B] mt-[-3px]">
              {STUDIO_BRAND.subtitle}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center gap-8 lg:gap-11 text-xs text-[#555047]"
            aria-label="Navegação principal"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="link-editorial hover:text-[#1C1B19] transition-colors py-1 font-light"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenContact}
              className="gsap-btn text-xs px-5 py-2.5 rounded-full bg-[#2A2926] hover:bg-[#1C1B19] text-[#FBF9F5] font-normal shadow-xs flex items-center gap-1.5 cursor-pointer will-change-transform"
            >
              <span>Fale conosco</span>
              <span className="btn-arrow text-xs inline-block">→</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 -mr-2 text-[#1C1B19] focus:outline-none"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-[1.5px] bg-[#1C1B19] transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              />
              <span
                className={`w-4/5 h-[1.5px] bg-[#1C1B19] transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-full h-[1.5px] bg-[#1C1B19] transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-30 bg-[#FBF9F5] transition-all duration-300 md:hidden flex flex-col justify-between p-8 pt-28 ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] border-b border-[#E8E4DC] pb-3">
            Menu
          </span>
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#1C1B19] hover:text-[#7A7469] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#E8E4DC] pt-6">
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact?.();
            }}
            className="gsap-btn w-full text-center text-xs py-3.5 rounded-full bg-[#2A2926] text-[#FBF9F5] flex items-center justify-center gap-1.5 will-change-transform"
          >
            <span>Fale conosco</span>
            <span className="btn-arrow inline-block">→</span>
          </button>
          <div className="text-center text-[11px] text-[#8C857B]">
            {STUDIO_BRAND.reach}
          </div>
        </div>
      </div>
    </>
  );
}

