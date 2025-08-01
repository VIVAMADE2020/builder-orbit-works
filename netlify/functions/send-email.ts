import { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

const handler: Handler = async (event, context) => {
  // Handle CORS preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { formType, data, timestamp } = JSON.parse(event.body || "{}");

    // Create SMTP transporter with provided configuration
    const transporter = nodemailer.createTransport({
      host: "mail.privateemail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "contact@oplis.online",
        pass: "Made2020@",
      },
    });

    // Format email content based on form type
    let subject = "";
    let htmlContent = "";

    switch (formType) {
      case "loan-request":
        subject = `Nuova Richiesta Prestito - ${data.nome} ${data.cognome}`;
        htmlContent = `
          <h2>Nuova Richiesta Prestito</h2>
          <h3>Informazioni Personali:</h3>
          <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
          <p><strong>Data di Nascita:</strong> ${data.dataNascita || "Non fornita"}</p>
          <p><strong>Indirizzo:</strong> ${data.indirizzo || "Non fornito"}</p>
          <p><strong>Paese:</strong> ${data.paese || "Non fornito"}</p>
          
          <h3>Dettagli del Prestito:</h3>
          <p><strong>Tipo Prestito:</strong> ${data.tipoPrestito}</p>
          <p><strong>Importo:</strong> €${data.importo}</p>
          <p><strong>Durata:</strong> ${data.durata} mesi</p>
          <p><strong>Motivazione:</strong> ${data.motivazione || "Non specificata"}</p>
          
          <h3>Situazione Finanziaria:</h3>
          <p><strong>Occupazione:</strong> ${data.occupazione}</p>
          <p><strong>Reddito Mensile:</strong> €${data.redditoMensile}</p>
          
          <h3>Informazioni Aggiuntive:</h3>
          <p><strong>Messaggio:</strong> ${data.messaggio || "Nessun messaggio aggiuntivo"}</p>
          <p><strong>Consenso Privacy:</strong> ${data.consensoPrivacy ? "Sì" : "No"}</p>
          <p><strong>Consenso Marketing:</strong> ${data.consensoMarketing ? "Sì" : "No"}</p>
          
          <hr>
          <p><em>Richiesta inviata il: ${timestamp}</em></p>
        `;
        break;

      case "contact":
        subject = `Nuovo Contatto - ${data.nome} ${data.cognome}`;
        htmlContent = `
          <h2>Nuovo Messaggio di Contatto</h2>
          <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
          <p><strong>Tipo Prestito:</strong> ${data.tipoPrestito}</p>
          <p><strong>Importo:</strong> €${data.importo}</p>
          <p><strong>Durata:</strong> ${data.durata} mesi</p>
          <p><strong>Reddito:</strong> €${data.reddito}</p>
          <p><strong>Occupazione:</strong> ${data.occupazione}</p>
          <p><strong>Messaggio:</strong> ${data.messaggio || "Nessun messaggio"}</p>
          
          <hr>
          <p><em>Messaggio inviato il: ${timestamp}</em></p>
        `;
        break;

      case "segnalazione":
        subject = `Nuova Segnalazione - ${data.tipoSegnalazione} - ${data.oggetto}`;
        htmlContent = `
          <h2>🚨 Nuova Segnalazione Ricevuta</h2>
          <h3>Informazioni del Mittente:</h3>
          <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>

          <h3>Dettagli della Segnalazione:</h3>
          <p><strong>Tipo:</strong> ${data.tipoSegnalazione}</p>
          <p><strong>Oggetto:</strong> ${data.oggetto}</p>
          <p><strong>Descrizione:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #263959; margin: 10px 0;">
            ${data.messaggio}
          </div>

          <hr>
          <p><em>Segnalazione inviata il: ${timestamp}</em></p>
          <p style="color: #d63031;"><strong>⚠️ PRIORITÀ:</strong> Rispondere entro 24 ore</p>
        `;
        break;

      default:
        subject = "Nuovo Modulo Ricevuto";
        htmlContent = `
          <h2>Nuovo Modulo Ricevuto</h2>
          <pre>${JSON.stringify(data, null, 2)}</pre>
          <hr>
          <p><em>Inviato il: ${timestamp}</em></p>
        `;
    }

    // Send email
    await transporter.sendMail({
      from: "contact@oplis.online",
      to: "contatto@soluzionerapida.com",
      subject: subject,
      html: htmlContent,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        success: true,
        message: "Email sent successfully",
      }),
    };
  } catch (error) {
    console.error("Error sending email:", error);

    // Return more detailed error information
    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: JSON.stringify({
        error: "Failed to send email",
        message: errorMessage,
        timestamp: new Date().toISOString(),
      }),
    };
  }
};

export { handler };
