import express from "express";
import * as shortControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, shortControllers.createReward);
router.put("/:rewardId", authorize, shortControllers.updateReward);
router.get("/", shortControllers.fetchRewards);
router.get("/:rewardId", shortControllers.fetchReward);

export default router;
