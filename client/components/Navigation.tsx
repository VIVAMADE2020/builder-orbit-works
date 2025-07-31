import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import Logo from './Logo';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const loanTypes = [
    { name: 'Prestito Personale', path: '/prestito-personale' },
    { name: 'Prestito Aziendale', path: '/prestito-aziendale' },
    { name: 'Prestito Istantaneo', path: '/prestito-istantaneo' },
    { name: 'Prestito Privato', path: '/prestito-privato' },
    { name: 'Prestito Senza Schufa', path: '/prestito-senza-schufa' },
    { name: 'Prestito Autonomi', path: '/prestito-autonomi' },
    { name: 'Mutuo Immobiliare', path: '/mutuo-immobiliare' },
    { name: 'Prestito Auto', path: '/prestito-auto' },
    { name: 'Consolidamento Debiti', path: '/consolidamento-debiti' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <Logo size="md" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/') ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Home
            </Link>
            
            <div 
              className="relative"
              onMouseEnter={() => setActiveDropdown('prestiti')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors">
                I Nostri Prestiti
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {activeDropdown === 'prestiti' && (
                <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-lg border mt-1">
                  {loanTypes.map((loan) => (
                    <Link
                      key={loan.path}
                      to={loan.path}
                      className="block px-4 py-3 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors"
                    >
                      {loan.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link 
              to="/chi-siamo" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/chi-siamo') ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Chi Siamo
            </Link>

            <Link 
              to="/calcolatore" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/calcolatore') ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              Calcolatore
            </Link>

            <Link 
              to="/faq" 
              className={`px-3 py-2 text-sm font-medium transition-colors ${
                isActivePath('/faq') ? 'text-primary border-b-2 border-primary' : 'text-gray-600 hover:text-primary'
              }`}
            >
              FAQ
            </Link>

            <Link
              to="/richiesta-prestito"
              className="bg-primary text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Richiedi Prestito
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-primary p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              
              <div className="space-y-1">
                <div className="px-3 py-2 text-base font-medium text-gray-600">I Nostri Prestiti</div>
                {loanTypes.map((loan) => (
                  <Link
                    key={loan.path}
                    to={loan.path}
                    className="block px-6 py-2 text-sm text-gray-500 hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {loan.name}
                  </Link>
                ))}
              </div>

              <Link 
                to="/chi-siamo" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Chi Siamo
              </Link>

              <Link 
                to="/calcolatore" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Calcolatore
              </Link>

              <Link 
                to="/faq" 
                className="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>

              <Link
                to="/richiesta-prestito"
                className="block mx-3 mt-4 bg-primary text-white px-6 py-3 rounded-lg text-center font-medium hover:bg-primary/90"
                onClick={() => setIsOpen(false)}
              >
                Richiedi Prestito
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Google Translate Widget */}
      <div className="gtranslate_wrapper"></div>
    </nav>
  );
};

export default Navigation;
