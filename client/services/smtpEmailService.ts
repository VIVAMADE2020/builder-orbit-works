interface EmailData {
  [key: string]: any;
}

export const sendEmailSMTP = async (
  data: EmailData,
  formType: string,
): Promise<boolean> => {
  try {
    console.log("📧 Sending email via SMTP...");

    const emailPayload = {
      to: "contatto@soluzionerapida.com",
      from: "contatto@soluzionerapida.com",
      subject: getEmailSubject(data, formType),
      html: formatEmailHTML(data, formType),
      formType,
      data,
      timestamp: new Date().toISOString(),
    };

    console.log("📧 Email payload prepared:", {
      to: emailPayload.to,
      subject: emailPayload.subject,
    });

    // Use Netlify function endpoint for all environments
    let endpoint = "/.netlify/functions/smtp-send";

    console.log("🌐 Using endpoint:", endpoint);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    });

    console.log("📧 SMTP Response status:", response.status);
    console.log("📧 Response type:", response.type);
    console.log("📧 Response ok:", response.ok);

    // Check if response is valid
    if (!response) {
      console.error("❌ Invalid response object");
      return false;
    }

    // Handle 404 - endpoint not found, try fallback
    if (response.status === 404) {
      console.warn("⚠️ SMTP endpoint not found, trying alternative endpoint...");

      // Try the alternative endpoint
      const altEndpoint = isDevelopment
        ? "/.netlify/functions/smtp-send"
        : "/api/smtp-send";

      console.log("🔄 Trying alternative endpoint:", altEndpoint);

      try {
        const altResponse = await fetch(altEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailPayload),
        });

        if (altResponse.ok) {
          console.log("✅ Email sent via alternative endpoint");
          return true;
        } else {
          console.error("❌ Alternative endpoint also failed:", altResponse.status);
        }
      } catch (altError) {
        console.error("❌ Alternative endpoint error:", altError);
      }

      // If both endpoints fail, return false
      console.error("❌ Both SMTP endpoints failed - SMTP service not available");
      return false;
    }

    // Only try to read response body for non-404 responses
    let responseText = "";
    if (response.ok || response.status >= 400) {
      try {
        responseText = await response.text();
        console.log("📧 Response text:", responseText);
      } catch (readError) {
        console.warn("⚠️ Could not read response body:", readError);
        responseText = `Status: ${response.status}`;
      }
    }

    if (response.ok) {
      let result;
      try {
        result = JSON.parse(responseText);
        console.log("✅ Email sent successfully via SMTP:", result);
      } catch (e) {
        console.log(
          "✅ Email sent successfully via SMTP (non-JSON response):",
          responseText,
        );
      }
      return true;
    } else {
      console.error("❌ SMTP Error:", responseText);
      return false;
    }
  } catch (error) {
    console.error("❌ SMTP Service Error:", error);
    return false;
  }
};

function getEmailSubject(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `🏦 Richiesta Prestito - ${data.nome} ${data.cognome} - €${parseInt(data.importo).toLocaleString()}`;
  } else {
    return `📧 Contatto - ${data.oggetto} - ${data.nome} ${data.cognome}`;
  }
}

function formatEmailHTML(data: any, formType: string): string {
  if (formType === "loan-request") {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        🏦 RICHIESTA PRESTITO
      </h2>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0;">👤 INFORMAZIONI PERSONALI</h3>
        <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
        <p><strong>Data di Nascita:</strong> ${data.dataNascita || "Non fornita"}</p>
        <p><strong>Indirizzo:</strong> ${data.indirizzo || "Non fornito"}</p>
        <p><strong>Paese:</strong> ${data.paese || "Non fornito"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #065f46; margin-top: 0;">💰 DETTAGLI PRESTITO</h3>
        <p><strong>Tipo:</strong> ${data.tipoPrestito}</p>
        <p><strong>Importo:</strong> €${parseInt(data.importo).toLocaleString()}</p>
        <p><strong>Durata:</strong> ${data.durata} mesi</p>
        <p><strong>Motivazione:</strong> ${data.motivazione || "Non specificata"}</p>
      </div>

      <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #92400e; margin-top: 0;">💼 SITUAZIONE FINANZIARIA</h3>
        <p><strong>Occupazione:</strong> ${data.occupazione}</p>
        <p><strong>Reddito Mensile:</strong> €${parseInt(data.redditoMensile).toLocaleString()}</p>
      </div>

      ${
        data.calculations
          ? `
      <div style="background: #e0e7ff; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #3730a3; margin-top: 0;">📊 CALCOLI PRESTITO</h3>
        <p><strong>Rata Mensile:</strong> €${data.calculations.monthlyPayment?.toLocaleString()}</p>
        <p><strong>Totale:</strong> €${data.calculations.totalPayment?.toLocaleString()}</p>
        <p><strong>Interessi:</strong> €${data.calculations.totalInterest?.toLocaleString()}</p>
      </div>
      `
          : ""
      }

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0;">💬 MESSAGGIO</h3>
        <p>${data.messaggio || "Nessun messaggio"}</p>
      </div>

      <div style="background: #fee2e2; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #991b1b; margin-top: 0;">📋 CONSENSI</h3>
        <p><strong>Privacy:</strong> ${data.consensoPrivacy ? "Sì" : "No"}</p>
        <p><strong>Marketing:</strong> ${data.consensoMarketing ? "Sì" : "No"}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          ⏰ Inviato il: ${new Date().toLocaleString("it-IT")}
        </p>
      </div>
    </div>
    `;
  } else {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
        📧 MESSAGGIO DI CONTATTO
      </h2>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0;">👤 MITTENTE</h3>
        <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
        <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
      </div>

      <div style="background: #ecfdf5; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #065f46; margin-top: 0;">💬 OGGETTO</h3>
        <p><strong>${data.oggetto}</strong></p>
      </div>

      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 15px 0;">
        <h3 style="color: #374151; margin-top: 0;">MESSAGGIO</h3>
        <p style="white-space: pre-wrap;">${data.messaggio}</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
        <p style="color: #6b7280; font-size: 14px;">
          ⏰ Inviato il: ${new Date().toLocaleString("it-IT")}
        </p>
      </div>
    </div>
    `;
  }
}
