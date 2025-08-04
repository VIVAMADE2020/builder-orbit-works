import { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import nodemailer from "nodemailer";

// Configuration SMTP avec vos paramètres
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
  connectionTimeout: 10000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
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
    console.log("📧 SMTP Netlify function called");

    if (!event.body) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: "Request body is required" }),
      };
    }

    const { to, from, subject, html, formType, data } = JSON.parse(event.body);

    if (!to || !subject || !html) {
      console.error("❌ Missing required fields:", {
        to,
        subject,
        htmlLength: html?.length,
      });
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          success: false,
          error: "Missing required fields: to, subject, html",
        }),
      };
    }

    console.log("📧 Creating SMTP transporter with config:", {
      host: smtpConfig.host,
      port: smtpConfig.port,
      secure: smtpConfig.secure,
      user: smtpConfig.auth.user,
    });

    // Créer le transporteur SMTP
    const transporter = nodemailer.createTransport(smtpConfig);

    // Vérifier la connexion SMTP
    console.log("📧 Verifying SMTP connection...");
    await transporter.verify();
    console.log("✅ SMTP connection verified successfully");

    // Préparer l'email
    const mailOptions = {
      from: from || smtpConfig.auth.user,
      to: to,
      subject: subject,
      html: html,
      replyTo: data?.email || from || smtpConfig.auth.user,
    };

    console.log("📧 Sending email with options:", {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
    });

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent successfully:", {
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
      }),
    };
  } catch (error) {
    console.error("❌ SMTP Error:", error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        success: false,
        error: error.message,
        details: error.toString(),
      }),
    };
  }
};
