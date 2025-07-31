import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Clock, TrendingUp, Users, CheckCircle, Star, Quote, ChevronRight, Euro, Calendar, Calculator } from 'lucide-react';
import HeroCarousel from '../components/HeroCarousel';
import LoanCalculator from '../components/LoanCalculator';

const Index: React.FC = () => {
  const [visibleSection, setVisibleSection] = useState('');
  const [reviewIndex, setReviewIndex] = useState(0);

  const loanTypes = [
    {
      title: 'Prestito Personale',
      description: 'Finanziamenti personalizzati per le tue esigenze quotidiane',
      image: 'https://images.pexels.com/photos/5816286/pexels-photo-5816286.jpeg',
      path: '/prestito-personale',
      features: ['Importi da €5.000 a €75.000', 'Durata fino a 240 mesi', 'Tasso fisso 2%']
    },
    {
      title: 'Prestito Aziendale',
      description: 'Soluzioni di finanziamento per far crescere la tua impresa',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      path: '/prestito-aziendale',
      features: ['Importi da €10.000 a €500.000', 'Tempi di erogazione rapidi', 'Consulenza dedicata']
    },
    {
      title: 'Mutuo Immobiliare',
      description: 'Realizza il sogno della casa con i nostri mutui vantaggiosi',
      image: 'https://images.pexels.com/photos/7415122/pexels-photo-7415122.jpeg',
      path: '/mutuo-immobiliare',
      features: ['Fino al 100% del valore', 'Tassi competitivi', 'Consulenza gratuita']
    },
    {
      title: 'Prestito Auto',
      description: 'Finanzia il tuo veicolo dei sogni con condizioni vantaggiose',
      image: 'https://images.pexels.com/photos/7144259/pexels-photo-7144259.jpeg',
      path: '/prestito-auto',
      features: ['Auto nuove e usate', 'Pratiche veloci', 'Tassi agevolati']
    }
  ];

  const reviews = [
    { name: 'Marco Rossi', location: 'Milano, Italia', rating: 5, text: 'Servizio eccellente! Ho ottenuto il prestito in tempi record. Consigliato!', avatar: '🇮🇹' },
    { name: 'Anna Schmidt', location: 'Berlino, Germania', rating: 5, text: 'Professionalità e competenza. Ottimo supporto durante tutto il processo.', avatar: '🇩🇪' },
    { name: 'Lucia Bianchi', location: 'Roma, Italia', rating: 5, text: 'Finalmente una società seria che mantiene le promesse. Grazie!', avatar: '🇮🇹' },
    { name: 'Hans Müller', location: 'Monaco, Germania', rating: 4, text: 'Processo veloce e trasparente. Molto soddisfatto del servizio ricevuto.', avatar: '🇩🇪' },
    { name: 'Jana Novakova', location: 'Bratislava, Slovacchia', rating: 5, text: 'Personale gentile e disponibile. Prestito approvato in 24 ore!', avatar: '🇸🇰' },
    { name: 'Giuseppe Verde', location: 'Napoli, Italia', rating: 5, text: 'Tassi davvero competitivi. Consiglio a tutti!', avatar: '🇮🇹' },
    { name: 'Sofia Weber', location: 'Amburgo, Germania', rating: 5, text: 'Esperienza fantastica dall\'inizio alla fine. Altamente raccomandato.', avatar: '🇩🇪' },
    { name: 'Peter Novak', location: 'Kosice, Slovacchia', rating: 4, text: 'Servizio clienti eccezionale. Hanno risolto ogni mio dubbio.', avatar: '🇸🇰' },
    { name: 'Francesca Romano', location: 'Torino, Italia', rating: 5, text: 'Rapidità e professionalità. Non potevo chiedere di meglio!', avatar: '🇮🇹' },
    { name: 'Thomas Klein', location: 'Colonia, Germania', rating: 5, text: 'Processo digitale semplice e sicuro. Molto soddisfatto!', avatar: '🇩🇪' }
  ];

  const teamMembers = [
    {
      name: 'Alessandro Conti',
      role: 'Direttore Generale',
      icon: <Building className="h-16 w-16 text-secondary" />,
      experience: '15+ anni nel settore finanziario'
    },
    {
      name: 'Maria Alberti',
      role: 'Responsabile Crediti',
      icon: <TrendingUp className="h-16 w-16 text-secondary" />,
      experience: '12+ anni in analisi creditizia'
    },
    {
      name: 'Roberto Ferri',
      role: 'Consulente Senior',
      icon: <Users className="h-16 w-16 text-secondary" />,
      experience: '10+ anni in consulenza finanziaria'
    }
  ];

  const partners = [
    { name: 'Banca Intesa', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNkYzI2MjYiIHJ4PSI0Ii8+PHRleHQgeD0iNTAiIHk9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIj5JbnRlc2E8L3RleHQ+PC9zdmc+' },
    { name: 'UniCredit', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNlNzNjN2UiIHJ4PSI0Ii8+PHRleHQgeD0iNTAiIHk9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMiIgZm9udC1mYW1pbHk9IkFyaWFsIj5VbmlDcmVkaXQ8L3RleHQ+PC9zdmc+' },
    { name: 'Banco BPM', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMyZDc0YWUiIHJ4PSI0Ii8+PHRleHQgeD0iNTAiIHk9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMCIgZm9udC1mYW1pbHk9IkFyaWFsIj5CYW5jbyBCUE08L3RleHQ+PC9zdmc+' },
    { name: 'Deutsche Bank', logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMTAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiMwMDE4YTgiIHJ4PSI0Ii8+PHRleHQgeD0iNTAiIHk9IjI0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI5IiBmb250LWZhbWlseT0iQXJpYWwiPkRldXRzY2hlIEJhbms8L3RleHQ+PC9zdmc+' }
  ];

  useEffect(() => {
    const reviewTimer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 4000);

    return () => clearInterval(reviewTimer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSection(entry.target.id);
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroCarousel />

      {/* Services Section */}
      <section id="servizi" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">I Nostri Servizi</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Soluzioni finanziarie su misura per ogni tua esigenza
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {loanTypes.map((loan, index) => (
              <div 
                key={index}
                className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={loan.image} 
                    alt={loan.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-all duration-300"></div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{loan.title}</h3>
                  <p className="text-gray-600 mb-4">{loan.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {loan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-secondary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    to={loan.path}
                    className="inline-flex items-center text-primary font-semibold hover:text-secondary transition-colors"
                  >
                    Scopri di più
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calcolatore" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <LoanCalculator />
        </div>
      </section>

      {/* Stats Section */}
      <section id="risultati" className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">I Nostri Risultati</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Numeri che parlano della nostra esperienza e affidabilità
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <TrendingUp className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">€15M+</div>
              <div className="text-gray-300">Prestiti Erogati</div>
            </div>

            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <Users className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">8.500+</div>
              <div className="text-gray-300">Clienti Soddisfatti</div>
            </div>

            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <CheckCircle className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-gray-300">Tasso Approvazione</div>
            </div>

            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary rounded-full mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <div className="text-4xl font-bold mb-2">24h</div>
              <div className="text-gray-300">Approvazione Media</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="recensioni" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Testimonianze reali dai nostri clienti in tutta Europa
            </p>
          </div>

          <div className="relative h-80 overflow-hidden">
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ${
                  index === reviewIndex ? 'opacity-100 transform translate-y-0' : 
                  index === (reviewIndex - 1 + reviews.length) % reviews.length ? 'opacity-0 transform -translate-y-full' :
                  'opacity-0 transform translate-y-full'
                }`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center mb-6">
                    <Quote className="h-12 w-12 text-secondary" />
                  </div>
                  
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    
                    <p className="text-xl text-gray-700 mb-6 italic">"{review.text}"</p>
                    
                    <div className="flex items-center justify-center space-x-3">
                      <span className="text-2xl">{review.avatar}</span>
                      <div>
                        <div className="font-semibold text-primary">{review.name}</div>
                        <div className="text-sm text-gray-500">{review.location}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {reviews.slice(0, 10).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === reviewIndex % 10 ? 'bg-primary w-8' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Il Nostro Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professionisti esperti al vostro servizio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute inset-0 w-48 h-48 mx-auto rounded-full bg-primary/20 group-hover:bg-primary/30 transition-all duration-300"></div>
                </div>
                
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-secondary font-semibold mb-2">{member.role}</p>
                <p className="text-gray-600">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section id="partner" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">I Nostri Partner</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Collaboriamo con le principali istituzioni finanziarie
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {partners.map((partner, index) => (
              <div key={index} className="flex justify-center">
                <img 
                  src={partner.logo} 
                  alt={partner.name}
                  className="h-16 opacity-60 hover:opacity-100 transition-opacity duration-300 filter grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto a Realizzare i Tuoi Progetti?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Richiedi subito il tuo prestito personalizzato. Processo veloce, sicuro e trasparente.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contatti"
              className="bg-white text-secondary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              Richiedi Prestito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="/calcolatore"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-secondary transition-all inline-flex items-center justify-center"
            >
              <Calculator className="mr-2 h-5 w-5" />
              Calcolatore
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
