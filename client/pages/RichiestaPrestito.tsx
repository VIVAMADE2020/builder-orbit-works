import React, { useState } from 'react';
import { Send, User, Euro, Calendar, Building, Home, Car, CreditCard, ArrowLeft, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';

const RichiestaPrestito: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Info
    nome: '',
    cognome: '',
    dataNascita: '',
    luogoNascita: '',
    codiceFiscale: '',
    telefono: '',
    email: '',
    indirizzo: '',
    citta: '',
    cap: '',
    paese: '',
    
    // Loan Info
    tipoPrestito: '',
    importo: '',
    durata: '',
    motivazione: '',
    
    // Financial Info
    occupazione: '',
    azienda: '',
    redditoMensile: '',
    altreEntrate: '',
    speseFinanziarie: '',
    
    // Documents
    documento: null,
    reddito: null,
    estrattoConto: null,
    
    // Additional
    messaggio: '',
    consensoPrivacy: false,
    consensoMarketing: false
  });

  const totalSteps = 4;

  const loanTypes = [
    { id: 'personale', label: 'Prestito Personale', icon: <User className="h-6 w-6" />, color: 'bg-blue-500' },
    { id: 'aziendale', label: 'Prestito Aziendale', icon: <Building className="h-6 w-6" />, color: 'bg-green-500' },
    { id: 'immobiliare', label: 'Mutuo Immobiliare', icon: <Home className="h-6 w-6" />, color: 'bg-purple-500' },
    { id: 'auto', label: 'Prestito Auto', icon: <Car className="h-6 w-6" />, color: 'bg-red-500' },
    { id: 'istantaneo', label: 'Prestito Istantaneo', icon: <CreditCard className="h-6 w-6" />, color: 'bg-orange-500' },
    { id: 'senza-schufa', label: 'Prestito Senza Schufa', icon: <Shield className="h-6 w-6" />, color: 'bg-teal-500' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Informazioni Personali';
      case 2: return 'Dettagli del Prestito';
      case 3: return 'Situazione Finanziaria';
      case 4: return 'Documenti e Conferma';
      default: return '';
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Data di Nascita *
                </label>
                <input
                  type="date"
                  name="dataNascita"
                  value={formData.dataNascita}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Luogo di Nascita *
                </label>
                <input
                  type="text"
                  name="luogoNascita"
                  value={formData.luogoNascita}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Codice Fiscale *
              </label>
              <input
                type="text"
                name="codiceFiscale"
                value={formData.codiceFiscale}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
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
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Indirizzo Completo *
              </label>
              <input
                type="text"
                name="indirizzo"
                value={formData.indirizzo}
                onChange={handleInputChange}
                placeholder="Via, numero civico"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Città *
                </label>
                <input
                  type="text"
                  name="citta"
                  value={formData.citta}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CAP *
                </label>
                <input
                  type="text"
                  name="cap"
                  value={formData.cap}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paese *
                </label>
                <select
                  name="paese"
                  value={formData.paese}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="">Seleziona paese</option>
                  <option value="IT">Italia</option>
                  <option value="DE">Germania</option>
                  <option value="SK">Slovacchia</option>
                  <option value="BE">Belgio</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Tipo di Prestito *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loanTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() => setFormData(prev => ({ ...prev, tipoPrestito: type.id }))}
                    className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-lg ${
                      formData.tipoPrestito === type.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                      {type.icon}
                    </div>
                    <h3 className="font-semibold text-gray-900">{type.label}</h3>
                  </div>
                ))}
              </div>
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
                  max="500000"
                  step="1000"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">Minimo €5.000</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Durata (mesi) *
                </label>
                <select
                  name="durata"
                  value={formData.durata}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                  required
                >
                  <option value="">Seleziona durata</option>
                  <option value="12">12 mesi</option>
                  <option value="24">24 mesi</option>
                  <option value="36">36 mesi</option>
                  <option value="48">48 mesi</option>
                  <option value="60">60 mesi</option>
                  <option value="84">84 mesi</option>
                  <option value="120">120 mesi</option>
                  <option value="240">240 mesi</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Motivazione del Prestito *
              </label>
              <select
                name="motivazione"
                value={formData.motivazione}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              >
                <option value="">Seleziona motivazione</option>
                <option value="casa">Acquisto/Ristrutturazione Casa</option>
                <option value="auto">Acquisto Veicolo</option>
                <option value="consolidamento">Consolidamento Debiti</option>
                <option value="matrimonio">Matrimonio</option>
                <option value="viaggio">Viaggio</option>
                <option value="spese-mediche">Spese Mediche</option>
                <option value="investimento">Investimento</option>
                <option value="emergenza">Emergenza</option>
                <option value="altro">Altro</option>
              </select>
            </div>

            {formData.importo && formData.durata && (
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
                <h4 className="font-bold text-primary mb-3">Anteprima Prestito</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-sm text-gray-600">Importo</div>
                    <div className="text-xl font-bold text-primary">€{parseInt(formData.importo).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Durata</div>
                    <div className="text-xl font-bold text-primary">{formData.durata} mesi</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Rata Stimata*</div>
                    <div className="text-xl font-bold text-secondary">
                      €{Math.round((parseInt(formData.importo) * 1.02 * parseInt(formData.durata) / 12) / parseInt(formData.durata)).toLocaleString()}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 text-center mt-3">*Calcolo indicativo con tasso 2% annuo</p>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Occupazione *
              </label>
              <select
                name="occupazione"
                value={formData.occupazione}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              >
                <option value="">Seleziona occupazione</option>
                <option value="dipendente-tempo-indeterminato">Dipendente Tempo Indeterminato</option>
                <option value="dipendente-tempo-determinato">Dipendente Tempo Determinato</option>
                <option value="lavoratore-autonomo">Lavoratore Autonomo</option>
                <option value="libero-professionista">Libero Professionista</option>
                <option value="imprenditore">Imprenditore</option>
                <option value="pensionato">Pensionato</option>
                <option value="altro">Altro</option>
              </select>
            </div>

            {(formData.occupazione?.includes('dipendente') || formData.occupazione === 'altro') && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Azienda/Datore di Lavoro
                </label>
                <input
                  type="text"
                  name="azienda"
                  value={formData.azienda}
                  onChange={handleInputChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reddito Mensile Netto (€) *
              </label>
              <input
                type="number"
                name="redditoMensile"
                value={formData.redditoMensile}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Altre Entrate Mensili (€)
              </label>
              <input
                type="number"
                name="altreEntrate"
                value={formData.altreEntrate}
                onChange={handleInputChange}
                min="0"
                step="100"
                placeholder="Affitti, investimenti, pensioni, ecc."
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spese Finanziarie Mensili (€)
              </label>
              <input
                type="number"
                name="speseFinanziarie"
                value={formData.speseFinanziarie}
                onChange={handleInputChange}
                min="0"
                step="50"
                placeholder="Rate di altri prestiti, mutui, finanziamenti"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
              />
            </div>

            {formData.redditoMensile && (
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-xl border border-green-200">
                <h4 className="font-bold text-green-800 mb-3">Analisi della Capacità di Rimborso</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Reddito Mensile</div>
                    <div className="text-lg font-bold text-green-700">
                      €{parseInt(formData.redditoMensile || '0').toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Rata Massima Consigliata</div>
                    <div className="text-lg font-bold text-blue-700">
                      €{Math.round(parseInt(formData.redditoMensile || '0') * 0.35).toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Capacità di Rimborso</div>
                    <div className="text-lg font-bold text-green-600">
                      {parseInt(formData.redditoMensile || '0') > 1500 ? 'Ottima' : 
                       parseInt(formData.redditoMensile || '0') > 1000 ? 'Buona' : 'Da valutare'}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-600 text-center mt-3">
                  Calcoliamo un limite del 35% del reddito per la rata massima
                </p>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">Carica i Documenti Richiesti</h3>
              <p className="text-gray-600 mb-6">
                Carica i documenti per velocizzare l'approvazione del tuo prestito
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Documento d'Identità *</span>
                    <input
                      type="file"
                      name="documento"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <div className="mt-2 bg-primary text-white px-4 py-2 rounded cursor-pointer inline-block">
                      Carica File
                    </div>
                  </label>
                  {formData.documento && (
                    <p className="text-sm text-green-600 mt-2">✓ File caricato</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Euro className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Certificato di Reddito *</span>
                    <input
                      type="file"
                      name="reddito"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <div className="mt-2 bg-primary text-white px-4 py-2 rounded cursor-pointer inline-block">
                      Carica File
                    </div>
                  </label>
                  {formData.reddito && (
                    <p className="text-sm text-green-600 mt-2">✓ File caricato</p>
                  )}
                </div>

                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary transition-colors">
                  <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Estratto Conto *</span>
                    <input
                      type="file"
                      name="estrattoConto"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="hidden"
                    />
                    <div className="mt-2 bg-primary text-white px-4 py-2 rounded cursor-pointer inline-block">
                      Carica File
                    </div>
                  </label>
                  {formData.estrattoConto && (
                    <p className="text-sm text-green-600 mt-2">✓ File caricato</p>
                  )}
                </div>
              </div>
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
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                placeholder="Aggiungi qualsiasi informazione che ritieni utile per la valutazione..."
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="consensoPrivacy"
                  checked={formData.consensoPrivacy}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                  required
                />
                <label className="ml-3 text-sm text-gray-700">
                  Accetto la <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a> e 
                  i <a href="/termini-condizioni" className="text-primary hover:underline">Termini e Condizioni</a> *
                </label>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="consensoMarketing"
                  checked={formData.consensoMarketing}
                  onChange={handleInputChange}
                  className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <label className="ml-3 text-sm text-gray-700">
                  Acconsento a ricevere comunicazioni commerciali e promozionali
                </label>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 rounded-xl border border-primary/20">
              <h4 className="font-bold text-primary mb-4">Riepilogo della Richiesta</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Richiedente</div>
                  <div className="font-semibold">{formData.nome} {formData.cognome}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Email</div>
                  <div className="font-semibold">{formData.email}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Tipo Prestito</div>
                  <div className="font-semibold">
                    {loanTypes.find(t => t.id === formData.tipoPrestito)?.label || 'Non selezionato'}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Importo Richiesto</div>
                  <div className="font-semibold text-primary">€{parseInt(formData.importo || '0').toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Durata</div>
                  <div className="font-semibold">{formData.durata} mesi</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Reddito Mensile</div>
                  <div className="font-semibold">€{parseInt(formData.redditoMensile || '0').toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Richiesta Prestito
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Compila il modulo per ricevere una valutazione gratuita della tua richiesta di prestito. 
            Ti risponderemo entro 24 ore.
          </p>
        </div>

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
          
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>

          <div className="flex justify-between mt-4">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`flex items-center ${
                  step <= currentStep ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step <= currentStep ? 'bg-primary text-white' : 'bg-gray-200'
                }`}>
                  {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                </div>
                <span className="ml-2 text-xs hidden sm:block">
                  {step === 1 && 'Personali'}
                  {step === 2 && 'Prestito'}
                  {step === 3 && 'Finanze'}
                  {step === 4 && 'Documenti'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-2">{getStepTitle()}</h2>
            <div className="h-1 w-20 bg-secondary rounded"></div>
          </div>

          <form onSubmit={handleSubmit}>
            {renderStep()}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Indietro
                </button>
              ) : (
                <div></div>
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Avanti
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!formData.consensoPrivacy}
                  className="flex items-center px-8 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="mr-2 h-4 w-4" />
                  Invia Richiesta
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Clock className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="font-bold text-primary mb-2">Risposta Rapida</h3>
            <p className="text-gray-600 text-sm">Valutazione entro 24 ore</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <Shield className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="font-bold text-primary mb-2">Dati Sicuri</h3>
            <p className="text-gray-600 text-sm">Crittografia SSL 256-bit</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg text-center">
            <CheckCircle className="h-12 w-12 text-secondary mx-auto mb-4" />
            <h3 className="font-bold text-primary mb-2">Senza Impegno</h3>
            <p className="text-gray-600 text-sm">Valutazione gratuita</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RichiestaPrestito;
