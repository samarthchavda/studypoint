const twilio = require('twilio');
require("dotenv").config();

// Initialize Twilio client
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const smsSender = async (phoneNumber, otp) => {
  try {
    // Validate phone number
    if (!phoneNumber) {
      console.log("smsSender: No phone number provided");
      return {
        success: false,
        message: "No phone number provided",
      };
    }

    // Validate OTP
    if (!otp) {
      console.log("smsSender: No OTP provided");
      return {
        success: false,
        message: "No OTP provided",
      };
    }

    // Check if Twilio credentials are configured
    if (!accountSid || !authToken || !twilioPhoneNumber) {
      console.log("Twilio credentials not configured properly");
      return {
        success: false,
        message: "SMS service not configured. Missing Twilio credentials.",
      };
    }

    console.log(`Attempting to send SMS to: ${phoneNumber}`);
    console.log(`Using Twilio phone: ${twilioPhoneNumber}`);

    // Send SMS
    const message = await client.messages.create({
      body: `Your StudyNotion OTP is: ${otp}. Valid for 5 minutes. Do not share with anyone.`,
      from: twilioPhoneNumber,
      to: phoneNumber,
    });

    console.log(`✅ SMS sent successfully to: ${phoneNumber}`);
    console.log(`Message SID: ${message.sid}`);

    return {
      success: true,
      message: "SMS sent successfully",
      messageSid: message.sid,
    };

  } catch (error) {
    console.log("❌ Error sending SMS:", error.message);
    console.error("Full SMS error:", error);

    return {
      success: false,
      message: "Failed to send SMS",
      error: error.message,
    };
  }
};

module.exports = smsSender;
