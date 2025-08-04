import { Request, Response } from "express";
import nodemailer from "nodemailer";

export const handleSendEmail = async (req: Request, res: Response) => {
  try {
    console.log("📧 Email API called with method:", req.method);
    console.log("📧 Full request body:", req.body);
    const { formType, data, timestamp } = req.body;
    console.log("📧 Parsed request data:", {
      formType,
      timestamp,
      dataKeys: Object.keys(data || {}),
    });

    // Create SMTP transporter with provided configuration
    const transporter = nodemailer.createTransport({
      host: "mail.spacemail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: "contatto@soluzionerapida.com",
        pass: "Salomon123@",
      },
    });

    // Format email content based on form type
    let subject = "";
    let htmlContent = "";

    switch (formType) {
      case "loan-request":
        subject = `Nuova Richiesta Prestito - ${data.nome} ${data.cognome} - €${data.importo}`;
        htmlContent = `
          <h2>💰 Nuova Richiesta Prestito</h2>

          <h3>👤 Informazioni Personali:</h3>
          <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>
          <p><strong>Data di Nascita:</strong> ${data.dataNascita || "Non fornita"}</p>
          <p><strong>Indirizzo:</strong> ${data.indirizzo || "Non fornito"}</p>
          <p><strong>Paese:</strong> ${data.paese || "Non fornito"}</p>

          <h3>💰 Dettagli del Prestito:</h3>
          <p><strong>Tipo Prestito:</strong> ${data.tipoPrestito}</p>
          <p><strong>Importo Richiesto:</strong> €${parseInt(data.importo).toLocaleString()}</p>
          <p><strong>Durata:</strong> ${data.durata} mesi</p>
          <p><strong>Motivazione:</strong> ${data.motivazione || "Non specificata"}</p>

          ${
            data.calculations
              ? `
          <h3>📊 Calcoli Prestito:</h3>
          <div style="background: #f0f8ff; padding: 15px; border-left: 4px solid #2563eb; margin: 10px 0;">
            <p><strong>Tasso di Interesse:</strong> ${data.calculations.interestRate}</p>
            <p><strong>Rata Mensile:</strong> €${data.calculations.monthlyPayment.toLocaleString()}</p>
            <p><strong>Totale da Rimborsare:</strong> €${data.calculations.totalPayment.toLocaleString()}</p>
            <p><strong>Interessi Totali:</strong> €${data.calculations.totalInterest.toLocaleString()}</p>
          </div>
          `
              : ""
          }

          <h3>💼 Situazione Finanziaria:</h3>
          <p><strong>Occupazione:</strong> ${data.occupazione}</p>
          <p><strong>Reddito Mensile:</strong> €${parseInt(data.redditoMensile).toLocaleString()}</p>

          <h3>💬 Informazioni Aggiuntive:</h3>
          <p><strong>Messaggio:</strong> ${data.messaggio || "Nessun messaggio aggiuntivo"}</p>
          <p><strong>Consenso Privacy:</strong> ${data.consensoPrivacy ? "✅ Sì" : "❌ No"}</p>
          <p><strong>Consenso Marketing:</strong> ${data.consensoMarketing ? "✅ Sì" : "❌ No"}</p>

          <hr>
          <p style="color: #2563eb;"><strong>⏰ URGENTE:</strong> Rispondere entro 24 ore</p>
          <p><em>Richiesta inviata il: ${timestamp}</em></p>
        `;
        break;

      case "contact":
        subject = `Nuovo Contatto - ${data.oggetto} - ${data.nome} ${data.cognome}`;
        htmlContent = `
          <h2>📧 Nuovo Messaggio di Contatto</h2>

          <h3>👤 Informazioni del Mittente:</h3>
          <p><strong>Nome:</strong> ${data.nome} ${data.cognome}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Telefono:</strong> ${data.telefono || "Non fornito"}</p>
          <p><strong>WhatsApp:</strong> ${data.whatsapp || "Non fornito"}</p>

          <h3>💬 Dettagli del Messaggio:</h3>
          <p><strong>Oggetto:</strong> ${data.oggetto}</p>
          <p><strong>Messaggio:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #263959; margin: 10px 0;">
            ${data.messaggio}
          </div>

          <hr>
          <p style="color: #2563eb;"><strong>📞 RICHIAMA:</strong> Rispondere entro 24 ore</p>
          <p><em>Messaggio inviato il: ${timestamp}</em></p>
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
    console.log("Attempting to send email with subject:", subject);
    const mailOptions = {
      from: "contatto@soluzionerapida.com",
      to: "contatto@soluzionerapida.com",
      subject: subject,
      html: htmlContent,
    };

    console.log("📧 Mail options:", {
      ...mailOptions,
      html: htmlContent.substring(0, 100) + "...",
    });

    // Test de connexion SMTP avant d'envoyer
    console.log("🔗 Testing SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified");

    // Envoyer l'email
    const result = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!", { messageId: result.messageId });

    res.status(200).json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);

    // Return more detailed error information
    let errorMessage = "Failed to send email";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    res.status(500).json({
      error: "Failed to send email",
      message: errorMessage,
      timestamp: new Date().toISOString(),
    });
  }
};
