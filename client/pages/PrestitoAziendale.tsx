import React from "react";
import {
  CheckCircle,
  TrendingUp,
  Users,
  Building,
  PieChart,
  Clock,
  Shield,
  Euro,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoanCalculator from "../components/LoanCalculator";

const PrestitoAziendale: React.FC = () => {
  const navigate = useNavigate();
  const features = [
    "Importi fino a €500.000",
    "Durata da 6 a 240 mesi",
    "Tasso fisso 2% annuo",
    "Nessuna garanzia richiesta fino a €50.000",
    "Approvazione in 24-48 ore",
    "Consulenza dedicata inclusa",
  ];

  const benefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-secondary" />,
      title: "Crescita Aziendale",
      description:
        "Investi nella crescita della tua azienda con capitale di lavoro immediato",
    },
    {
      icon: <Clock className="h-12 w-12 text-secondary" />,
      title: "Liquidità Rapida",
      description:
        "Ottieni liquidità velocemente per cogliere le opportunità di mercato",
    },
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: "Flessibilità",
      description:
        "Piani di rimborso personalizzati in base al tuo ciclo di cassa",
    },
    {
      icon: <Users className="h-12 w-12 text-secondary" />,
      title: "Supporto Dedicato",
      description: "Account manager dedicato per seguire la tua pratica",
    },
  ];

  const useCases = [
    {
      icon: <Building className="h-8 w-8 text-secondary" />,
      title: "Espansione",
      description:
        "Apertura nuove sedi, assunzione personale, ampliamento locali",
    },
    {
      icon: <PieChart className="h-8 w-8 text-secondary" />,
      title: "Capitale di Giro",
      description:
        "Gestione flussi di cassa, pagamento fornitori, scorte magazzino",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-secondary" />,
      title: "Investimenti",
      description: "Acquisto macchinari, tecnologie, veicoli commerciali",
    },
    {
      icon: <Users className="h-8 w-8 text-secondary" />,
      title: "Ristrutturazione",
      description: "Consolidamento debiti, riorganizzazione finanziaria",
    },
  ];

  const requirements = [
    "Azienda attiva da almeno 2 anni",
    "Fatturato annuo minimo €30.000",
    "Sede operativa in Italia, Germania, Slovacchia o Belgio",
    "Bilanci degli ultimi 2 anni",
    "Estratti conto aziendali recenti",
    "Visura camerale aggiornata",
  ];

  const steps = [
    {
      number: "01",
      title: "Richiesta",
      description: "Compila il modulo online con i dati della tua azienda",
    },
    {
      number: "02",
      title: "Valutazione",
      description: "I nostri esperti analizzano la situazione finanziaria",
    },
    {
      number: "03",
      title: "Approvazione",
      description: "Ricevi la risposta entro 24-48 ore lavorative",
    },
    {
      number: "04",
      title: "Erogazione",
      description: "I fondi vengono trasferiti sul conto aziendale",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Prestito Aziendale
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Finanzia la crescita della tua azienda con i nostri prestiti
                aziendali su misura. Capitale di lavoro, investimenti,
                espansioni: realizziamo insieme i tuoi progetti imprenditoriali.
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
                  onClick={() => navigate("/richiesta-prestito")}
                  className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors"
                >
                  Richiedi Preventivo
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <img
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                  alt="Prestito Aziendale"
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
              Perché Scegliere il Nostro Prestito Aziendale
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Vantaggi concreti per far crescere la tua impresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-6">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-primary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Per Cosa Puoi Usare il Prestito
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Infinite possibilità per far crescere la tua azienda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {useCase.icon}
                  <h3 className="text-lg font-bold text-primary ml-3">
                    {useCase.title}
                  </h3>
                </div>
                <p className="text-gray-600">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-primary mb-6">
                Requisiti per la Richiesta
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Requisiti semplici e chiari per accedere al nostro prestito
                aziendale
              </p>

              <div className="space-y-4">
                {requirements.map((requirement, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-secondary mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 text-lg">{requirement}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl">
                <h4 className="font-bold text-primary mb-2">
                  💡 Consiglio dell'Esperto
                </h4>
                <p className="text-gray-700">
                  Prepara tutta la documentazione in anticipo per velocizzare il
                  processo di approvazione. Il nostro team ti assisterà nella
                  preparazione dei documenti necessari.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-6 text-center">
                Calcola la Tua Rata Aziendale
              </h3>
              <LoanCalculator variant="compact" />
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
              4 semplici passi per ottenere il finanziamento della tua azienda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-white">
                      {step.number}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-secondary/50 z-0 transform translate-x-8"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Calcolatore Prestito Aziendale
            </h2>
            <p className="text-xl text-gray-600">
              Scopri subito l'importo e la rata perfetti per la tua azienda
            </p>
          </div>

          <LoanCalculator />
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">
              Storie di Successo
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Aziende che hanno realizzato i loro progetti con il nostro
              supporto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">🏭</div>
              <h4 className="text-xl font-bold text-primary mb-3">
                Manifattura Italiana SRL
              </h4>
              <p className="text-gray-600 mb-4">
                "Grazie al prestito di €150.000 abbiamo acquistato nuovi
                macchinari e aumentato la produzione del 40%."
              </p>
              <div className="text-sm text-secondary font-semibold">
                Milano, Italia
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">���</div>
              <h4 className="text-xl font-bold text-primary mb-3">
                TechShop GmbH
              </h4>
              <p className="text-gray-600 mb-4">
                "Con €80.000 abbiamo aperto 3 nuovi punti vendita e raddoppiato
                il fatturato in 18 mesi."
              </p>
              <div className="text-sm text-secondary font-semibold">
                Berlino, Germania
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-4xl mb-4">����</div>
              <h4 className="text-xl font-bold text-primary mb-3">
                Ristorante Europa
              </h4>
              <p className="text-gray-600 mb-4">
                "Il prestito di €50.000 ci ha permesso di rinnovare il locale e
                assumere nuovo personale."
              </p>
              <div className="text-sm text-secondary font-semibold">
                Bratislava, Slovacchia
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto a Far Crescere la Tua Azienda?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Parlaci del tuo progetto e scopri come possiamo aiutarti a
            realizzarlo con il nostro prestito aziendale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              <Building className="mr-2 h-5 w-5" />
              Richiedi Prestito Aziendale
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center">
              <Users className="mr-2 h-5 w-5" />
              Consulenza Gratuita
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrestitoAziendale;
