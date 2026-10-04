import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Zap, 
  Layers, 
  MapPin, 
  TrendingUp, 
  Building 
} from 'lucide-react';
import { gsap } from '../lib/gsap';

interface FeaturedProjectProps {
  onOpenProjectModal: () => void;
}

export const FeaturedProject: React.FC<FeaturedProjectProps> = ({ onOpenProjectModal }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.featured-image-box', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      });

      gsap.from('.featured-content > *', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 25,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Real Aerial Photography */}
          <div className="lg:col-span-6 relative">
            <div className="featured-image-box relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 aspect-4/3 lg:aspect-5/4">
              <img
                src="https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=1200&q=85"
                alt="Vista aérea de grande usina fotovoltaica industrial instalada pela Solar Power Energy"
                className="w-full h-full object-cover transform hover:scale-102 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none" />

              {/* Tag inside image */}
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-slate-100 flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-ping" />
                <span className="text-xs font-bold text-slate-800">
                  Operação Ativa • Conexão 13.8 kV
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Case Details & Metrics */}
          <div className="featured-content lg:col-span-6 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <Building className="w-3.5 h-3.5" />
              <span>PROJETO EM DESTAQUE</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Energia solar em grande escala para uma indústria mais competitiva.
            </h2>

            {/* Short Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Engenharia completa, fornecimento de módulos de alta potência e conexão com subestação para o complexo fabril do Grupo Alpha Manufatura. O projeto viabilizou 93% de autossuficiência energética nas operações fabris.
            </p>

            {/* Indicators Grid */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-800 mb-1">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase text-slate-500">Potência instalada</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  3,43 MWp
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-800 mb-1">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase text-slate-500">Módulos solares</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900">
                  6.236 painéis
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center gap-2 text-emerald-800 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase text-slate-500">Localização</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-slate-900">
                  Triângulo Mineiro – MG
                </div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="flex items-center gap-2 text-emerald-800 mb-1">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase text-slate-500">Economia estimada</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-900">
                  R$ 3,8 Mi/ano
                </div>
              </div>

            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenProjectModal}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl shadow-xs transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <span>Ver projeto completo</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturedProject;
