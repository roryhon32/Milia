"use client";

import React, { useState, useEffect, useRef } from "react";
import { Logo } from "@/components/ui/Logo";
import { hasWhatsApp, siteConfig } from "@/data/siteConfig";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMenuLinkRef = useRef<HTMLAnchorElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    firstMenuLinkRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMobileMenuOpen(false); return; }
      if (event.key !== "Tab" || !menuRef.current) return;
      const links = Array.from(menuRef.current.querySelectorAll<HTMLAnchorElement>("a[href]"));
      if (!links.length) return;
      const first = links[0];
      const last = links[links.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      if (document.activeElement?.closest("#mobile-navigation")) menuButton?.focus();
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          isScrolled
            ? "py-3 bg-[#0C0D0F]/90 backdrop-blur-md border-b border-white/[0.08]"
            : "py-6 bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo with Monogram */}
          <div className="flex items-center">
            <Logo variant="light" size={isScrolled ? "sm" : "md"} />
          </div>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Navegação Principal"
            className="hidden md:flex items-center space-x-8 text-[13px] tracking-wide text-neutral-300 font-normal"
          >
            {siteConfig.navLinks.slice(0, 5).map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative py-1 text-neutral-300 hover:text-white transition-colors duration-200 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Desktop Action & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contato"
              data-cursor-text="Briefing"
              className={cn(
                "hidden sm:inline-flex items-center text-[12px] font-mono-tech uppercase tracking-wider px-4 py-2 border transition-all duration-300",
                "border-white/20 text-neutral-200 hover:text-black hover:bg-white hover:border-white",
                "focus-visible:ring-1 focus-visible:ring-white focus-visible:outline-none"
              )}
            >
              Iniciar projeto
            </a>

            {/* Mobile Hamburger Button */}
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              className="md:hidden relative p-2 text-neutral-300 hover:text-white focus:outline-none"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={cn(
                    "w-full h-[1.5px] bg-white transition-all duration-300",
                    mobileMenuOpen && "rotate-45 translate-y-[7.5px]"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-[1.5px] bg-white transition-all duration-300",
                    mobileMenuOpen && "opacity-0"
                  )}
                />
                <span
                  className={cn(
                    "w-full h-[1.5px] bg-white transition-all duration-300",
                    mobileMenuOpen && "-rotate-45 -translate-y-[7px]"
                  )}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        ref={menuRef}
        id="mobile-navigation"
        inert={!mobileMenuOpen}
        aria-hidden={!mobileMenuOpen}
        className={cn(
          "fixed inset-0 z-30 bg-[#0C0D0F] transition-all duration-500 md:hidden flex flex-col justify-between px-8 pt-28 pb-10",
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
      >
        <div className="space-y-6">
          <p className="text-[11px] font-mono-tech uppercase tracking-widest text-neutral-500">
            Navegação
          </p>
          <div className="flex flex-col space-y-4">
            {siteConfig.navLinks.map((link, idx) => (
              <a
                ref={idx === 0 ? firstMenuLinkRef : undefined}
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-heading font-light tracking-tight text-neutral-200 hover:text-white flex items-center justify-between border-b border-white/[0.08] pb-3"
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono-tech text-neutral-500">0{idx + 1}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/[0.08] space-y-4">
          <p className="text-xs text-neutral-400">
            Estúdio digital focado em sites e produtos tecnológicos de alto padrão.
          </p>
          <a
            href={siteConfig.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="w-full py-3 bg-white text-black text-center font-mono-tech uppercase text-xs tracking-wider block"
          >
            {hasWhatsApp ? "Falar pelo WhatsApp" : "Falar por e-mail"}
          </a>
        </div>
      </div>
    </>
  );
}
