const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const models = require("../models/modelsStore");

router.get("/:user_image", (req, res) => {
    console.log("inside image");
    console.log(req.params);
  var image =
    path.join(__dirname, "..") + "/images/userImages/" + req.params.user_image;
  console.log(image);
  let isPresent = fs.existsSync(image);
  console.log("isPresent", isPresent);
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      path.join(__dirname, "..") + "/images/userImages/avatar-black.svg"
    );
  }
});

const userstorage = multer.diskStorage({
  destination: path.join(__dirname, "..") + "/images/userImages",
  filename: (req, file, cb) => {
    cb(
      null,
      "user" +
        req.params.user_id +
        "-" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const useruploads = multer({
  storage: userstorage,
  limits: { fileSize: 1000000 },
}).single("image");

router.post("/uploads/:user_id", (req, res) => {
  console.log("inside upload image");
  useruploads(req, res, function (err) {
    console.log("file name is:", req.file.filename);
    console.log("params", req.params);

    models.users.findById({ _id: req.params.user_id }, (err, user) => {
      console.log("get user result is:", user);
      if (err) {
        console.log("server error:", err);
        res.status(400).send({
          errorMessage: err,
        });
      } else if (user === null) {
        console.log("No User");
        res.status(201).send({
          errorMessage: "No user Details",
        });
      } else {
        console.log("update user details from DB", user);
        user.image = req.file.filename;

        console.log("Save user information:", user);

        user.save((error) => {
          if (error) {
            console.log(`Saving Error in update profile: ${error}`);
            res.status(400).send({
              errorMessage: err,
            });
          }
          console.log("Successfully Updated");
          res.status(200).send({
            message: "image uploaded successfully.",
          });
        });
      }
    });
  });
});

module.exports = router;
