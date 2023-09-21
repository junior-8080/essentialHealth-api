import express from "express";
import AppPermissionManager from "../middleware/PermissionsManager.js";
import userProfileController from "../controllers/userProfileController.js";

// Initializations
const router = express.Router();
const appPermissionManager = new AppPermissionManager();

router.get(
  "/",
  appPermissionManager.adminPermissionManager.authorized,
  userProfileController.readAll
);
router.get(
  "/:userId",
  appPermissionManager.adminPermissionManager.authorized,
  userProfileController.readOne
);
router.post(
  "/",
  appPermissionManager.adminPermissionManager.authorized,
  userProfileController.create
);
router.patch(
  "/:userId",
  appPermissionManager.adminPermissionManager.authorized,
  userProfileController.update
);
router.delete(
  "/:userId",
  appPermissionManager.adminPermissionManager.authorized,
  userProfileController.deleteOne
);

export default router;
