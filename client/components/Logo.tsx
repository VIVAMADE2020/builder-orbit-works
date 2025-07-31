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
          viewBox="0 0 60 60"
          fill="none"
        >
          {/* Outer circle with gradient effect */}
          <circle cx="30" cy="30" r="28" fill="currentColor" fillOpacity="0.1"/>
          <circle cx="30" cy="30" r="24" fill="currentColor" fillOpacity="0.2"/>
          <circle cx="30" cy="30" r="20" fill="currentColor"/>

          {/* SR monogram */}
          <text x="30" y="38" textAnchor="middle" className="fill-white font-bold" fontSize="18" fontFamily="Arial, sans-serif">
            SR
          </text>

          {/* Speed lines for "rapid" effect */}
          <path d="M45 25 L55 20" stroke="hsl(165, 53%, 38%)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M45 30 L52 30" stroke="hsl(165, 53%, 38%)" strokeWidth="2" strokeLinecap="round"/>
          <path d="M45 35 L55 40" stroke="hsl(165, 53%, 38%)" strokeWidth="2" strokeLinecap="round"/>
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
