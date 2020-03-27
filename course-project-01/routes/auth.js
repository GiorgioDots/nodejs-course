const express = require("express");
const { check, body } = require("express-validator");
const bcrypt = require("bcryptjs");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom(value => {
        return User.findOne({ email: value }).then(user => {
          if (!user) {
            return Promise.reject("Invalid email or password");
          }
        });
      }),
    check("password")
      .isLength({ min: 5 })
      .withMessage("Password's length must be 5 characters")
      .trim()
      .custom((value, { req }) => {
        return User.findOne({ email: req.body.email }).then(user => {
          return bcrypt.compare(value, user.password).then(doMatch => {
            if (!doMatch) {
              return Promise.reject("Invalid email or password");
            }
          });
        });
      })
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .normalizeEmail()
      .custom((value, { req }) => {
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden");
        // }
        // return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject("Email already exists");
          }
        });
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters"
    )
      .isLength({ min: 5 })
      .trim()
      .isAlphanumeric(),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("The passwords have to match");
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
