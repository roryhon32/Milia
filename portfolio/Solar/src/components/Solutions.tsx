import React, { useEffect, useRef } from 'react';
import { 
  Zap, 
  Repeat, 
  SunMedium, 
  Store, 
  ArrowRight,
  Check
} from 'lucide-react';
import { gsap } from '../lib/gsap';

interface SolutionsProps {
  onSelectSolution: (solutionTitle: string) => void;
}

export const Solutions: React.FC<SolutionsProps> = ({ onSelectSolution }) => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solutions-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.solution-card', {
        scrollTrigger: {
          trigger: '.solutions-grid',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.14,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const solutions = [
    {
      id: 'sistema-fotovoltaico',
      title: 'Sistema Fotovoltaico',
      badge: 'Autoconsumo',
      description: 'Gere sua própria energia e reduza sua conta de luz em até 90%.',
      details: 'Instalação personalizada com equipamentos de alta eficiência tier-1, inversores inteligentes e monitoramento 24h em tempo real por aplicativo.',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80',
      highlights: ['Economia de até 90%', 'Valorização do imóvel', 'Monitoramento mobile']
    },
    {
      id: 'assinatura-energia',
      title: 'Assinatura de Energia',
      badge: 'Zero Investimento',
      description: 'Economize energia sem precisar instalar painéis solares no imóvel.',
      details: 'Ideal para apartamentos, imóveis alugados e empresas sem espaço físico no telhado. Energia gerada em nossas fazendas e injetada na sua rede.',
      icon: Repeat,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
      highlights: ['Sem obras ou custos de instalação', 'Desconto direto na fatura', 'Contratação 100% digital']
    },
    {
      id: 'fazendas-solares',
      title: 'Fazendas Solares',
      badge: 'Alta Rentabilidade',
      description: 'Invista em geração de energia limpa com alta previsibilidade.',
      details: 'Parques solares estruturados para geração centralizada e compartilhada. Fluxo de caixa consistente com taxa interna de retorno superior aos índices tradicionais.',
      icon: SunMedium,
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      highlights: ['Retorno médio de 1,5% a 2,2% a.m.', 'Segurança patrimonial', 'Demanda contratada garantida']
    },
    {
      id: 'franquias',
      title: 'Franquias',
      badge: 'Expansão',
      description: 'Entre para um mercado em expansão com um modelo de negócio estruturado.',
      details: 'Torne-se um parceiro franqueado Solar Power Energy com suporte de engenharia, plataforma comercial proprietária e homologação centralizada.',
      icon: Store,
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      highlights: ['Treinamento técnico e de vendas', 'Suporte total de engenharia', 'Margens atrativas no setor']
    }
  ];

  return (
    <section ref={sectionRef} id="solucoes" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="solutions-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            NOSSAS SOLUÇÕES
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Soluções para cada objetivo
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Do seu imóvel a grandes investimentos, temos a solução ideal para você.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="solutions-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
          {solutions.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="solution-card group flex flex-col bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Image container */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60" />
                  
                  {/* Badge */}
                  <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold bg-white/95 backdrop-blur-xs text-slate-800 rounded-md shadow-xs">
                    {item.badge}
                  </span>

                  {/* Icon badge floating over image bottom */}
                  <div className="absolute -bottom-3 left-4 p-2.5 bg-emerald-900 text-amber-400 rounded-xl shadow-md border-2 border-white">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 pt-7 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Bullet highlights */}
                    <ul className="mt-4 space-y-1.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
                      {item.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => onSelectSolution(item.title)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 group-hover:text-emerald-900 hover:underline decoration-2 underline-offset-4"
                    >
                      <span>Saiba mais</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default Solutions;
