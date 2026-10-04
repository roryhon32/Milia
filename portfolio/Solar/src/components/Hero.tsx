import React, { useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Users, 
  CheckCircle2, 
  MapPin, 
  TrendingDown, 
  Clock, 
  ShieldCheck
} from 'lucide-react';
import { gsap } from '../lib/gsap';

interface HeroProps {
  onSimulateClick: () => void;
  onExploreSolutionsClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSimulateClick, 
  onExploreSolutionsClick 
}) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-eyebrow', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      })
      .from('.hero-headline', {
        y: 35,
        opacity: 0,
        duration: 0.8,
      }, '-=0.35')
      .from('.hero-desc', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.5')
      .from('.hero-ctas', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.hero-trust-item', {
        y: 15,
        opacity: 0,
        stagger: 0.12,
        duration: 0.5,
      }, '-=0.3')
      .from('.hero-visual', {
        scale: 0.94,
        opacity: 0,
        duration: 0.9,
      }, 0.2)
      .from('.hero-floating-1', {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, 0.6)
      .from('.hero-floating-2', {
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'back.out(1.5)',
      }, 0.7);

      // Subtle continuous ambient float for floating cards
      if (card1Ref.current) {
        gsap.to(card1Ref.current, {
          y: -8,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.2
        });
      }

      if (card2Ref.current) {
        gsap.to(card2Ref.current, {
          y: 7,
          duration: 3.6,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.4
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative overflow-hidden bg-white pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background subtle mesh/glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-amber-50/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & Actions */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Eyebrow badge */}
            <div className="hero-eyebrow inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs sm:text-sm font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>ENERGIA SOLAR PARA UM FUTURO MAIS INTELIGENTE</span>
            </div>

            {/* Headline */}
            <h1 className="hero-headline text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Energia solar que{' '}
              <span className="text-emerald-800 underline decoration-amber-400 decoration-wavy decoration-2 underline-offset-8">
                reduz custos
              </span>{' '}
              e acelera seu retorno.
            </h1>

            {/* Subtitle */}
            <p className="hero-desc text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
              Soluções completas em energia solar para residências, empresas e investidores. 
              Mais economia, previsibilidade e um futuro sustentável.
            </p>

            {/* CTAs */}
            <div className="hero-ctas flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onSimulateClick}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                <span>Simular economia</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onExploreSolutionsClick}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold text-slate-700 hover:text-emerald-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/90 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-700"
              >
                <span>Conhecer soluções</span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-6 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-4 sm:gap-6">
                
                <div className="hero-trust-item flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900">+6.000</div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">clientes atendidos</div>
                  </div>
                </div>

                <div className="hero-trust-item flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900">+5.000</div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">projetos realizados</div>
                  </div>
                </div>

                <div className="hero-trust-item flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-slate-900">17 estados</div>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">no Brasil</div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Real Photography & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Image Container */}
              <div className="hero-visual relative rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-100 aspect-4/3 sm:aspect-5/4 lg:aspect-4/5">
                <img
                  src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=1200&q=85"
                  alt="Residência moderna brasileira com sistema de painéis solares fotovoltaicos no telhado"
                  className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700 ease-out"
                  loading="eager"
                />

                {/* Subtle vignette / gradient for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

                {/* Certified Badge inside image */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-100 shadow-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-semibold text-slate-800">Garantia 25 anos</span>
                </div>
              </div>

              {/* Floating Card 1: Economia estimada */}
              <div 
                ref={card1Ref}
                className="hero-floating-1 absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-slate-100 p-4 sm:p-5 rounded-xl shadow-lg max-w-[220px] sm:max-w-[240px]"
              >
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-1">
                  <TrendingDown className="w-4 h-4 text-emerald-700" />
                  <span>Economia estimada</span>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  90%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  na sua conta de energia
                </div>
              </div>

              {/* Floating Card 2: Payback estimado */}
              <div 
                ref={card2Ref}
                className="hero-floating-2 absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 sm:p-4 rounded-xl shadow-lg max-w-[190px] sm:max-w-[210px]"
              >
                <div className="flex items-center gap-1.5 text-amber-600 text-xs font-semibold mb-0.5">
                  <Clock className="w-4 h-4 text-amber-500" />
                  <span>Payback estimado</span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  4,2 anos
                </div>
                <div className="text-[11px] text-slate-500 font-medium">
                  retorno acelerado do capital
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
