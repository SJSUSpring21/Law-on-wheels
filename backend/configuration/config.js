"use strict";

const config = {
  frontendUrl: "http://localhost:3000",
  mongodbUri:
    "mongodb+srv://root:root@lawonwheels.2xl2a.mongodb.net/LawOnWheels?retryWrites=true&w=majority",
  jwtSecretKey: "secretKey",
  jwtExpiryTime: 120000,
  databaseErrorCodes: {
    uniqueKeyConstraintError: 11000,
  },
  LAWYER_TYPE: "LAWYER",
  USER_TYPE: "USER",
};

module.exports = config;
