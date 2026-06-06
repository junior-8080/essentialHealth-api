import express from "express";
import * as vitalTypeControllers from "./controller.js";
import authorize, {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";

const router = express.Router();

router.post("/", authorize, routeAccess(permissions.can_create_vital_types), vitalTypeControllers.createVitalType);
router.put("/:vitalTypeId", authorize, routeAccess(permissions.can_update_vital_types), vitalTypeControllers.updateVitalType);
router.get("/", vitalTypeControllers.fetchVitalTypes);
router.get("/:vitalTypeId", vitalTypeControllers.fetchVitalType);
router.delete("/:vitalTypeId", vitalTypeControllers.deleteVitalType);

export default router;
