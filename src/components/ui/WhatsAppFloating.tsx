"use client";

import React, { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import { hasWhatsApp, siteConfig } from "@/data/siteConfig";

export function WhatsAppFloating() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear once user scrolls past hero section (~400px)
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!hasWhatsApp) return null;

  return (
    <aside
      aria-label="Atendimento rápido via WhatsApp"
      aria-hidden={!visible}
      className={`fixed bottom-6 right-6 z-40 transition-all duration-500 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <a
        tabIndex={visible ? 0 : -1}
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-text="Conversar"
        className="group relative flex items-center gap-2.5 px-4 py-2.5 bg-[#121316] text-white border border-white/20 shadow-2xl hover:bg-white hover:text-black hover:border-white transition-all duration-300"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
        </span>
        <span className="text-xs font-mono-tech uppercase tracking-wider font-medium">
          Iniciar Conversa
        </span>
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:text-emerald-600 transition-colors" />
      </a>
    </aside>
  );
}
