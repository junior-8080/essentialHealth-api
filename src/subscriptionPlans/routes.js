import express from "express";
import * as subscriptionPlanControllers from "./controller.js";
import {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";

const router = express.Router();

router.post("/", routeAccess(permissions.can_create_subscription_plans), subscriptionPlanControllers.createSubscriptionPlan);
router.get("/", routeAccess(permissions.can_update_subscription_plans), subscriptionPlanControllers.fetchSubscriptionPlans);
router.get("/:planId", subscriptionPlanControllers.fetchSubscriptionPlan);
router.put("/:planId", subscriptionPlanControllers.updateSubscriptionPlan);
router.delete("/:planId", subscriptionPlanControllers.deleteSubscriptionPlan);

export default router;
