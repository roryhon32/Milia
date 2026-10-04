"use client";

import React, { useState } from "react";
import { STUDIO_BRAND } from "@/data/projects";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [projectType, setProjectType] = useState("Residencial");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedMessage = `Olá, Lucas! Meu nome é ${name}.
Gostaria de conversar sobre um projeto ${projectType} em ${city || "minha cidade"}.
Observações: ${message || "Gostaria de agendar uma conversa inicial."}`;

    const encoded = encodeURIComponent(formattedMessage);
    window.open(
      `https://wa.me/${STUDIO_BRAND.contact.whatsapp}?text=${encoded}`,
      "_blank"
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FBF9F5] border border-[#E8E4DC] rounded-xs max-w-lg w-full p-8 md:p-10 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-xl text-[#7A7469] hover:text-[#1C1B19] focus:outline-none transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        <div className="mb-6">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C857B] block mb-1">
            Primeiro Contato
          </span>
          <h3 className="font-serif text-3xl text-[#1C1B19] font-light">
            Vamos conversar?
          </h3>
          <p className="text-xs text-[#635F57] mt-1 font-light leading-relaxed">
            Envie uma mensagem direta ao arquiteto Lucas Andrade via WhatsApp
            para conversarmos sobre seu espaço.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#555047] mb-1 font-medium">
              Seu Nome *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Mariana Silva"
              className="w-full px-4 py-2.5 bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs text-sm text-[#1C1B19] focus:outline-none focus:border-[#1C1B19]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#555047] mb-1 font-medium">
                Tipologia
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs text-sm text-[#1C1B19] focus:outline-none focus:border-[#1C1B19]"
              >
                <option value="Residencial">Residencial</option>
                <option value="Interiores">Interiores</option>
                <option value="Comercial">Comercial</option>
                <option value="Reforma">Reforma</option>
                <option value="Consultoria">Consultoria</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-[0.14em] text-[#555047] mb-1 font-medium">
                Cidade / Estado *
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Ex: Salvador, BA"
                className="w-full px-4 py-2.5 bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs text-sm text-[#1C1B19] focus:outline-none focus:border-[#1C1B19]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] uppercase tracking-[0.14em] text-[#555047] mb-1 font-medium">
              Mensagem (opcional)
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Conte-nos brevemente sobre o terreno, prazos ou o momento da sua família..."
              className="w-full px-4 py-2 bg-[#F4F0E6] border border-[#E5E0D6] rounded-xs text-sm text-[#1C1B19] focus:outline-none focus:border-[#1C1B19]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="gsap-btn w-full py-3 bg-[#2A2926] hover:bg-[#1C1B19] text-[#FBF9F5] text-xs tracking-[0.06em] font-normal rounded-full flex items-center justify-center gap-2 cursor-pointer will-change-transform"
            >
              <span>Conversar via WhatsApp</span>
              <span className="btn-arrow inline-block">→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
