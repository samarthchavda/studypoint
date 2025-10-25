const mongoose = require("mongoose");

const contactFormSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      trim: true,
    },
    countrycode: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactForm", contactFormSchema);