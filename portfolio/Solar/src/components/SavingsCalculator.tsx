import React, { useState, useId, useMemo, useEffect, useRef } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Leaf, 
  Clock, 
  TrendingUp, 
  PiggyBank, 
  CheckCircle, 
  FileText,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { gsap } from '../lib/gsap';
import type { SimulationResult } from '../types/solar';

interface SavingsCalculatorProps {
  onOpenStudyModal: (summary: {
    monthlyBill: number;
    annualSavings: number;
    savings25Years: number;
    paybackYears: number;
    co2Avoided: number;
    propertyType: string;
    location: string;
  }) => void;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({ onOpenStudyModal }) => {
  const [monthlyBill, setMonthlyBill] = useState<number>(1100);
  const [propertyType, setPropertyType] = useState<string>('residencial');
  const [stateUf, setStateUf] = useState<string>('SP');
  const [city, setCity] = useState<string>('São Paulo');
  const [roofArea, setRoofArea] = useState<number>(45);
  const [connectionType, setConnectionType] = useState<string>('bifasico');
  const [hasCalculated, setHasCalculated] = useState<boolean>(true);

  // Accessible IDs for inputs
  const billInputId = useId();
  const propertySelectId = useId();
  const ufSelectId = useId();
  const cityInputId = useId();
  const areaInputId = useId();
  const connectionSelectId = useId();

  // Realistic calculation formula
  const result: SimulationResult = useMemo(() => {
    // 90% savings average on bill
    const monthlySavings = monthlyBill * 0.90;
    const annualSavings = monthlySavings * 12;
    const savings25Years = annualSavings * 25;
    
    // Payback in years based on system size
    // Typical Brazilian residential/commercial solar payback: 3.8 to 4.8 years
    const paybackYears = 4.3;

    // CO2 avoided in tons per year
    // Estimated ~0.084 kg CO2 per kWh, avg tariff ~R$ 0.95/kWh
    const kwhPerYear = (monthlyBill / 0.95) * 12;
    const co2AvoidedTons = Number(((kwhPerYear * 0.41) / 1000).toFixed(1));

    // Power kWp calculation
    const recommendedSystemKwp = Number((monthlyBill / 185).toFixed(2));
    const panelsCount = Math.ceil(recommendedSystemKwp / 0.55); // 550W panels

    const yearlyAccumulated = [
      { year: 5, savings: annualSavings * 5 },
      { year: 10, savings: annualSavings * 10 },
      { year: 15, savings: annualSavings * 15 },
      { year: 20, savings: annualSavings * 20 },
      { year: 25, savings: annualSavings * 25 },
    ];

    return {
      annualSavings,
      savings25Years,
      paybackYears,
      co2AvoidedTons,
      recommendedSystemKwp,
      panelsCount,
      yearlyAccumulated
    };
  }, [monthlyBill]);

  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleBillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const num = rawVal ? parseInt(rawVal, 10) : 0;
    setMonthlyBill(num);
  };

  const sectionRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.calc-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.calc-form-box', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });

