import React, { useState } from "react";
import {
  CheckCircle,
  Car,
  Zap,
  Shield,
  Clock,
  Euro,
  TrendingUp,
  Fuel,
  Settings,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoanCalculator from "../components/LoanCalculator";

const PrestitoAuto: React.FC = () => {
  const navigate = useNavigate();
  const [activeVehicle, setActiveVehicle] = useState("auto");

  const features = [
    "Finanziamento da €5.000 a €100.000",
    "Durata da 12 a 84 mesi",
    "Tasso fisso 2% annuo",
    "Auto nuove e usate",
    "Approvazione in 24 ore",
    "Senza anticipo richiesto",
  ];

  const benefits = [
    {
      icon: <Car className="h-12 w-12 text-secondary" />,
      title: "Ogni Veicolo",
      description: "Auto, moto, camper, veicoli commerciali - finanziamo tutto",
    },
    {
      icon: <Zap className="h-12 w-12 text-secondary" />,
      title: "Processo Veloce",
      description: "Approvazione rapida per non perdere l'occasione",
    },
    {
      icon: <Euro className="h-12 w-12 text-secondary" />,
      title: "Tasso Fisso",
      description: "Solo 2% annuo fisso per tutta la durata del prestito",
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: "Flessibilità",
      description: "Rimborso anticipato senza penali e rata personalizzabile",
    },
  ];

  const vehicleTypes = [
    {
      id: "auto",
      icon: <Car className="h-8 w-8" />,
      title: "Automobili",
      description: "Citycar, berline, SUV, sportive",
      examples: ["Fiat 500", "BMW Serie 3", "Audi Q5", "Mercedes Classe A"],
      maxAmount: "€80.000",
      maxDuration: "84 mesi",
    },
    {
      id: "moto",
      icon: <Settings className="h-8 w-8" />,
      title: "Motocicli",
      description: "Scooter, moto sportive, touring",
      examples: ["Yamaha MT-07", "Ducati Monster", "BMW GS", "Honda CB"],
      maxAmount: "€40.000",
      maxDuration: "60 mesi",
    },
    {
      id: "commerciale",
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Veicoli Commerciali",
      description: "Furgoni, autocarri, mezzi da lavoro",
      examples: [
        "Iveco Daily",
        "Ford Transit",
        "Mercedes Sprinter",
        "Fiat Ducato",
      ],
      maxAmount: "€100.000",
      maxDuration: "84 mesi",
    },
  ];

  const advantages = [
    {
      icon: <CheckCircle className="h-6 w-6 text-secondary" />,
      title: "Nessun Anticipo",
      description: "Finanziamo fino al 100% del valore del veicolo",
    },
    {
      icon: <Clock className="h-6 w-6 text-secondary" />,
      title: "Documenti Semplici",
      description: "Pochissima documentazione richiesta",
    },
    {
      icon: <Shield className="h-6 w-6 text-secondary" />,
      title: "Assicurazione Inclusa",
      description: "Possibilità di includere l'assicurazione nel finanziamento",
    },
    {
      icon: <Fuel className="h-6 w-6 text-secondary" />,
      title: "Anche Usato",
      description: "Finanziamo auto usate fino a 10 anni di età",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Scegli l'Auto",
      description:
        "Trova il veicolo che desideri presso qualsiasi concessionario",
    },
    {
      step: "2",
      title: "Richiedi il Prestito",
      description: "Compila la richiesta online con i dati del veicolo",
    },
    {
      step: "3",
      title: "Approvazione",
      description: "Ricevi l'approvazione entro 24 ore",
    },
    {
      step: "4",
      title: "Ritira l'Auto",
      description: "Concludi l'acquisto e ritira il tuo nuovo veicolo",
    },
  ];

  const requirements = [
    "Età compresa tra 18 e 75 anni",
    "Reddito dimostrabile",
    "Residenza in Italia, Germania, Slovacchia o Belgio",
    "Documento d'identità valido",
    "Estratto conto degli ultimi 3 mesi",
    "Preventivo o fattura del veicolo",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Prestito Auto
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Realizza il sogno della tua auto ideale con il nostro prestito
                auto. Finanziamo auto nuove e usate, moto e veicoli commerciali
                con le migliori condizioni del mercato.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                  Richiedi Prestito Auto
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                  Calcola la Rata
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img
                  src="https://images.pexels.com/photos/7144259/pexels-photo-7144259.jpeg"
                  alt="Prestito Auto"
                  className="w-full h-80 object-cover rounded-xl shadow-lg"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Perché Scegliere il Nostro Prestito Auto
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vantaggi esclusivi per acquistare il veicolo che desideri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Veicoli Finanziabili
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Finanziamo ogni tipo di veicolo per ogni esigenza
            </p>
          </div>

          {/* Vehicle Type Tabs */}
          <div className="flex justify-center mb-12">
            <div className="flex bg-white rounded-lg p-2 shadow-lg">
              {vehicleTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setActiveVehicle(type.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-all ${
                    activeVehicle === type.id
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:text-primary"
                  }`}
                >
                  {type.icon}
                  <span className="ml-2">{type.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Vehicle Content */}
          {vehicleTypes.map(
            (type) =>
              activeVehicle === type.id && (
                <div
                  key={type.id}
                  className="bg-white rounded-2xl shadow-xl p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-primary mb-4">
                        {type.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{type.description}</p>

                      <div className="mb-6">
                        <h4 className="font-semibold text-primary mb-3">
                          Esempi di veicoli finanziabili:
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {type.examples.map((example, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 p-3 rounded-lg text-sm"
                            >
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6 rounded-xl">
                      <h4 className="font-bold text-primary mb-4">
                        Condizioni di finanziamento:
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">
                            Importo massimo:
                          </span>
                          <span className="font-bold text-primary">
                            {type.maxAmount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Durata massima:</span>
                          <span className="font-bold text-primary">
                            {type.maxDuration}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tasso fisso:</span>
                          <span className="font-bold text-secondary">
                            2% annuo
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Anticipo:</span>
                          <span className="font-bold text-secondary">
                            Non richiesto
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ),
          )}
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              I Nostri Vantaggi
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Condizioni uniche nel mercato del finanziamento auto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {advantages.map((advantage, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  {advantage.icon}
                  <h3 className="font-bold text-primary ml-3">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Come Ottenere il Prestito Auto
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              4 semplici passi per guidare la tua auto dei sogni
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-secondary/50 z-0 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Requisiti per il Prestito Auto
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Requisiti semplici e alla portata di tutti per ottenere il
                finanziamento
              </p>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <h4 className="font-bold text-primary mb-2">🚗 Suggerimento</h4>
                <p className="text-gray-700">
                  Porta con te il preventivo dell'auto che desideri acquistare
                  per velocizzare l'approvazione del prestito.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Calcola la Rata della Tua Auto
              </h3>
              <LoanCalculator variant="compact" />
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcolatore Prestito Auto
            </h2>
            <p className="text-xl text-gray-600">
              Scopri subito quanto pagheresti per l'auto che desideri
            </p>
          </div>

          <LoanCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto per la Tua Nuova Auto?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Non aspettare oltre! Richiedi subito il tuo prestito auto e guida il
            veicolo dei tuoi sogni in pochi giorni.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Car className="mr-2 h-5 w-5" />
              Richiedi Prestito Auto
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              Approvazione 24h
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestitoAuto;
