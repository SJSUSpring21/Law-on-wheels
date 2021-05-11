const express = require("express");
const models = require("../models/modelsStore");
const { requireSignIn } = require("../configuration/passport");
const config = require("../configuration/config");
const { capitalizeFirstLetter } = require("../helpers/utils");
const ObjectId = require("mongoose").Types.ObjectId;
const Joi = require("joi");

// Initializing Router
const router = express.Router();

// Get chat list
router.get("/list", requireSignIn, async (req, res) => {
  let cases = [];

  if (req.user.type === config.USER_TYPE) {
    const user = await models.users
      .findById(req.user._id, "name rentalAgreementCases mutualDivorceCases")
      .populate({
        path: "rentalAgreementCases",
        select: "lawyer user type status",
        populate: {
          path: "lawyer",
          select: "name ",
        },
      })
      .populate({
        path: "mutualDivorceCases",
        select: "lawyer user type status",
        populate: {
          path: "lawyer",
          select: "name",
        },
      });

    user.rentalAgreementCases.forEach((rentalAgreementCase) => {
      cases.push({
        _id: rentalAgreementCase._id,
        loggedInUserType: req.user.type,
        caseType: config.CASE_TYPE_RENTAL_AGREEMENT,
        status: rentalAgreementCase.status,
        lawyer: {
          _id: rentalAgreementCase.lawyer._id,
          name: capitalizeFirstLetter(rentalAgreementCase.lawyer.name),
        },
      });
    });

    user.mutualDivorceCases.forEach((mutualDivorceCase) => {
      cases.push({
        _id: mutualDivorceCase._id,
        loggedInUserType: req.user.type,
        caseType: config.CASE_TYPE_MUTUAL_DIVORCE,
        status: mutualDivorceCase.status,
        lawyer: {
          _id: mutualDivorceCase.lawyer._id,
          name: capitalizeFirstLetter(mutualDivorceCase.lawyer.name),
        },
      });
    });
  } else if (req.user.type === config.LAWYER_TYPE) {
    const lawyer = await models.lawyers
      .findById(req.user._id, "name rentalAgreementCases mutualDivorceCases")
      .populate({
        path: "rentalAgreementCases",
        select: "lawyer user type status",
        populate: {
          path: "user",
          select: "name",
        },
      })
      .populate({
        path: "mutualDivorceCases",
        select: "lawyer user type status",
        populate: {
          path: "user",
          select: "name",
        },
      });

    lawyer.rentalAgreementCases.forEach((rentalAgreementCase) => {
      cases.push({
        _id: rentalAgreementCase._id,
        loggedInUserType: req.user.type,
        caseType: config.CASE_TYPE_RENTAL_AGREEMENT,
        status: rentalAgreementCase.status,
        user: {
          _id: rentalAgreementCase.user._id,
          name: capitalizeFirstLetter(rentalAgreementCase.user.name),
        },
      });
    });

    lawyer.mutualDivorceCases.forEach((mutualDivorceCase) => {
      cases.push({
        _id: mutualDivorceCase._id,
        loggedInUserType: req.user.type,
        caseType: config.CASE_TYPE_MUTUAL_DIVORCE,
        status: mutualDivorceCase.status,
        user: {
          _id: mutualDivorceCase.user._id,
          name: capitalizeFirstLetter(mutualDivorceCase.user.name),
        },
      });
    });
  }
  res.status(200).send({ cases });
});

