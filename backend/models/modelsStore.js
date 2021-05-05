const User = require("./user");
const Lawyer = require("./lawyer");
const RentalAgreement = require("./rentalAgreement");
const models = {
  users: User,
  lawyers: Lawyer,
  rentalAgreements: RentalAgreement,
};
module.exports = models;
