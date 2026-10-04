import React from 'react';
import { 
  Sun, 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle,
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  onOpenPrivacyModal?: () => void;
  onOpenTermsModal?: () => void;
  onOpenContactModal?: () => void;
  onNavigateSection?: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenPrivacyModal, 
  onOpenTermsModal,
  onOpenContactModal,
  onNavigateSection
}) => {
  const currentYear = 2026;

  const scrollTo = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contato" className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80">
          
          {/* Column 1: Brand & Bio (Span 4 on LG) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Logo */}
            <Logo size="md" />

            <p className="text-sm text-slate-600 leading-relaxed font-normal max-w-sm">
              Energia solar para residências, empresas e investidores. Transformamos luz solar em economia real, segurança financeira e sustentabilidade para o Brasil.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-800 hover:border-emerald-700/40 transition-colors shadow-xs"
                aria-label="LinkedIn Solar Power Energy"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.76-1.75 1.76m1.39 9.74v-8.37H5.07v8.37h2.78z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-800 hover:border-emerald-700/40 transition-colors shadow-xs"
                aria-label="Instagram Solar Power Energy"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-800 hover:border-emerald-700/40 transition-colors shadow-xs"
                aria-label="WhatsApp Solar Power Energy"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-800 hover:border-emerald-700/40 transition-colors shadow-xs"
                aria-label="YouTube Solar Power Energy"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2 text-xs text-slate-500 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Homologação e Responsabilidade Técnica CREA-SP</span>
            </div>
          </div>

          {/* Column 2: Soluções (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Soluções
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollTo('solucoes')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Sistema Fotovoltaico
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('solucoes')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Assinatura de Energia
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('solucoes')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Fazendas Solares
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('solucoes')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Franquias
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Empresa (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Empresa
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollTo('como-funciona')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Sobre nós
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollTo('projetos')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Projetos
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContactModal} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Trabalhe conosco
                </button>
              </li>
              <li>
                <a 
                  href="#blog" 
                  onClick={(e) => { e.preventDefault(); scrollTo('faq'); }}
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Blog & Artigos
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Suporte (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Suporte
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => scrollTo('faq')} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Central de ajuda
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenContactModal} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Fale com especialista
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPrivacyModal} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Política de privacidade
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenTermsModal} 
                  className="hover:text-emerald-800 transition-colors text-left"
                >
                  Termos de uso
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Contato (Span 2 on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <a href="tel:08005912040" className="hover:text-emerald-800 font-semibold">
                  0800 591 2040
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <a href="https://wa.me/5511987654321" target="_blank" rel="noreferrer" className="hover:text-emerald-800">
                  (11) 98765-4321
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                <a href="mailto:contato@solarpowerenergy.com.br" className="hover:text-emerald-800 truncate">
                  contato@solarpowerenergy.com.br
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-800 shrink-0 mt-0.5" />
                <span>
                  Av. Paulista, 1842 - Bela Vista, São Paulo – SP
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} Solar Power Energy. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <span>Energia Solar Sustentável no Brasil</span>
            <span>CNPJ: 42.890.123/0001-94</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
