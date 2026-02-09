const nodemailer = require("nodemailer");
require("dotenv").config();

// Alternative email sender with multiple transport options
const mailSenderWithFallback = async (email, title, body) => {
  try {
    // Validate email parameter
    if (!email) {
      console.log("mailSender: No email address provided");
      return {
        success: false,
        message: "No email address provided",
      };
    }

    // Check if mail credentials are configured
    if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
      console.log("Mail credentials not configured - skipping email send");
      return {
        success: false,
        message: "Mail credentials not configured",
      };
    }

    console.log("Attempting to send email to:", email);

    // Try multiple SMTP configurations
    const configurations = [
      // Configuration 1: Port 465 with SSL (most reliable on Render)
      {
        name: "Gmail SSL (Port 465)",
        config: {
          host: process.env.MAIL_HOST,
          port: 465,
          secure: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false,
            ciphers: 'SSLv3'
          },
          connectionTimeout: 30000,
          greetingTimeout: 30000,
          socketTimeout: 30000,
        }
      },
      // Configuration 2: Port 587 with STARTTLS
      {
        name: "Gmail TLS (Port 587)",
        config: {
          host: process.env.MAIL_HOST,
          port: 587,
          secure: false,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 20000,
          greetingTimeout: 20000,
          socketTimeout: 20000,
        }
      },
      // Configuration 3: Direct Gmail with requireTLS
      {
        name: "Gmail with requireTLS",
        config: {
          service: 'gmail',
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
          tls: {
            rejectUnauthorized: false
          },
          connectionTimeout: 25000,
        }
      }
    ];

    let lastError = null;

    // Try each configuration
    for (const { name, config } of configurations) {
      try {
        console.log(`Trying ${name}...`);
        
        const transporter = nodemailer.createTransport(config);
        
        // Send email
        const info = await transporter.sendMail({
          from: `"StudyNotion" <${process.env.MAIL_USER}>`,
          to: email,
          subject: title,
          html: body,
        });

        console.log(`✅ Email sent successfully using ${name}`);
        return {
          success: true,
          info: info,
          method: name,
        };
      } catch (error) {
        console.log(`❌ ${name} failed:`, error.message);
        lastError = error;
        // Continue to next configuration
      }
    }

    // All configurations failed
    console.error("All email configurations failed");
    return {
      success: false,
      error: lastError?.message || "All email methods failed",
    };

  } catch (error) {
    console.log("mailSender: Unexpected error:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = mailSenderWithFallback;
