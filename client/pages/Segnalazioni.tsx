import React from 'react';

const Segnalazioni: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Segnalazioni</h1>
        
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Come Segnalare un Problema</h2>
            <p className="text-gray-700 leading-relaxed">
              Se hai riscontrato problemi con i nostri servizi o desideri fare una segnalazione, 
              puoi contattarci attraverso i seguenti canali:
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Tipi di Segnalazioni</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Problemi tecnici con il sito web</li>
              <li>Questioni relative ai prestiti</li>
              <li>Reclami sul servizio clienti</li>
              <li>Segnalazioni di sicurezza</li>
              <li>Suggerimenti per miglioramenti</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Processo di Gestione</h2>
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">1. Ricezione</h4>
                <p className="text-gray-700">Tutte le segnalazioni vengono ricevute e registrate entro 24 ore.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">2. Analisi</h4>
                <p className="text-gray-700">Il nostro team analizza la segnalazione e verifica i dettagli.</p>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-primary mb-2">3. Risoluzione</h4>
                <p className="text-gray-700">Implementiamo le azioni correttive necessarie e ti informiamo dell'esito.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Tempi di Risposta</h2>
            <p className="text-gray-700 leading-relaxed">
              Ci impegniamo a rispondere a tutte le segnalazioni entro 48 ore lavorative. 
              Per questioni urgenti, contattaci direttamente via email.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Contatti</h2>
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                <strong>Email per Segnalazioni:</strong> contatto@soluzionerapida.com
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Oggetto Email:</strong> [SEGNALAZIONE] - Descrizione breve del problema
              </p>
              <p className="text-gray-700">
                <strong>Informazioni da includere:</strong>
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Nome e cognome</li>
                <li>Data e ora del problema</li>
                <li>Descrizione dettagliata</li>
                <li>Screenshot se applicabile</li>
                <li>Numero di pratica (se disponibile)</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Segnalazioni;
