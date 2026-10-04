import React, { useEffect, useRef } from 'react';
import { 
  SearchCheck, 
  FileCode2, 
  FileCheck2, 
  Wrench, 
  ShieldAlert
} from 'lucide-react';
import { gsap } from '../lib/gsap';

export const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.how-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.how-step-card', {
        scrollTrigger: {
          trigger: '.how-steps-grid',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Análise',
      icon: SearchCheck,
      description: 'Entendemos seu consumo e avaliamos o potencial da sua propriedade.',
      detail: 'Análise detalhada do histórico de faturas e irradiação solar do local.'
    },
    {
      step: '02',
      title: 'Projeto',
      icon: FileCode2,
      description: 'Desenvolvemos um projeto personalizado para seu objetivo.',
      detail: 'Engenharia de precisão com dimensionamento e seleção dos melhores inversores e painéis.'
    },
    {
      step: '03',
      title: 'Homologação',
      icon: FileCheck2,
      description: 'Cuidamos da documentação e contato com a concessionária.',
      detail: 'Aprovação técnica completa junto à distribuidora de energia sem burocracia para você.'
    },
    {
      step: '04',
      title: 'Instalação',
      icon: Wrench,
      description: 'Equipe especializada realiza a instalação e ativação do sistema.',
      detail: 'Instalação rápida com padrões rigorosos de segurança e ativação do monitoramento.'
    }
  ];

  return (
    <section ref={sectionRef} id="como-funciona" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="how-header text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
            PASSO A PASSO
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Um processo simples, seguro e sem complicação.
          </p>
        </div>

        {/* Horizontal Timeline */}
        <div className="relative">
          
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-16 right-16 h-0.5 bg-emerald-100 -z-0" />

          <div className="how-steps-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, index) => {
              const Icon = item.icon;
              return (
                <div 
                  key={item.step} 
                  className="how-step-card bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-700/30 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Header of card with step pill and icon */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-amber-400 flex items-center justify-center transition-colors shadow-xs">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-3xl font-extrabold text-slate-200 group-hover:text-emerald-700/40 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm font-semibold text-slate-700 mb-2 leading-relaxed">
                      {item.description}
                    </p>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {item.detail}
                    </p>
                  </div>

                  <div className="pt-4 mt-6 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-800">
                    <span>Etapa {index + 1} de 4</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 p-6 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-xl">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Engenharia credenciada pelo CREA e conformidade normativa</div>
              <div className="text-xs text-slate-500">Projetos rigorosamente alinhados à Resolução Normativa ANEEL e normas ABNT NBR 16690.</div>
            </div>
          </div>
          <a 
            href="#simulador" 
            className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline decoration-2 underline-offset-4 shrink-0"
          >
            Iniciar minha análise gratuita →
          </a>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
