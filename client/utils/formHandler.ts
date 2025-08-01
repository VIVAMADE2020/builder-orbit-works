import { sendEmail } from '../services/emailService';

export const handleFormSubmission = async (
  formData: any,
  formType: string,
  onSuccess?: () => void,
  onError?: (error: string) => void
): Promise<boolean> => {
  try {
    const success = await sendEmail(formData, formType);
    
    if (success) {
      // Show success message
      alert('✅ Demanda inviata con successo! La nostra équipe ti contatterà entro 24 ore.');
      
      if (onSuccess) {
        onSuccess();
      }
      
      return true;
    } else {
      const errorMessage = 'Errore nell\'invio della richiesta. Riprova più tardi.';
      alert('❌ ' + errorMessage);
      
      if (onError) {
        onError(errorMessage);
      }
      
      return false;
    }
  } catch (error) {
    const errorMessage = 'Errore nell\'invio della richiesta. Riprova più tardi.';
    alert('❌ ' + errorMessage);
    
    if (onError) {
      onError(errorMessage);
    }
    
    return false;
  }
};

export const createFormData = (basicData: any, formType: string) => {
  return {
    ...basicData,
    formType,
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent
  };
};
