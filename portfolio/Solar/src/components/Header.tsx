import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  ChevronDown, 
  Menu, 
  X, 
  Zap, 
  Building2, 
  Home, 
  TrendingUp, 
  Briefcase, 
  ArrowRight,
  PhoneCall
} from 'lucide-react';
import Logo from './Logo';

interface HeaderProps {
  onOpenSimulador: () => void;
  onOpenContactModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSimulador, onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-3.5' 
          : 'bg-white border-b border-slate-100 py-4 lg:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a 
            href="#" 
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 rounded-xl p-1"
            aria-label="Solar Power Energy - Página Inicial"
          >
            <Logo size="md" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegação principal">
            
            {/* Dropdown Soluções */}
            <div 
              className="relative"
              onMouseEnter={() => setSolutionsDropdownOpen(true)}
              onMouseLeave={() => setSolutionsDropdownOpen(false)}
            >
              <button
                type="button"
                onClick={() => scrollToSection('solucoes')}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
                aria-expanded={solutionsDropdownOpen}
              >
                <span>Soluções</span>
                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${solutionsDropdownOpen ? 'rotate-180 text-emerald-700' : ''}`} />
              </button>

              {solutionsDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-lg border border-slate-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => scrollToSection('solucoes')}
                    className="w-full text-left flex items-start gap-3 px-4 py-2.5 hover:bg-emerald-50/70 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900">Sistema Fotovoltaico</div>
                      <div className="text-xs text-slate-500">Para residências e empresas</div>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('solucoes')}
                    className="w-full text-left flex items-start gap-3 px-4 py-2.5 hover:bg-emerald-50/70 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900">Assinatura de Energia</div>
                      <div className="text-xs text-slate-500">Economia sem obras</div>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('solucoes')}
                    className="w-full text-left flex items-start gap-3 px-4 py-2.5 hover:bg-emerald-50/70 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900">Fazendas Solares</div>
                      <div className="text-xs text-slate-500">Investimento de alta rentabilidade</div>
                    </div>
                  </button>

                  <button
                    onClick={() => scrollToSection('solucoes')}
                    className="w-full text-left flex items-start gap-3 px-4 py-2.5 hover:bg-emerald-50/70 transition-colors group"
                  >
                    <div className="p-2 rounded-lg bg-emerald-100/60 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-900">Franquias</div>
                      <div className="text-xs text-slate-500">Modelo de negócio estruturado</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection('segmentos')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Para sua casa
            </button>

            <button
              onClick={() => scrollToSection('segmentos')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Empresas
            </button>

            <button
              onClick={() => scrollToSection('segmentos')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Investidores
            </button>

            <button
              onClick={() => scrollToSection('projetos')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Projetos
            </button>

            <button
              onClick={() => scrollToSection('como-funciona')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Sobre
            </button>

            <button
              onClick={() => scrollToSection('contato')}
              className="px-3 py-2 text-sm font-medium text-slate-700 hover:text-emerald-800 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Right Action CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenSimulador}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-lg shadow-sm hover:shadow transition-all duration-200 group focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
            >
              <span>Simular economia</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSimulador}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md sm:hidden"
            >
              Simular
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-emerald-800 hover:bg-slate-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-700"
              aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => scrollToSection('solucoes')}
              className="flex items-center justify-between py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              <span>Soluções</span>
              <Zap className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={() => scrollToSection('segmentos')}
              className="flex items-center justify-between py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              <span>Para sua casa</span>
              <Home className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={() => scrollToSection('segmentos')}
              className="flex items-center justify-between py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              <span>Empresas</span>
              <Building2 className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={() => scrollToSection('segmentos')}
              className="flex items-center justify-between py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              <span>Investidores</span>
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </button>
            <button
              onClick={() => scrollToSection('projetos')}
              className="py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              Projetos
            </button>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              Sobre nós
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              Dúvidas frequentes
            </button>
            <button
              onClick={() => scrollToSection('contato')}
              className="py-2.5 px-3 text-base font-medium text-slate-800 hover:bg-slate-50 rounded-lg text-left"
            >
              Contato
            </button>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSimulador();
              }}
              className="w-full py-3 px-4 text-center font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg shadow-sm flex items-center justify-center gap-2"
            >
              <span>Simular economia</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:08005912040"
              className="w-full py-2.5 px-4 text-center text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-700" />
              <span>0800 591 2040</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
