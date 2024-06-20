import express from "express";
import * as VitalControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, VitalControllers.createVital);
router.put("/:vitalId", authorize, VitalControllers.updateVital);
router.get("/", authorize, VitalControllers.fetchVitals);
router.get("/:vitalId", VitalControllers.fetchVital);

export default router;
