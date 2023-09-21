import express from "express";
import * as authController from "./controller.js";
const router = express.Router();

router.post("/login", authController.login);
router.post("/admin", authController.adminLogin);
router.post("/signup", authController.signUp);
router.post("/verify-otp", authController.verifyOtp);

export default router;
