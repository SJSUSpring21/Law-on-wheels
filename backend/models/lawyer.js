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
		specializations: [{ name: { type: String }, value: { type: String } }],
		practicingCourt: {
			type: String,
		},
		education: {
			type: String,
			trim: true,
		},
		experience: {
			type: Number,
		},
		isApprovedByAdmin: {
			type: Boolean,
			default: false,
			required: true,
		},
		gender: { type: String },
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
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Lawyer = mongoose.model("Lawyer", lawyerSchema, "lawyers");
module.exports = Lawyer;
