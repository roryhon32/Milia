import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

interface FinalCTAProps {
  onSimulateClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onSimulateClick }) => {
  return (
    <section className="relative overflow-hidden bg-[#0a3325] text-white py-24">
      {/* Background Image of solar plant with low opacity overlay */}
      <img
        src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1600&q=80"
        alt="Usina fotovoltaica ao pôr do sol"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-25"
        loading="lazy"
      />

      {/* Decorative dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062319] via-[#0a3325]/90 to-[#062319]/95 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/80 border border-emerald-600/40 text-amber-400 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-xs">
          <Zap className="w-3.5 h-3.5" />
          <span>ECONOMIA SUSTENTÁVEL GARANTIDA</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          Sua próxima conta de energia pode ser o começo de uma economia de décadas.
        </h2>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-emerald-100/90 max-w-2xl mx-auto font-normal leading-relaxed">
          Simule agora o seu projeto e descubra quanto potencial de energia solar existe para você.
        </p>

        {/* Action Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={onSimulateClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-[#0a3325]"
          >
            <span>Simular meu projeto</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Trust Badges under CTA */}
        <div className="mt-12 pt-8 border-t border-emerald-800/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-emerald-200/80 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Sem compromisso contratual</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Estudo de viabilidade 100% gratuito</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Engenheiros homologados pelo CREA</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTA;
