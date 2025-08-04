interface EmailData {
  [key: string]: any;
}

export const sendSimpleEmail = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Envoi email simple...");

    // Préparer les données
    const subject = getEmailSubject(data, formType);
    const emailBody = formatEmailText(data, formType);

    // Essayer différentes méthodes
    const methods = [
      () => tryNetlifyFunction(data, formType, subject, emailBody),
      () => tryFormSubmit(data, formType, subject, emailBody),
    ];

    for (const method of methods) {
      try {
        const result = await method();
        if (result) {
          console.log("✅ Email envoyé avec succès");
          return true;
        }
      } catch (error) {
        console.warn("⚠️ Méthode échouée, tentative suivante...", error);
        continue;
      }
    }

    console.error("❌ Toutes les méthodes d'envoi ont échoué");
    return false;
  } catch (error) {
    console.error("❌ Erreur service email:", error);
    return false;
  }
};

// Essayer la fonction Netlify
async function tryNetlifyFunction(
  data: any,
  formType: string,
  subject: string,
  body: string,
): Promise<boolean> {
  console.log("📧 Tentative fonction Netlify...");

  const payload = {
    to: "contatto@soluzionerapida.com",
    from: "contatto@soluzionerapida.com",
    subject: subject,
    html: formatEmailHTML(data, formType),
    text: body,
    formType,
    data,
  };

  const response = await fetch("/.netlify/functions/send-smtp-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    console.log("✅ Netlify function réussie");
    return true;
  } else {
    const errorText = await response.text();
    console.error("❌ Netlify function échouée:", errorText);
    return false;
  }
}

// Essayer FormSubmit.co comme fallback
async function tryFormSubmit(
  data: any,
  formType: string,
  subject: string,
  body: string,
): Promise<boolean> {
  console.log("📧 Tentative FormSubmit.co...");

  const formData = new FormData();
  formData.append("_to", "contatto@soluzionerapida.com");
  formData.append("_subject", subject);
  formData.append("_template", "table");
  formData.append("_captcha", "false");

  // Ajouter les données du formulaire
  formData.append("Type", formType);
  formData.append("Nome", `${data.nome} ${data.cognome}`);
  formData.append("Email", data.email);
  formData.append("Telefono", data.telefono || "Non fornito");
  formData.append("WhatsApp", data.whatsapp || "Non fornito");
  formData.append("Messaggio_Completo", body);
  formData.append("Timestamp", new Date().toLocaleString("it-IT"));

  if (formType === "loan-request") {
    formData.append("Paese", data.paese || "Non fornito");
    formData.append("Tipo_Prestito", data.tipoPrestito);
    formData.append("Importo", `€${parseInt(data.importo).toLocaleString()}`);
    formData.append("Durata", `${data.durata} mesi`);
    formData.append("Occupazione", data.occupazione);
    formData.append(
      "Reddito",
      `€${parseInt(data.redditoMensile).toLocaleString()}`,
    );
  } else {
    formData.append("Paese", data.paese || "Non specificato");
    formData.append("Oggetto", data.oggetto);
  }

  const response = await fetch(
    "https://formsubmit.co/contatto@soluzionerapida.com",
    {
      method: "POST",
      body: formData,
    },
  );

  if (response.ok) {
    console.log("✅ FormSubmit.co réussi");
    return true;
  } else {
    console.error("❌ FormSubmit.co échoué");
    return false;
  }
}

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

${
  data.calculations
    ? `CALCOLI PRESTITO:
Rata Mensile: EUR ${data.calculations.monthlyPayment?.toLocaleString()}
Totale: EUR ${data.calculations.totalPayment?.toLocaleString()}
Interessi: EUR ${data.calculations.totalInterest?.toLocaleString()}

`
    : ""
}MESSAGGIO:
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
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background: #f3f4f6;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">INFORMAZIONI PERSONALI</td>
        </tr>
        <tr><td style="padding: 5px; font-weight: bold;">Nome:</td><td style="padding: 5px;">${data.nome} ${data.cognome}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td style="padding: 5px;">${data.email}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Telefono:</td><td style="padding: 5px;">${data.telefono || "Non fornito"}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">WhatsApp:</td><td style="padding: 5px;">${data.whatsapp || "Non fornito"}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Paese:</td><td style="padding: 5px;">${data.paese || "Non fornito"}</td></tr>
        
        <tr style="background: #ecfdf5;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">DETTAGLI PRESTITO</td>
        </tr>
        <tr><td style="padding: 5px; font-weight: bold;">Tipo:</td><td style="padding: 5px;">${data.tipoPrestito}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Importo:</td><td style="padding: 5px;">EUR ${parseInt(data.importo).toLocaleString()}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Durata:</td><td style="padding: 5px;">${data.durata} mesi</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Occupazione:</td><td style="padding: 5px;">${data.occupazione}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Reddito:</td><td style="padding: 5px;">EUR ${parseInt(data.redditoMensile).toLocaleString()}</td></tr>
        
        <tr style="background: #f9fafb;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">MESSAGGIO</td>
        </tr>
        <tr><td colspan="2" style="padding: 5px;">${data.messaggio || "Nessun messaggio"}</td></tr>
      </table>
      
      <p style="text-align: center; margin-top: 20px; color: #6b7280;">
        Data: ${new Date().toLocaleString("it-IT")}<br>
        <strong>SOLUZIONE RAPIDA</strong>
      </p>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #2563eb; text-align: center;">SOLUZIONE RAPIDA</h1>
      <h2 style="color: #374151; text-align: center;">CONTATTO</h2>
      
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="background: #f3f4f6;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">MITTENTE</td>
        </tr>
        <tr><td style="padding: 5px; font-weight: bold;">Nome:</td><td style="padding: 5px;">${data.nome} ${data.cognome}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Email:</td><td style="padding: 5px;">${data.email}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Telefono:</td><td style="padding: 5px;">${data.telefono || "Non fornito"}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">WhatsApp:</td><td style="padding: 5px;">${data.whatsapp || "Non fornito"}</td></tr>
        <tr><td style="padding: 5px; font-weight: bold;">Paese:</td><td style="padding: 5px;">${data.paese || "Non specificato"}</td></tr>
        
        <tr style="background: #ecfdf5;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">OGGETTO: ${data.oggetto}</td>
        </tr>
        
        <tr style="background: #f9fafb;">
          <td colspan="2" style="padding: 10px; font-weight: bold;">MESSAGGIO</td>
        </tr>
        <tr><td colspan="2" style="padding: 5px; white-space: pre-wrap;">${data.messaggio}</td></tr>
      </table>
      
      <p style="text-align: center; margin-top: 20px; color: #6b7280;">
        Data: ${new Date().toLocaleString("it-IT")}<br>
        <strong>SOLUZIONE RAPIDA</strong>
      </p>
    </div>
    `;
  }
}
