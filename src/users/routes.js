import express from "express";
import * as userControllers from "./controller.js";

const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.fetchUsers);
router.get("/:userId", userControllers.fetchUser);
router.put("/", userControllers.updateUser);
router.post("/:userId/user-media-activities", userControllers.createUserMediaActivity);
router.post("/:userId/vital-target", userControllers.createUserVitalTarget);
router.get("/:userId/vitals", userControllers.fetchUserVital);
router.get("/:userId/rewards", userControllers.fetchUserReward);
router.get("/:userId/recommended-labs", userControllers.fetchUserRecommendedLabs);
router.post("/:userId/recommended-labs", userControllers.createUserRecommendedLabResult);
router.post("/:userId/labs", userControllers.createUserLab);
router.get("/:userId/labs", userControllers.fetchUserLabs);
router.get("/:userId/untracked-vitals", userControllers.fetchUntrackedVitals);
router.post("/:userId/device-token", userControllers.createDeviceToken);
router.delete("/:userId", userControllers.deleteUser);

export default router;