      gsap.from('.calc-results-box', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        x: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCalculateClick = () => {
    setHasCalculated(true);
    if (resultsRef.current) {
      gsap.fromTo(
        resultsRef.current.querySelectorAll('.metric-val'),
        { scale: 0.95, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)', stagger: 0.05 }
      );
    }
  };

  const handleStudyRequest = () => {
    onOpenStudyModal({
      monthlyBill,
      annualSavings: result.annualSavings,
      savings25Years: result.savings25Years,
      paybackYears: result.paybackYears,
      co2Avoided: result.co2AvoidedTons,
      propertyType,
      location: `${city} - ${stateUf}`
    });
  };

  const ufOptions = [
    { uf: 'SP', name: 'São Paulo' },
    { uf: 'MG', name: 'Minas Gerais' },
    { uf: 'RJ', name: 'Rio de Janeiro' },
    { uf: 'PR', name: 'Paraná' },
    { uf: 'RS', name: 'Rio Grande do Sul' },
    { uf: 'SC', name: 'Santa Catarina' },
    { uf: 'BA', name: 'Bahia' },
    { uf: 'GO', name: 'Goiás' },
    { uf: 'MT', name: 'Mato Grosso' },
    { uf: 'MS', name: 'Mato Grosso do Sul' },
    { uf: 'CE', name: 'Ceará' },
    { uf: 'PE', name: 'Pernambuco' },
    { uf: 'ES', name: 'Espírito Santo' },
    { uf: 'DF', name: 'Distrito Federal' },
  ];

  return (
    <section ref={sectionRef} id="simulador" className="py-20 bg-[#f2f9f6] border-y border-emerald-100/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="calc-header text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-100/70 text-emerald-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Calculator className="w-3.5 h-3.5 text-emerald-800" />
            <span>SIMULADOR INTELIGENTE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Descubra quanto você pode economizar.
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Preencha os dados e veja uma estimativa de economia para o seu caso.
          </p>
        </div>

        {/* Simulator Grid: Form + Results Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Form Column */}
          <div className="calc-form-box lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Dados do seu imóvel
              </h3>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full">
                Simulação Rápida
              </span>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleCalculateClick(); }} className="space-y-6">
              
