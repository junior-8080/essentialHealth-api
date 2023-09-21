import express from "express";
import passport from "passport";
import loginController from "../controllers/loginController.js";
import adminRegistrationController from "../controllers/adminRegistrationController.js";
import otpController from "../controllers/otpController.js";
import refreshTokenController from "../controllers/refreshTokenController.js";
import userController from "../controllers/userController.js";
import checkExistingEmail from "../middleware/UserExists.js";

const router = express.Router();

// Use passport for sign in
router.post("/login", loginController.login);
// Use passport for sign up
router.post(
  "/register",
  checkExistingEmail,
  passport.authenticate("signup", { session: false }),
  adminRegistrationController.signup
);
router.post("/otp/request", otpController.sendOTP);
router.post("/otp/verify", otpController.verifyOTP);
router.post("/forgot-password", userController.resetPassword);
router.post("/change-password", userController.changePassword);
router.delete("/delete-account", userController.deleteAccount);

export default router;
