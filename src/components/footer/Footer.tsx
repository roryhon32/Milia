import React from "react";
import { Logo } from "@/components/ui/Logo";
import { hasWhatsApp, siteConfig } from "@/data/siteConfig";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 lg:py-24 px-6 md:px-10 bg-[#08090A] text-neutral-400 font-sans border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Logo variant="light" size="lg" />
            <p className="text-sm text-neutral-400 max-w-sm font-normal pt-2">
              Sites, sistemas e experiências digitais de alto nível para empresas que valorizam credibilidade e precisão.
            </p>
            <p className="text-xs font-mono-tech text-neutral-400">
              {siteConfig.location}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">
              Navegação
            </p>
            <ul className="space-y-2 text-sm text-neutral-300">
              {siteConfig.navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-mono-tech uppercase tracking-wider text-neutral-400">
              Canais Oficiais
            </p>
            <ul className="space-y-2.5 text-sm text-neutral-300">
              {hasWhatsApp && <li>
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>WhatsApp Comercial</span>
                  <span className="text-neutral-400 text-xs">↗</span>
                </a>
              </li>}
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>{siteConfig.email}</span>
                  <span className="text-neutral-400 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>Instagram</span>
                  <span className="text-neutral-400 text-xs">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1.5"
                >
                  <span>LinkedIn</span>
                  <span className="text-neutral-400 text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Principles */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono-tech text-neutral-400">
          <p>
            © {currentYear} {siteConfig.legalName}. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span>Desenvolvido artesanalmente com Next.js & GSAP</span>
            <span>Sem templates • Feito com rigor</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
