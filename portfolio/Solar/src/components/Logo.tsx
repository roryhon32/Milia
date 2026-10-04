import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
}

export const Logo: React.FC<LogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'dark' 
}) => {
  const iconSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl'
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const subSizes = {
    sm: 'text-[9px] tracking-[0.2em]',
    md: 'text-[10px] tracking-[0.24em]',
    lg: 'text-xs tracking-[0.28em]'
  };

  const isLight = variant === 'light';

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}>
      {/* Vector Geometric Symbol */}
      <div 
        className={`${iconSizes[size]} bg-gradient-to-br from-[#0a3325] to-[#062319] p-1.5 flex items-center justify-center shadow-sm group-hover:shadow transition-all duration-300 transform group-hover:scale-102 shrink-0 border border-emerald-900/20`}
      >
        <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
          <defs>
            <linearGradient id="symSun" x1="16" y1="8" x2="32" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#f59e0b" />
            </linearGradient>
          </defs>

          {/* Sun disc & rays */}
          <circle cx="24" cy="16" r="6.5" fill="url(#symSun)" />
          <path d="M24 4V6.5M34.5 7.5L32.7 9.3M13.5 7.5L15.3 9.3" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round" />

          {/* Perspective Solar Panel Grids */}
          <g stroke="#ffffff" strokeWidth="1.4" strokeLinejoin="round">
            <path d="M10 36L18 24L23 24L15.5 36H10Z" fill="#14532d" opacity="0.95" />
            <path d="M17 36L24 24L31 24L24 36H17Z" fill="#166534" />
            <path d="M25.5 36L33 24L38 24L31 36H25.5Z" fill="#14532d" opacity="0.95" />
          </g>

          {/* Horizontal reflective cell line */}
          <path d="M13 30.5H35" stroke="#ffffff" strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
        </svg>
      </div>

      {/* Typography */}
      <div className="flex flex-col leading-none">
        <span 
          className={`${titleSizes[size]} font-extrabold tracking-tight ${isLight ? 'text-white' : 'text-slate-900'} group-hover:text-emerald-800 transition-colors`}
        >
          SOLAR POWER
        </span>
        <span 
          className={`${subSizes[size]} font-bold uppercase mt-1 ${isLight ? 'text-emerald-300' : 'text-emerald-800'}`}
        >
          ENERGY
        </span>
      </div>
    </div>
  );
};

export default Logo;
