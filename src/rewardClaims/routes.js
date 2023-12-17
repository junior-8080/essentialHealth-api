import express from "express";
import * as rewardClaimServices from "./controller.js";
// import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", rewardClaimServices.createRewardClaim);
router.get("/", rewardClaimServices.fetchRewardClaims);
router.get("/:rewardClaimId", rewardClaimServices.fetchRewardClaim);
router.put("/:rewardClaimId", rewardClaimServices.updateRewardClaim);
router.delete("/:rewardClaimId", rewardClaimServices.deleteRewardClaim);

export default router;
