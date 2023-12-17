import express from "express";
import * as rewardControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, rewardControllers.createReward);
router.put("/:rewardId", authorize, rewardControllers.updateReward);
router.get("/", rewardControllers.fetchRewards);
router.get("/:rewardId", rewardControllers.fetchReward);
router.delete("/:rewardId", rewardControllers.deleteReward);

export default router;
