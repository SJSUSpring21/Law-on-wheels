const express = require("express");
const Joi = require("joi");
const models = require("../models/modelsStore");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../configuration/config");
const {
    checkIfEmailIsAlreadyUsedAsLawyer,
    checkIfEmailIsAlreadyUsedAsUser,
    capitalizeFirstLetter,
} = require("../helpers/utils");

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
                "string.max":
                    "Length of the name should not exceed 64 characters",
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
        const hashedPassword = await bcrypt.hash(
            password,
            await bcrypt.genSalt()
        );
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
            if (
                error.code ===
                config.databaseErrorCodes.uniqueKeyConstraintError
            ) {
                res.status(400).send({
                    errorMessage:
                        "Account belonging to this email already exists.",
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
                const jwtToken = jwt.sign(
                    unsignedJwtUserObject,
                    config.jwtSecretKey,
                    {
                        expiresIn: config.jwtExpiryTime,
                    }
                );

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

module.exports = router;
