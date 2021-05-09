const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const config = require("../configuration/config");

const mutualDivorceSchema = new Schema({
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
      config.FILING_JOINT_PETITION,
      config.APPEAR_IN_COURT_FIRST_MOTION,
      config.APPEAR_IN_COURT_SECOND_MOTION,
      config.REJECTED_STATUS,
      config.APPROVED_STATUS,
    ],
    default: config.WAITING_FOR_REVIEW_STATUS,
  },
  firstMotionDate: {
    type: Date,
  },
  secondMotionDate: {
    type: Date,
  },
  marriageDate: {
    type: Date,
    required: true,
  },
  marriagePlace: {
    type: String,
    required: true,
  },
  marriageCity: {
    type: String,
    required: true,
  },
  nameOfHusband: {
    type: String,
    required: true,
  },
  nameOfWife: {
    type: String,
    required: true,
  },
  religionOfHusband: {
    type: String,
    required: true,
  },
  religionOfWife: {
    type: String,
    required: true,
  },
  nameOfFatherOfHusband: {
    type: String,
    required: true,
  },
  nameOfFatherOfWife: {
    type: String,
    required: true,
  },
  husbandBirthday: {
    type: Date,
    required: true,
  },
  wifeBirthday: {
    type: Date,
    required: true,
  },
  husbandContact: {
    type: String,
    trim: true,
    min: [10, "Enter a valid number"],
    max: [10, "Enter a valid number"],
  },
  wifeContact: {
    type: String,
    trim: true,
    min: [10, "Enter a valid number"],
    max: [10, "Enter a valid number"],
  },
  husbandEmail: {
    type: String,
    required: true,
  },
  wifeEmail: {
    type: String,
    required: true,
  },
  husbandPreResidence: {
    type: String,
    required: true,
  },
  wifePreResidence: {
    type: String,
    required: true,
  },
  residenceDuringMarriage: {
    type: String,
    required: true,
  },
  husbandCurrentResidence: {
    type: String,
    required: true,
  },
  wifeCurrentResidence: {
    type: String,
    required: true,
  },
  numberOfChildren: {
    type: Number,
    required: true,
    validate: {
      validator: function (num) {
        return num >= 0;
      },
      message: (props) => `${props.value} is a negative number`,
    },
    default: 0,
  },
  needSettlement: {
    type: Boolean,
    required: true,
    default: false,
  },
  settlementDetails: {
    type: String,
    required: false,
  },
  documents: {
    type: String,
  },
});

const MutualDivorce = mongoose.model(
  "MutualDivorce",
  mutualDivorceSchema,
  "mutualDivorceCases"
);
module.exports = MutualDivorce;
