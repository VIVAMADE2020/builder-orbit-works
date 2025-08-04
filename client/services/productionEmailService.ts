interface EmailData {
  [key: string]: any;
}

export const sendEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Envoi d'email via service SMTP backend...");

    const emailPayload = {
      to: "contatto@soluzionerapida.com",
      from: "contatto@soluzionerapida.com",
      subject: getEmailSubject(data, formType),
      html: formatEmailHTML(data, formType),
      text: formatEmailText(data, formType),
      formType,
      data,
      timestamp: new Date().toISOString(),
    };

    console.log("📧 Préparation envoi email:", {
      to: emailPayload.to,
      subject: emailPayload.subject,
    });

    // Endpoint pour le service SMTP backend
    let endpoint = "/.netlify/functions/send-smtp-email";
    
    // En développement, utiliser le serveur local s'il est disponible
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      endpoint = "/api/send-smtp-email";
    }

    console.log("🌐 Utilisation endpoint:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("📧 Statut réponse SMTP:", response.status);

    // Lire le corps de la réponse une seule fois
    let responseText = "";
    try {
      responseText = await response.text();
      console.log("📧 Texte de réponse:", responseText);
    } catch (readError) {
      console.warn("⚠️ Impossible de lire le corps de la réponse:", readError);
      responseText = `Status: ${response.status}`;
    }

    if (response.ok) {
      let result;
      try {
        result = JSON.parse(responseText);
        console.log("✅ Email envoyé avec succès via SMTP:", result);
      } catch (e) {
        console.log("✅ Email envoyé avec succès (réponse non-JSON):", responseText);
      }
      return true;
    } else {
      console.error("❌ Erreur SMTP:", responseText);
      return false;
    }
  } catch (error) {
    console.error("❌ Erreur service email:", error);
    return false;
  }
};

function getEmailSubject(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `RICHIESTA PRESTITO - ${data.nome} ${data.cognome} - EUR ${parseInt(data.importo).toLocaleString()}`;
  } else {
    return `CONTATTO - ${data.oggetto} - ${data.nome} ${data.cognome}`;
  }
}

function formatEmailText(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `
RICHIESTA PRESTITO - SOLUZIONE RAPIDA

INFORMAZIONI PERSONALI:
Nome Completo: ${data.nome} ${data.cognome}
Indirizzo Email: ${data.email}
Numero di Telefono: ${data.telefono || "Non fornito"}
WhatsApp: ${data.whatsapp || "Non fornito"}
Data di Nascita: ${data.dataNascita || "Non fornita"}
Indirizzo di Residenza: ${data.indirizzo || "Non fornito"}
Paese di Residenza: ${data.paese || "Non fornito"}

DETTAGLI DELLA RICHIESTA PRESTITO:
Tipologia di Prestito: ${data.tipoPrestito}
Importo Richiesto: EUR ${parseInt(data.importo).toLocaleString()}
Durata del Prestito: ${data.durata} mesi
Motivazione della Richiesta: ${data.motivazione || "Non specificata"}

SITUAZIONE FINANZIARIA:
Professione/Occupazione: ${data.occupazione}
Reddito Mensile Netto: EUR ${parseInt(data.redditoMensile).toLocaleString()}

${
  data.calculations
    ? `CALCOLI PRESTITO STIMATI:
Rata Mensile Stimata: EUR ${data.calculations.monthlyPayment?.toLocaleString()}
Importo Totale da Restituire: EUR ${data.calculations.totalPayment?.toLocaleString()}
Interessi Totali: EUR ${data.calculations.totalInterest?.toLocaleString()}

`
    : ""
}MESSAGGIO AGGIUNTIVO:
${data.messaggio || "Nessun messaggio aggiuntivo"}

CONSENSI:
Trattamento Dati Personali: ${data.consensoPrivacy ? "Autorizzato" : "Non autorizzato"}
Comunicazioni Marketing: ${data.consensoMarketing ? "Autorizzato" : "Non autorizzato"}

Data e Ora di Invio: ${new Date().toLocaleString("it-IT")}

---
Cordiali saluti,
Sistema Automatico - Soluzione Rapida
    `.trim();
  } else {
    return `
MESSAGGIO DI CONTATTO - SOLUZIONE RAPIDA

INFORMAZIONI MITTENTE:
Nome Completo: ${data.nome} ${data.cognome}
Indirizzo Email: ${data.email}
Numero di Telefono: ${data.telefono || "Non fornito"}
WhatsApp: ${data.whatsapp || "Non fornito"}
Paese: ${data.paese || "Non specificato"}

OGGETTO DELLA COMUNICAZIONE: ${data.oggetto}

CONTENUTO DEL MESSAGGIO:
${data.messaggio}

Data e Ora di Invio: ${new Date().toLocaleString("it-IT")}

---
Cordiali saluti,
Sistema Automatico - Soluzione Rapida
    `.trim();
  }
}

