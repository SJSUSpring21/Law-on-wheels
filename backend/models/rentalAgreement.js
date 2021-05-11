const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configuration/config");

const tenantSchema = new Schema({
  name: { type: String, required: true, trim: true },
  parentName: { type: String, required: true, trim: true },
  address: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  panNumber: { type: String, required: false },
});

const messageSchema = new Schema(
  {
    message: { type: String, required: true, trim: true },
    from: { type: mongoose.SchemaTypes.ObjectId, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const rentalAgreementSchema = new Schema({
  user: { type: mongoose.SchemaTypes.ObjectId, ref: "User", required: true },
  lawyer: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  status: {
    type: String,
    enum: [
      config.WAITING_FOR_REVIEW_STATUS,
      config.REVIEWING_STATUS,
      config.REJECTED_STATUS,
      config.APPROVED_STATUS,
    ],
    default: config.WAITING_FOR_REVIEW_STATUS,
  },
  tenants: [tenantSchema],
  propertyState: { type: String, required: true, trim: true },
  propertyCity: { type: String, required: true, trim: true },
  propertyFloor: { type: Number, required: true, min: 0, default: 0 },
  propertyNumber: { type: String, required: true },
  propertyType: { type: String, required: true, trim: true },
  propertyAddress: {
    type: String,
    required: true,
    trim: true,
    min: [10, "Enter an address of minimum 10 characters"],
  },
  propertyLocality: { type: String, required: false },
  propertyZipCode: {
    type: String,
    min: [6, "Enter a valid pincode"],
    max: [6, "Enter a valid pincode"],
    trim: true,
  },
  agreementStartDate: { type: Date, required: true },
  rentPaymentDate: { type: Number, required: true, min: 1, max: 31 },
  noticePeriod: {
    type: Number,
    validate: {
      validator: function (num) {
        return num >= 0;
      },
      message: (props) => `${props.value} is not a positive number`,
    },
    required: true,
  },
  monthlyRent: {
    type: Number,
    validate: {
      validator: function (num) {
        return num > 0;
      },
      message: (props) => `${props.value} is not a positive number`,
    },
    required: true,
  },
  securityAmount: {
    type: Number,
    validate: {
      validator: function (num) {
        return num > 0;
      },
      message: (props) => `${props.value} is not a positive number`,
    },
    required: true,
  },
  personalTerms: [
    {
      type: String,
    },
  ],
  clientType: {
    type: String,
    enum: [
      config.RENT_AGREEMENT_TENANT_CLIENT,
      config.RENT_AGREEMENT_LANDLORD_CLIENT,
    ],
    required: true,
  },
  messages: [messageSchema],
});

const RentalAgreement = mongoose.model(
  "RentalAgreement",
  rentalAgreementSchema,
  "rentalAgreementCases"
);
module.exports = RentalAgreement;
