const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lawyerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, lowercase: true },
    email: { type: String, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    number: {
      type: String,
      trim: true,
      min: [10, "Enter a valid number"],
      max: [10, "Enter a valid number"],
    },
    timezone: {
      type: String,
      trim: true,
      default: "Asia/Calcutta",
      required: true,
    },
    image: {
      type: String,
    },
    barCouncilNumber: {
      type: String,
    },
    address: {
      type: String,
    },
    practicingCity: {
      type: String,
    },
    zipCode: {
      type: String,
      min: [6, "Enter a valid pincode"],
      max: [6, "Enter a valid pincode"],
      trim: true,
    },
    specializations: [
      {
        type: String,
      },
    ],
    practicingCourts: [
      {
        type: String,
      },
    ],
    isApprovedByAdmin: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema, "lawyers");
module.exports = Lawyer;
