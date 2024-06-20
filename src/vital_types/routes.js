import express from "express";
import * as vitalTypeControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, vitalTypeControllers.createVitalType);
router.put("/:vitalTypeId", authorize, vitalTypeControllers.updateVitalType);
router.get("/", vitalTypeControllers.fetchVitalTypes);
router.get("/:vitalTypeId", vitalTypeControllers.fetchVitalType);
router.delete("/:vitalTypeId", vitalTypeControllers.deleteVitalType);

export default router;
