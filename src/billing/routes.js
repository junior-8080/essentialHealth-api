import express, { Router } from "express";
import * as billingControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/create-invoice", authorize, billingControllers.createCheckoutUrl);
router.get("/verify-transaction/:referenceId", authorize, billingControllers.verifyTransaction);
router.post("/payment-webhook", billingControllers.paymentWebHook);

export default router;
