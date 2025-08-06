import React, { useState } from "react";
import { Send, AlertTriangle, CheckCircle, Clock, Mail } from "lucide-react";
import { sendFormSubmitEmail } from "../services/formSubmitService";
import CongratulationsPopup from "../components/CongratulationsPopup";

const Segnalazioni: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    whatsapp: "",
    paese: "",
    tipoSegnalazione: "",
    oggetto: "",
    messaggio: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validation des champs obligatoires
    if (
      !formData.nome ||
      !formData.cognome ||
      !formData.email ||
      !formData.whatsapp ||
      !formData.paese ||
      !formData.tipoSegnalazione ||
      !formData.oggetto ||
      !formData.messaggio
    ) {
      alert("Per favore compila tutti i campi obbligatori.");
      setIsSubmitting(false);
      return;
    }

    try {
      const success = await sendFormSubmitEmail(formData, "segnalazione");
      if (success) {
        console.log("✅ Segnalazione sent successfully, showing congratulations");
        setShowCongratulations(true);
        setShowCongratulations(true);
        // Reset form
        setFormData({
          nome: "",
          cognome: "",
          email: "",
          telefono: "",
          whatsapp: "",
          paese: "",
          tipoSegnalazione: "",
          oggetto: "",
          messaggio: "",
        });
      } else {
        alert("Errore nell'invio della segnalazione. Riprova più tardi.");
      }
    } catch (error) {
      alert("Errore nell'invio della segnalazione. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-20 flex items-center justify-center">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-primary mb-4">
            Segnalazione Inviata!
          </h2>
          <p className="text-gray-600 mb-6">
            Grazie per la tua segnalazione. La nostra équipe ti contatterà entro
            24 ore per gestire la tua richiesta.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
          >
            Invia un'altra segnalazione
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
        title="Segnalazione Inviata!"
        message="Complimenti! La tua segnalazione è stata inviata con successo. La nostra équipe ti contatterà entro 24 ore per gestire la tua richiesta."
      />

      <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary mb-4">Segnalazioni</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hai riscontrato un problema o vuoi fare una segnalazione? Compila il
            modulo e ti contatteremo entro 24 ore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">
                Modulo di Segnalazione
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      placeholder="+32 xxx xx xx xx (per WhatsApp)"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
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
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      required
                    >
                      <option value="">Seleziona paese</option>
                      <option value="AD">Andorra</option>
                      <option value="AL">Albania</option>
                      <option value="AT">Austria</option>
                      <option value="BA">Bosnia ed Erzegovina</option>
                      <option value="BE">Belgio</option>
                      <option value="BG">Bulgaria</option>
                      <option value="BY">Bielorussia</option>
                      <option value="CH">Svizzera</option>
                      <option value="CY">Cipro</option>
                      <option value="CZ">Repubblica Ceca</option>
                      <option value="DE">Germania</option>
                      <option value="DK">Danimarca</option>
                      <option value="EE">Estonia</option>
                      <option value="ES">Spagna</option>
                      <option value="FI">Finlandia</option>
                      <option value="FR">Francia</option>
                      <option value="GB">Regno Unito</option>
                      <option value="GR">Grecia</option>
                      <option value="HR">Croazia</option>
                      <option value="HU">Ungheria</option>
                      <option value="IE">Irlanda</option>
                      <option value="IS">Islanda</option>
                      <option value="IT">Italia</option>
                      <option value="LI">Liechtenstein</option>
                      <option value="LT">Lituania</option>
                      <option value="LU">Lussemburgo</option>
                      <option value="LV">Lettonia</option>
                      <option value="MC">Monaco</option>
                      <option value="MD">Moldavia</option>
                      <option value="ME">Montenegro</option>
                      <option value="MK">Macedonia del Nord</option>
                      <option value="MT">Malta</option>
                      <option value="NL">Paesi Bassi</option>
                      <option value="NO">Norvegia</option>
                      <option value="PL">Polonia</option>
                      <option value="PT">Portogallo</option>
                      <option value="RO">Romania</option>
                      <option value="RS">Serbia</option>
                      <option value="RU">Russia</option>
                      <option value="SE">Svezia</option>
                      <option value="SI">Slovenia</option>
                      <option value="SK">Slovacchia</option>
                      <option value="SM">San Marino</option>
                      <option value="UA">Ucraina</option>
                      <option value="VA">Città del Vaticano</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo di Segnalazione *
                  </label>
                  <select
                    name="tipoSegnalazione"
                    value={formData.tipoSegnalazione}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    required
                  >
                    <option value="">Seleziona il tipo di segnalazione</option>
                    <option value="problema-tecnico">Problema Tecnico</option>
                    <option value="questione-prestito">
                      Questione relativa ai Prestiti
                    </option>
                    <option value="reclamo-servizio">
                      Reclamo Servizio Clienti
                    </option>
                    <option value="segnalazione-sicurezza">
                      Segnalazione di Sicurezza
                    </option>
                    <option value="suggerimento">
                      Suggerimento per Miglioramenti
                    </option>
                    <option value="altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Oggetto *
                  </label>
                  <input
                    type="text"
                    name="oggetto"
                    value={formData.oggetto}
                    onChange={handleInputChange}
                    placeholder="Breve descrizione del problema"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrizione dettagliata *
                  </label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    placeholder="Descrivi nel dettaglio il problema riscontrato o la tua segnalazione..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  <Send className="mr-2 h-5 w-5" />
                  {isSubmitting ? "Invio in corso..." : "Invia Segnalazione"}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-primary mb-6">
                Informazioni di Contatto
              </h3>

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
                  <Clock className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Tempi di Risposta
                    </div>
                    <div className="text-gray-600">Entro 24 ore lavorative</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Types of Reports */}
            <div className="bg-primary text-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4">Tipi di Segnalazioni</h3>

              <div className="space-y-3">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Problemi Tecnici</div>
                    <div className="text-gray-200 text-sm">
                      Malfunzionamenti del sito
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Questioni Prestiti</div>
                    <div className="text-gray-200 text-sm">
                      Problemi con i finanziamenti
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Servizio Clienti</div>
                    <div className="text-gray-200 text-sm">
                      Reclami sul servizio
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Sicurezza</div>
                    <div className="text-gray-200 text-sm">
                      Segnalazioni di sicurezza
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Process Info */}
            <div className="bg-gradient-to-r from-secondary/10 to-primary/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-4">
                Come Gestiamo le Segnalazioni
              </h3>

              <ol className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    1
                  </span>
                  <span>Riceviamo la tua segnalazione</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    2
                  </span>
                  <span>Analisi entro 24 ore</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    3
                  </span>
                  <span>Ti contatteremo con una soluzione</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                    4
                  </span>
                  <span>Risoluzione del problema</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Segnalazioni;
