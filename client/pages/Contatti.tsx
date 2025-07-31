import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, User, Euro, Calendar, FileText, Phone, CheckCircle } from 'lucide-react';
import { sendEmail } from '../services/emailService';

const Contatti: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    cognome: '',
    email: '',
    telefono: '',
    tipoPrestito: '',
    importo: '',
    durata: '',
    reddito: '',
    occupazione: '',
    messaggio: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmail(formData, 'contact');
      if (success) {
        setSubmitted(true);
        // Reset form
        setFormData({
          nome: '',
          cognome: '',
          email: '',
          telefono: '',
          tipoPrestito: '',
          importo: '',
          durata: '',
          reddito: '',
          occupazione: '',
          messaggio: ''
        });
        setCurrentStep(1);
      } else {
        alert('Errore nell\'invio del messaggio. Riprova più tardi.');
      }
    } catch (error) {
      alert('Errore nell\'invio del messaggio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Informazioni Personali</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cognome *
                </label>
                <input
                  type="text"
                  name="cognome"
                  value={formData.cognome}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Telefono (opzionale)
              </label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Dettagli del Prestito</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo di Prestito *
              </label>
              <select
                name="tipoPrestito"
                value={formData.tipoPrestito}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Seleziona il tipo di prestito</option>
                <option value="personale">Prestito Personale</option>
                <option value="aziendale">Prestito Aziendale</option>
                <option value="immobiliare">Mutuo Immobiliare</option>
                <option value="auto">Prestito Auto</option>
                <option value="istantaneo">Prestito Istantaneo</option>
                <option value="privato">Prestito Privato</option>
                <option value="senza-schufa">Prestito Senza Schufa</option>
                <option value="autonomi">Prestito Autonomi</option>
                <option value="consolidamento">Consolidamento Debiti</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Importo Richiesto (€) *
                </label>
                <input
                  type="number"
                  name="importo"
                  value={formData.importo}
                  onChange={handleInputChange}
                  min="5000"
                  max="100000"
                  step="1000"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Minimo €5.000 - Massimo €100.000</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durata (mesi) *
                </label>
                <input
                  type="number"
                  name="durata"
                  value={formData.durata}
                  onChange={handleInputChange}
                  min="1"
                  max="240"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Da 1 a 240 mesi</p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-primary mb-6">Informazioni Finanziarie</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reddito Mensile Netto (€) *
              </label>
              <input
                type="number"
                name="reddito"
                value={formData.reddito}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupazione *
              </label>
              <select
                name="occupazione"
                value={formData.occupazione}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                required
              >
                <option value="">Seleziona la tua occupazione</option>
                <option value="dipendente">Dipendente</option>
                <option value="autonomo">Lavoratore Autonomo</option>
                <option value="pensionato">Pensionato</option>
                <option value="imprenditore">Imprenditore</option>
                <option value="libero-professionista">Libero Professionista</option>
                <option value="altro">Altro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Messaggio Aggiuntivo (opzionale)
              </label>
              <textarea
                name="messaggio"
                value={formData.messaggio}
                onChange={handleInputChange}
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="Descrivi il motivo del prestito o qualsiasi informazione aggiuntiva..."
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">Messaggio Inviato!</h2>
          <p className="text-gray-600 mb-6">
            Grazie per il tuo messaggio. La nostra équipe ti contatter�� entro 24 ore.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Invia un altro messaggio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-primary mb-6">
            Richiedi il Tuo Prestito
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compila il modulo per ricevere una valutazione gratuita della tua richiesta. 
            Ti risponderemo entro 24 ore con una proposta personalizzata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-gray-600">
                    Passo {currentStep} di {totalSteps}
                  </span>
                  <span className="text-sm font-medium text-primary">
                    {Math.round((currentStep / totalSteps) * 100)}% Completato
                  </span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleSubmit}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Indietro
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
                    >
                      Avanti
                      <Send className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Invio in corso...' : 'Invia Richiesta'}
                      <Send className="ml-2 h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-6">Informazioni di Contatto</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <a 
                      href="mailto:contatto@soluzionerapida.com" 
                      className="text-secondary hover:underline"
                    >
                      contatto@soluzionerapida.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Sede</div>
                    <div className="text-gray-600">Bruxelles, Belgio</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Orari</div>
                    <div className="text-gray-600">Lun-Ven: 9:00-18:00</div>
                    <div className="text-gray-600">Sab: 9:00-13:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="bg-primary text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Come Funziona</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                    1
                  </div>
                  <div>
                    <div className="font-medium">Compila il Modulo</div>
                    <div className="text-gray-200 text-sm">Fornisci le informazioni richieste</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                    2
                  </div>
                  <div>
                    <div className="font-medium">Valutazione</div>
                    <div className="text-gray-200 text-sm">Analizziamo la tua richiesta</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                    3
                  </div>
                  <div>
                    <div className="font-medium">Risposta</div>
                    <div className="text-gray-200 text-sm">Ricevi la proposta entro 24h</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-1 flex-shrink-0">
                    4
                  </div>
                  <div>
                    <div className="font-medium">Erogazione</div>
                    <div className="text-gray-200 text-sm">Ricevi i fondi in 2-3 giorni</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-4">Perché Fidarsi</h3>
              
              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <FileText className="h-4 w-4 text-secondary mr-2" />
                  <span>Dati protetti SSL 256-bit</span>
                </li>
                <li className="flex items-center">
                  <User className="h-4 w-4 text-secondary mr-2" />
                  <span>8.500+ clienti soddisfatti</span>
                </li>
                <li className="flex items-center">
                  <Euro className="h-4 w-4 text-secondary mr-2" />
                  <span>Tasso fisso 2% garantito</span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  <span>Approvazione in 24 ore</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contatti;
