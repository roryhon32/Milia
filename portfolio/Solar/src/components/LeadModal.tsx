import React, { useState } from 'react';
import { X, CheckCircle, Send, ShieldCheck, FileSpreadsheet, ArrowRight } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  summaryData?: {
    monthlyBill: number;
    annualSavings: number;
    savings25Years: number;
    paybackYears: number;
    co2Avoided: number;
    propertyType: string;
    location: string;
  } | null;
}

export const LeadModal: React.FC<LeadModalProps> = ({ isOpen, onClose, summaryData }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'email'>('whatsapp');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handlePhoneMask = (val: string) => {
    const raw = val.replace(/\D/g, '');
    let masked = raw;
    if (raw.length > 2) masked = `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length > 7) masked = `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
    setPhone(masked);
  };

  const formatBRL = (val?: number) => {
    if (!val) return 'R$ 0';
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 id="modal-headline" className="text-lg font-bold text-slate-900 leading-tight">
                Receber Estudo de Viabilidade Completo
              </h3>
              <p className="text-xs text-slate-500">
                Detalhamento técnico e fluxo de economia para seu imóvel
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-slate-900">
                Estudo Enviado com Sucesso!
              </h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Enviamos o PDF completo com o dimensionamento fotovoltaico e projeção de retorno financeiro para seu <strong>{channel === 'whatsapp' ? 'WhatsApp' : 'E-mail'}</strong>.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-xl"
                >
                  Concluir
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Summary Pill if from calculator */}
              {summaryData && (
                <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-100 text-xs text-emerald-950 flex justify-between items-center">
                  <div>
                    <span className="font-semibold block">Estimativa vinculada:</span>
                    <span>Economia anual de <strong>{formatBRL(summaryData.annualSavings)}</strong></span>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-emerald-800 block">Payback em:</span>
                    <strong className="text-sm">{summaryData.paybackYears} anos</strong>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nome completo
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: Carlos Eduardo Silveira"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp com DDD
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => handlePhoneMask(e.target.value)}
                  placeholder="(11) 98765-4321"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  E-mail corporativo ou pessoal
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="carlos@exemplo.com.br"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Como prefere receber seu estudo?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('whatsapp')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      channel === 'whatsapp' 
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>Via WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('email')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                      channel === 'email' 
                        ? 'border-emerald-700 bg-emerald-50 text-emerald-900' 
                        : 'border-slate-200 bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span>Via E-mail</span>
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-sm"
                >
                  {isSubmitting ? (
                    <span>Processando cálculo...</span>
                  ) : (
                    <>
                      <span>Receber meu estudo gratuito</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Seus dados são protegidos conforme a LGPD e nunca compartilhados.</span>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeadModal;
