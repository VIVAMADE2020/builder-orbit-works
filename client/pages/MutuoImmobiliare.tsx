import React, { useState } from 'react';
import { CheckCircle, Home, Key, Calculator, Shield, TrendingUp, MapPin, Users, Euro, Clock } from 'lucide-react';
import LoanCalculator from '../components/LoanCalculator';

const MutuoImmobiliare: React.FC = () => {
  const [activeTab, setActiveTab] = useState('acquisto');

  const features = [
    'Finanziamento fino al 100% del valore',
    'Durata fino a 30 anni (360 mesi)',
    'Tasso fisso 2% annuo',
    'Prima casa e investimenti',
    'Valutazione gratuita dell\'immobile',
    'Consulenza specializzata inclusa'
  ];

  const benefits = [
    {
      icon: <Home className="h-12 w-12 text-secondary" />,
      title: 'Casa dei Sogni',
      description: 'Realizziamo il sogno della casa propria con condizioni vantaggiose'
    },
    {
      icon: <Euro className="h-12 w-12 text-secondary" />,
      title: 'Tasso Competitivo',
      description: 'Solo 2% annuo fisso, tra i migliori del mercato europeo'
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Sicurezza Totale',
      description: 'Contratti trasparenti e assistenza legale inclusa'
    },
    {
      icon: <Clock className="h-12 w-12 text-secondary" />,
      title: 'Tempi Rapidi',
      description: 'Istruttoria veloce e delibera in 5-7 giorni lavorativi'
    }
  ];

  const propertyTypes = [
    {
      icon: <Home className="h-8 w-8 text-secondary" />,
      title: 'Prima Casa',
      description: 'Mutui agevolati per l\'acquisto della prima abitazione',
      rate: 'da 1.8%'
    },
    {
      icon: <Building className="h-8 w-8 text-secondary" />,
      title: 'Seconda Casa',
      description: 'Finanziamenti per case vacanza e investimenti',
      rate: 'da 2.2%'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: 'Investimento',
      description: 'Mutui per immobili da mettere a reddito',
      rate: 'da 2.5%'
    },
    {
      icon: <Key className="h-8 w-8 text-secondary" />,
      title: 'Ristrutturazione',
      description: 'Finanziamenti per lavori di ristrutturazione',
      rate: 'da 2.0%'
    }
  ];

  const requirements = [
    'Età minima 18 anni, massima 75 anni a fine mutuo',
    'Reddito dimostrabile e stabile',
    'Residenza in Italia, Germania, Slovacchia o Belgio',
    'Nessun protesto o segnalazione negativa',
    'Capacità di rimborso adeguata (rata max 35% del reddito)',
    'Immobile in regola urbanisticamente'
  ];

  const documents = [
    'Documento d\'identità e codice fiscale',
    'Estratti conto degli ultimi 6 mesi',
    'Ultime 3 buste paga o dichiarazione redditi',
    'Compromesso di vendita o proposta d\'acquisto',
    'Planimetria e documenti catastali',
    'Certificato energetico dell\'immobile'
  ];

  const steps = [
    {
      number: '01',
      title: 'Consulenza',
      description: 'Analizziamo insieme le tue esigenze e la fattibilità'
    },
    {
      number: '02',
      title: 'Documentazione',
      description: 'Raccogliamo tutti i documenti necessari'
    },
    {
      number: '03',
      title: 'Valutazione',
      description: 'Perizia gratuita dell\'immobile da parte di tecnici qualificati'
    },
    {
      number: '04',
      title: 'Delibera',
      description: 'Istruttoria e delibera di concessione del mutuo'
    },
    {
      number: '05',
      title: 'Rogito',
      description: 'Assistenza completa fino alla firma dell\'atto'
    }
  ];

  const faqs = [
    {
      question: 'Posso ottenere un mutuo al 100%?',
      answer: 'Sì, per la prima casa possiamo finanziare fino al 100% del valore dell\'immobile, con valutazione favorevole.'
    },
    {
      question: 'Quali sono i costi del mutuo?',
      answer: 'I costi includono solo gli interessi al 2% annuo. Nessuna commissione di istruttoria o gestione.'
    },
    {
      question: 'Posso estinguere anticipatamente?',
      answer: 'Sì, è possibile estinguere o ridurre il mutuo in qualsiasi momento senza penali.'
    },
    {
      question: 'Quanto tempo serve per l\'approvazione?',
      answer: 'L\'istruttoria richiede 5-7 giorni lavorativi dalla consegna di tutta la documentazione.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Mutuo Immobiliare
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Realizza il sogno della casa propria con i nostri mutui immobiliari. 
                Condizioni vantaggiose, tasso fisso al 2% e finanziamento fino al 100% del valore.
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
                  Richiedi Mutuo
                </button>
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                  Valutazione Gratuita
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img 
                  src="https://images.pexels.com/photos/7415122/pexels-photo-7415122.jpeg" 
                  alt="Mutuo Immobiliare"
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
              Perché Scegliere il Nostro Mutuo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vantaggi esclusivi per realizzare il tuo progetto immobiliare
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

      {/* Property Types */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Tipologie di Mutuo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluzioni personalizzate per ogni esigenza immobiliare
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {propertyTypes.map((type, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-center mb-4">
                  {type.icon}
                  <h3 className="text-lg font-bold text-primary ml-3">{type.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <div className="text-secondary font-bold text-lg">{type.rate}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Il Nostro Processo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              5 semplici passi per ottenere il tuo mutuo immobiliare
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {steps.map((step, index) => (
                <div key={index} className="text-center relative">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-white">{step.number}</span>
                    </div>
                    {index < steps.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-primary/30 z-0 transform translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-primary mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Requirements and Documents */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Requisiti per il Mutuo
              </h2>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Documenti Necessari
              </h2>
              
              <div className="space-y-4">
                {documents.map((document, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{document}</span>
                  </div>
                ))}
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
              Calcolatore Mutuo
            </h2>
            <p className="text-xl text-gray-600">
              Scopri subito la rata del tuo mutuo immobiliare
            </p>
          </div>
          
          <LoanCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Domande Frequenti
            </h2>
            <p className="text-xl text-gray-600">
              Risposte alle domande più comuni sui mutui immobiliari
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg">
                <h4 className="text-lg font-bold text-primary mb-3">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto per la Casa dei Tuoi Sogni?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Inizia subito il percorso verso la tua nuova casa con il nostro mutuo immobiliare conveniente e sicuro.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Home className="mr-2 h-5 w-5" />
              Richiedi Mutuo
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center">
              <Calculator className="mr-2 h-5 w-5" />
              Calcola Rata
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MutuoImmobiliare;
