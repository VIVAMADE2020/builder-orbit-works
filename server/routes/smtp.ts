import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

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

router.post("/smtp-send", async (req, res) => {
  try {
    console.log("📧 SMTP Send endpoint called");
    console.log("📧 Request body keys:", Object.keys(req.body));

    const { to, from, subject, html, formType, data } = req.body;

    if (!to || !subject || !html) {
      console.error("❌ Missing required fields:", { to, subject, htmlLength: html?.length });
      return res.status(400).json({
        success: false,
        error: "Missing required fields: to, subject, html",
      });
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

    res.json({
      success: true,
      messageId: info.messageId,
      response: info.response,
      accepted: info.accepted,
      rejected: info.rejected,
    });
  } catch (error) {
    console.error("❌ SMTP Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString(),
    });
  }
});

export default router;
