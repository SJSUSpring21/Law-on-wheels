const express = require("express");
const { requireSignIn } = require("../configuration/passport");
const Joi = require("joi");
const models = require("../models/modelsStore");
const {
  findLawyerWithMinimumActiveCases,
  capitalizeFirstLetter,
} = require("../helpers/utils");
const config = require("../configuration/config");

// Initializing Router
const router = express.Router();

router.post("/create", requireSignIn, async (req, res) => {
  // No lawyers allowed here
  if (req.user.type === config.LAWYER_TYPE) {
    res.status(405).send({ errorMessage: "Not allowed" });
  }
  // Manipulate request based on the data we get from frontend:
  const rawRentalagreementData = {
    clientType: config.RENT_AGREEMENT_TENANT_CLIENT,
    propertyType: 2,
    propertyState: req.body.landlord_state,
    propertyCity: req.body.landlord_city,
    propertyFloor: req.body.floor,
    propertyNumber: req.body.house_number,
    propertyAddress: req.body.property_address,
    propertyLocality: req.body.property_locality,
    propertyZipCode: req.body.property_pincode,
    agreementStartDate: req.body.agreement_start_date,
    rentPaymentDate: 1,
    monthlyRent: req.body.monthly_rent,
    securityAmount: req.body.security_amount,
    noticePeriod: req.body.notice_period,
    tenants: [
      {
        name: req.body.tenant_full_name,
        parentName: req.body.tenant_parentname,
        address: req.body.tenant_address,
        email: req.body.tenant_email,
      },
    ],
  };

  // Design tenant information input schema
  // const tenantSchema = Joi.object({
  //   name: Joi.string().required().messages({
  //     "string.empty": "Enter a valid property type",
  //     "any.required": "Enter a valid property type",
  //   }),
  //   parentName: Joi.string().required().messages({
  //     "string.empty": "Enter a valid property type",
  //     "any.required": "Enter a valid property type",
  //   }),
  //   address: Joi.string().required().messages({
  //     "string.empty": "Enter a valid property type",
  //     "any.required": "Enter a valid property type",
  //   }),
  //   email: Joi.string().email().required().messages({
  //     "string.email": "Enter a valid email.",
  //     "any.required": "Enter a valid email",
  //   }),
  //   panNumber: Joi.string(),
  // });

  //Design input schema
  // const schema = Joi.object({
  //   clientType: Joi.string()
  //     .valid(
  //       config.RENT_AGREEMENT_LANDLORD_CLIENT,
  //       config.RENT_AGREEMENT_TENANT_CLIENT
  //     )
  //     //      .required()
  //     .messages({
  //       "any.required": "Select a valid client type",
  //     }),
  //   propertyType: Joi.string().required().messages({
  //     "string.empty": "Enter a valid property type",
  //     "any.required": "Enter a valid property type",
  //   }),
  //   propertyState: Joi.string().required().messages({
  //     "string.empty": "Enter a valid state",
  //     "any.required": "Enter a valid state",
  //   }),
  //   propertyCity: Joi.string().required().messages({
  //     "string.empty": "Enter a valid city",
  //     "any.required": "Enter a valid city",
  //   }),
  //   propertyFloor: Joi.number().integer().min(0).max(200).messages({
  //     "number.integer": "Enter a valid floor",
  //     "number.min": "Enter a valid floor",
  //     "number.max": "Enter a valid floor",
  //     "number.base": "Enter a valid floor",
  //     "any.required": "Enter a valid floor",
  //   }),
  //   propertyAddress: Joi.string().min(10).required().messages({
  //     "string.empty": "Enter a valid address",
  //     "string.min": "Enter a valid address",
  //     "any.required": "Enter a valid address",
  //   }),
  //   propertyNumber: Joi.string().min(1).required().messages({
  //     "string.empty": "Enter a valid house number",
  //     "string.min": "Enter a valid house number",
  //     "any.required": "Enter a valid house number",
  //   }),
  //   propertyLocality: Joi.string(),
  //   propertyZipCode: Joi.string().min(6).max(6).required().messages({
  //     "string.empty": "Enter a valid zipcode",
  //     "string.min": "Enter a valid zipcode",
  //     "string.max": "Enter a valid zipcode",
  //     "any.required": "Enter a valid zipcode",
  //   }),
  //   agreementStartDate: Joi.date().required().messages({
  //     "date.base": "Enter a valid agreement date",
  //     "any.required": "Enter a valid date",
  //   }),
  //   rentPaymentDate: Joi.number().integer().min(1).max(31).messages({
  //     "number.integer": "Enter a rent payment date",
  //     "number.min": "Enter a rent payment date",
  //     "number.max": "Enter a rent payment date",
  //     "number.base": "Enter a rent payment date",
  //     "any.required": "Enter a rent payment date",
  //   }),
  //   monthlyRent: Joi.number().positive().required().messages({
  //     "number.positive": "Enter a valid rent amount",
  //     "any.required": "Enter a valid rent amount",
  //   }),
  //   noticePeriod: Joi.number().positive().required().messages({
  //     "number.positive": "Enter a valid notice period duration",
  //     "any.required": "Enter a valid notice period duration",
  //   }),
  //   securityAmount: Joi.number().positive().required().messages({
  //     "number.positive": "Enter a valid security deposit amount",
  //     "any.required": "Enter a valid security deposit amount",
  //   }),
  //   tenants: Joi.array().items(tenantSchema).required(),
  //   personalTerms: Joi.array().items(Joi.string()),
  // });

  // Validate input
  // const result = await schema.validate(rawRentalagreementData);
  // if (result.error) {
  //   res.status(400).send({ errorMessage: result.error.details[0].message });
  //   return;
  // }
  // find a lawyer
  const lawyerArray = await findLawyerWithMinimumActiveCases();
  const lawyer = lawyerArray[0];
  // create a case
  rawRentalagreementData.user = req.user._id;
  rawRentalagreementData.lawyer = lawyer._id;
  const rentalAgreement = await new models.rentalAgreements(
    rawRentalagreementData
  ).save();
  // Update lawyer's, find and update user's instance
  lawyer.activeCases += 1;
  lawyer.rentalAgreementCases.push(rentalAgreement._id);
  await lawyer.save();
  const user = await models.users.findById(req.user._id);
  user.activeCases += 1;
  user.rentalAgreementCases.push(rentalAgreement._id);
  await user.save();
  res.status(200).send({
    rentalAgreement,
    lawyer: { _id: lawyer._id, name: capitalizeFirstLetter(lawyer.name) },
  });
});

module.exports = router;
