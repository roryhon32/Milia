import React, { useState } from 'react';
import { MessageCircle, X, ArrowRight } from 'lucide-react';

export const WhatsAppFloating: React.FC = () => {
  const [tooltipOpen, setTooltipOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Discreet speech bubble */}
      {tooltipOpen && (
        <div className="mb-2 p-3 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-200/80 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-200 relative">
          <button
            onClick={() => setTooltipOpen(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600"
            aria-label="Fechar mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="text-xs font-bold text-emerald-800">
            Atendimento Especializado
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Olá! Deseja falar com um engenheiro solar da Solar Power Energy agora?
          </p>
          <a
            href="https://wa.me/5511987654321?text=Ol%C3%A1%2C+gostaria+de+uma+avalia%C3%A7%C3%A3o+solar+para+meu+im%C3%B3vel"
            target="_blank"
            rel="noreferrer"
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:underline"
          >
            <span>Iniciar conversa no WhatsApp</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/5511987654321?text=Ol%C3%A1%2C+gostaria+de+uma+avalia%C3%A7%C3%A3o+solar+para+meu+im%C3%B3vel"
        target="_blank"
        rel="noreferrer"
        onMouseEnter={() => setTooltipOpen(true)}
        className="w-13 h-13 rounded-full bg-emerald-700 hover:bg-emerald-600 active:bg-emerald-800 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        aria-label="Falar com especialista pelo WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
};

export default WhatsAppFloating;
