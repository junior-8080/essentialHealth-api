import express, { Router } from "express";
import * as billingControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/create-invoice", authorize, billingControllers.createCheckoutUrl);
router.post("/payment-webhook", billingControllers.paymentWebHook);

export default router;
