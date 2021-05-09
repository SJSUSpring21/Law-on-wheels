const express = require("express");
const { requireSignIn } = require("../configuration/passport");
const Joi = require("joi");
const models = require("../models/modelsStore");
const {
  findLawyerWithMinimumActiveCases,
  capitalizeFirstLetter,
} = require("../helpers/utils");
const config = require("../configuration/config");
const multer = require("multer");
const path = require("path");

// Init storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        req.user._id +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const uploadFile = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
});

// Initializing Router
const router = express.Router();

router.post(
  "/create",
  requireSignIn,
  uploadFile.single("file"),
  async (req, res) => {
    // No lawyers allowed here
    if (req.user.type === config.LAWYER_TYPE) {
      res.status(405).send({ errorMessage: "Not allowed" });
      return;
    }
    // Manipulate request based on the data we get from frontend:
    const rawMutualDivorceData = {
      marriageDate: new Date(
        req.body.domYear + "-" + req.body.domMonth + "-" + req.body.domDay
      ),
      marriagePlace: req.body.pomBanquet,
      marriageCity: req.body.pomCity,
      nameOfHusband: req.body.husbandName,
      nameOfWife: req.body.wifeName,
      religionOfHusband: req.body.husbandReligion,
      religionOfWife: req.body.wifeReligion,
      nameOfFatherOfHusband: req.body.husbandFatherName,
      nameOfFatherOfWife: req.body.wifeFatherName,
      husbandBirthday: req.body.husbandDob,
      wifeBirthday: req.body.wifeDob,
      husbandContact: req.body.husbandContact,
      wifeContact: req.body.wifeContact,
      husbandEmail: req.body.husbandEmail,
      wifeEmail: req.body.wifeEmail,
      husbandPreResidence: req.body.husbandPreResidence,
      wifePreResidence: req.body.wifePreResidence,
      residenceDuringMarriage: req.body.postResidence,
      husbandCurrentResidence: req.body.husbandCurrentResidence,
      wifeCurrentResidence: req.body.wifeCurrentResidence,
      numberOfChildren: req.body.haveChildren,
      needSettlement: req.body.needSettlement,
      settlementDetails: req.body.settleAssets,
    };

    // Set updated file path
    let filePath = null;
    if (req.file) {
      filePath = req.file.path.substring(req.file.path.indexOf("/") + 1);
    }
    // Set file url
    rawMutualDivorceData.documents = filePath;
    // find a lawyer
    const lawyerArray = await findLawyerWithMinimumActiveCases();
    const lawyer = lawyerArray[0];
    // create a case
    rawMutualDivorceData.user = req.user._id;
    rawMutualDivorceData.lawyer = lawyer._id;
    const mutualDivorce = await new models.mutualDivorces(
      rawMutualDivorceData
    ).save();
    // Update lawyer's, find and update user's instance
    lawyer.activeCases += 1;
    lawyer.mutualDivorceCases.push(mutualDivorce._id);
    await lawyer.save();
    const user = await models.users.findById(req.user._id);
    user.activeCases += 1;
    user.mutualDivorceCases.push(mutualDivorce._id);
    await user.save();
    res.status(200).send({
      mutualDivorce,
      lawyer: {
        _id: lawyer._id,
        name: capitalizeFirstLetter(lawyer.name),
      },
    });
  }
);

module.exports = router;
