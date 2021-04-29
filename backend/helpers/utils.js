const models = require("../models/modelsStore");
const mongoose = require("mongoose");

const checkIfEmailIsAlreadyUsedAsLawyer = async (email) => {
  const lawyer = await models.lawyers.findOne({ email });
  if (lawyer == null) {
    return false;
  } else {
    return true;
  }
};

const checkIfEmailIsAlreadyUsedAsUser = async (email) => {
  const user = await models.users.findOne({ email });
  if (user == null) {
    return false;
  } else {
    return true;
  }
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  checkIfEmailIsAlreadyUsedAsLawyer,
  checkIfEmailIsAlreadyUsedAsUser,
  capitalizeFirstLetter,
};
