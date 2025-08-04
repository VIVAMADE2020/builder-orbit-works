interface EmailData {
  [key: string]: any;
}

export const sendDirectSMTP = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Envoi direct via SMTP...");

    // Préparer les données email
    const emailPayload = {
      to: "contatto@soluzionerapida.com",
      from: "contatto@soluzionerapida.com",
      subject: getEmailSubject(data, formType),
      html: formatEmailHTML(data, formType),
      text: formatEmailText(data, formType),
      smtpConfig: {
        host: "mail.spacemail.com",
        port: 465,
        secure: true,
        auth: {
          user: "contatto@soluzionerapida.com",
          pass: "Salomon123@",
        }
      },
      formType,
      data,
      timestamp: new Date().toISOString(),
    };

    console.log("📧 Envoi vers:", emailPayload.to);
    console.log("📧 Sujet:", emailPayload.subject);

    // Utiliser l'endpoint Netlify qui fonctionne partout
    const endpoint = "/.netlify/functions/send-smtp-email";
    
    console.log("🌐 Endpoint:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("📧 Statut:", response.status);

    if (response.ok) {
      console.log("✅ Email envoyé avec succès");
      return true;
    } else {
      const errorText = await response.text();
      console.error("❌ Erreur SMTP:", errorText);
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
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || "Non fornito"}
WhatsApp: ${data.whatsapp || "Non fornito"}
Data di Nascita: ${data.dataNascita || "Non fornita"}
Indirizzo: ${data.indirizzo || "Non fornito"}
Paese: ${data.paese || "Non fornito"}

DETTAGLI PRESTITO:
Tipo: ${data.tipoPrestito}
Importo: EUR ${parseInt(data.importo).toLocaleString()}
Durata: ${data.durata} mesi
Motivazione: ${data.motivazione || "Non specificata"}

SITUAZIONE FINANZIARIA:
Occupazione: ${data.occupazione}
Reddito Mensile: EUR ${parseInt(data.redditoMensile).toLocaleString()}

${data.calculations ? `CALCOLI PRESTITO:
Rata Mensile: EUR ${data.calculations.monthlyPayment?.toLocaleString()}
Totale: EUR ${data.calculations.totalPayment?.toLocaleString()}
Interessi: EUR ${data.calculations.totalInterest?.toLocaleString()}

` : ""}MESSAGGIO:
${data.messaggio || "Nessun messaggio"}

CONSENSI:
Privacy: ${data.consensoPrivacy ? "Sì" : "No"}
Marketing: ${data.consensoMarketing ? "Sì" : "No"}

Data: ${new Date().toLocaleString("it-IT")}
    `.trim();
  } else {
    return `
CONTATTO - SOLUZIONE RAPIDA

MITTENTE:
Nome: ${data.nome} ${data.cognome}
Email: ${data.email}
Telefono: ${data.telefono || "Non fornito"}
WhatsApp: ${data.whatsapp || "Non fornito"}
Paese: ${data.paese || "Non specificato"}

OGGETTO: ${data.oggetto}

MESSAGGIO:
${data.messaggio}

Data: ${new Date().toLocaleString("it-IT")}
    `.trim();
  }
}

function formatEmailHTML(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb; text-align: center;">SOLUZIONE RAPIDA</h1>
      <h2 style="color: #374151; text-align: center;">RICHIESTA PRESTITO</h2>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>INFORMAZIONI PERSONALI</h3>
        <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
        <p><strong>Data di Nascita:</strong> ${data.dataNascita || "Non fornita"}</p>
        <p><strong>Indirizzo:</strong> ${data.indirizzo || "Non fornito"}</p>
        <p><strong>Paese:</strong> ${data.paese || "Non fornito"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>DETTAGLI PRESTITO</h3>
        <p><strong>Tipo:</strong> ${data.tipoPrestito}</p>
        <p><strong>Importo:</strong> EUR ${parseInt(data.importo).toLocaleString()}</p>
        <p><strong>Durata:</strong> ${data.durata} mesi</p>
        <p><strong>Motivazione:</strong> ${data.motivazione || "Non specificata"}</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>SITUAZIONE FINANZIARIA</h3>
        <p><strong>Occupazione:</strong> ${data.occupazione}</p>
        <p><strong>Reddito Mensile:</strong> EUR ${parseInt(data.redditoMensile).toLocaleString()}</p>
      </div>

      ${data.calculations ? `
      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>CALCOLI PRESTITO</h3>
        <p><strong>Rata Mensile:</strong> EUR ${data.calculations.monthlyPayment?.toLocaleString()}</p>
        <p><strong>Totale:</strong> EUR ${data.calculations.totalPayment?.toLocaleString()}</p>
        <p><strong>Interessi:</strong> EUR ${data.calculations.totalInterest?.toLocaleString()}</p>
      </div>
      ` : ""}

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>MESSAGGIO</h3>
        <p>${data.messaggio || "Nessun messaggio"}</p>
      </div>

      <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>CONSENSI</h3>
        <p><strong>Privacy:</strong> ${data.consensoPrivacy ? "Sì" : "No"}</p>
        <p><strong>Marketing:</strong> ${data.consensoMarketing ? "Sì" : "No"}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #6b7280;">
        <p>Data: ${new Date().toLocaleString("it-IT")}</p>
        <p><strong>SOLUZIONE RAPIDA</strong></p>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb; text-align: center;">SOLUZIONE RAPIDA</h1>
      <h2 style="color: #374151; text-align: center;">CONTATTO</h2>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>MITTENTE</h3>
        <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
        <p><strong>Paese:</strong> ${data.paese || "Non specificato"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>OGGETTO</h3>
        <p><strong>${data.oggetto}</strong></p>
      </div>

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3>MESSAGGIO</h3>
        <p style="white-space: pre-wrap;">${data.messaggio}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; color: #6b7280;">
        <p>Data: ${new Date().toLocaleString("it-IT")}</p>
        <p><strong>SOLUZIONE RAPIDA</strong></p>
      </div>
    </div>
    `;
  }
}
