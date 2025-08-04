interface EmailData {
  [key: string]: any;
}

export const sendEmailDirect = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Sending email directly via FormSubmit...");
    
    // Préparer les données pour FormSubmit
    const formData = new FormData();
    
    // FormSubmit envoie à contatto@soluzionerapida.com
    formData.append('_to', 'contatto@soluzionerapida.com');
    formData.append('_subject', getEmailSubject(data, formType));
    formData.append('_template', 'table'); // Template propre
    formData.append('_captcha', 'false'); // Pas de captcha
    
    // Ajouter toutes les données du formulaire
    formData.append('Type', formType);
    formData.append('Nome', `${data.nome} ${data.cognome}`);
    formData.append('Email', data.email);
    formData.append('Telefono', data.telefono || 'Non fornito');
    formData.append('WhatsApp', data.whatsapp || 'Non fornito');
    formData.append('Timestamp', new Date().toLocaleString('it-IT'));
    
    if (formType === 'loan-request') {
      formData.append('Data_Nascita', data.dataNascita || 'Non fornita');
      formData.append('Indirizzo', data.indirizzo || 'Non fornito');
      formData.append('Paese', data.paese || 'Non fornito');
      formData.append('Tipo_Prestito', data.tipoPrestito);
      formData.append('Importo', `€${parseInt(data.importo).toLocaleString()}`);
      formData.append('Durata', `${data.durata} mesi`);
      formData.append('Motivazione', data.motivazione || 'Non specificata');
      formData.append('Occupazione', data.occupazione);
      formData.append('Reddito_Mensile', `€${parseInt(data.redditoMensile).toLocaleString()}`);
      formData.append('Messaggio', data.messaggio || 'Nessun messaggio');
      formData.append('Privacy', data.consensoPrivacy ? 'Sì' : 'No');
      formData.append('Marketing', data.consensoMarketing ? 'Sì' : 'No');
      
      if (data.calculations) {
        formData.append('Rata_Mensile', `€${data.calculations.monthlyPayment?.toLocaleString()}`);
        formData.append('Totale_Prestito', `€${data.calculations.totalPayment?.toLocaleString()}`);
        formData.append('Interessi_Totali', `€${data.calculations.totalInterest?.toLocaleString()}`);
      }
    } else {
      formData.append('Oggetto', data.oggetto);
      formData.append('Messaggio', data.messaggio);
    }
    
    // Envoyer via FormSubmit (service gratuit)
    const response = await fetch('https://formsubmit.co/contatto@soluzionerapida.com', {
      method: 'POST',
      body: formData
    });
    
    if (response.ok) {
      console.log("✅ Email sent successfully via FormSubmit");
      return true;
    } else {
      console.warn("⚠️ FormSubmit failed, trying fallback...");
      return await sendEmailFallback(data, formType);
    }
    
  } catch (error) {
    console.error("❌ FormSubmit error:", error);
    return await sendEmailFallback(data, formType);
  }
};

function getEmailSubject(data: any, formType: string): string {
  if (formType === 'loan-request') {
    return `🏦 Richiesta Prestito - ${data.nome} ${data.cognome} - €${parseInt(data.importo).toLocaleString()}`;
  } else {
    return `📧 Contatto - ${data.oggetto} - ${data.nome} ${data.cognome}`;
  }
}

// Fallback avec mailto si FormSubmit échoue
async function sendEmailFallback(data: EmailData, formType: string): Promise<boolean> {
  console.log("🔄 Using mailto fallback...");
  
  const subject = getEmailSubject(data, formType);
  const body = formatEmailBody(data, formType);
  
  const mailtoUrl = `mailto:contatto@soluzionerapida.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Ouvrir le client email
  window.open(mailtoUrl, '_blank');
  
  return true; // Considérer comme succès car l'email s'ouvre
}

function formatEmailBody(data: any, formType: string): string {
  if (formType === 'loan-request') {
    return `
🏦 RICHIESTA PRESTITO

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
Importo: €${parseInt(data.importo).toLocaleString()}
Durata: ${data.durata} mesi
Motivazione: ${data.motivazione || 'Non specificata'}

💼 SITUAZIONE FINANZIARIA:
Occupazione: ${data.occupazione}
Reddito Mensile: €${parseInt(data.redditoMensile).toLocaleString()}

${data.calculations ? `📊 CALCOLI PRESTITO:
Rata Mensile: €${data.calculations.monthlyPayment?.toLocaleString()}
Totale: €${data.calculations.totalPayment?.toLocaleString()}
Interessi: €${data.calculations.totalInterest?.toLocaleString()}
` : ''}

💬 MESSAGGIO:
${data.messaggio || 'Nessun messaggio'}

📋 CONSENSI:
Privacy: ${data.consensoPrivacy ? 'Sì' : 'No'}
Marketing: ${data.consensoMarketing ? 'Sì' : 'No'}

⏰ Inviato il: ${new Date().toLocaleString('it-IT')}
    `.trim();
  } else {
    return `
📧 MESSAGGIO DI CONTATTO

👤 MITTENTE:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || 'Non fornito'}
WhatsApp: ${data.whatsapp || 'Non fornito'}

💬 OGGETTO: ${data.oggetto}

MESSAGGIO:
${data.messaggio}

⏰ Inviato il: ${new Date().toLocaleString('it-IT')}
    `.trim();
  }
}
