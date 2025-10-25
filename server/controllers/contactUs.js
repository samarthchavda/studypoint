const mailSender = require("../utils/mailSender");
const { contactUsEmail } = require("../mail/templates/contactFormRes");
const ContactForm = require("../models/ContactForm");

exports.contactUs = async (req, res) => {
  try {
    const { email, firstName, lastName, message, phoneNo, countrycode } = req.body;

    console.log("Contact form data:", { email, firstName, lastName, message });

    // Validation
    if (!email || !firstName || !message) {
      return res.status(400).json({
        success: false,
        message: "Email, firstName, and message are required",
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Save contact form data to database
    const contactFormData = await ContactForm.create({
      firstName,
      lastName: lastName || "",
      email,
      phoneNo: phoneNo || "",
      countrycode: countrycode || "",
      message,
      status: "new",
    });

    const emailBody = contactUsEmail(
      email,
      firstName,
      lastName || "",
      message,
      phoneNo || "",
      countrycode || ""
    );

    // Send email to admin (if configured)
    if (process.env.USEREMAIL) {
      try {
        const adminEmailRes = await mailSender(
          process.env.USEREMAIL,
          "Contact Form Submission - StudyNotion",
          emailBody
        );
        console.log("Admin email response:", adminEmailRes);
      } catch (error) {
        console.log("Error sending email to admin:", error.message);
        // Don't fail the request if email fails
      }
    }

    // Send confirmation email to user
    try {
      const userEmailRes = await mailSender(
        email,
        "Your message was received - StudyNotion",
        emailBody
      );
      console.log("User email response:", userEmailRes);
    } catch (error) {
      console.log("Error sending confirmation email to user:", error.message);
      // Don't fail the request if email fails
    }

    return res.status(200).json({
      success: true,
      message: "Contact form submitted successfully",
      data: contactFormData,
    });
  } catch (error) {
    console.log("Error in contactUs controller:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while submitting contact form",
      error: error.message,
    });
  }
};