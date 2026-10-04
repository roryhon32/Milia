import React from 'react';
import { X, MapPin, Zap, Layers, TrendingUp, CheckCircle, ShieldCheck } from 'lucide-react';
import type { ProjectItem } from '../types/solar';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectItem | null;
  onSimulateClick?: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  isOpen, 
  onClose, 
  project,
  onSimulateClick 
}) => {
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Image */}
        <div className="relative h-64 sm:h-72 bg-slate-900 shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 backdrop-blur-md text-white hover:bg-slate-900 transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge & Title over image */}
          <div className="absolute bottom-4 left-6 right-6">
            <span className="px-2.5 py-1 text-xs font-semibold bg-emerald-600 text-white rounded-md">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white mt-1.5 leading-snug">
              {project.title}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-amber-300 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{project.city} – {project.state}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Resumo Técnico da Obra
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Engineering Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold mb-1">
                <Zap className="w-3.5 h-3.5" />
                <span>Potência</span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {project.powerKwp} kWp
              </div>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Módulos</span>
              </div>
              <div className="text-lg font-bold text-slate-900">
                {project.panelsCount} unidades
              </div>
            </div>

            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-semibold mb-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Economia</span>
              </div>
              <div className="text-lg font-bold text-emerald-900">
                {project.annualSavings}
              </div>
            </div>
          </div>

          {/* Highlights checklist */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/70 space-y-2 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Homologação e aprovação técnica de acesso concluídas sem ressalvas</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Garantia de 25 anos de desempenho linear dos módulos fotovoltaicos</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>Sistema de monitoramento e telemetria conectado 24 horas por dia</span>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
          >
            Fechar
          </button>
          <button
            onClick={() => {
              onClose();
              if (onSimulateClick) onSimulateClick();
            }}
            className="px-5 py-2.5 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-xs"
          >
            Simular projeto similar
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProjectModal;
