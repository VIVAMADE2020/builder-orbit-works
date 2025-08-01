import React, { useState } from "react";
import {
  Send,
  User,
  Euro,
  Building,
  Home,
  Car,
  CreditCard,
  Shield,
  Clock,
  CheckCircle,
} from "lucide-react";
import { sendEmail } from "../services/emailService";
import CongratulationsPopup from "../components/CongratulationsPopup";

const RichiestaPrestito: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    dataNascita: "",
    indirizzo: "",
    citta: "",
    cap: "",
    paese: "",
    tipoPrestito: "",
    importo: "",
    durata: "",
    motivazione: "",
    occupazione: "",
    redditoMensile: "",
    messaggio: "",
    consensoPrivacy: false,
    consensoMarketing: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const loanTypes = [
    {
      id: "personale",
      label: "Prestito Personale",
      icon: <User className="h-6 w-6" />,
      color: "bg-blue-500",
    },
    {
      id: "aziendale",
      label: "Prestito Aziendale",
      icon: <Building className="h-6 w-6" />,
      color: "bg-green-500",
    },
    {
      id: "immobiliare",
      label: "Mutuo Immobiliare",
      icon: <Home className="h-6 w-6" />,
      color: "bg-purple-500",
    },
    {
      id: "auto",
      label: "Prestito Auto",
      icon: <Car className="h-6 w-6" />,
      color: "bg-red-500",
    },
    {
      id: "istantaneo",
      label: "Prestito Istantaneo",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-orange-500",
    },
    {
      id: "senza-schufa",
      label: "Prestito Senza Schufa",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-teal-500",
    },
    {
      id: "consolidamento",
      label: "Consolidamento Debiti",
      icon: <Euro className="h-6 w-6" />,
      color: "bg-indigo-500",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmail(formData, "loan-request");
      if (success) {
        setShowCongratulations(true);
        // Reset form
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          telefono: "",
          dataNascita: "",
          indirizzo: "",
          citta: "",
          cap: "",
          paese: "",
          tipoPrestito: "",
          importo: "",
          durata: "",
          motivazione: "",
          occupazione: "",
          redditoMensile: "",
          messaggio: "",
          consensoPrivacy: false,
          consensoMarketing: false,
        });
      } else {
        alert("Errore nell'invio della richiesta. Riprova più tardi.");
      }
    } catch (error) {
      alert("Errore nell'invio della richiesta. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateEstimatedPayment = () => {
    if (formData.importo && formData.durata) {
      const amount = parseInt(formData.importo);
      const months = parseInt(formData.durata);
      const monthlyRate = 0.02 / 12;
      const payment =
        (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      return payment;
    }
    return 0;
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Richiesta Inviata!
          </h2>
          <p className="text-gray-600 mb-6">
            Grazie per la tua richiesta. La nostra équipe ti contatterà entro 24
            ore con una proposta personalizzata.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Invia un'altra richiesta
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <CongratulationsPopup
        isVisible={showCongratulations}
        onClose={() => {
          setShowCongratulations(false);
          setSubmitted(true);
        }}
        title="Richiesta Prestito Inviata!"
        message="Complimenti! La tua richiesta di prestito è stata inviata con successo. La nostra équipe ti contatterà entro 24 ore con una proposta personalizzata."
      />

      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">
              Richiesta Prestito
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compila il modulo per ricevere una valutazione gratuita della tua
              richiesta di prestito. Ti risponderemo entro 24 ore.
            </p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Informazioni Personali
                </h2>
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

                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indirizzo Completo *
                  </label>
                  <input
                    type="text"
                    name="indirizzo"
                    value={formData.indirizzo}
                    onChange={handleInputChange}
                    placeholder="Via, numero civico, città, CAP"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    required
                  />
                </div>
              </div>

              {/* Loan Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Dettagli del Prestito
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Tipo di Prestito *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loanTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            tipoPrestito: type.id,
                          }))
                        }
                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all hover:shadow-lg ${
                          formData.tipoPrestito === type.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-10 h-10 ${type.color} rounded-lg flex items-center justify-center text-white mb-3`}
                        >
                          {type.icon}
                        </div>
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {type.label}
                        </h3>
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
                  <input
                    type="number"
                    name="durata"
                    value={formData.durata}
                    onChange={handleInputChange}
                    min="1"
                    max="240"
                    placeholder="Inserisci durata in mesi (1-240)"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">Da 1 a 240 mesi</p>
                </div>
                </div>

                <div className="mt-6">
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
                    <option value="consolidamento">
                      Consolidamento Debiti
                    </option>
                    <option value="matrimonio">Matrimonio</option>
                    <option value="viaggio">Viaggio</option>
                    <option value="spese-mediche">Spese Mediche</option>
                    <option value="investimento">Investimento</option>
                    <option value="emergenza">Emergenza</option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                {formData.importo && formData.durata && (
                  <div className="mt-6 bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl">
                    <h4 className="font-bold text-primary mb-3">
                      Anteprima Prestito
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-sm text-gray-600">Importo</div>
                        <div className="text-xl font-bold text-primary">
                          €{parseInt(formData.importo).toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Durata</div>
                        <div className="text-xl font-bold text-primary">
                          {formData.durata} mesi
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">
                          Rata Stimata*
                        </div>
                        <div className="text-xl font-bold text-secondary">
                          €
                          {Math.round(
                            calculateEstimatedPayment(),
                          ).toLocaleString()}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-3">
                      *Calcolo indicativo con tasso 2% annuo
                    </p>
                  </div>
                )}
              </div>

              {/* Financial Information */}
              <div>
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Situazione Finanziaria
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <option value="dipendente-tempo-indeterminato">
                        Dipendente Tempo Indeterminato
                      </option>
                      <option value="dipendente-tempo-determinato">
                        Dipendente Tempo Determinato
                      </option>
                      <option value="lavoratore-autonomo">
                        Lavoratore Autonomo
                      </option>
                      <option value="libero-professionista">
                        Libero Professionista
                      </option>
                      <option value="imprenditore">Imprenditore</option>
                      <option value="pensionato">Pensionato</option>
                      <option value="altro">Altro</option>
                    </select>
                  </div>

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
                </div>
              </div>

              {/* Additional Message */}
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

              {/* Consent */}
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
                    Accetto la{" "}
                    <a
                      href="/privacy-policy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    e i{" "}
                    <a
                      href="/termini-condizioni"
                      className="text-primary hover:underline"
                    >
                      Termini e Condizioni
                    </a>{" "}
                    *
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
                    Acconsento a ricevere comunicazioni commerciali e
                    promozionali
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6">
                <button
                  type="submit"
                  disabled={!formData.consensoPrivacy || isSubmitting}
                  className="w-full md:w-auto px-12 py-4 bg-primary text-white rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting
                    ? "Invio in corso..."
                    : "Invia Richiesta Prestito"}
                </button>
                <p className="text-sm text-gray-500 mt-3">
                  Riceverai una risposta entro 24 ore lavorative
                </p>
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
    </>
  );
};

export default RichiestaPrestito;
