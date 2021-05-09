"use strict";

// imports
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const users = require("./users/routes");
const lawyers = require("./lawyers/routes");
const rentalAgreement = require("./rentalAgreement/routes");
const mutualDivorce = require("./mutualDivorce/routes");
const adminRoute = require("./admin/routes");
const cases = require("./cases/routes");
const mongoose = require("./configuration/database");
const models = require("./models/modelsStore");
const config = require("./configuration/config");

const { initializePassport } = require("./configuration/passport");

// Port Number
const PORT = process.env.PORT || 3001;

// Initializing the Application
const app = express();

// Adding the middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors({ origin: config.frontendUrl, credentials: true }));

// Using Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
initializePassport();

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.frontendUrl);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

// Add routes in the app
app.use("/users", users);
app.use("/lawyers", lawyers);
app.use("/rentalagreement", rentalAgreement);
app.use("/cases", cases);
app.use("/mutualdivorce", mutualDivorce);
app.use("/admin", adminRoute);
// Start the server
app.listen(PORT, () => {
  console.log("Backend Server started on port: ", PORT);
});
