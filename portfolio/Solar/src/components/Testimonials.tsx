import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';
import type { TestimonialItem } from '../types/solar';

export const Testimonials: React.FC = () => {
  const testimonials: TestimonialItem[] = [
    {
      id: 'dep-1',
      name: 'Carlos Eduardo Nogueira',
      role: 'Proprietário Residencial',
      city: 'Ribeirão Preto',
      state: 'SP',
      rating: 5,
      savingsPercent: '88% de economia',
      text: 'Nossa conta de energia ficava perto de R$ 1.300 no verão com ar-condicionado. Instalamos 14 placas com a Solar Power Energy e o último boleto veio na taxa mínima de R$ 94. A equipe cumpriu todos os prazos de homologação.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: 'dep-2',
      name: 'Mariana Silveira Furtado',
      role: 'Diretora de Operações',
      city: 'Belo Horizonte',
      state: 'MG',
      rating: 5,
      savingsPercent: 'R$ 24 mil/mês poupados',
      text: 'Estruturamos a usina no telhado do nosso centro de distribuição logístico. O suporte técnico de engenharia durante o parecer de acesso com a concessionária foi impecável. Retorno financeiro totalmente condizente com o estudo inicial.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80'
    },
    {
      id: 'dep-3',
      name: 'Roberto Vianna Albuquerque',
      role: 'Produtor Rural & Investidor',
      city: 'Rio Verde',
      state: 'GO',
      rating: 5,
      savingsPercent: 'Investimento com TIR de 2,1% a.m.',
      text: 'Buscava diversificação patrimonial além do agronegócio tradicional. Construímos uma fazenda solar de 400 kWp com a Solar Power. O contrato de injeção na rede e o aplicativo de telemetria me dão total tranquilidade.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80'
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            AVALIAÇÕES REAIS
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            O que nossos clientes dizem
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Histórias reais de quem transformou o custo de energia em patrimônio e previsibilidade.
          </p>
        </div>

        {/* 3 Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Discreet 5 Stars */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1" aria-label="Avaliação 5 estrelas">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                    {item.savingsPercent}
                  </span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                  "{item.text}"
                </p>
              </div>

              {/* Author Details with Photo */}
              <div className="pt-4 border-t border-slate-100 flex items-center gap-3.5">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border border-slate-200"
                  loading="lazy"
                />
                <div>
                  <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{item.name}</span>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.role} • {item.city} – {item.state}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
