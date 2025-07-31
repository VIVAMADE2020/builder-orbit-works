import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, CheckCircle, TrendingUp, Users, Clock } from 'lucide-react';

const HeroCarousel: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTypewriting, setIsTypewriting] = useState(false);

  const slides = [
    {
      image: 'https://images.pexels.com/photos/7841821/pexels-photo-7841821.jpeg',
      title: 'Prestiti Veloci e Sicuri',
      subtitle: 'La soluzione rapida per le tue esigenze finanziarie',
      description: 'Ottieni il prestito che meriti con tassi competitivi e approvazione rapida. Siamo qui per aiutarti a realizzare i tuoi progetti.',
      cta: 'Richiedi Ora'
    },
    {
      image: 'https://images.pexels.com/photos/8293768/pexels-photo-8293768.jpeg',
      title: 'Prestiti Aziendali',
      subtitle: 'Fai crescere la tua attività',
      description: 'Supportiamo le imprese con soluzioni di finanziamento flessibili. Investi nel futuro della tua azienda con i nostri prestiti dedicati.',
      cta: 'Scopri di Più'
    },
    {
      image: 'https://images.pexels.com/photos/7415122/pexels-photo-7415122.jpeg',
      title: 'Mutui Casa',
      subtitle: 'Realizza il sogno della casa propria',
      description: 'Mutui immobiliari con condizioni vantaggiose per acquistare o ristrutturare la tua casa. Il tuo futuro inizia qui.',
      cta: 'Calcola Rata'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setIsTypewriting(true);
    const timer = setTimeout(() => setIsTypewriting(false), 100);
    return () => clearTimeout(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-white space-y-6">
                  <div className="space-y-4">
                    <h1 className={`text-5xl lg:text-6xl font-bold leading-tight ${isTypewriting && index === currentSlide ? 'typewriter' : ''}`}>
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-secondary">
                      {slide.subtitle}
                    </h2>
                    <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
                      {slide.cta}
                    </button>
                    <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary transition-all">
                      Calcolatore Prestito
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold">98%</div>
                      <div className="text-sm text-gray-300">Approvazioni</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold">€2M+</div>
                      <div className="text-sm text-gray-300">Erogati</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold">5.000+</div>
                      <div className="text-sm text-gray-300">Clienti Felici</div>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    <div className="text-center text-white mb-6">
                      <h3 className="text-2xl font-bold mb-2">Calcolo Rapido</h3>
                      <p className="text-gray-200">Scopri subito la tua rata</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Importo</label>
                        <select className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300">
                          <option value="">€10.000</option>
                          <option value="">€20.000</option>
                          <option value="">€50.000</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-white text-sm font-medium mb-2">Durata</label>
                        <select className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white">
                          <option value="">36 mesi</option>
                          <option value="">60 mesi</option>
                          <option value="">120 mesi</option>
                        </select>
                      </div>
                      
                      <button className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors">
                        Calcola Rata
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-secondary scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes typewriter {
          from { width: 0; }
          to { width: 100%; }
        }
        
        .typewriter {
          overflow: hidden;
          white-space: nowrap;
          animation: typewriter 2s steps(40, end);
        }
      `}</style>
    </div>
  );
};

export default HeroCarousel;
