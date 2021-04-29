const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
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
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
      min: [6, "Enter a valid pincode"],
      max: [6, "Enter a valid pincode"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
