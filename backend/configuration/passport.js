"use strict";

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const models = require("../models/modelsStore");
const config = require("./config");

let options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.jwtSecretKey;

const initializePassport = () => {
  passport.use(
    new JwtStrategy(options, (decodedPayload, callback) => {
      const _id = decodedPayload._id;
      const type = decodedPayload.type;

      if (type === config.LAWYER_TYPE) {
        models.lawyers.findById(
          _id,
          "number name timezone email",
          (error, user) => {
            if (error) {
              return callback(error, false);
            } else if (user) {
              user.type = config.LAWYER_TYPE;
              callback(null, user);
            } else {
              callback(null, false);
            }
          }
        );
      } else if (type === config.USER_TYPE) {
        models.users.findById(
          _id,
          "number name timezone email",
          (error, user) => {
            if (error) {
              return callback(error, false);
            } else if (user) {
              user.type = config.USER_TYPE;
              callback(null, user);
            } else {
              callback(null, false);
            }
          }
        );
      }
    })
  );
};

const requireSignIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    if (error || !user) {
      const error = {
        errorMessage: "Please login to continue",
      };
      return res.status(401).json(error);
    } else {
      req.user = user;
    }
    return next();
  })(req, res, next);
};

module.exports = {
  initializePassport,
  requireSignIn,
};
