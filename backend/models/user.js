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
    dateOfBirth: { type: String },
    aadhar: { type: String },
    timezone: {
      type: String,
      trim: true,
      default: "Asia/Calcutta",
      required: true,
    },
    gender: { type: String },
    image: {
      type: String,
    },
    address: {
      type: String,
    },
    state: { type: String },
    city: {
      type: String,
    },
    zipCode: {
      type: String,
      min: [6, "Enter a valid pincode"],
      max: [6, "Enter a valid pincode"],
      trim: true,
    },
    activeCases: {
      type: Number,
      validate: {
        validator: function (num) {
          return num >= 0;
        },
        message: (props) => `${props.value} is not a positive number`,
      },
      required: true,
      default: 0,
    },
    completedCases: {
      type: Number,
      validate: {
        validator: function (num) {
          return num >= 0;
        },
        message: (props) => `${props.value} is not a positive number`,
      },
      required: true,
      default: 0,
    },
    rejectedCases: {
      type: Number,
      validate: {
        validator: function (num) {
          return num >= 0;
        },
        message: (props) => `${props.value} is not a positive number`,
      },
      required: true,
      default: 0,
    },
    rentalAgreementCases: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "RentalAgreement",
      },
    ],
    mutualDivorceCases: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "MutualDivorce",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
