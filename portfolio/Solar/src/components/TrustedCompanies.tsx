import React from 'react';

export const TrustedCompanies: React.FC = () => {
  const companies = [
    {
      name: 'AgroVanguard',
      tagline: 'Agronegócios',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L3 9v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9l-9-7zm0 3.8L18 10v9H6v-9l6-4.2zM12 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/>
        </svg>
      )
    },
    {
      name: 'Construtora Horizonte',
      tagline: 'Engenharia Civil',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M4 21V9l8-6 8 6v12h-5v-7h-6v7H4zm2-2h2v-5h8v5h2V9.8l-6-4.5-6 4.5V19z"/>
        </svg>
      )
    },
    {
      name: 'Rede Vértice',
      tagline: 'Varejo & Distribuição',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      name: 'Indústria Alpha S.A.',
      tagline: 'Manufatura & Automação',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.63 8.47c-.13.22-.08.49.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
        </svg>
      )
    },
    {
      name: 'Nexus Logística',
      tagline: 'Cadeia de Suprimentos',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
        </svg>
      )
    },
    {
      name: 'Grupo Alvorada',
      tagline: 'Participações & FIIs',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
        </svg>
      )
    }
  ];

  return (
    <section className="py-12 bg-slate-50 border-y border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-8">
          EMPRESAS QUE CONFIAM NA SOLAR POWER ENERGY
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-center">
          {companies.map((company, index) => (
            <div 
              key={index} 
              className="flex items-center justify-center gap-2.5 py-3 px-2 text-slate-400 hover:text-slate-700 transition-colors group cursor-default"
              title={`${company.name} - ${company.tagline}`}
            >
              <div className="opacity-70 group-hover:opacity-100 transition-opacity">
                {company.icon}
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-sm tracking-tight text-slate-500 group-hover:text-slate-800 transition-colors leading-tight">
                  {company.name}
                </span>
                <span className="text-[10px] text-slate-400 group-hover:text-slate-500 font-medium">
                  {company.tagline}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrustedCompanies;
