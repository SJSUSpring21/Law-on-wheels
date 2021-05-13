"use strict";

const config = {
    frontendUrl: "http://localhost:3000",
    // frontendUrl: "http://lawonwheels.herokuapp.com",
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
    CASE_TYPE_MUTUAL_DIVORCE: "MUTUAL_DIVORCE",
    RENT_AGREEMENT_TENANT_CLIENT: "TENANT",
    RENT_AGREEMENT_LANDLORD_CLIENT: "LANDLORD",
    WAITING_FOR_REVIEW_STATUS: "WAITING_FOR_REVIEW",
    REVIEWING_STATUS: "REVIEWING",
    REJECTED_STATUS: "REJECTED",
    APPROVED_STATUS: "APPROVED",
    FILING_JOINT_PETITION: "FILING_JOINT_PETITION",
    APPEAR_IN_COURT_FIRST_MOTION: "APPEAR_IN_COURT_FIRST_MOTION",
    APPEAR_IN_COURT_SECOND_MOTION: "APPEAR_IN_COURT_SECOND_MOTION",
};

module.exports = config;
