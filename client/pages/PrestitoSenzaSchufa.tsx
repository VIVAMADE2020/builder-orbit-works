import React from 'react';
import { CheckCircle, Shield, UserCheck, Clock, Euro, AlertTriangle, TrendingUp, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoanCalculator from '../components/LoanCalculator';

const PrestitoSenzaSchufa: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    'Nessuna verifica Schufa richiesta',
    'Importi da €1.000 a €25.000',
    'Durata da 6 a 60 mesi',
    'Tasso fisso 2% annuo',
    'Decisione rapida in 24 ore',
    'Processo discreto e riservato'
  ];

  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Senza Schufa',
      description: 'Non verifichiamo il tuo score creditizio Schufa'
    },
    {
      icon: <UserCheck className="h-12 w-12 text-secondary" />,
      title: 'Valutazione Alternativa',
      description: 'Basiamo la decisione sul reddito e capacità di rimborso'
    },
    {
      icon: <Clock className="h-12 w-12 text-secondary" />,
      title: 'Processo Veloce',
      description: 'Decisione in 24 ore senza lunghe pratiche'
    },
    {
      icon: <Euro className="h-12 w-12 text-secondary" />,
      title: 'Tasso Competitivo',
      description: 'Solo 2% annuo fisso, tra i migliori del mercato'
    }
  ];

  const whyChoose = [
    {
      icon: <AlertTriangle className="h-8 w-8 text-secondary" />,
      title: 'Problemi Creditizi Passati',
      description: 'Anche con precedenti difficoltà finanziarie puoi ottenere il prestito'
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: 'Reddito Stabile',
      description: 'Se hai un reddito regolare, possiamo aiutarti indipendentemente dalla Schufa'
    },
    {
      icon: <FileText className="h-8 w-8 text-secondary" />,
      title: 'Pochi Documenti',
      description: 'Documentazione semplificata per un processo più veloce'
    }
  ];

  const requirements = [
    'Età compresa tra 18 e 70 anni',
    'Residenza in Germania, Austria o Svizzera',
    'Reddito netto minimo €1.200/mese',
    'Contratto di lavoro stabile da almeno 6 mesi',
    'Conto corrente tedesco',
    'Nessuna procedura di insolvenza in corso'
  ];

  const documents = [
    'Documento d\'identità valido',
    'Ultime 3 buste paga',
    'Estratti conto degli ultimi 3 mesi',
    'Contratto di lavoro',
    'Conferma del datore di lavoro'
  ];

  const steps = [
    {
      step: '1',
      title: 'Richiesta Online',
      description: 'Compila il modulo senza verifica Schufa'
    },
    {
      step: '2',
      title: 'Verifica Reddito',
      description: 'Controlliamo solo la capacità di rimborso'
    },
    {
      step: '3',
      title: 'Approvazione',
      description: 'Decisione basata sui tuoi dati reddituali'
    },
    {
      step: '4',
      title: 'Erogazione',
      description: 'Trasferimento sul tuo conto corrente'
    }
  ];

  const faqs = [
    {
      question: 'Cosa significa "senza Schufa"?',
      answer: 'Non consultiamo la banca dati Schufa per verificare il tuo score creditizio. La valutazione si basa esclusivamente sul tuo reddito attuale e sulla capacità di rimborso.'
    },
    {
      question: 'Posso ottenere il prestito con un Schufa negativo?',
      answer: 'Sì, anche con precedenti problemi creditizi puoi ottenere il prestito, purché tu abbia un reddito stabile e sufficiente per il rimborso.'
    },
    {
      question: 'Il prestito viene registrato nella Schufa?',
      answer: 'Sì, come previsto dalla legge, il prestito erogato viene comunicato alla Schufa, ma questo non influenza la decisione di approvazione.'
    },
    {
      question: 'Quali sono i tempi di erogazione?',
      answer: 'Dopo l\'approvazione e la firma del contratto, l\'erogazione avviene entro 2-3 giorni lavorativi.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Shield className="h-4 w-4 mr-2" />
                Senza verifica Schufa
              </div>
              
              <h1 className="text-5xl font-bold text-primary mb-6">
                Prestito Senza Schufa
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Ottieni il finanziamento che meriti senza la limitazione della verifica Schufa. 
                Valutiamo la tua richiesta basandoci esclusivamente sul tuo reddito e capacità di rimborso attuale.
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
                <button 
                  onClick={() => navigate('/richiesta-prestito')}
                  className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Fare una Demanda di Prestito
                </button>
                <button 
                  onClick={() => navigate('/calcolatore')}
                  className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all"
                >
                  Calcolatore Prestito
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img 
                  src="https://images.pexels.com/photos/5816286/pexels-photo-5816286.jpeg" 
                  alt="Prestito Senza Schufa"
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
              Vantaggi del Prestito Senza Schufa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Una nuova opportunità per ottenere il finanziamento che ti serve
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

      {/* Why Choose */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Perché Scegliere il Prestito Senza Schufa
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Situazioni in cui questa soluzione è ideale per te
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChoose.map((reason, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  {reason.icon}
                  <h3 className="text-xl font-bold text-primary ml-4">{reason.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">{reason.description}</p>
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
              Come Funziona
            </h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Processo semplificato senza verifica Schufa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-white/30 z-0 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-200">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements and Documents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Requisiti Necessari
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Criteri di idoneità per il prestito senza verifica Schufa
              </p>
              
              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Documenti Richiesti
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Documentazione necessaria per la valutazione
              </p>
              
              <div className="space-y-4">
                {documents.map((document, index) => (
                  <div key={index} className="flex items-start">
                    <FileText className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{document}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 p-8 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="h-8 w-8 text-yellow-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-yellow-800 mb-2">Importante da Sapere</h4>
                <p className="text-yellow-700 leading-relaxed">
                  Il prestito senza Schufa è disponibile principalmente per residenti in Germania, Austria e Svizzera. 
                  La valutazione si basa esclusivamente sulla capacità di rimborso dimostrata attraverso il reddito stabile. 
                  Anche se non consultiamo la Schufa per l'approvazione, il prestito viene comunque registrato 
                  come previsto dalla normativa vigente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcolatore Prestito Senza Schufa
            </h2>
            <p className="text-xl text-gray-600">
              Simula il tuo prestito con condizioni speciali
            </p>
          </div>
          
          <LoanCalculator />
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Domande Frequenti
            </h2>
            <p className="text-xl text-gray-600">
              Tutto quello che devi sapere sul prestito senza Schufa
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h4 className="text-xl font-bold text-primary mb-4">{faq.question}</h4>
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-20 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-yellow-200">
            <div className="flex items-start">
              <AlertTriangle className="h-12 w-12 text-yellow-600 mr-6 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-yellow-800 mb-4">
                  Prestito Responsabile
                </h3>
                <p className="text-yellow-700 leading-relaxed mb-4">
                  Il prestito senza Schufa è una soluzione seria per chi ha reali necessità finanziarie 
                  e la capacità di rimborso. Non è destinato a risolvere problemi di sovraindebitamento 
                  già esistenti.
                </p>
                <p className="text-yellow-700 leading-relaxed">
                  Prima di richiedere qualsiasi prestito, valuta attentamente la tua situazione finanziaria 
                  e assicurati di poter sostenere l'impegno di rimborso. I nostri consulenti sono disponibili 
                  per una valutazione gratuita e responsabile della tua richiesta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Una Nuova Opportunità Ti Aspetta
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Non lasciare che il passato creditizio limiti il tuo futuro. 
            Richiedi subito il tuo prestito senza verifica Schufa e ottieni il finanziamento che meriti.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/richiesta-prestito')}
              className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              <Shield className="mr-2 h-5 w-5" />
              Fare una Demanda di Prestito
            </button>
            <button 
              onClick={() => navigate('/contatti')}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all inline-flex items-center justify-center"
            >
              <UserCheck className="mr-2 h-5 w-5" />
              Consulenza Gratuita
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestitoSenzaSchufa;
