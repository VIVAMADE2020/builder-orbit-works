import React from 'react';
import { useNavigate } from 'react-router-dom';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const navigate = useNavigate();
  const sizeClasses = {
    sm: 'h-8 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-16 w-auto'
  };

  return (
    <div
      onClick={() => navigate('/')}
      className={`flex items-center space-x-4 cursor-pointer ${className}`}
    >
      <div className="relative">
        <svg
          className={`${sizeClasses[size]} text-primary`}
          viewBox="0 0 100 60"
          fill="none"
        >
          {/* Modern gradient background circle */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" />
              <stop offset="100%" stopColor="hsl(165, 53%, 38%)" />
            </linearGradient>
            <filter id="shadow">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Main modern shape */}
          <path d="M20 15 L65 15 Q75 15 75 25 L75 35 Q75 45 65 45 L20 45 Q10 45 10 35 L10 25 Q10 15 20 15 Z" fill="url(#logoGradient)" filter="url(#shadow)"/>

          {/* Euro symbol with modern styling */}
          <text x="42" y="38" textAnchor="middle" className="fill-white font-bold" fontSize="22" fontFamily="system-ui, -apple-system, sans-serif">
            €
          </text>



          {/* Subtle accent dots */}
          <circle cx="15" cy="25" r="2" fill="hsl(165, 53%, 38%)" opacity="0.7"/>
          <circle cx="15" cy="35" r="2" fill="hsl(165, 53%, 38%)" opacity="0.5"/>
          <circle cx="90" cy="25" r="1.5" fill="hsl(165, 53%, 38%)" opacity="0.4"/>
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
