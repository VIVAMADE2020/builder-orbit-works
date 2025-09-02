import React from "react";
import { CheckCircle, Euro, Clock, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoanCalculator from "../components/LoanCalculator";

const PrestitoPersonale: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    "Importi fino a €75.000",
    "Durata da 1 a 240 mesi",
    "Tasso fisso 2% annuo",
    "Nessuna commissione nascosta",
    "Approvazione in 24 ore",
    "Rimborso anticipato senza penali",
  ];

  const benefits = [
    {
      icon: <Euro className="h-8 w-8 text-secondary" />,
      title: "Tasso Competitivo",
      description: "Solo 2% annuo fisso per tutta la durata",
    },
    {
      icon: <Clock className="h-8 w-8 text-secondary" />,
      title: "Processo Veloce",
      description: "Approvazione in 24 ore, erogazione in 2-3 giorni",
    },
    {
      icon: <Shield className="h-8 w-8 text-secondary" />,
      title: "Totalmente Sicuro",
      description: "Dati protetti con crittografia SSL 256-bit",
    },
  ];

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-6">
              Prestito Personale
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Il prestito personale di Soluzione Rapida è la soluzione ideale
              per realizzare i tuoi progetti personali: viaggi, matrimoni,
              ristrutturazioni, spese mediche o qualsiasi altra esigenza.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => navigate("/richiesta-prestito")}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Fare una Demanda di Prestito
            </button>
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5816286/pexels-photo-5816286.jpeg"
              alt="Prestito Personale"
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-primary/20 rounded-2xl"></div>
          </div>
        </div>

        {/* Benefits */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Perché Scegliere il Nostro Prestito Personale
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-xl"
              >
                <div className="flex justify-center mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Calculator */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Calcola la Tua Rata
            </h2>
            <p className="text-lg text-gray-600">
              Scopri subito quanto pagheresti con il nostro prestito personale
            </p>
          </div>

          <LoanCalculator />
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Pronto per il Tuo Prestito Personale?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
            Unisciti a migliaia di clienti che hanno realizzato i loro progetti
            con Soluzione Rapida
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/richiesta-prestito")}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Fare una Demanda di Prestito
            </button>
            <button
              onClick={() => navigate("/contatti")}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all"
            >
              Contattaci
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrestitoPersonale;
