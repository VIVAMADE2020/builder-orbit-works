import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Configuration SMTP avec vos paramètres exacts
const smtpConfig = {
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "contatto@soluzionerapida.com",
    pass: "Salomon123@",
  },
  debug: true,
  logger: true,
  connectionTimeout: 30000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
};

router.post("/send-smtp-email", async (req, res) => {
  try {
    console.log("📧 Endpoint envoi SMTP appelé");
    console.log("📧 Clés du corps de requête:", Object.keys(req.body));

    const { to, from, subject, html, text, formType, data } = req.body;

    if (!to || !subject || (!html && !text)) {
      console.error("❌ Champs requis manquants:", {
        to,
        subject,
        htmlLength: html?.length,
        textLength: text?.length,
      });
      return res.status(400).json({
        success: false,
        error: "Champs requis manquants: to, subject, et html ou text",
      });
    }

    console.log("📧 Création du transporteur SMTP avec config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
    });

    // Créer le transporteur SMTP
    const transporter = nodemailer.createTransporter(smtpConfig);

    // Vérifier la connexion SMTP
    console.log("📧 Vérification connexion SMTP...");
    await transporter.verify();
    console.log("✅ Connexion SMTP vérifiée avec succès");

    // Préparer l'email
    const mailOptions = {
      from: `"Soluzione Rapida" <${smtpConfig.auth.user}>`,
      to: to,
      subject: subject,
      html: html,
      text: text,
      replyTo: data?.email || smtpConfig.auth.user,
      headers: {
        'X-Mailer': 'Soluzione Rapida System',
        'X-Priority': '1', // High priority
      }
    };

    console.log("📧 Envoi email avec options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
    });

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email envoyé avec succès:", {
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });

    res.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("❌ Erreur SMTP:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString(),
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
