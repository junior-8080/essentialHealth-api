import express from "express";
import * as rewardControllers from "./controller.js";
import authorize, {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";

const router = express.Router();

router.post("/", authorize, routeAccess(permissions.can_create_reward), rewardControllers.createReward);
router.put("/:rewardId", routeAccess(permissions.can_update_reward), authorize, rewardControllers.updateReward);
router.get("/", rewardControllers.fetchRewards);
router.get("/:rewardId", rewardControllers.fetchReward);
router.delete("/:rewardId", rewardControllers.deleteReward);

export default router;
