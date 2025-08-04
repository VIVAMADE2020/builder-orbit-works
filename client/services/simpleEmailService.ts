interface EmailData {
  [key: string]: any;
}

export const sendEmailSimple = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Attempting simple email send...");
    
    // Essayer d'abord l'API SMTP si disponible
    const smtpSuccess = await trySmtpSend(data, formType);
    if (smtpSuccess) {
      return true;
    }

    // Si SMTP échoue, utiliser mailto comme fallback
    console.log("📧 SMTP failed, using mailto fallback...");
    openMailtoFallback(data, formType);
    return true;
  } catch (error) {
    console.error("❌ Email service error:", error);
    
    // Dernier recours: mailto
    openMailtoFallback(data, formType);
    return true;
  }
};

async function trySmtpSend(data: EmailData, formType: string): Promise<boolean> {
  try {
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
      console.log("✅ SMTP send successful");
      return true;
    } else {
      console.warn("⚠️ SMTP send failed:", response.status);
      return false;
    }
  } catch (error) {
    console.warn("⚠️ SMTP send error:", error);
    return false;
  }
}

function openMailtoFallback(data: any, formType: string): void {
  const subject = formType === 'loan-request' 
    ? `Richiesta Prestito - ${data.nome} ${data.cognome}`
    : `Contatto - ${data.oggetto || 'Messaggio'}`;

  const body = formatEmailBody(data, formType);
  
  const mailtoUrl = `mailto:contatto@soluzionerapida.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  console.log("📧 Opening mailto fallback...");
  
  // Ouvrir le client email par défaut
  window.location.href = mailtoUrl;
}

function formatEmailBody(data: any, formType: string): string {
  if (formType === 'loan-request') {
    return `
RICHIESTA PRESTITO

INFORMAZIONI PERSONALI:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || 'Non fornito'}
WhatsApp: ${data.whatsapp || 'Non fornito'}
Data di Nascita: ${data.dataNascita || 'Non fornita'}
Indirizzo: ${data.indirizzo || 'Non fornito'}
Paese: ${data.paese || 'Non fornito'}

DETTAGLI PRESTITO:
Tipo: ${data.tipoPrestito}
Importo: €${parseInt(data.importo || 0).toLocaleString()}
Durata: ${data.durata} mesi
Motivazione: ${data.motivazione || 'Non specificata'}

SITUAZIONE FINANZIARIA:
Occupazione: ${data.occupazione}
Reddito Mensile: €${parseInt(data.redditoMensile || 0).toLocaleString()}

${data.calculations ? `
CALCOLI PRESTITO:
Rata Mensile: €${data.calculations.monthlyPayment?.toLocaleString() || 'N/A'}
Totale da Rimborsare: €${data.calculations.totalPayment?.toLocaleString() || 'N/A'}
Interessi Totali: €${data.calculations.totalInterest?.toLocaleString() || 'N/A'}
` : ''}

MESSAGGIO:
${data.messaggio || 'Nessun messaggio aggiuntivo'}

CONSENSI:
Privacy: ${data.consensoPrivacy ? 'Sì' : 'No'}
Marketing: ${data.consensoMarketing ? 'Sì' : 'No'}

Inviato il: ${new Date().toLocaleString('it-IT')}
    `.trim();
  } else {
    return `
MESSAGGIO DI CONTATTO

MITTENTE:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || 'Non fornito'}
WhatsApp: ${data.whatsapp || 'Non fornito'}

OGGETTO: ${data.oggetto}

MESSAGGIO:
${data.messaggio}

Inviato il: ${new Date().toLocaleString('it-IT')}
    `.trim();
  }
}
