import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Shield, Euro, FileText } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqCategories = [
    {
      title: 'Domande Generali',
      icon: <HelpCircle className="h-6 w-6" />,
      faqs: [
        {
          question: 'Cos\'è Soluzione Rapida?',
          answer: 'Soluzione Rapida è una società finanziaria privata fondata nel 2011 a Bruxelles, specializzata in prestiti personalizzati per privati e aziende. Offriamo soluzioni finanziarie rapide, trasparenti e competitive in tutta Europa.'
        },
        {
          question: 'In quali paesi operate?',
          answer: 'Operiamo in tutta Europa attraverso la nostra rete di partner finanziari. I nostri servizi sono disponibili per residenti di tutti i paesi europei con documenti validi e reddito dimostrabile.'
        },
        {
          question: 'Quali tipi di prestiti offrite?',
          answer: 'Offriamo prestiti personali, aziendali, immobiliari, per auto, prestiti istantanei, prestiti senza Schufa, prestiti per autonomi e servizi di consolidamento debiti. Ogni prodotto è personalizzabile secondo le vostre esigenze.'
        }
      ]
    },
    {
      title: 'Tempi e Approvazione',
      icon: <Clock className="h-6 w-6" />,
      faqs: [
        {
          question: 'Quanto tempo ci vuole per l\'approvazione?',
          answer: 'Il nostro processo di approvazione richiede generalmente 24 ore lavorative. Per prestiti di importi elevati o situazioni complesse, i tempi possono estendersi fino a 72 ore.'
        },
        {
          question: 'Quando ricevo i soldi dopo l\'approvazione?',
          answer: 'Una volta approvato il prestito e firmati i documenti, l\'erogazione avviene entro 2-3 giorni lavorativi tramite bonifico bancario sul vostro conto corrente.'
        },
        {
          question: 'Posso velocizzare il processo?',
          answer: 'Sì, fornendo tutta la documentazione richiesta completa e accurata fin dall\'inizio. Assicuratevi che tutti i documenti siano leggibili e aggiornati.'
        }
      ]
    },
    {
      title: 'Sicurezza e Privacy',
      icon: <Shield className="h-6 w-6" />,
      faqs: [
        {
          question: 'I miei dati sono al sicuro?',
          answer: 'Assolutamente sì. Utilizziamo crittografia SSL a 256 bit e rispettiamo tutte le normative GDPR europee. I vostri dati sono protetti con i più alti standard di sicurezza del settore finanziario.'
        },
        {
          question: 'Condividete i miei dati con terzi?',
          answer: 'No, non condividiamo mai i vostri dati personali con terzi per scopi commerciali. I dati vengono condivisi solo con partner finanziari necessari per processare il vostro prestito e solo con il vostro consenso.'
        },
        {
          question: 'Come proteggete le mie informazioni finanziarie?',
          answer: 'Utilizziamo sistemi di sicurezza bancari, autenticazione a due fattori, monitoraggio continuo delle transazioni e server protetti in data center certificati ISO 27001.'
        }
      ]
    },
    {
      title: 'Costi e Tassi',
      icon: <Euro className="h-6 w-6" />,
      faqs: [
        {
          question: 'Qual è il tasso di interesse applicato?',
          answer: 'Il nostro tasso standard è del 2% annuo fisso. Questo tasso si applica a tutti i tipi di prestito, indipendentemente dall\'importo o dalla durata, garantendo trasparenza e convenienza.'
        },
        {
          question: 'Ci sono commissioni nascoste?',
          answer: 'No, non applichiamo mai commissioni nascoste. Tutti i costi sono chiaramente indicati nel contratto. L\'unico costo è il tasso di interesse del 2% annuo, senza spese di istruttoria, gestione o penali.'
        },
        {
          question: 'Posso rimborsare in anticipo?',
          answer: 'Sì, è possibile rimborsare il prestito in anticipo in qualsiasi momento senza penali. Anzi, il rimborso anticipato riduce gli interessi totali da pagare.'
        }
      ]
    },
    {
      title: 'Documenti e Requisiti',
      icon: <FileText className="h-6 w-6" />,
      faqs: [
        {
          question: 'Quali documenti sono necessari?',
          answer: 'Servono: documento d\'identità valido, codice fiscale, ultimi 3 estratti conto bancari, buste paga recenti (per dipendenti) o dichiarazione dei redditi (per autonomi), e residenza in uno dei paesi coperti.'
        },
        {
          question: 'Quali sono i requisiti per ottenere un prestito?',
          answer: 'Età minima 18 anni, residenza in Italia/Germania/Slovacchia/Belgio, reddito dimostrabile, conto corrente intestato al richiedente, e capacità di rimborso adeguata all\'importo richiesto.'
        },
        {
          question: 'Posso richiedere se ho altri prestiti in corso?',
          answer: 'Sì, valutiamo ogni situazione individualmente. L\'importante è dimostrare una capacità di rimborso adeguata considerando tutti gli impegni finanziari esistenti.'
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex: number, faqIndex: number) => {
    const uniqueIndex = categoryIndex * 100 + faqIndex;
    setOpenFAQ(openFAQ === uniqueIndex ? null : uniqueIndex);
  };

  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Domande Frequenti
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trova rapidamente le risposte alle domande più comuni sui nostri 
            servizi di prestito. Se non trovi quello che cerchi, contattaci!
          </p>
        </div>

        {/* FAQ Categories */}
        {faqCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            {/* Category Header */}
            <div className="flex items-center mb-6 p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <div className="text-primary mr-3">
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-primary">
                {category.title}
              </h2>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {category.faqs.map((faq, faqIndex) => {
                const uniqueIndex = categoryIndex * 100 + faqIndex;
                const isOpen = openFAQ === uniqueIndex;

                return (
                  <div
                    key={faqIndex}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(categoryIndex, faqIndex)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-gray-900 pr-4">
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5 text-secondary transition-transform duration-200" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                          )}
                        </div>
                      </div>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                      }`}
                    >
                      <div className="px-6">
                        <div className="h-px bg-gray-200 mb-4"></div>
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Non hai trovato la risposta che cercavi?
          </h2>
          <p className="text-xl mb-6 text-gray-200">
            Il nostro team di esperti è pronto ad aiutarti. Contattaci per ricevere 
            assistenza personalizzata.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contattaci
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
              Live Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
