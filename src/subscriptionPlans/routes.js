import express from "express";
import * as subscriptionPlanControllers from "./controller.js";
const router = express.Router();

router.post("/", subscriptionPlanControllers.createSubscriptionPlan);
router.get("/", subscriptionPlanControllers.fetchSubscriptionPlans);
router.get("/:planId", subscriptionPlanControllers.fetchSubscriptionPlan);
router.put("/:planId", subscriptionPlanControllers.updateSubscriptionPlan);
router.delete("/:planId", subscriptionPlanControllers.deleteSubscriptionPlan);

export default router;
