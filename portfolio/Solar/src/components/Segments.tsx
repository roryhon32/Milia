import React, { useEffect, useRef } from 'react';
import { ArrowRight, Home, Building2, TrendingUp, Check } from 'lucide-react';
import { gsap } from '../lib/gsap';

interface SegmentsProps {
  onSelectSegment: (segmentName: string) => void;
}

export const Segments: React.FC<SegmentsProps> = ({ onSelectSegment }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.segments-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.segment-card', {
        scrollTrigger: {
          trigger: '.segments-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.16,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const segments = [
    {
      id: 'residencial',
      title: 'Residencial',
      subtitle: 'Mais economia e valorização para seu imóvel.',
      description: 'Proteja o orçamento da sua família contra a inflação energética e as bandeiras tarifárias vermelhas com sistemas esteticamente integrados à sua arquitetura.',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
      icon: Home,
      features: ['Redução de até 90% na conta', 'Valorização média de 8% a 15% do imóvel', 'Aplicativo de monitoramento em tempo real'],
      cta: 'Soluções para Casas'
    },
    {
      id: 'empresarial',
      title: 'Empresarial',
      subtitle: 'Reduza custos e aumente sua competitividade.',
      description: 'Transforme um dos maiores custos operacionais em margem de lucro líquida. Atendemos indústrias, redes varejistas, centros logísticos e agronegócio.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80',
      icon: Building2,
      features: ['Blindagem de custos em médio e longo prazo', 'Selo ESG e sustentabilidade corporativa', 'Projetos em média e alta tensão'],
      cta: 'Soluções Corporativas'
    },
    {
      id: 'investidores',
      title: 'Investidores',
      subtitle: 'Rentabilidade, previsibilidade e energia limpa.',
      description: 'Geração distribuída e usinas de investimento com contratos de locação garantidos e taxa interna de retorno com consistência superior à renda fixa.',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1000&q=80',
      icon: TrendingUp,
      features: ['TIR atrativa acima do CDI', 'Contratos de longo prazo estruturados', 'Gestão operacional e O&M inclusa'],
      cta: 'Soluções para Investidores'
    }
  ];

  return (
    <section ref={sectionRef} id="segmentos" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="segments-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            SEGMENTOS ATENDIDOS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Soluções por segmento
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Projetos customizados para o perfil e escala de cada cliente.
          </p>
        </div>

        {/* 3 Large Cards Grid */}
        <div className="segments-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {segments.map((segment) => {
            const Icon = segment.icon;
            return (
              <div
                key={segment.id}
                className="segment-card relative rounded-2xl overflow-hidden shadow-md group flex flex-col justify-between min-h-[480px] bg-slate-900"
              >
                {/* Background Image with subtle dark overlay */}
                <img
                  src={segment.image}
                  alt={segment.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/65 to-slate-950/40" />

                {/* Top Badge */}
                <div className="relative z-10 p-6 sm:p-7 flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-amber-400 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-600/80 text-white backdrop-blur-xs">
                    {segment.title}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 p-6 sm:p-7 pt-0 flex flex-col">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {segment.title}
                  </h3>

                  <p className="text-sm font-semibold text-amber-300 mb-3">
                    {segment.subtitle}
                  </p>

                  <p className="text-xs text-slate-300 mb-5 leading-relaxed font-normal">
                    {segment.description}
                  </p>

                  {/* Key Features */}
                  <ul className="space-y-2 mb-6 border-t border-white/10 pt-4 text-xs text-slate-200">
                    {segment.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onSelectSegment(segment.title)}
                    className="w-full py-3 px-4 font-bold text-xs uppercase tracking-wider text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>{segment.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Segments;
