import React, { useState, useEffect } from 'react';
import { Calculator, Euro, Calendar, TrendingUp } from 'lucide-react';

interface LoanCalculatorProps {
  className?: string;
  variant?: 'default' | 'compact';
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ className = '', variant = 'default' }) => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const interestRate = 0.02; // 2% annual rate

  useEffect(() => {
    // Calculate monthly payment using loan formula
    const monthlyRate = interestRate / 12;
    const payment = (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) / 
                   (Math.pow(1 + monthlyRate, duration) - 1);
    
    setMonthlyPayment(payment);
    setTotalAmount(payment * duration);
    setTotalInterest((payment * duration) - amount);
  }, [amount, duration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR'
    }).format(value);
  };

  if (variant === 'compact') {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-4 md:p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <Calculator className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
          <h3 className="text-lg md:text-xl font-bold text-primary">Calcolatore Prestito</h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Importo (€)
            </label>
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-base md:text-lg font-bold text-primary mt-2">
              {formatCurrency(amount)}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durata (mesi)
            </label>
            <input
              type="range"
              min="1"
              max="240"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="text-center text-base md:text-lg font-bold text-primary mt-2">
              {duration} mesi
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 md:p-4 mt-4 md:mt-6">
          <div className="text-center">
            <div className="text-sm text-gray-600">Rata Mensile</div>
            <div className="text-xl md:text-2xl font-bold text-primary">
              {formatCurrency(monthlyPayment)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
          <Calculator className="h-8 w-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-primary mb-2">Calcolatore Prestito</h2>
        <p className="text-gray-600">Calcola la tua rata mensile in pochi secondi</p>
      </div>

      <div className="space-y-8">
        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-semibold text-gray-700 flex items-center">
              <Euro className="h-5 w-5 mr-2 text-primary" />
              Importo del Prestito
            </label>
            <span className="text-xl font-bold text-primary">{formatCurrency(amount)}</span>
          </div>
          <input
            type="range"
            min="5000"
            max="100000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>€5.000</span>
            <span>€100.000</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <label className="text-lg font-semibold text-gray-700 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Durata del Prestito
            </label>
            <span className="text-xl font-bold text-primary">{duration} mesi</span>
          </div>
          <input
            type="range"
            min="1"
            max="240"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>1 mese</span>
            <span>240 mesi</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-secondary mr-2" />
                <span className="text-sm font-medium text-gray-600">Rata Mensile</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {formatCurrency(monthlyPayment)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Totale da Restituire</div>
              <div className="text-xl font-bold text-secondary">
                {formatCurrency(totalAmount)}
              </div>
            </div>

            <div className="text-center">
              <div className="text-sm font-medium text-gray-600 mb-2">Interessi Totali</div>
              <div className="text-xl font-bold text-gray-700">
                {formatCurrency(totalInterest)}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors shadow-lg">
            Richiedi Questo Prestito
          </button>
          <p className="text-sm text-gray-500 mt-2">Tasso annuo del 2% - Nessuna commissione nascosta</p>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(218, 40%, 25%);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: hsl(218, 40%, 25%);
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default LoanCalculator;