router.get("/people", requireSignIn, async (req, res) => {
  const case_id = req.query.room;
  let roomCase;
  let type = config.CASE_TYPE_RENTAL_AGREEMENT;
  roomCase = await models.rentalAgreements
    .findById(case_id, "lawyer user")
    .populate("lawyer", "name")
    .populate("user", "name");
  if (!roomCase) {
    type = config.CASE_TYPE_MUTUAL_DIVORCE;
    roomCase = await models.mutualDivorces
      .findById(case_id, "lawyer user")
      .populate("lawyer", "name")
      .populate("user", "name");
  }

  if (ObjectId(roomCase.user._id).equals(ObjectId(req.user._id))) {
    res.status(200).send({
      _id: roomCase._id,
      from: req.user._id,
      fromName: capitalizeFirstLetter(roomCase.user.name),
      to: roomCase.lawyer._id,
      toName: capitalizeFirstLetter(roomCase.lawyer.name),
      fromType: config.USER_TYPE,
      type,
    });
    return;
  } else if (ObjectId(roomCase.lawyer._id).equals(ObjectId(req.user._id))) {
    res.status(200).send({
      _id: roomCase._id,
      from: req.user._id,
      fromName: capitalizeFirstLetter(roomCase.lawyer.name),
      to: roomCase.user._id,
      toName: capitalizeFirstLetter(roomCase.user.name),
      fromType: config.LAWYER_TYPE,
      type,
    });
    return;
  }
  res.send(400).status({ errorMessage: "Enter a valid case!" });
});

router.post("/sendMessage", requireSignIn, async (req, res) => {
  const schema = Joi.object({
    case_id: Joi.string()
      .required()
      .custom((_id, helper) => {
        if (!ObjectId.isValid(_id)) {
          return helper.message("Select a valid user");
        } else {
          return true;
        }
      }),
    message: Joi.string().required(),
    type: Joi.string()
      .required()
      .valid(
        config.CASE_TYPE_MUTUAL_DIVORCE,
        config.CASE_TYPE_RENTAL_AGREEMENT
      ),
  }).messages({
    "any.required": "enter a valid message",
  });

  // Verify input fields
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Find the instance
  let currentCase;

  if (req.body.type === config.CASE_TYPE_MUTUAL_DIVORCE) {
    currentCase = await models.mutualDivorces
      .findById(req.body.case_id, "messages lawyer user")
      .populate("user", "name")
      .populate("lawyer", "name");
  } else if (req.body.type === config.CASE_TYPE_RENTAL_AGREEMENT) {
    currentCase = await models.rentalAgreements
      .findById(req.body.case_id, "messages lawyer user")
      .populate("user", "name")
      .populate("lawyer", "name");
  } else {
    res.status(400).send({ errorMessage: "Select a valid case" });
    return;
  }

  currentCase.messages.push({
    from: req.user._id,
    message: req.body.message,
  });

  await currentCase.save();
  res.status(200).send({
    message: "Successfully sent message",
  });
});

router.get("/getMessages", requireSignIn, async (req, res) => {
  const schema = Joi.object({
    case_id: Joi.string()
      .required()
      .custom((_id, helper) => {
        if (!ObjectId.isValid(_id)) {
          return helper.message("Select a valid case");
        } else {
          return true;
        }
      }),
    type: Joi.string()
      .required()
      .valid(
        config.CASE_TYPE_MUTUAL_DIVORCE,
        config.CASE_TYPE_RENTAL_AGREEMENT
      ),
  }).messages({
    "any.required": "enter a valid message",
  });

  // Verify input fields
  const result = await schema.validate(req.query);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Find the instance
  let currentCase;

  if (req.query.type === config.CASE_TYPE_MUTUAL_DIVORCE) {
    currentCase = await models.mutualDivorces
      .findById(req.query.case_id, "messages lawyer user")
      .populate("user", "name")
      .populate("lawyer", "name");
  } else if (req.query.type === config.CASE_TYPE_RENTAL_AGREEMENT) {
    currentCase = await models.rentalAgreements
      .findById(req.query.case_id, "messages lawyer user")
      .populate("user", "name")
      .populate("lawyer", "name");
    console.log("INSIDE");
  } else {
    res.status(400).send({ errorMessage: "Select a valid case" });
    return;
  }

  const messages = currentCase.messages.map((message) => {
    return {
      _id: message._id,
      message: message.message,
      isSentByCurrentUser: ObjectId(message.from).equals(
        ObjectId(req.user._id)
      ),
    };
  });

  res.status(200).send({ messages });
});

module.exports = router;
