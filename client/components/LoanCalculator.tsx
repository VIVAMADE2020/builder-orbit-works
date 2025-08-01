import React, { useState, useEffect } from "react";
import { Calculator, Euro, Calendar, TrendingUp } from "lucide-react";

interface LoanCalculatorProps {
  className?: string;
  variant?: "default" | "compact";
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({
  className = "",
  variant = "default",
}) => {
  const [amount, setAmount] = useState(10000);
  const [duration, setDuration] = useState(36);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [useManualInput, setUseManualInput] = useState(false);

  const interestRate = 0.02; // 2% annual rate

  useEffect(() => {
    // Calculate monthly payment using loan formula
    const monthlyRate = interestRate / 12;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);

    setMonthlyPayment(payment);
    setTotalAmount(payment * duration);
    setTotalInterest(payment * duration - amount);
  }, [amount, duration]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  const handleAmountChange = (value: string) => {
    const numValue = parseInt(value) || 0;
    setAmount(Math.max(5000, Math.min(500000, numValue)));
  };

  const handleDurationChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    setDuration(Math.max(1, Math.min(240, numValue)));
  };

  if (variant === "compact") {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-4 md:p-6 ${className}`}>
        <div className="flex items-center mb-4">
          <Calculator className="h-5 w-5 md:h-6 md:w-6 text-primary mr-2" />
          <h3 className="text-lg md:text-xl font-bold text-primary">
            Calcolatore Prestito
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Importo (€)
            </label>
            {useManualInput ? (
              <input
                type="number"
                min="5000"
                max="500000"
                step="1000"
                value={amount}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            ) : (
              <input
                type="range"
                min="5000"
                max="100000"
                step="1000"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            )}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>€5.000</span>
              <span className="font-semibold text-primary">
                {formatCurrency(amount)}
              </span>
              <span>€{useManualInput ? "500.000" : "100.000"}</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durata (mesi)
            </label>
            {useManualInput ? (
              <input
                type="number"
                min="1"
                max="240"
                value={duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            ) : (
              <input
                type="range"
                min="12"
                max="120"
                step="1"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
            )}
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{useManualInput ? "1" : "12"}</span>
              <span className="font-semibold text-primary">
                {duration} mesi
              </span>
              <span>{useManualInput ? "240" : "120"}</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={() => setUseManualInput(!useManualInput)}
            className="text-sm text-primary hover:text-primary/80 underline"
          >
            {useManualInput ? "Usa i cursori" : "Inserimento manuale"}
          </button>
        </div>

        <div className="mt-6 p-4 bg-primary/5 rounded-lg">
          <div className="text-center">
            <div className="text-sm text-gray-600">Rata mensile</div>
            <div className="text-2xl font-bold text-primary">
              {formatCurrency(monthlyPayment)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100 ${className}`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          <div className="flex items-center mb-6">
            <Calculator className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-2xl font-bold text-primary">
              Calcolatore Prestito
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Importo del prestito
              </label>
              {useManualInput ? (
                <input
                  type="number"
                  min="5000"
                  max="500000"
                  step="1000"
                  value={amount}
                  onChange={(e) => handleAmountChange(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                />
              ) : (
                <input
                  type="range"
                  min="5000"
                  max="100000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              )}
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>€5.000</span>
                <span className="font-semibold text-primary text-lg">
                  {formatCurrency(amount)}
                </span>
                <span>€{useManualInput ? "500.000" : "100.000"}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Durata del prestito
              </label>
              {useManualInput ? (
                <input
                  type="number"
                  min="1"
                  max="240"
                  value={duration}
                  onChange={(e) => handleDurationChange(e.target.value)}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary text-lg"
                />
              ) : (
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
              )}
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{useManualInput ? "1 mese" : "12 mesi"}</span>
                <span className="font-semibold text-primary text-lg">
                  {duration} mesi
                </span>
                <span>{useManualInput ? "240 mesi" : "120 mesi"}</span>
              </div>
            </div>

            <div className="mt-4">
              <button
                onClick={() => setUseManualInput(!useManualInput)}
                className="text-primary hover:text-primary/80 underline font-medium"
              >
                {useManualInput
                  ? "← Torna ai cursori"
                  : "✏️ Inserimento manuale"}
              </button>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-700 font-medium">
                  Tasso fisso garantito: 2% annuo
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div>
          <h4 className="text-xl font-bold text-primary mb-6">
            Risultati del Calcolo
          </h4>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
              <div className="flex items-center mb-2">
                <Euro className="h-6 w-6 text-primary mr-2" />
                <span className="text-sm font-medium text-gray-600">
                  Rata mensile
                </span>
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatCurrency(monthlyPayment)}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Totale da rimborsare
                  </span>
                </div>
                <div className="text-xl font-bold text-secondary">
                  {formatCurrency(totalAmount)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-5 w-5 text-secondary mr-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Interessi totali
                  </span>
                </div>
                <div className="text-xl font-bold text-secondary">
                  {formatCurrency(totalInterest)}
                </div>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <h5 className="font-bold text-primary mb-2">Riepilogo:</h5>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  • Importo richiesto: <strong>{formatCurrency(amount)}</strong>
                </li>
                <li>
                  • Durata: <strong>{duration} mesi</strong>
                </li>
                <li>
                  • Tasso fisso: <strong>2% annuo</strong>
                </li>
                <li>
                  • Rata mensile:{" "}
                  <strong>{formatCurrency(monthlyPayment)}</strong>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;
