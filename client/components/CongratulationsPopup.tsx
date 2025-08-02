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
  console.log("🎉 CongratulationsPopup rendered with isVisible:", isVisible);
  if (!isVisible) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-auto relative animate-fade-in overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="p-6 sm:p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto mb-6">
            <div className="relative">
              <CheckCircle className="h-20 w-20 text-green-500 mx-auto" />
              <div className="absolute inset-0 bg-green-100 rounded-full -z-10 animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">{title}</h2>

          {/* Message */}
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 leading-relaxed">{message}</p>

          {/* Features */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="text-xs sm:text-sm text-green-700 space-y-2">
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Risposta garantita entro 24 ore</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Tasso fisso 2% senza sorprese</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>Consulenza gratuita e personalizzata</span>
              </div>
            </div>
          </div>

          {/* Action button */}
          <button
            onClick={onClose}
            className="w-full bg-primary text-white py-3 sm:py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm sm:text-base"
          >
            Perfetto, Grazie!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CongratulationsPopup;
