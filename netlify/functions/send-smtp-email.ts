import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

// Configuration SMTP avec vos paramètres exacts
const smtpConfig = {
  host: "mail.spacemail.com",
  port: 465,
  secure: true, // SSL
  auth: {
    user: "contatto@soluzionerapida.com",
    pass: "Salomon123@",
  },
  debug: false, // Désactivé en production
  logger: false,
  connectionTimeout: 30000,
  greetingTimeout: 10000,
  socketTimeout: 30000,
};

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext,
) => {
  // Headers CORS
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json",
  };

  // Handle preflight requests
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    console.log("📧 Fonction Netlify SMTP appelée");

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Corps de requête requis" }),
      };
    }

    const { to, from, subject, html, text, formType, data } = JSON.parse(event.body);

    if (!to || !subject || (!html && !text)) {
      console.error("❌ Champs requis manquants:", {
        to,
        subject,
        htmlLength: html?.length,
        textLength: text?.length,
      });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Champs requis manquants: to, subject, et html ou text",
        }),
      };
    }

    console.log("📧 Création du transporteur SMTP avec config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
    });

    // Import dynamique de nodemailer pour Netlify
    const nodemailer = await import("nodemailer");

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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        messageId: info.messageId,
        response: info.response,
        accepted: info.accepted,
        rejected: info.rejected,
        timestamp: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error("❌ Erreur SMTP:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: error.toString(),
        timestamp: new Date().toISOString(),
      }),
    };
  }
};
