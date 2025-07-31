import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChiSiamo from "./pages/ChiSiamo";
import Calcolatore from "./pages/Calcolatore";
import FAQ from "./pages/FAQ";
import Contatti from "./pages/Contatti";
import PrestitoPersonale from "./pages/PrestitoPersonale";
import PrestitoAziendale from "./pages/PrestitoAziendale";
import PrestitoIstantaneo from "./pages/PrestitoIstantaneo";
import PrestitoPrivato from "./pages/PrestitoPrivato";
import PrestitoSenzaSchufa from "./pages/PrestitoSenzaSchufa";
import PrestitoAutonomi from "./pages/PrestitoAutonomi";
import MutuoImmobiliare from "./pages/MutuoImmobiliare";
import PrestitoAuto from "./pages/PrestitoAuto";
import ConsolidamentoDebiti from "./pages/ConsolidamentoDebiti";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TerminiCondizioni from "./pages/TerminiCondizioni";
import Segnalazioni from "./pages/Segnalazioni";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/chi-siamo" element={<ChiSiamo />} />
              <Route path="/calcolatore" element={<Calcolatore />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contatti" element={<Contatti />} />
              
              {/* Loan Types */}
              <Route path="/prestito-personale" element={<PrestitoPersonale />} />
              <Route path="/prestito-aziendale" element={<PrestitoAziendale />} />
              <Route path="/prestito-istantaneo" element={<PrestitoIstantaneo />} />
              <Route path="/prestito-privato" element={<PrestitoPrivato />} />
              <Route path="/prestito-senza-schufa" element={<PrestitoSenzaSchufa />} />
              <Route path="/prestito-autonomi" element={<PrestitoAutonomi />} />
              <Route path="/mutuo-immobiliare" element={<MutuoImmobiliare />} />
              <Route path="/prestito-auto" element={<PrestitoAuto />} />
              <Route path="/consolidamento-debiti" element={<ConsolidamentoDebiti />} />
              
              {/* Legal Pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/termini-condizioni" element={<TerminiCondizioni />} />
              <Route path="/segnalazioni" element={<Segnalazioni />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
        {/* Google Translate Script */}
        <div className="gtranslate_wrapper"></div>
        <script 
          dangerouslySetInnerHTML={{
            __html: `
              window.gtranslateSettings = {
                "default_language":"it",
                "languages":["it","sk","de"],
                "wrapper_selector":".gtranslate_wrapper",
                "horizontal_position":"right",
                "vertical_position":"bottom"
              };
            `
          }}
        />
        <script src="https://cdn.gtranslate.net/widgets/latest/popup.js" defer></script>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
