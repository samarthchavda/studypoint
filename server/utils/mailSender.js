const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
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

    // Create a Transporter to send emails
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    // Send emails to users
    let info = await transporter.sendMail({
      from: `"StudyNotion" <${process.env.MAIL_USER}>`,
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully to:", email);
    return {
      success: true,
      info: info,
    };
  } catch (error) {
    console.log("mailSender: error sending mail:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = mailSender;