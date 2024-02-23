import express from "express";
import * as userControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.fetchUsers);
router.get("/:userId", userControllers.fetchUser);
router.put("/", userControllers.updateUser);
router.post("/:userId/user-media-activities", userControllers.createUserMediaActivity);
router.post("/:userId/vital-target", userControllers.createUserVitalTarget);
router.get("/:userId/vitals", authorize, userControllers.fetchUserVital);
router.get("/:userId/rewards", authorize, userControllers.fetchUserReward);
// router.get("/:userId/messages", authorize, userControllers.fetchUserMessages);
router.post("/:userId/device-token", userControllers.createDeviceToken);
router.delete("/:userId", userControllers.deleteUser);

export default router;
