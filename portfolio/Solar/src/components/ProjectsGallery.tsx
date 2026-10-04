import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Zap, 
  TrendingUp, 
  Layers, 
  ExternalLink 
} from 'lucide-react';
import type { ProjectItem } from '../types/solar';

interface ProjectsGalleryProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const projects: ProjectItem[] = [
    {
      id: 'proj-1',
      title: 'Residência Alphaville Planalto',
      city: 'Belo Horizonte',
      state: 'MG',
      category: 'Residencial',
      powerKwp: 14.8,
      panelsCount: 26,
      annualSavings: 'R$ 16.200/ano',
      image: 'https://images.unsplash.com/photo-1508873696983-2df5293cb325?auto=format&fit=crop&w=800&q=80',
      description: 'Projeto residencial com microinversores de alta eficiência para telhado multi-orientado e backup com bateria inteligente.'
    },
    {
      id: 'proj-2',
      title: 'Usina Agroindustrial Cerrado',
      city: 'Uberlândia',
      state: 'MG',
      category: 'Fazenda Solar',
      powerKwp: 1250,
      panelsCount: 2280,
      annualSavings: 'R$ 1,4 Milhão/ano',
      image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
      description: 'Fazenda solar conectada em média tensão com rastreadores solares (trackers) de um eixo para maximização de geração.'
    },
    {
      id: 'proj-3',
      title: 'Centro Médico & Empresarial Jardim Sul',
      city: 'Ribeirão Preto',
      state: 'SP',
      category: 'Comercial',
      powerKwp: 185,
      panelsCount: 336,
      annualSavings: 'R$ 210.000/ano',
      image: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
      description: 'Sistema fotovoltaico instalado em laje técnica com estruturas aerodinâmicas sem perfuração da manta de impermeabilização.'
    },
    {
      id: 'proj-4',
      title: 'Complexo Logístico Litoral Norte',
      city: 'Fortaleza',
      state: 'CE',
      category: 'Industrial',
      powerKwp: 840,
      panelsCount: 1520,
      annualSavings: 'R$ 980.000/ano',
      image: 'https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=800&q=80',
      description: 'Estrutura metálica adaptada para ambiente com atmosfera salina e inversores centrais com proteção IP66.'
    },
    {
      id: 'proj-5',
      title: 'Parque Fabril TecnoMetal',
      city: 'Campinas',
      state: 'SP',
      category: 'Industrial',
      powerKwp: 620,
      panelsCount: 1120,
      annualSavings: 'R$ 720.000/ano',
      image: 'https://images.unsplash.com/photo-1545208942-e1c9c916524b?auto=format&fit=crop&w=800&q=80',
      description: 'Integração em telhado de telhas trapezoidais com reforço estrutural preventivo e comissionamento elétrico de alta tensão.'
    },
    {
      id: 'proj-6',
      title: 'Condomínio Residencial Bougainville',
      city: 'Goiânia',
      state: 'GO',
      category: 'Residencial',
      powerKwp: 22.4,
      panelsCount: 40,
      annualSavings: 'R$ 26.800/ano',
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      description: 'Geração compartilhada entre casa sede e quiosque de lazer com inversores híbridos de última geração.'
    }
  ];

  const categories = ['Todos', 'Residencial', 'Comercial', 'Industrial', 'Fazenda Solar'];

  const filteredProjects = activeCategory === 'Todos'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? Math.max(0, filteredProjects.length - 1) : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= filteredProjects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="projetos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Category Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              PORTFÓLIO NACIONAL
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              Projetos pelo Brasil
            </h2>
            <p className="mt-3 text-lg text-slate-600">
              Engenharia de precisão operando com máxima geração em diferentes regiões.
            </p>
          </div>

          {/* Controls: Next / Prev Arrows */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <button
              type="button"
              onClick={prevSlide}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label="Projeto anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-emerald-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label="Próximo projeto"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-emerald-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid with Desktop presentation & Mobile scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl hover:border-emerald-700/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                  {/* Location Pin */}
                  <div className="absolute bottom-3 left-3 text-white flex items-center gap-1.5 text-xs font-bold bg-slate-950/60 backdrop-blur-xs px-2.5 py-1 rounded-md">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.city} – {project.state}</span>
                  </div>

                  {/* Category Badge */}
                  <span className="absolute top-3 right-3 text-[11px] font-semibold bg-white/95 text-slate-800 px-2.5 py-1 rounded-md shadow-xs">
                    {project.category}
                  </span>
                </div>

                {/* Details */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal line-clamp-2">
                    {project.description}
                  </p>

                  {/* Quick specs */}
                  <div className="grid grid-cols-2 gap-3 mt-5 pt-4 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Potência</span>
                      <span className="font-bold text-slate-800">{project.powerKwp} kWp</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">Economia gerada</span>
                      <span className="font-bold text-emerald-800">{project.annualSavings}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className="w-full py-2.5 px-4 text-xs font-bold text-slate-800 bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 rounded-xl border border-slate-200/80 transition-colors flex items-center justify-center gap-2 group/btn"
                >
                  <span>Ver detalhes do projeto</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProjectsGallery;
