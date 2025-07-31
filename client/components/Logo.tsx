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
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className="flex items-center justify-center bg-primary rounded-lg p-2">
        <svg 
          className={`${sizeClasses[size]} text-white`}
          viewBox="0 0 40 40" 
          fill="currentColor"
        >
          <path d="M20 4L36 12v16L20 36L4 28V12L20 4z" opacity="0.9"/>
          <path d="M20 8L32 14v12L20 32L8 26V14L20 8z" fill="currentColor"/>
          <circle cx="20" cy="20" r="6" fill="white"/>
          <path d="M17 20h6M20 17v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`font-bold text-primary ${size === 'lg' ? 'text-2xl' : size === 'md' ? 'text-xl' : 'text-lg'}`}>
          SOLUZIONE
        </span>
        <span className={`font-semibold text-secondary ${size === 'lg' ? 'text-lg' : size === 'md' ? 'text-base' : 'text-sm'} -mt-1`}>
          RAPIDA
        </span>
      </div>
    </div>
  );
};

export default Logo;
