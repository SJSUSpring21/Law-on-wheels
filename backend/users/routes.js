const express = require("express");
const Joi = require("joi");
const models = require("../models/modelsStore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { requireSignIn } = require("../configuration/passport");
const config = require("../configuration/config");
const {
  checkIfEmailIsAlreadyUsedAsLawyer,
  capitalizeFirstLetter,
} = require("../helpers/utils");
const { rentalAgreements } = require("../models/modelsStore");

// Initializing Router
const router = express.Router();

// User SignUp API
router.post("/signup", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .max(64)
      .regex(/^[a-zA-Z ]*$/)
      .messages({
        "any.required": "Enter a valid name.",
        "string.empty": "Enter a valid name.",
        "string.pattern.base": "Enter a valid name",
        "string.max": "Length of the name should not exceed 64 characters",
      }),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Enter a valid email.",
        "string.empty": "Enter a valid email.",
        "any.required": "Enter a valid email.",
      }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password is required.",
    }),
  });

  // Validating schema for the input fields
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Check whether this email is used by lawyer or not
  const isEmailUsed = await checkIfEmailIsAlreadyUsedAsLawyer(req.body.email);
  // ||
  // (await checkIfEmailIsAlreadyUsedAsUser(req.body.email));

  if (isEmailUsed) {
    res.status(400).send({
      errorMessage: "Account belonging to this email already exists.",
    });
    return;
  } else {
    // Create user
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());
    const userObject = {
      name: name,
      email: email,
      password: hashedPassword,
      type: config.USER_TYPE,
    };
    const rawUser = new models.users(userObject);
    try {
      const user = await rawUser.save();
      const payload = {
        _id: user._id,
        name: name,
        email: email,
        type: config.USER_TYPE,
      };
      const jwtToken = jwt.sign(payload, config.jwtSecretKey, {
        expiresIn: config.jwtExpiryTime,
      });
      const response = {
        _id: user._id,
        name: capitalizeFirstLetter(user.name),
        email: user.email,
        type: config.USER_TYPE,
        token: jwtToken,
      };
      res.status(200).send(response);
      return;
    } catch (error) {
      if (error.code === config.databaseErrorCodes.uniqueKeyConstraintError) {
        res.status(400).send({
          errorMessage: "Account belonging to this email already exists.",
        });
      } else {
        res.status(400).send({
          errorMessage: error,
        });
      }
    }
  }
});

// Login route
router.post("/login", async (req, res) => {
  // Creating a schema for validating input fields
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required()
      .messages({
        "string.email": "Must be a valid email.",
        "string.empty": "Email cannot be empty.",
        "any.required": "Email is required.",
      }),
    password: Joi.string().required().messages({
      "string.empty": "Password is required.",
      "any.required": "Password cannot be empty",
    }),
  });
  // Validate the input fields
  const result = await schema.validate(req.body);
  if (result.error) {
    res.status(400).send({ errorMessage: result.error.details[0].message });
    return;
  }

  // Login
  models.users
    .findOne({
      email: req.body.email.toLowerCase(),
    })
    .then(async (user) => {
      if (
        user === null ||
        !(await bcrypt.compare(req.body.password, user.password))
      ) {
        res.status(201).send({
          errorMessage: "Invalid email or password",
        });
      } else {
        let unsignedJwtUserObject = {
          _id: user._id,
          name: capitalizeFirstLetter(user.name),
          email: user.email,
          type: config.USER_TYPE,
        };
        // Generate a JWT token
        const jwtToken = jwt.sign(unsignedJwtUserObject, config.jwtSecretKey, {
          expiresIn: config.jwtExpiryTime,
        });

        unsignedJwtUserObject = Object.assign(unsignedJwtUserObject, {
          language: user.language,
          number: user.number,
          timezone: user.timezone,
          image: user.image,
        });

        res.status(200).send({
          ...unsignedJwtUserObject,
          token: jwtToken,
          message: "Logged in successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        errorMessage: err,
      });
    });
});

