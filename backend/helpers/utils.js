const models = require("../models/modelsStore");
const mongoose = require("mongoose");
const config = require("../configuration/config");

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

const findLawyerWithMinimumActiveCases = async () => {
  return await models.lawyers
    .find({ isApprovedByAdmin: true })
    .sort([
      ["activeCases", "ascending"],
      ["createdAt", "descending"],
    ])
    .limit(1);
};

const checkWhetherNextStatusIsValidForRentalAgreementCase = (
  currentStatus,
  nextStatus
) => {
  if (
    currentStatus === config.WAITING_FOR_REVIEW_STATUS &&
    nextStatus === config.REVIEWING_STATUS
  ) {
    return true;
  } else if (
    currentStatus === config.REVIEWING_STATUS &&
    (nextStatus === config.APPROVED_STATUS ||
      nextStatus === config.REJECTED_STATUS)
  ) {
    return true;
  } else {
    return false;
  }
};

const checkWhetherNextStatusIsValidForMutualDivorceCase = (
  currentStatus,
  nextStatus
) => {
  if (
    currentStatus === config.WAITING_FOR_REVIEW_STATUS &&
    nextStatus === config.REVIEWING_STATUS
  ) {
    return true;
  } else if (
    currentStatus === config.REVIEWING_STATUS &&
    (nextStatus === config.FILING_JOINT_PETITION ||
      nextStatus === config.REJECTED_STATUS)
  ) {
    return true;
  } else if (
    currentStatus === config.FILING_JOINT_PETITION &&
    nextStatus === config.APPEAR_IN_COURT_FIRST_MOTION
  ) {
    return true;
  } else if (
    currentStatus === config.APPEAR_IN_COURT_FIRST_MOTION &&
    (nextStatus === config.APPEAR_IN_COURT_SECOND_MOTION ||
      nextStatus === config.REJECTED_STATUS)
  ) {
    return true;
  } else if (
    currentStatus === config.APPEAR_IN_COURT_SECOND_MOTION &&
    (nextStatus === config.APPROVED_STATUS ||
      nextStatus === config.REJECTED_STATUS)
  ) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  checkIfEmailIsAlreadyUsedAsLawyer,
  checkIfEmailIsAlreadyUsedAsUser,
  capitalizeFirstLetter,
  findLawyerWithMinimumActiveCases,
  checkWhetherNextStatusIsValidForRentalAgreementCase,
  checkWhetherNextStatusIsValidForMutualDivorceCase,
};
