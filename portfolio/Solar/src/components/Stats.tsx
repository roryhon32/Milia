import React, { useEffect, useRef } from 'react';
import { Users, CheckCircle2, MapPin, TrendingDown } from 'lucide-react';
import { gsap } from '../lib/gsap';

export const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        },
        y: 25,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statsList = [
    {
      value: '+6 mil',
      label: 'clientes atendidos',
      subtext: 'em todo o território nacional',
      icon: Users
    },
    {
      value: '+5 mil',
      label: 'projetos realizados',
      subtext: 'com 100% de homologação',
      icon: CheckCircle2
    },
    {
      value: '17 estados',
      label: 'no Brasil',
      subtext: 'presença técnica regional',
      icon: MapPin
    },
    {
      value: 'até 90%',
      label: 'de economia na conta de luz',
      subtext: 'previsibilidade financeira',
      icon: TrendingDown
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {statsList.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="stat-card flex flex-col items-center text-center p-4 rounded-xl hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-slate-700 mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
