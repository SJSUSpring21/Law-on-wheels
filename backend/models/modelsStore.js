const User = require("./user");
const Lawyer = require("./lawyer");
const RentalAgreement = require("./rentalAgreement");
const MutualDivorce = require("./mutualDivorce");
const models = {
  users: User,
  lawyers: Lawyer,
  rentalAgreements: RentalAgreement,
  mutualDivorces: MutualDivorce,
};
module.exports = models;
