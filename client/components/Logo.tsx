import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} text-primary`}
          viewBox="0 0 80 60"
          fill="none"
        >
          {/* Main circle */}
          <circle cx="40" cy="30" r="25" fill="currentColor"/>

          {/* Euro symbol in center */}
          <text x="40" y="38" textAnchor="middle" className="fill-white font-bold" fontSize="24" fontFamily="Arial, sans-serif">
            €
          </text>

          {/* Lightning flashes for speed */}
          <path d="M15 15 L8 8 M12 20 L5 13 M18 12 L11 5" stroke="hsl(165, 53%, 38%)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M65 15 L72 8 M68 20 L75 13 M62 12 L69 5" stroke="hsl(165, 53%, 38%)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M15 45 L8 52 M12 40 L5 47 M18 48 L11 55" stroke="hsl(165, 53%, 38%)" strokeWidth="3" strokeLinecap="round"/>
          <path d="M65 45 L72 52 M68 40 L75 47 M62 48 L69 55" stroke="hsl(165, 53%, 38%)" strokeWidth="3" strokeLinecap="round"/>

          {/* Additional speed lines */}
          <path d="M20 30 L5 30" stroke="hsl(165, 53%, 38%)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M60 30 L75 30" stroke="hsl(165, 53%, 38%)" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-primary tracking-wide ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>
          SOLUZIONE
        </span>
        <span className={`font-bold text-secondary tracking-wider ${size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm'} -mt-1`}>
          RAPIDA
        </span>
      </div>
    </div>
  );
};

export default Logo;
