import React from 'react';

const TerminiCondizioni: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-primary mb-8">Termini e Condizioni</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Ultimo aggiornamento: {new Date().toLocaleDateString('it-IT')}
          </p>
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">1. Accettazione dei Termini</h2>
            <p className="text-gray-700 leading-relaxed">
              Utilizzando i servizi di Soluzione Rapida, accetti di essere vincolato da questi 
              termini e condizioni. Se non accetti questi termini, non utilizzare i nostri servizi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">2. Servizi Offerti</h2>
            <p className="text-gray-700 leading-relaxed">
              Soluzione Rapida offre servizi di intermediazione finanziaria per prestiti personali, 
              aziendali e altri prodotti di credito. Tutti i prestiti sono soggetti ad approvazione 
              e verifica creditizia.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">3. Condizioni Generali per i Prestiti</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>Avere almeno 18 anni</li>
              <li>Essere finanziariamente stabili</li>
              <li>Avere redditi stabili</li>
              <li>Residenza in Italia, Germania, Slovacchia o Belgio</li>
              <li>Documentazione completa e veritiera</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">4. Tassi e Commissioni</h2>
            <p className="text-gray-700 leading-relaxed">
              Il tasso di interesse applicato è del 2% annuo fisso per tutti i prestiti. 
              Non applichiamo commissioni di istruttoria, gestione o penali per rimborso anticipato.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">5. Responsabilità</h2>
            <p className="text-gray-700 leading-relaxed">
              Il cliente è responsabile della veridicità delle informazioni fornite e 
              del rispetto dei termini di rimborso concordati.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">6. Modifiche ai Termini</h2>
            <p className="text-gray-700 leading-relaxed">
              Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
              Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">7. Contatti</h2>
            <p className="text-gray-700 leading-relaxed">
              Per domande riguardo questi termini e condizioni, contattaci a:
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

export default TerminiCondizioni;
