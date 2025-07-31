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
    <div className="relative h-screen overflow-hidden bg-white">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="relative z-10 h-full flex items-center bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-gray-900 space-y-6 order-2 lg:order-1">
                  <div className="space-y-4">
                    <h1 className={`text-5xl lg:text-6xl font-bold leading-tight text-primary ${isTypewriting && index === currentSlide ? 'typewriter' : ''}`}>
                      {slide.title}
                    </h1>
                    <h2 className="text-2xl lg:text-3xl font-semibold text-secondary">
                      {slide.subtitle}
                    </h2>
                    <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all transform hover:scale-105 shadow-lg">
                      {slide.cta}
                    </button>
                    <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary hover:text-white transition-all">
                      Calcolatore Prestito
                    </button>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-6 pt-8">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <CheckCircle className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">98%</div>
                      <div className="text-sm text-gray-600">Approvazioni</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">€15M+</div>
                      <div className="text-sm text-gray-600">Erogati</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-8 w-8 text-secondary" />
                      </div>
                      <div className="text-3xl font-bold text-primary">8.500+</div>
                      <div className="text-sm text-gray-600">Clienti Felici</div>
                    </div>
                  </div>
                </div>

                {/* Image Content */}
                <div className="order-1 lg:order-2">
                  <div className="relative">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-80 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-full"></div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary/20 rounded-full"></div>
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
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-all shadow-lg"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-primary text-white p-3 rounded-full hover:bg-primary/90 transition-all shadow-lg"
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
              index === currentSlide ? 'bg-secondary scale-125' : 'bg-gray-300'
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
