import React from 'react';

const PrestitoIstantaneo: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl font-bold text-primary mb-6">Prestito Istantaneo</h1>
        <p className="text-xl text-gray-600 mb-8">
          Questa pagina è in fase di sviluppo. Contattaci per maggiori informazioni sui prestiti istantanei.
        </p>
        <button className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
          Contattaci
        </button>
      </div>
    </div>
  );
};

export default PrestitoIstantaneo;
