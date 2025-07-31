import React, { useState, useEffect } from 'react';
import { CheckCircle, TrendingUp, Users, Award, Shield, Clock } from 'lucide-react';

const ChiSiamo: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const timelineItems = [
    {
      year: '2011',
      title: 'Fondazione',
      description: 'Nasce Soluzione Rapida a Bruxelles con la missione di democratizzare l\'accesso al credito.'
    },
    {
      year: '2013',
      title: 'Primo Milione',
      description: 'Raggiungiamo il primo milione di euro erogati, servendo oltre 200 clienti.'
    },
    {
      year: '2015',
      title: 'Espansione Europa',
      description: 'Estendiamo i nostri servizi in Germania e Slovacchia, ampliando il team.'
    },
    {
      year: '2017',
      title: 'Innovazione Digitale',
      description: 'Lanciamo la piattaforma digitale per richieste online e approvazioni rapide.'
    },
    {
      year: '2019',
      title: 'Certificazioni',
      description: 'Otteniamo le principali certificazioni di qualità e sicurezza europea.'
    },
    {
      year: '2021',
      title: '10 Milioni Erogati',
      description: 'Superiamo i 10 milioni di euro erogati con oltre 3.000 clienti soddisfatti.'
    },
    {
      year: '2023',
      title: 'Partnership Bancarie',
      description: 'Stringiamo accordi con le principali banche europee per offerte ancora più competitive.'
    },
    {
      year: '2024',
      title: 'Oggi',
      description: 'Oltre 8.500 clienti serviti, 15 milioni erogati e leadership nel settore dei prestiti rapidi.'
    }
  ];

  const values = [
    {
      icon: <Shield className="h-12 w-12 text-secondary" />,
      title: 'Trasparenza',
      description: 'Nessuna commissione nascosta. Ogni costo è chiaramente comunicato fin dall\'inizio.'
    },
    {
      icon: <Clock className="h-12 w-12 text-secondary" />,
      title: 'Rapidità',
      description: 'Approvazione in 24 ore. Perché il tempo è prezioso e i progetti non aspettano.'
    },
    {
      icon: <Users className="h-12 w-12 text-secondary" />,
      title: 'Personalizzazione',
      description: 'Ogni cliente è unico. Adattiamo le nostre soluzioni alle vostre esigenze specifiche.'
    },
    {
      icon: <Award className="h-12 w-12 text-secondary" />,
      title: 'Eccellenza',
      description: 'Standard di qualità elevati in ogni fase del processo, dalla richiesta all\'erogazione.'
    }
  ];

  const stats = [
    { number: '13+', label: 'Anni di Esperienza', description: 'Nel settore finanziario' },
    { number: '8.500+', label: 'Clienti Soddisfatti', description: 'In tutta Europa' },
    { number: '€15M+', label: 'Prestiti Erogati', description: 'Dal 2011 ad oggi' },
    { number: '98%', label: 'Tasso Approvazione', description: 'Delle richieste' }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleItems(prev => [...new Set([...prev, index])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const timelineElements = document.querySelectorAll('.timeline-item');
    timelineElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-primary mb-6">
                Chi Siamo
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Soluzione Rapida è una società finanziaria privata fondata nel 2011 a Bruxelles, 
                specializzata in prestiti personalizzati per privati e aziende. La nostra missione 
                è fornire soluzioni finanziarie rapide, trasparenti e su misura per ogni esigenza.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-primary mb-2">13+</div>
                  <div className="text-sm text-gray-600">Anni di Esperienza</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-secondary mb-2">8.500+</div>
                  <div className="text-sm text-gray-600">Clienti Serviti</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg" 
                alt="Team Soluzione Rapida"
                className="rounded-2xl shadow-xl w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-primary mb-6">La Nostra Missione</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Rendere accessibili le soluzioni finanziarie a chiunque abbia un progetto da realizzare. 
                  Crediamo che ogni persona e ogni azienda meriti di avere accesso a un credito giusto, 
                  trasparente e veloce per costruire il proprio futuro.
                </p>
              </div>
              
              <div>
                <h2 className="text-3xl font-bold text-secondary mb-6">La Nostra Visione</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Essere il punto di riferimento europeo per i prestiti rapidi e personalizzati, 
                  combinando tecnologia avanzata con un approccio umano per offrire la migliore 
                  esperienza finanziaria possibile.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/7414273/pexels-photo-7414273.jpeg" 
                alt="Consulenza finanziaria"
                className="rounded-2xl shadow-xl w-full h-80 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">I Nostri Valori</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Principi che guidano ogni nostra decisione e interazione con i clienti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">La Nostra Storia</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Un percorso di crescita e innovazione dal 2011 ad oggi
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary/20"></div>

            {timelineItems.map((item, index) => (
              <div
                key={index}
                data-index={index}
                className={`timeline-item relative flex items-start mb-12 transition-all duration-700 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 transform translate-x-0' 
                    : 'opacity-0 transform translate-x-8'
                }`}
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center w-16 h-16 bg-primary rounded-full text-white font-bold text-lg shadow-lg">
                  <span className="text-2xl">{item.icon}</span>
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center mb-2">
                      <span className="inline-block bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold mr-3">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">I Nostri Numeri</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Risultati che testimoniano la nostra crescita e la fiducia dei clienti
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center text-white">
                <div className="text-5xl font-bold mb-2 text-secondary">{stat.number}</div>
                <div className="text-xl font-semibold mb-2">{stat.label}</div>
                <div className="text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Unisciti ai Nostri 8.500+ Clienti Soddisfatti
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Scopri perché migliaia di persone in Europa hanno scelto Soluzione Rapida 
            per i loro progetti finanziari.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
              Richiedi Prestito
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all">
              Calcolatore
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChiSiamo;
