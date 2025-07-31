import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Raccolta delle Informazioni</h2>
            <p className="text-gray-700 leading-relaxed">
              Soluzione Rapida raccoglie informazioni personali quando richiedi i nostri servizi, 
              inclusi nome, cognome, indirizzo email, informazioni finanziarie e altri dati necessari 
              per processare la tua richiesta di prestito.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Uso delle Informazioni</h2>
            <p className="text-gray-700 leading-relaxed">
              Le informazioni raccolte vengono utilizzate esclusivamente per:
            </p>
            <ul className="list-disc pl-6 mt-4 text-gray-700">
              <li>Processare le richieste di prestito</li>
              <li>Verificare l'identità e la solvibilità</li>
              <li>Comunicare con i clienti riguardo ai servizi</li>
              <li>Rispettare gli obblighi legali e normativi</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. Protezione dei Dati</h2>
            <p className="text-gray-700 leading-relaxed">
              Implementiamo misure di sicurezza appropriate per proteggere le informazioni personali 
              contro accesso non autorizzato, alterazione, divulgazione o distruzione.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Condivisione con Terzi</h2>
            <p className="text-gray-700 leading-relaxed">
              Non vendiamo, scambiamo o trasmettiamo a terzi le informazioni personali, 
              eccetto quando necessario per fornire i servizi richiesti o quando richiesto dalla legge.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. I Tuoi Diritti</h2>
            <p className="text-gray-700 leading-relaxed">
              In conformità al GDPR, hai il diritto di accedere, correggere, cancellare o limitare 
              l'uso delle tue informazioni personali. Per esercitare questi diritti, contattaci a 
              contatto@soluzionerapida.com.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. Contatti</h2>
            <p className="text-gray-700 leading-relaxed">
              Per domande riguardo questa Privacy Policy, contattaci a:
              <br />
              Email: contatto@soluzionerapida.com
              <br />
              Sede: Bruxelles, Belgio
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
