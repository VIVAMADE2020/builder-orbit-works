const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

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

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'SMTP server is running' });
});

// SMTP send endpoint
app.post('/send-email', async (req, res) => {
  try {
    console.log('📧 SMTP Send request received');
    console.log('📧 Request body keys:', Object.keys(req.body));

    const { to, from, subject, html, formType, data } = req.body;

    if (!to || !subject || !html) {
      console.error('❌ Missing required fields:', { to, subject, htmlLength: html?.length });
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: to, subject, html',
      });
    }

    console.log('📧 Creating SMTP transporter...');
    const transporter = nodemailer.createTransporter(smtpConfig);

    console.log('📧 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully');

    const mailOptions = {
      from: from || smtpConfig.auth.user,
      to: to,
      subject: subject,
      html: html,
      replyTo: data?.email || from || smtpConfig.auth.user,
    };

    console.log('📧 Sending email with options:', {
      from: mailOptions.from,
      to: mailOptions.to,
      subject: mailOptions.subject,
      replyTo: mailOptions.replyTo,
    });

    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email sent successfully:', {
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
    console.error('❌ SMTP Error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: error.toString(),
    });
  }
});

// Test SMTP connection endpoint
app.get('/test-smtp', async (req, res) => {
  try {
    console.log('🔗 Testing SMTP connection...');
    const transporter = nodemailer.createTransporter(smtpConfig);
    await transporter.verify();
    console.log('✅ SMTP connection successful');
    res.json({ success: true, message: 'SMTP connection verified' });
  } catch (error) {
    console.error('❌ SMTP test failed:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SMTP Server running on port ${PORT}`);
  console.log(`📧 SMTP Configuration: ${smtpConfig.host}:${smtpConfig.port}`);
  console.log(`✉️  Email account: ${smtpConfig.auth.user}`);
});
