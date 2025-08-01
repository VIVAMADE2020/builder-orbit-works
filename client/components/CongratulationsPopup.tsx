import React from "react";
import { CheckCircle, X } from "lucide-react";

interface CongratulationsPopupProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const CongratulationsPopup: React.FC<CongratulationsPopupProps> = ({
  isVisible,
  onClose,
  title = "Demanda Inviata con Successo!",
  message = "Grazie per la tua richiesta. La nostra équipe ti contatterà entro 24 ore con una proposta personalizzata.",
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative animate-fade-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
              <div className="absolute inset-0 bg-green-100 rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>

          {/* Message */}
          <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

          {/* Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="text-sm text-green-700 space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Risposta garantita entro 24 ore</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Tasso fisso 2% senza sorprese</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Consulenza gratuita e personalizzata</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Perfetto, Grazie!
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CongratulationsPopup;