// getUserData route
router.post("/getUser/:user_id", async (req, res) => {
  console.log("inside get user profile");
  console.log("req.body", req.params.user_id);
  models.users
    .findOne({
      _id: req.params.user_id,
    })
    .then(async (user) => {
      if (user === null) {
        res.status(201).send({
          errorMessage: "No user Details",
        });
      } else {
        let UserObject = {
          _id: user._id,
          name: capitalizeFirstLetter(user.name),
          email: user.email,
          number: user.number,
          dob: user.dateOfBirth,
          aadhar: user.aadhar,
          gender: user.gender,
          address: user.address,
          state: user.state,
          city: user.city,
          zipCode: user.zipCode,
          type: config.USER_TYPE,
        };
        console.log("userObj", UserObject);

        res.status(200).send({
          ...UserObject,
          message: "User fetched  successfully.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        errorMessage: err,
      });
    });
});

// updateUser route
router.post("/updateUser", async (req, res) => {
  console.log("inside update user profile");
  console.log("req.body", req.body);
  models.users
    .findOne({
      _id: req.body.user_id,
    })
    .then(async (user) => {
      if (user === null) {
        res.status(201).send({
          errorMessage: "No user Details",
        });
      } else {
        //update user
        (user.name = req.body.name || user.name),
          (user.email = req.body.email || user.email),
          (user.number = req.body.phoneNumber || user.number);
        (user.dateOfBirth = req.body.dob || user.dateOfBirth),
          (user.aadhar = req.body.aadhar || user.aadhar),
          (user.gender = req.body.gender || user.gender),
          (user.address = req.body.address || user.address),
          (user.state = req.body.state || user.state),
          (user.city = req.body.city || user.city),
          (user.zipCode = req.body.zipcode || user.zipCode),
          console.log("saving user information: ");
        user.save((err) => {
          if (err) {
            console.log("save error", err);
            res.status(400).send({
              errorMessage: err,
            });
          } else {
            res.status(200).send({
              message: "User updated successfully.",
            });
          }
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        errorMessage: err,
      });
    });
});

router.get("/dashboard", requireSignIn, async (req, res) => {
  // lawyer not allowed
  if (req.user.type === config.LAWYER_TYPE) {
    res.status(405).send({ errorMessage: "Lawyers not allowed." });
  } else {
    const ongoingRentalAgreementCases = [];
    const completedRentalAgreementCases = [];
    const rejectedRentalAgreementCases = [];
    const ongoingMutualDivorceCases = [];
    const completedMutualDivorceCases = [];
    const rejectedMutualDivorceCases = [];
    const user = await models.users
      .findById(
        req.user._id,
        "name email activeCases completedCases rejectedCases rentalAgreementCases mutualDivorceCases"
      )
      .populate({
        path: "rentalAgreementCases",
        select: "status type lawyer",
        populate: {
          path: "lawyer",
          select: "name email",
        },
      })
      .populate({
        path: "mutualDivorceCases",
        select: "status type lawyer",
        populate: {
          path: "user",
          select: "name email",
        },
      });

    // Filter out rental agreement cases
    await user.rentalAgreementCases.forEach((temp) => {
      if (temp.status === config.APPROVED_STATUS) {
        completedRentalAgreementCases.push({
          _id: temp._id,
          lawyer: temp.lawyer,
          type: config.CASE_TYPE_RENTAL_AGREEMENT,
          status: temp.status,
        });
      } else if (temp.status === config.REJECTED_STATUS) {
        rejectedRentalAgreementCases.push({
          _id: temp._id,
          lawyer: temp.lawyer,
          type: config.CASE_TYPE_RENTAL_AGREEMENT,
          status: temp.status,
        });
      } else {
        ongoingRentalAgreementCases.push({
          _id: temp._id,
          lawyer: temp.lawyer,
          type: config.CASE_TYPE_RENTAL_AGREEMENT,
          status: temp.status,
        });
      }
    });

    // Filter out the mutual divorce cases
    await user.mutualDivorceCases.forEach((temp) => {
      if (temp.status === config.APPROVED_STATUS) {
        completedMutualDivorceCases.push({
          _id: temp._id,
          user: temp.user,
          type: config.CASE_TYPE_MUTUAL_DIVORCE,
          status: temp.status,
        });
      } else if (temp.status === config.REJECTED_STATUS) {
        rejectedMutualDivorceCases.push({
          _id: temp._id,
          user: temp.user,
          type: config.CASE_TYPE_MUTUAL_DIVORCE,
          status: temp.status,
        });
      } else {
        ongoingMutualDivorceCases.push({
          _id: temp._id,
          user: temp.user,
          type: config.CASE_TYPE_MUTUAL_DIVORCE,
          status: temp.status,
        });
      }
    });

    res.status(200).send({
      _id: user._id,
      name: user.name,
      email: user.email,
      type: config.USER_TYPE,
      ongoingRentalAgreementCases,
      completedRentalAgreementCases,
      rejectedRentalAgreementCases,
      ongoingMutualDivorceCases,
      completedMutualDivorceCases,
      rejectedMutualDivorceCases,
      activeCases: user.activeCases,
      completedCases: user.completedCases,
      rejectedCases: user.rejectedCases,
    });
  }
});
module.exports = router;
