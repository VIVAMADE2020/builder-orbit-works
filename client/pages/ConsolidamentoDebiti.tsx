import React, { useState } from 'react';
import { CheckCircle, TrendingDown, Calculator, PieChart, Shield, Target, ArrowDown, DollarSign, CreditCard } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';

const ConsolidamentoDebiti: React.FC = () => {
  const [currentDebts, setCurrentDebts] = useState([
    { type: 'Carta di Credito', amount: 8000, rate: 15.5, payment: 250 },
    { type: 'Prestito Personale', amount: 12000, rate: 8.2, payment: 340 },
    { type: 'Finanziamento Auto', amount: 15000, rate: 6.5, payment: 280 }
  ]);

  const features = [
    'Un\'unica rata al posto di molte',
    'Tasso fisso 2% annuo',
    'Risparmio garantito sugli interessi',
    'Gestione semplificata',
    'Durata personalizzabile',
    'Nessuna penale per estinzione anticipata'
  ];

  const benefits = [
    {
      icon: <TrendingDown className="h-12 w-12 text-secondary" />,
      title: 'Risparmio Immediato',
      description: 'Riduci significativamente gli interessi da pagare'
    },
    {
      icon: <Target className="h-12 w-12 text-secondary" />,
      title: 'Un\'Unica Rata',
      description: 'Semplifica la gestione con un solo pagamento mensile'
    },
    {
      icon: <Calculator className="h-12 w-12 text-secondary" />,
      title: 'Rata Più Bassa',
      description: 'Riduci l\'importo della rata mensile complessiva'
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Controllo Finanziario',
      description: 'Riprendi il controllo della tua situazione finanziaria'
    }
  ];

  const debtTypes = [
    {
      type: 'Carte di Credito',
      icon: <CreditCard className="h-8 w-8" />,
      description: 'Consolida i saldi delle carte di credito con tassi elevati',
      avgRate: '12-18%',
      color: 'bg-primary'
    },
    {
      type: 'Prestiti Personali',
      icon: <DollarSign className="h-8 w-8" />,
      description: 'Unifica diversi prestiti personali esistenti',
      avgRate: '6-12%',
      color: 'bg-secondary'
    },
    {
      type: 'Finanziamenti',
      icon: <PieChart className="h-8 w-8" />,
      description: 'Consolida finanziamenti auto, elettrodomestici, ecc.',
      avgRate: '5-10%',
      color: 'bg-primary/80'
    }
  ];

  const steps = [
    {
      step: '1',
      title: 'Analisi Debiti',
      description: 'Valutazione completa della tua situazione debitoria'
    },
    {
      step: '2',
      title: 'Calcolo Risparmio',
      description: 'Calcolo del risparmio ottenibile con il consolidamento'
    },
    {
      step: '3',
      title: 'Proposta Personalizzata',
      description: 'Offerta su misura con unica rata conveniente'
    },
    {
      step: '4',
      title: 'Estinzione Debiti',
      description: 'Paghiamo direttamente i tuoi creditori esistenti'
    }
  ];

  const calculateTotals = () => {
    const totalAmount = currentDebts.reduce((sum, debt) => sum + debt.amount, 0);
    const totalPayment = currentDebts.reduce((sum, debt) => sum + debt.payment, 0);
    const weightedRate = currentDebts.reduce((sum, debt) => sum + (debt.rate * debt.amount), 0) / totalAmount;
    
    // Calcolo con consolidamento al 2%
    const consolidatedPayment = (totalAmount * 0.02 / 12 * Math.pow(1 + 0.02/12, 60)) / (Math.pow(1 + 0.02/12, 60) - 1);
    const savings = totalPayment - consolidatedPayment;
    
    return {
      totalAmount,
      totalPayment,
      weightedRate,
      consolidatedPayment,
      savings
    };
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Consolidamento Debiti
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Semplifica la tua vita finanziaria! Unifica tutti i tuoi debiti in un'unica rata conveniente 
                con il nostro servizio di consolidamento debiti. Risparmia sugli interessi e riprendi il controllo.
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
                  Analisi Gratuita
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                  Calcola Risparmio
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-12 border border-gray-100 text-center">
                <TrendingDown className="h-32 w-32 text-secondary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Semplifica i Tuoi Debiti</h3>
                <p className="text-gray-600">Un'unica rata conveniente</p>
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
              Vantaggi del Consolidamento
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trasforma il caos finanziario in ordine e risparmio
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

      {/* Debt Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Tipi di Debiti Consolidabili
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Consolidiamo ogni tipo di debito per semplificare la tua vita
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {debtTypes.map((debt, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className={`w-16 h-16 ${debt.color} rounded-full flex items-center justify-center text-white mb-6`}>
                  {debt.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{debt.type}</h3>
                <p className="text-gray-600 mb-4">{debt.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Tasso medio attuale:</span>
                  <span className="font-bold text-red-500">{debt.avgRate}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">Con consolidamento:</span>
                  <span className="font-bold text-green-500">2% fisso</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Savings Calculator */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcola il Tuo Risparmio
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Esempio pratico: vedi quanto potresti risparmiare
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Current Situation */}
              <div>
                <h3 className="text-2xl font-bold text-red-600 mb-6">Situazione Attuale</h3>
                <div className="space-y-4">
                  {currentDebts.map((debt, index) => (
                    <div key={index} className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold">{debt.type}</span>
                        <span className="text-primary font-bold">€{debt.payment}/mese</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        €{debt.amount.toLocaleString()} al {debt.rate}% annuo
                      </div>
                    </div>
                  ))}
                  
                  <div className="bg-primary/10 p-4 rounded-lg border-2 border-primary/30">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">TOTALE MENSILE</span>
                      <span className="text-primary font-bold text-xl">€{totals.totalPayment.toFixed(0)}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Debito totale: €{totals.totalAmount.toLocaleString()} - Tasso medio: {totals.weightedRate.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="hidden lg:flex flex-col items-center justify-center">
                <ArrowDown className="h-16 w-16 text-secondary mb-4" />
                <span className="text-secondary font-bold text-lg">CONSOLIDAMENTO</span>
              </div>

              {/* Consolidated Situation */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold text-green-600 mb-6">Con Consolidamento</h3>
                <div className="space-y-4">
                  <div className="bg-secondary/10 p-6 rounded-lg border border-secondary/20">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-secondary mb-2">UN\'UNICA RATA</div>
                      <div className="text-3xl font-bold text-secondary mb-2">
                        €{totals.consolidatedPayment.toFixed(0)}/mese
                      </div>
                      <div className="text-sm text-gray-600">
                        €{totals.totalAmount.toLocaleString()} al 2% fisso annuo
                      </div>
                    </div>
                  </div>

                  <div className="bg-secondary/20 p-6 rounded-lg border-2 border-secondary/30">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-secondary mb-2">RISPARMIO MENSILE</div>
                      <div className="text-3xl font-bold text-secondary mb-2">
                        €{totals.savings.toFixed(0)}
                      </div>
                      <div className="text-sm text-gray-600">
                        Risparmio annuale: €{(totals.savings * 12).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  <div className="text-center">
                    <button className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                      Richiedi Consolidamento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Come Funziona il Processo
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              4 semplici passi per liberarti dal peso dei debiti multipli
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-secondary/50 z-0 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
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
                Requisiti per il Consolidamento
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Verifica se puoi accedere al nostro servizio di consolidamento debiti
              </p>
              
              <div className="space-y-4">
                {[
                  'Debiti totali da €10.000 a €200.000',
                  'Reddito dimostrabile e stabile',
                  'Età compresa tra 18 e 75 anni',
                  'Residenza in Italia, Germania, Slovacchia o Belgio',
                  'Nessun protesto o procedure in corso',
                  'Capacità di rimborso adeguata'
                ].map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-secondary/10 rounded-xl border border-secondary/20">
                <h4 className="font-bold text-secondary mb-2">💡 Consulenza Gratuita</h4>
                <p className="text-gray-700">
                  I nostri esperti valutano gratuitamente la tua situazione e ti consigliano 
                  la soluzione migliore per il consolidamento dei tuoi debiti.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Analisi Gratuita Debiti
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Totale debiti attuali
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>€10.000 - €25.000</option>
                    <option>€25.000 - €50.000</option>
                    <option>€50.000 - €100.000</option>
                    <option>€100.000+</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numero di debiti
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg">
                    <option>2-3 debiti</option>
                    <option>4-5 debiti</option>
                    <option>6-10 debiti</option>
                    <option>Più di 10</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rata mensile totale attuale
                  </label>
                  <input
                    type="number"
                    placeholder="€500"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <button className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
                  Analizza Risparmio Gratuito
                </button>
                
                <p className="text-xs text-gray-500 text-center">
                  Valutazione gratuita senza impegno
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcolatore Consolidamento
            </h2>
            <p className="text-xl text-gray-600">
              Simula il consolidamento dei tuoi debiti
            </p>
          </div>
          
          <LoanCalculator />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Semplifica la Tua Vita Finanziaria Oggi
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Basta con rate multiple e tassi elevati. Consolida tutti i tuoi debiti 
            in un'unica soluzione conveniente e riprendi il controllo delle tue finanze.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Calculator className="mr-2 h-5 w-5" />
              Analisi Gratuita
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center">
              <TrendingDown className="mr-2 h-5 w-5" />
              Risparmia Subito
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ConsolidamentoDebiti;
