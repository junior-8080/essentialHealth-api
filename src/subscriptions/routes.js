import express from "express";
import * as subscriptionControllers from "./controller.js";
const router = express.Router();

router.post("/", subscriptionControllers.createSubscription);
router.get("/", subscriptionControllers.fetchSubscriptions);
router.get("/:subscriptionId", subscriptionControllers.fetchSubscription);
router.put("/:subscriptionId", subscriptionControllers.updateSubscription);
router.delete("/:subscriptionId", subscriptionControllers.deleteSubscription);

export default router;
