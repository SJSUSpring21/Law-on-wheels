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
  CASE_TYPE_RENTAL_AGREEMENT: "RENTAL_AGREEMENT",
  RENT_AGREEMENT_TENANT_CLIENT: "TENANT",
  RENT_AGREEMENT_LANDLORD_CLIENT: "LANDLORD",
  WAITING_FOR_REVIEW_STATUS: "WAITING_FOR_REVIEW",
  REVIEWING_STATUS: "REVIEWING",
  REJECTED_STATUS: "REJECTED",
  APPROVED_STATUS: "APPROVED",
};

module.exports = config;
