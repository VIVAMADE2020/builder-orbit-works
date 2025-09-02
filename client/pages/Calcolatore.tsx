import React from "react";
import { useNavigate } from "react-router-dom";
import LoanCalculator from "../components/LoanCalculator";
import { Calculator, TrendingUp, Shield, Clock } from "lucide-react";

const Calcolatore: React.FC = () => {
  const navigate = useNavigate();
  const benefits = [
    {
      icon: <Calculator className="h-12 w-12 text-secondary" />,
      title: "Calcolo Preciso",
      description:
        "Algoritmo avanzato che calcola la rata esatta considerando tutti i parametri del prestito.",
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-secondary" />,
      title: "Tasso Fisso 2%",
      description:
        "Tasso competitivo e fisso per tutta la durata del prestito, senza sorprese.",
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: "Nessuna Commissione",
      description:
        "Zero commissioni nascoste. Il calcolo include solo gli interessi al 2% annuo.",
    },
    {
      icon: <Clock className="h-12 w-12 text-secondary" />,
      title: "Flessibilità",
      description:
        "Durata da 1 a 240 mesi per adattarsi perfettamente alle tue possibilità.",
    },
  ];

  const examples = [
    {
      amount: 10000,
      duration: 36,
      monthlyPayment: 292.55,
      totalAmount: 10531.8,
      totalInterest: 531.8,
    },
    {
      amount: 25000,
      duration: 60,
      monthlyPayment: 438.71,
      totalAmount: 26322.6,
      totalInterest: 1322.6,
    },
    {
      amount: 50000,
      duration: 120,
      monthlyPayment: 469.7,
      totalAmount: 56364.0,
      totalInterest: 6364.0,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("it-IT", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Calcolatore Prestito
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calcola subito la tua rata mensile con il nostro strumento preciso e
            affidabile. Scopri quanto puoi risparmiare con i nostri tassi
            competitivi.
          </p>
        </div>

        {/* Main Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <LoanCalculator />
          </div>

          {/* Benefits Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-primary mb-6">
                Perché Scegliere Noi
              </h3>

              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mr-4">{benefit.icon}</div>
                    <div>
                      <h4 className="font-semibold text-primary mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Richiedi Subito</h3>
              <p className="text-gray-200 mb-4">
                Hai trovato la rata perfetta? Richiedi il tuo prestito ora!
              </p>
              <button
                onClick={() => navigate("/richiesta-prestito")}
                className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
              >
                Richiedi Prestito
              </button>
            </div>
          </div>
        </div>

        {/* Examples */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Esempi di Calcolo
            </h2>
            <p className="text-lg text-gray-600">
              Alcuni esempi pratici per aiutarti a capire come funziona il
              nostro calcolatore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examples.map((example, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {formatCurrency(example.amount)}
                  </div>
                  <div className="text-gray-600">{example.duration} mesi</div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Rata Mensile:</span>
                    <span className="font-bold text-lg text-secondary">
                      {formatCurrency(example.monthlyPayment)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Totale da Restituire:</span>
                    <span className="font-semibold">
                      {formatCurrency(example.totalAmount)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Interessi Totali:</span>
                    <span className="text-gray-700">
                      {formatCurrency(example.totalInterest)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => navigate("/richiesta-prestito")}
                    className="w-full bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  >
                    Richiedi Questo Prestito
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Information Box */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                Come Funziona il Nostro Calcolatore
              </h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Il nostro calcolatore utilizza la formula matematica standard
                  per il calcolo dei prestiti, considerando un tasso fisso del
                  2% annuo su tutti i nostri prodotti.
                </p>
                <p>
                  <strong>Formula utilizzata:</strong> Il calcolo si basa sulla
                  formula dell'ammortamento francese, che distribuisce equamente
                  capitale e interessi su tutte le rate.
                </p>
                <p>
                  <strong>Precisione garantita:</strong> I calcoli sono accurati
                  al centesimo e corrispondono esattamente a quelli che
                  troverete nel contratto finale.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-primary mb-4">
                Parametri del Prestito
              </h3>
              <ul className="space-y-3">
                <li className="flex justify-between">
                  <span className="text-gray-600">Importo Minimo:</span>
                  <span className="font-semibold">Nessuno</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Importo Massimo:</span>
                  <span className="font-semibold">€100.000</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Durata Minima:</span>
                  <span className="font-semibold">1 mese</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Durata Massima:</span>
                  <span className="font-semibold">240 mesi</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-600">Tasso Fisso:</span>
                  <span className="font-semibold text-secondary">2% annuo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calcolatore;
