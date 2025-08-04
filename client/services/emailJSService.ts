import emailjs from '@emailjs/browser';

// Configuration EmailJS
const EMAIL_CONFIG = {
  serviceId: 'gmail', // Ou votre provider SMTP
  templateId: 'template_default',
  publicKey: 'your_public_key_here'
};

interface EmailData {
  [key: string]: any;
}

export const sendEmailDirect = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Sending email directly via EmailJS...");
    console.log("📧 Form type:", formType);
    console.log("📧 Data:", data);

    // Préparer les données pour l'email
    const emailData = {
      to_email: 'contatto@soluzionerapida.com',
      from_name: `${data.nome} ${data.cognome}`,
      from_email: data.email,
      subject: formType === 'loan-request' 
        ? `Nuova Richiesta Prestito - ${data.nome} ${data.cognome}` 
        : `Nuovo Contatto - ${data.oggetto}`,
      message: formatMessage(data, formType),
      timestamp: new Date().toLocaleString('it-IT'),
      whatsapp: data.whatsapp || 'Non fornito',
      telefono: data.telefono || 'Non fornito'
    };

    // Envoyer via EmailJS
    const result = await emailjs.send(
      EMAIL_CONFIG.serviceId,
      EMAIL_CONFIG.templateId,
      emailData,
      EMAIL_CONFIG.publicKey
    );

    console.log("✅ Email sent successfully via EmailJS:", result);
    return true;
  } catch (error) {
    console.error("❌ EmailJS error:", error);
    
    // Fallback: essayer l'envoi SMTP direct
    return await sendEmailSMTPFallback(data, formType);
  }
};

// Format message based on form type
function formatMessage(data: any, formType: string): string {
  if (formType === 'loan-request') {
    return `
RICHIESTA PRESTITO

👤 INFORMAZIONI PERSONALI:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || 'Non fornito'}
WhatsApp: ${data.whatsapp || 'Non fornito'}
Data di Nascita: ${data.dataNascita || 'Non fornita'}
Indirizzo: ${data.indirizzo || 'Non fornito'}
Paese: ${data.paese || 'Non fornito'}

💰 DETTAGLI PRESTITO:
Tipo: ${data.tipoPrestito}
Importo: €${parseInt(data.importo || 0).toLocaleString()}
Durata: ${data.durata} mesi
Motivazione: ${data.motivazione || 'Non specificata'}

${data.calculations ? `
📊 CALCOLI:
Rata Mensile: €${data.calculations.monthlyPayment?.toLocaleString() || 'N/A'}
Totale: €${data.calculations.totalPayment?.toLocaleString() || 'N/A'}
Interessi: €${data.calculations.totalInterest?.toLocaleString() || 'N/A'}
` : ''}

💼 SITUAZIONE FINANZIARIA:
Occupazione: ${data.occupazione}
Reddito Mensile: €${parseInt(data.redditoMensile || 0).toLocaleString()}

💬 MESSAGGI:
${data.messaggio || 'Nessun messaggio aggiuntivo'}

📋 CONSENSI:
Privacy: ${data.consensoPrivacy ? 'Sì' : 'No'}
Marketing: ${data.consensoMarketing ? 'Sì' : 'No'}
    `.trim();
  } else {
    return `
MESSAGGIO DI CONTATTO

👤 MITTENTE:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || 'Non fornito'}
WhatsApp: ${data.whatsapp || 'Non fornito'}

💬 MESSAGGIO:
Oggetto: ${data.oggetto}

${data.messaggio}
    `.trim();
  }
}

// Fallback SMTP direct (simplified)
async function sendEmailSMTPFallback(data: EmailData, formType: string): Promise<boolean> {
  try {
    console.log("🔄 Trying SMTP fallback...");
    
    // Essayer l'endpoint local/développement
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        formType,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      console.log("✅ SMTP fallback successful");
      return true;
    } else {
      console.warn("⚠️ SMTP fallback failed:", response.status);
      return false;
    }
  } catch (error) {
    console.error("❌ SMTP fallback error:", error);
    return false;
  }
}
