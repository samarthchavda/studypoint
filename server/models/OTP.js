const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 5, // The document will be automatically deleted after 5 minutes of its creation time
  },
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
  try {
    if (!email) {
      console.log("sendVerificationEmail: No email provided");
      return;
    }

    console.log(`Attempting to send OTP ${otp} to email: ${email}`);
    
    const mailResponse = await mailSender(
      email,
      "Verification Email from StudyNotion",
      emailVerificationTemplate(otp)
    );
    
    console.log("Email sent successfully: ", mailResponse);
    
    // Check if email was sent successfully
    if (!mailResponse || !mailResponse.success) {
      console.log("Warning: Email sending failed but OTP will still be saved");
      console.log("Mail response:", mailResponse);
    } else {
      console.log("✅ OTP email sent successfully to:", email);
    }
  } catch (error) {
    console.log("Error occurred while sending email: ", error);
    console.error("Email error details:", error.message);
    // Don't throw - let OTP still be saved even if email fails
    console.log("Continuing despite email error...");
  }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
  console.log("New OTP document saved to database");

  // Only send an email when a new document is created
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;