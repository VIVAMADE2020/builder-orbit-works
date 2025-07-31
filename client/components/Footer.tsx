import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Shield, Clock, TrendingUp } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Logo size="lg" className="mb-6" />
              <p className="text-gray-300 mb-6 max-w-md">
                Soluzione Rapida è la tua soluzione finanziaria di fiducia. 
                Offriamo prestiti personalizzati con tassi competitivi e 
                approvazione veloce per aiutarti a realizzare i tuoi progetti.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                  <span className="text-gray-300">Bruxelles, Belgio</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                  <a 
                    href="mailto:contatto@soluzionerapida.com" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    contatto@soluzionerapida.com
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6">I Nostri Servizi</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/prestito-personale" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Prestito Personale
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/prestito-aziendale" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Prestito Aziendale
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/mutuo-immobiliare" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Mutuo Immobiliare
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/prestito-auto" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Prestito Auto
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/prestito-istantaneo" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Prestito Istantaneo
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/consolidamento-debiti" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Consolidamento Debiti
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-6">Azienda</h3>
              <ul className="space-y-3">
                <li>
                  <Link 
                    to="/chi-siamo" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/calcolatore" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Calcolatore Prestito
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/faq" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/contatti" 
                    className="text-gray-300 hover:text-secondary transition-colors"
                  >
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="border-t border-gray-600 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center">
              <Shield className="h-8 w-8 text-secondary mr-3" />
              <div>
                <div className="font-semibold">100% Sicuro</div>
                <div className="text-sm text-gray-400">Dati Protetti</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Clock className="h-8 w-8 text-secondary mr-3" />
              <div>
                <div className="font-semibold">Approvazione 24h</div>
                <div className="text-sm text-gray-400">Processo Veloce</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <TrendingUp className="h-8 w-8 text-secondary mr-3" />
              <div>
                <div className="font-semibold">Tasso 2%</div>
                <div className="text-sm text-gray-400">Competitivo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-600 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 lg:mb-0">
              © 2025 Soluzione Rapida. Tutti i diritti riservati.
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6 text-sm">
              <Link 
                to="/privacy-policy" 
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/termini-condizioni" 
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Termini e Condizioni
              </Link>
              <Link 
                to="/segnalazioni" 
                className="text-gray-400 hover:text-secondary transition-colors"
              >
                Segnalazioni
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
