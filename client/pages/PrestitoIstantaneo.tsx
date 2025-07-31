import React, { useState } from 'react';
import { CheckCircle, Zap, Clock, CreditCard, Smartphone, Shield, TrendingUp, Euro, AlertCircle } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';

const PrestitoIstantaneo: React.FC = () => {
  const [loanAmount, setLoanAmount] = useState(5000);

  const features = [
    'Importi da €500 a €15.000',
    'Approvazione in 15 minuti',
    'Erogazione immediata',
    'Solo documento d\'identità',
    'Processo 100% digitale',
    'Senza garanzie richieste'
  ];

  const benefits = [
    {
      icon: <Zap className="h-12 w-12 text-secondary" />,
      title: 'Velocità Estrema',
      description: 'Approvazione in 15 minuti, erogazione immediata'
    },
    {
      icon: <Smartphone className="h-12 w-12 text-secondary" />,
      title: 'Tutto Digitale',
      description: 'Richiesta e gestione completamente online'
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Sicuro e Affidabile',
      description: 'Tecnologia bancaria e massima sicurezza'
    },
    {
      icon: <CreditCard className="h-12 w-12 text-secondary" />,
      title: 'Senza Garanzie',
      description: 'Non serve garante o garanzie aggiuntive'
    }
  ];

  const steps = [
    {
      step: '1',
      icon: <Smartphone className="h-8 w-8" />,
      title: 'Richiesta Online',
      description: 'Compila il modulo in 3 minuti'
    },
    {
      step: '2',
      icon: <Zap className="h-8 w-8" />,
      title: 'Valutazione Automatica',
      description: 'Risposta immediata del sistema'
    },
    {
      step: '3',
      icon: <CreditCard className="h-8 w-8" />,
      title: 'Verifica Identità',
      description: 'Carica documento con smartphone'
    },
    {
      step: '4',
      icon: <Euro className="h-8 w-8" />,
      title: 'Erogazione',
      description: 'Denaro sul tuo conto in minuti'
    }
  ];

  const useCases = [
    {
      icon: <AlertCircle className="h-6 w-6 text-orange-500" />,
      title: 'Emergenze',
      description: 'Spese mediche improvvise, riparazioni urgenti'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-blue-500" />,
      title: 'Opportunità',
      description: 'Offerte limitate, investimenti rapidi'
    },
    {
      icon: <Clock className="h-6 w-6 text-green-500" />,
      title: 'Liquidità Temporanea',
      description: 'In attesa di stipendio o altri pagamenti'
    }
  ];

  const requirements = [
    'Età tra 18 e 70 anni',
    'Documento d\'identità valido',
    'Conto corrente intestato',
    'Smartphone per verifica',
    'Reddito dimostrabile minimo €800/mese'
  ];

  const durations = [
    { months: 3, rate: 192.5 },
    { months: 6, rate: 101.67 },
    { months: 12, rate: 54.17 },
    { months: 24, rate: 29.58 }
  ];

  const calculateInstallment = (amount: number, months: number) => {
    const monthlyRate = 0.02 / 12; // 2% annual rate
    return (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
           (Math.pow(1 + monthlyRate, months) - 1);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Zap className="h-4 w-4 mr-2" />
                Approvazione in 15 minuti
              </div>
              
              <h1 className="text-5xl font-bold text-primary mb-6">
                Prestito Istantaneo
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Hai bisogno di denaro subito? Il nostro prestito istantaneo ti permette di ottenere 
                liquidità immediata con approvazione ultra-rapida e processo completamente digitale.
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
                  Richiedi Subito
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                  Calcola Rata
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img 
                  src="https://images.pexels.com/photos/7621138/pexels-photo-7621138.jpeg" 
                  alt="Prestito Istantaneo"
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
              Perché Scegliere il Prestito Istantaneo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quando il tempo è prezioso, la velocità fa la differenza
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-6">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Processo Ultra-Veloce
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dal click all'erogazione in soli 4 passi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center relative">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {step.icon}
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
                <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-secondary/30"></div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="inline-flex items-center bg-secondary/10 text-secondary px-6 py-3 rounded-full text-lg font-semibold">
              <Clock className="h-5 w-5 mr-2" />
              Tempo totale: 15-30 minuti
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Quando Serve un Prestito Istantaneo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Situazioni in cui la velocità è fondamentale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border-l-4 border-secondary">
                <div className="flex items-center mb-4">
                  {useCase.icon}
                  <h3 className="text-xl font-bold text-primary ml-3">{useCase.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Calculator */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Calcolatore Rapido
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Scopri subito quanto puoi ottenere e in quanto tempo
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <label className="block text-lg font-semibold text-primary mb-4">
                  Quanto ti serve?
                </label>
                <input
                  type="range"
                  min="500"
                  max="15000"
                  step="500"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(parseInt(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                  <span>€500</span>
                  <span className="text-2xl font-bold text-secondary">€{loanAmount.toLocaleString()}</span>
                  <span>€15.000</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-primary mb-4">Opzioni di rimborso:</h4>
                <div className="space-y-3">
                  {durations.map((duration) => {
                    const installment = calculateInstallment(loanAmount, duration.months);
                    return (
                      <div key={duration.months} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{duration.months} mesi</span>
                        <span className="text-lg font-bold text-secondary">
                          €{installment.toFixed(2)}/mese
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="text-center mt-8">
              <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Richiedi €{loanAmount.toLocaleString()} Ora
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Requisiti Minimi
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Requisiti semplici per l'approvazione immediata
              </p>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                <h4 className="font-bold text-secondary mb-2">⚡ Suggerimento Veloce</h4>
                <p className="text-gray-700">
                  Tieni pronto il documento d'identità e il numero del tuo IBAN per 
                  completare la richiesta in tempo record.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Richiesta Istantanea
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Importo richiesto
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>€1.000</option>
                    <option>€2.500</option>
                    <option>€5.000</option>
                    <option>€10.000</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Durata
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>3 mesi</option>
                    <option>6 mesi</option>
                    <option>12 mesi</option>
                    <option>24 mesi</option>
                  </select>
                </div>
                
                <button className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                  Richiedi in 15 Minuti
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Processo 100% digitale e sicuro
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Calculator */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcolatore Completo
            </h2>
            <p className="text-xl text-gray-600">
              Calcola esattamente la tua rata mensile
            </p>
          </div>
          
          <LoanCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Non Aspettare, Agisci Ora!
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Ogni minuto conta quando hai bisogno di liquidità immediata. 
            Richiedi il tuo prestito istantaneo e ottieni i soldi in tempo record.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Zap className="mr-2 h-5 w-5" />
              Richiedi Istantaneo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center">
              <Clock className="mr-2 h-5 w-5" />
              Solo 15 Minuti
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestitoIstantaneo;
