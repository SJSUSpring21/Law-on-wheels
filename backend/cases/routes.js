const express = require("express");
const Joi = require("joi");
const models = require("../models/modelsStore");
const config = require("../configuration/config");
const { requireSignIn } = require("../configuration/passport");
const ObjectId = require("mongoose").Types.ObjectId;
const {
  checkWhetherNextStatusIsValidForRentalAgreementCase,
} = require("../helpers/utils");

// Initializing Router
const router = express.Router();

// Get case details
router.get("/details/:case_id", requireSignIn, async (req, res) => {
  const data = {
    case_id: req.params.case_id,
    type: req.query.type,
  };

  const schema = Joi.object({
    case_id: Joi.string().required().messages({
      "any.required": "Select a valid case",
    }),
    type: Joi.string()
      .valid(config.CASE_TYPE_RENTAL_AGREEMENT)
      .required()
      .messages({
        "any.required": "Select a valid type",
      }),
  });

  // verify input fields
  const result = await schema.validate(data);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Find the logged in person
  let person;
  if (req.user.type === config.USER_TYPE) {
    person = await models.users.findById(
      req.user._id,
      "name email rentalAgreementCases"
    );
  } else if (req.user.type === config.LAWYER_TYPE) {
    person = await models.lawyers.findById(
      req.user._id,
      "name email rentalAgreementCases"
    );
  }

  let finalData;
  // Check whether an authorized user is only able to access the data
  if (
    data.type === config.CASE_TYPE_RENTAL_AGREEMENT &&
    person.rentalAgreementCases.includes(data.case_id)
  ) {
    finalData = await models.rentalAgreements
      .findById(data.case_id)
      .populate("lawyer", "name email image barCouncilNumber")
      .populate("user", "name email image");
  }
  if (finalData) res.status(200).send({ ...finalData._doc });
  else res.status(400).send({ errorMessage: "Select a valid case" });
});

router.get("/status/next/:case_id", requireSignIn, async (req, res) => {
  const case_id = req.params.case_id;
  const type = req.query.type;
  const allTypes = [config.CASE_TYPE_RENTAL_AGREEMENT];
  if (!ObjectId.isValid(case_id)) {
    res.status(400).send({ errorMessage: "Select a valid case" });
  } else if (!allTypes.includes(type)) {
    res.status(400).send({ errorMessage: "Select a valid type" });
  } else {
    // Only allow lawyers
    if (req.user.type === config.USER_TYPE) {
      res.status(405).send({ errorMessage: "Lawyers only allowed" });
      return;
    }
    // Find the lawyer
    const lawyer = await models.lawyers.findById(
      req.user._id,
      "rentalAgreementCases"
    );
    if (
      type === config.CASE_TYPE_RENTAL_AGREEMENT &&
      lawyer.rentalAgreementCases.includes(case_id)
    ) {
      // Find the case
      const rentalAgreement = await models.rentalAgreements.findById(case_id);
      // Decide the status
      if (rentalAgreement.status === config.WAITING_FOR_REVIEW_STATUS) {
        console.log("INSIDE 2");
        res.status(200).send({
          nextStatuses: [config.REVIEWING_STATUS],
        });
        return;
      } else if (rentalAgreement.status === config.REVIEWING_STATUS) {
        res.status(200).send({
          nextStatuses: [config.APPROVED_STATUS, config.REJECTED_STATUS],
        });
        return;
      } else if (rentalAgreement.status === config.APPROVED_STATUS) {
        res.status(200).send({
          nextStatuses: [],
        });
        return;
      } else if (rentalAgreement.status === config.REJECTED_STATUS) {
        res.status(200).send({
          nextStatuses: [],
        });
        return;
      }
    } else {
      res.status(400).send({ errorMessage: "Select a valid case." });
      return;
    }
  }
});

// TODO :- LEFT

// Change status
router.post("/status/change", requireSignIn, async (req, res) => {
  // All Rental agreement statuses
  const rentalAgreementStatusTypes = [
    config.WAITING_FOR_REVIEW_STATUS,
    config.REVIEWING_STATUS,
    config.APPROVED_STATUS,
    config.REJECTED_STATUS,
  ];

  const schema = Joi.object({
    case_id: Joi.string().required().messages({
      "any.required": "Select a valid case.",
    }),
    type: Joi.string()
      .valid(config.CASE_TYPE_RENTAL_AGREEMENT)
      .required()
      .messages({
        "any.required": "Select a valid type.",
      }),
    newStatus: Joi.string().required().messages({
      "any.required": "Select a valid status.",
    }),
  });

  // validate schema
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Check whether case_id is a valid objectId
  if (!ObjectId.isValid(req.body.case_id)) {
    res.status(400).send({ errorMessage: "Select a valid case." });
    return;
  }

  // Branch out for each status
  if (req.body.type === config.CASE_TYPE_RENTAL_AGREEMENT) {
    // Check whether status is the list of valid statuses or not
    if (!rentalAgreementStatusTypes.includes(req.body.type)) {
      res.status(400).send({ errorMessage: "Select a valid status" });
      return;
    }

    // Find the rental agreement
    const rentalAgreement = await models.rentalAgreements.findById(
      req.body.case_id,
      "user lawyer status"
    );

    let finalRentAgreement;
    // Check whether the next status aligns with the previous status
    if (
      !rentalAgreement ||
      !checkWhetherNextStatusIsValidForRentalAgreementCase(
        rentalAgreement.status,
        req.body.newStatus
      )
    ) {
      res.status(400).send({ errorMessage: "Select a valid status" });
    } else if (req.body.newStatus === config.REVIEWING_STATUS) {
      rentalAgreement.status = req.body.newStatus;
      finalRentAgreement = await rentalAgreement.save();
    } else if (
      req.body.newStatus === config.APPROVED_STATUS ||
      req.body.newStatus === config.REJECTED_STATUS
    ) {
      rentalAgreement.status = req.body.status;
      if (req.body.newStatus === config.APPROVED_STATUS) {
      } else {
      }
    }
  } else {
    res.status(400).send({ errorMessage: "Select a valid case." });
  }
});

module.exports = router;
