const mongoose = require("mongoose");

const demoBookingSchema = new mongoose.Schema(
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
    courseName: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    preferredDate: {
      type: Date,
    },
    preferredTime: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DemoBooking", demoBookingSchema);