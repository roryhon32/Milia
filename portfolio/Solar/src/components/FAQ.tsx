import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import type { FaqItem } from '../types/solar';

interface FAQProps {
  onContactClick?: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onContactClick }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'Em quanto tempo o sistema se paga?',
      answer: 'O tempo médio de retorno do investimento (payback) varia entre 3,5 e 5 anos, dependendo da sua concessionária local e padrão de consumo. Como os equipamentos possuem vida útil superior a 25 anos com garantia de geração, você desfruta de mais de 20 anos de energia praticamente gratuita.'
    },
    {
      id: 'faq-2',
      question: 'Preciso fazer alguma obra no imóvel?',
      answer: 'Na grande maioria dos casos não há necessidade de obras civis ou estruturais complexas. Nossos engenheiros realizam uma vistoria técnica prévia para avaliar a estrutura do telhado e o quadro de distribuição de energia. A fixação dos trilhos de alumínio e a passagem de cabos são realizadas de forma limpa, estanque e rápida.'
    },
    {
      id: 'faq-3',
      question: 'A empresa realiza a homologação junto à concessionária?',
      answer: 'Sim, cuidamos de 100% da burocracia técnica e jurídica. Elaboramos a ART (Anotação de Responsabilidade Técnica) junto ao CREA, submetemos o projeto à sua distribuidora de energia (ex: Enel, Cemig, CPFL, Neoenergia, etc.) e acompanhamos a vistoria até a troca do medidor pelo modelo bidirecional.'
    },
    {
      id: 'faq-4',
      question: 'Qual a manutenção necessária?',
      answer: 'A manutenção é simples e de baixíssimo custo. Como os módulos fotovoltaicos não possuem partes móveis, a manutenção preventiva consiste basicamente na lavagem periódica com água e pano macio (normalmente uma a duas vezes ao ano, auxiliada pelas chuvas) e inspeção visual das conexões elétricas.'
    },
    {
      id: 'faq-5',
      question: 'Existem opções de financiamento?',
      answer: 'Sim. Trabalhamos com as principais linhas de crédito solar do Brasil (Santander, BV, Sicredi, Banco do Brasil, Bradesco e Caixa). Muitas vezes, o valor da parcela mensal do financiamento fica menor do que o valor que você já paga mensalmente na sua conta de luz, gerando economia imediata no fluxo de caixa.'
    },
    {
      id: 'faq-6',
      question: 'Como funciona assinatura de energia?',
      answer: 'A assinatura de energia solar é a solução ideal para quem mora de aluguel ou em apartamento sem telhado próprio. A energia é gerada em nossas fazendas solares e injetada na rede da distribuidora. Você recebe créditos automáticos na sua conta com desconto garantido de 10% a 20%, sem precisar investir 1 real em placas nem realizar obras.'
    },
    {
      id: 'faq-7',
      question: 'Posso instalar energia solar em empresa ou condomínio?',
      answer: 'Com certeza. Atendemos indústrias, comércios de pequeno, médio e grande porte, galpões logísticos e condomínios residenciais/comerciais. Para condomínios, é possível tanto abastecer a área comum quanto ratear os créditos entre as unidades autônomas por meio de geração compartilhada.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>TIRE SUAS DÚVIDAS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Dúvidas frequentes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Respostas claras para as principais perguntas sobre energia solar fotovoltaica.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-3.5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-emerald-700/40 shadow-sm' 
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {item.question}
                  </span>
                  <div className={`p-1 rounded-full text-slate-400 group-hover:text-slate-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-emerald-800 bg-emerald-50' : ''}`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed font-normal border-t border-slate-100 animate-in fade-in duration-200">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra question helper */}
        <div className="mt-12 text-center p-6 bg-white rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Ainda tem alguma dúvida específica?</div>
              <div className="text-xs text-slate-500">Nossos engenheiros especialistas estão prontos para te orientar sem compromisso.</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onContactClick}
            className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors shrink-0"
          >
            Falar com especialista
          </button>
        </div>

      </div>
    </section>
  );
};

export default FAQ;
