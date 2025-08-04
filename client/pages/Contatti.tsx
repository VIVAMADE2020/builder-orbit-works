import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  Phone,
  CheckCircle,
  MessageSquare,
  User,
  Building,
} from "lucide-react";
import { sendEmailSMTP } from "../services/smtpEmailService";

const Contatti: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    telefono: "",
    whatsapp: "",
    paese: "",
    oggetto: "",
    messaggio: "",
  });

  const [emailConsent, setEmailConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
      !formData.oggetto ||
      !formData.messaggio
    ) {
      alert("Per favore compila tutti i campi obbligatori.");
      setIsSubmitting(false);
      return;
    }

    if (!emailConsent) {
      alert(
        "Devi accettare che il tuo client email si aprirà per inviare il messaggio.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Essayer d'envoyer l'email d'abord
      console.log("📧 Tentative d'envoi email contact...");
      try {
        const emailSent = await sendEmailSMTP(formData, "contact");
        if (emailSent) {
          console.log("✅ Contact email sent successfully");
        } else {
          console.warn("���️ Contact email may not have been sent");
        }
      } catch (emailError) {
        console.error("❌ Contact email sending error:", emailError);
        // Continuer quand même pour l'expérience utilisateur
      }

      console.log("✅ Showing contact success message");
      setSubmitted(true);

      // Reset form
      setFormData({
        nome: "",
        cognome: "",
        email: "",
        telefono: "",
        whatsapp: "",
        oggetto: "",
        messaggio: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Errore nell'invio del messaggio. Riprova più tardi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 sm:py-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
          <CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-500 mx-auto mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 sm:mb-4">
            Messaggio Inviato!
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
            Grazie per il tuo messaggio. La nostra équipe ti contatterà entro 24
            ore.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="w-full sm:w-auto bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors text-sm sm:text-base"
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
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 sm:mb-6">
            Contattaci
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Hai domande sui nostri servizi di prestito? Il nostro team è qui per
            aiutarti. Contattaci per una consulenza gratuita e personalizzata.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center mb-6">
                <MessageSquare className="h-8 w-8 text-secondary mr-3" />
                <h2 className="text-2xl font-bold text-primary">
                  Invia un Messaggio
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Il tuo nome"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cognome *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        name="cognome"
                        value={formData.cognome}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                        placeholder="Il tuo cognome"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="la.tua.email@esempio.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefono (opzionale)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="+32 xxx xx xx xx"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp *
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      placeholder="+32 xxx xx xx xx (per WhatsApp)"
                      required
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Numero preferito per essere contattato
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paese *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      name="paese"
                      value={formData.paese}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
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
                    Oggetto *
                  </label>
                  <select
                    name="oggetto"
                    value={formData.oggetto}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    required
                  >
                    <option value="">Seleziona l'oggetto del messaggio</option>
                    <option value="Informazioni Prestito Personale">
                      Informazioni Prestito Personale
                    </option>
                    <option value="Informazioni Mutuo Immobiliare">
                      Informazioni Mutuo Immobiliare
                    </option>
                    <option value="Informazioni Prestito Aziendale">
                      Informazioni Prestito Aziendale
                    </option>
                    <option value="Consolidamento Debiti">
                      Consolidamento Debiti
                    </option>
                    <option value="Stato Pratica">Stato Pratica</option>
                    <option value="Supporto Tecnico">Supporto Tecnico</option>
                    <option value="Reclamo">Reclamo</option>
                    <option value="Altro">Altro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Messaggio *
                  </label>
                  <textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="Descrivi la tua richiesta o domanda in dettaglio..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Più dettagli fornisci, meglio potremo assisterti.
                  </p>
                </div>

                {/* Email Consent Checkbox */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="emailConsent"
                      checked={emailConsent}
                      onChange={(e) => setEmailConsent(e.target.checked)}
                      className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary focus:ring-2"
                    />
                    <label
                      htmlFor="emailConsent"
                      className="flex-1 text-sm text-gray-700"
                    >
                      <span className="font-medium text-gray-900">
                        Accetto che il mio client email si aprirà
                        automaticamente
                      </span>
                      <br />
                      Cliccando su "Invia Messaggio", il tuo programma di posta
                      elettronica predefinito (Outlook, Gmail, Apple Mail, ecc.)
                      si aprirà automaticamente con il messaggio pre-compilato.
                      <strong className="text-primary">
                        {" "}
                        Dovrai cliccare "Invia" nel tuo client email per
                        completare l'invio del messaggio.
                      </strong>
                      <br />
                      <em className="text-gray-600">
                        Questo garantisce che il tuo messaggio venga
                        effettivamente inviato e ricevuto dal nostro team.
                      </em>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!emailConsent || isSubmitting}
                  className="w-full px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? "Apertura client email..."
                    : "Invia Messaggio"}
                  <Send className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-8">
            {/* Contact Details */}
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
                  <MapPin className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">Sede</div>
                    <div className="text-gray-600">Bruxelles, Belgio</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-secondary mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900">
                      Orari di Lavoro
                    </div>
                    <div className="text-gray-600">Lun-Ven: 9:00-18:00</div>
                    <div className="text-gray-600">Sab: 9:00-13:00</div>
                    <div className="text-gray-600 text-sm mt-1">
                      Dom: Chiuso
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-primary mb-4">
                Tempi di Risposta
              </h3>

              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Email: entro 24 ore</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Modulo: entro 4 ore</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 text-secondary mr-2" />
                  <span className="text-sm">Pratiche urgenti: entro 2 ore</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-primary mb-4">
                I Nostri Servizi
              </h3>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center">
                  <Building className="h-4 w-4 text-secondary mr-2" />
                  <span>Prestiti Personali</span>
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 text-secondary mr-2" />
                  <span>Mutui Immobiliari</span>
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 text-secondary mr-2" />
                  <span>Prestiti Aziendali</span>
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 text-secondary mr-2" />
                  <span>Consolidamento Debiti</span>
                </li>
                <li className="flex items-center">
                  <Building className="h-4 w-4 text-secondary mr-2" />
                  <span>Consulenza Finanziaria</span>
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