function formatEmailHTML(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: bold;">SOLUZIONE RAPIDA</h1>
        <h2 style="color: #374151; margin: 10px 0 0 0; font-size: 18px;">RICHIESTA PRESTITO</h2>
      </div>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0; font-size: 16px; font-weight: bold;">INFORMAZIONI PERSONALI</h3>
        <p><strong>Nome Completo:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
        <p><strong>Data di Nascita:</strong> ${data.dataNascita || "Non fornita"}</p>
        <p><strong>Indirizzo:</strong> ${data.indirizzo || "Non fornito"}</p>
        <p><strong>Paese:</strong> ${data.paese || "Non fornito"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #065f46; margin-top: 0; font-size: 16px; font-weight: bold;">DETTAGLI PRESTITO</h3>
        <p><strong>Tipo:</strong> ${data.tipoPrestito}</p>
        <p><strong>Importo:</strong> EUR ${parseInt(data.importo).toLocaleString()}</p>
        <p><strong>Durata:</strong> ${data.durata} mesi</p>
        <p><strong>Motivazione:</strong> ${data.motivazione || "Non specificata"}</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #92400e; margin-top: 0; font-size: 16px; font-weight: bold;">SITUAZIONE FINANZIARIA</h3>
        <p><strong>Occupazione:</strong> ${data.occupazione}</p>
        <p><strong>Reddito Mensile:</strong> EUR ${parseInt(data.redditoMensile).toLocaleString()}</p>
      </div>

      ${
        data.calculations
          ? `
      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #3730a3; margin-top: 0; font-size: 16px; font-weight: bold;">CALCOLI PRESTITO STIMATI</h3>
        <p><strong>Rata Mensile:</strong> EUR ${data.calculations.monthlyPayment?.toLocaleString()}</p>
        <p><strong>Totale:</strong> EUR ${data.calculations.totalPayment?.toLocaleString()}</p>
        <p><strong>Interessi:</strong> EUR ${data.calculations.totalInterest?.toLocaleString()}</p>
      </div>
      `
          : ""
      }

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0; font-size: 16px; font-weight: bold;">MESSAGGIO AGGIUNTIVO</h3>
        <p>${data.messaggio || "Nessun messaggio aggiuntivo"}</p>
      </div>

      <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #991b1b; margin-top: 0; font-size: 16px; font-weight: bold;">CONSENSI</h3>
        <p><strong>Privacy:</strong> ${data.consensoPrivacy ? "Autorizzato" : "Non autorizzato"}</p>
        <p><strong>Marketing:</strong> ${data.consensoMarketing ? "Autorizzato" : "Non autorizzato"}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          Data e Ora di Invio: ${new Date().toLocaleString("it-IT")}
        </p>
        <p style="color: #2563eb; font-weight: bold;">SOLUZIONE RAPIDA</p>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 30px; padding: 20px; background-color: #f8f9fa; border-radius: 8px;">
        <h1 style="color: #2563eb; margin: 0; font-size: 24px; font-weight: bold;">SOLUZIONE RAPIDA</h1>
        <h2 style="color: #374151; margin: 10px 0 0 0; font-size: 18px;">MESSAGGIO DI CONTATTO</h2>
      </div>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0; font-size: 16px; font-weight: bold;">INFORMAZIONI MITTENTE</h3>
        <p><strong>Nome Completo:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
        <p><strong>Paese:</strong> ${data.paese || "Non specificato"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #065f46; margin-top: 0; font-size: 16px; font-weight: bold;">OGGETTO DELLA COMUNICAZIONE</h3>
        <p><strong>${data.oggetto}</strong></p>
      </div>

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0; font-size: 16px; font-weight: bold;">CONTENUTO DEL MESSAGGIO</h3>
        <p style="white-space: pre-wrap;">${data.messaggio}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          Data e Ora di Invio: ${new Date().toLocaleString("it-IT")}
        </p>
        <p style="color: #2563eb; font-weight: bold;">SOLUZIONE RAPIDA</p>
      </div>
    </div>
    `;
  }
}
