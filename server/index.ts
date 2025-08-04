import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleSendEmail } from "./routes/email";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Debug endpoint to list all routes
  app.get("/api/debug", (req, res) => {
    const routes = [];
    app._router.stack.forEach((middleware) => {
      if (middleware.route) {
        routes.push({
          path: middleware.route.path,
          methods: Object.keys(middleware.route.methods),
        });
      }
    });
    res.json({
      message: "Debug info",
      routes,
      timestamp: new Date().toISOString(),
    });
  });

  // Email route
  app.post("/api/send-email", handleSendEmail);

  // SMTP route
  app.post("/api/smtp-send", async (req, res) => {
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

      const nodemailer = await import("nodemailer");

      const smtpConfig = {
        host: "mail.spacemail.com",
        port: 465,
        secure: true,
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

      console.log("📧 Creating SMTP transporter...");
      const transporter = nodemailer.default.createTransport(smtpConfig);

      console.log("📧 Verifying SMTP connection...");
      await transporter.verify();
      console.log("✅ SMTP connection verified successfully");

      const mailOptions = {
        from: from || smtpConfig.auth.user,
        to: to,
        subject: subject,
        html: html,
        replyTo: data?.email || from || smtpConfig.auth.user,
      };

      console.log("📧 Sending email...");
      const info = await transporter.sendMail(mailOptions);

      console.log("✅ Email sent successfully:", {
        messageId: info.messageId,
        response: info.response,
      });

      res.json({
        success: true,
        messageId: info.messageId,
        response: info.response,
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

  // Test SMTP endpoint
  app.get("/api/test-smtp", async (req, res) => {
    try {
      const nodemailer = await import("nodemailer");
      const transporter = nodemailer.default.createTransport({
        host: "mail.spacemail.com",
        port: 465,
        secure: true,
        auth: {
          user: "contatto@soluzionerapida.com",
          pass: "Salomon123@",
        },
      });

      console.log("🔗 Testing SMTP connection...");
      await transporter.verify();
      console.log("✅ SMTP connection successful");

      res.json({ success: true, message: "SMTP connection verified" });
    } catch (error) {
      console.error("❌ SMTP test failed:", error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return app;
}
