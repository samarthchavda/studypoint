const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const smsSender = require("../utils/smsSender");
const emailVerificationTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  otp: {
    type: String,
    required: true,
  },
  sendMethod: {
    type: String,
    enum: ["email", "sms"],
    default: "email",
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

// Define a function to send SMS
async function sendVerificationSMS(phoneNumber, otp) {
  try {
    if (!phoneNumber) {
      console.log("sendVerificationSMS: No phone number provided");
      return;
    }

    console.log(`Attempting to send OTP ${otp} to phone: ${phoneNumber}`);
    
    const smsResponse = await smsSender(phoneNumber, otp);
    
    console.log("SMS response: ", smsResponse);
    
    if (!smsResponse || !smsResponse.success) {
      console.log("Warning: SMS sending failed but OTP will still be saved");
      console.log("SMS response:", smsResponse);
    } else {
      console.log("✅ OTP SMS sent successfully to:", phoneNumber);
    }
  } catch (error) {
    console.log("Error occurred while sending SMS: ", error);
    console.error("SMS error details:", error.message);
    // Don't throw - let OTP still be saved even if SMS fails
    console.log("Continuing despite SMS error...");
  }
}

// Define a post-save hook to send email/SMS after the document has been saved
OTPSchema.pre("save", async function (next) {
  console.log("New OTP document saved to database");

  // Only send verification when a new document is created
  if (this.isNew) {
    // Send SMS if phone number is provided
    if (this.phoneNumber && this.sendMethod === "sms") {
      console.log("Sending OTP via SMS to:", this.phoneNumber);
      await sendVerificationSMS(this.phoneNumber, this.otp);
    }
    // Send Email if email is provided (default)
    else if (this.email) {
      console.log("Sending OTP via Email to:", this.email);
      await sendVerificationEmail(this.email, this.otp);
    }
  }
  next();
});

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;