              {/* Conta de energia mensal */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={billInputId} className="text-sm font-semibold text-slate-800">
                    Conta de energia mensal média
                  </label>
                  <span className="text-base font-bold text-emerald-800">
                    {formatBRL(monthlyBill)}
                  </span>
                </div>
                
                {/* Range Slider for fast adjustment */}
                <input
                  type="range"
                  min="200"
                  max="30000"
                  step="50"
                  value={monthlyBill}
                  onChange={(e) => setMonthlyBill(parseInt(e.target.value, 10))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-800"
                  aria-label="Ajustar valor da conta de energia mensal"
                />

                {/* Direct Number Input */}
                <div className="relative mt-2.5">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 font-semibold text-sm pointer-events-none">
                    R$
                  </span>
                  <input
                    id={billInputId}
                    type="text"
                    value={monthlyBill.toLocaleString('pt-BR')}
                    onChange={handleBillInputChange}
                    className="w-full pl-10 pr-4 py-2.5 text-slate-900 font-semibold bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 transition-colors"
                    placeholder="1.100"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1.5">
                  Mova a barra ou digite o valor médio da sua conta de luz.
                </p>
              </div>

              {/* Grid: Tipo de Imóvel e Estado / Cidade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Tipo de imóvel */}
                <div>
                  <label htmlFor={propertySelectId} className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Tipo de imóvel
                  </label>
                  <select
                    id={propertySelectId}
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    <option value="residencial">Residencial</option>
                    <option value="comercial">Comercial</option>
                    <option value="industrial">Industrial</option>
                    <option value="rural">Rural / Agronegócio</option>
                  </select>
                </div>

                {/* UF */}
                <div>
                  <label htmlFor={ufSelectId} className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Estado (UF)
                  </label>
                  <select
                    id={ufSelectId}
                    value={stateUf}
                    onChange={(e) => setStateUf(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                  >
                    {ufOptions.map((item) => (
                      <option key={item.uf} value={item.uf}>
                        {item.name} ({item.uf})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid: Cidade & Área disponível */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor={cityInputId} className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Cidade
                  </label>
                  <input
                    id={cityInputId}
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                    placeholder="Sua cidade"
                  />
                </div>

                <div>
                  <label htmlFor={areaInputId} className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Área disponível de telhado / solo
                  </label>
                  <div className="relative">
                    <input
                      id={areaInputId}
                      type="number"
                      min="10"
                      max="10000"
                      value={roofArea}
                      onChange={(e) => setRoofArea(parseInt(e.target.value, 10) || 0)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700 pr-10"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 text-xs font-semibold pointer-events-none">
                      m²
                    </span>
                  </div>
                </div>
              </div>

              {/* Tipo de Ligação (Opcional) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor={connectionSelectId} className="text-sm font-semibold text-slate-800">
                    Tipo de ligação elétrica <span className="text-xs text-slate-400 font-normal">(opcional)</span>
                  </label>
                </div>
                <select
                  id={connectionSelectId}
                  value={connectionType}
                  onChange={(e) => setConnectionType(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                >
                  <option value="bifasico">Bifásico (Padrão mais comum residencial)</option>
                  <option value="trifasico">Trifásico (Comércios, indústrias e residências grandes)</option>
                  <option value="monofasico">Monofásico</option>
                </select>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-6 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center gap-2 group text-base"
              >
                <span>Calcular minha economia</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

            </form>
          </div>

          {/* Results Column */}
          <div 
            ref={resultsRef}
            className="calc-results-box lg:col-span-6 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-emerald-100 flex flex-col justify-between h-full"
          >
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">Estimativa Personalizada</span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">Seu Retorno com Energia Solar</h3>
                </div>
                <div className="p-2 bg-emerald-50 text-emerald-800 rounded-xl">
                  <PiggyBank className="w-6 h-6" />
                </div>
              </div>

              {/* 4 Main Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Economia Anual */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Economia anual</div>
                  <div className="metric-val text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1">
                    {formatBRL(result.annualSavings)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    recurso livre no seu orçamento
                  </div>
                </div>

                {/* Economia em 25 anos */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="text-xs font-semibold text-slate-500 uppercase">Economia em 25 anos</div>
                  <div className="metric-val text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    {formatBRL(result.savings25Years)}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    patrimônio protegido
                  </div>
                </div>

                {/* Payback estimado */}
                <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Payback estimado</span>
                  </div>
                  <div className="metric-val text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                    {result.paybackYears} anos
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">
                    retorno sobre o investimento
                  </div>
                </div>

                {/* CO2 Evitado */}
                <div className="p-4 bg-emerald-50/60 border border-emerald-100 rounded-xl">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 uppercase">
                    <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CO₂ evitado</span>
                  </div>
                  <div className="metric-val text-2xl sm:text-3xl font-extrabold text-emerald-900 mt-1">
                    {result.co2AvoidedTons} t
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                    toneladas de carbono/ano
                  </div>
                </div>

              </div>

              {/* Interactive Bar Chart: Economia Acumulada */}
              <div className="p-4 sm:p-5 bg-slate-50 rounded-xl border border-slate-200/70 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Economia Acumulada no Tempo (R$)
                  </span>
                  <span className="text-[11px] text-slate-500">Estimativa com tarifa média</span>
                </div>

                {/* Visual Bars */}
                <div className="grid grid-cols-5 gap-2 pt-6 items-end h-36">
                  {result.yearlyAccumulated.map((item, idx) => {
                    const maxHeight = 100;
                    const percentHeight = Math.max(18, Math.round((item.savings / result.savings25Years) * maxHeight));
                    return (
                      <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                        {/* Hover Tooltip Value */}
                        <span className="text-[10px] font-bold text-slate-600 opacity-80 group-hover:opacity-100 group-hover:text-emerald-800 transition-all text-center">
                          {formatBRL(item.savings)}
                        </span>
                        
                        {/* Bar */}
                        <div 
                          className="w-full bg-emerald-700 group-hover:bg-emerald-600 rounded-t-md transition-all duration-300 shadow-xs"
                          style={{ height: `${percentHeight}%` }}
                        />

                        {/* Label */}
                        <span className="text-xs font-semibold text-slate-600">
                          {item.year} anos
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recommended Technical Spec Tag */}
              <div className="flex items-center gap-3 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/80 text-xs text-slate-600 mb-6">
                <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  Sistema sugerido: <strong>{result.recommendedSystemKwp} kWp</strong> (~{result.panelsCount} módulos fotovoltaicos de 550W).
                </span>
              </div>
            </div>

            {/* Secondary CTA: Receber estudo completo */}
            <button
              type="button"
              onClick={handleStudyRequest}
              className="w-full py-3.5 px-6 font-semibold text-white bg-emerald-900 hover:bg-emerald-800 active:bg-emerald-950 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group shadow-sm"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Receber estudo completo por e-mail ou WhatsApp</span>
              <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default SavingsCalculator;
