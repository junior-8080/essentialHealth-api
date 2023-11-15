import express from "express";
import * as instructorControllers from "./controller.js";
const router = express.Router();

router.post("/", instructorControllers.createInstructor);
router.get("/", instructorControllers.fetchInstructors);
router.get("/:instructorId", instructorControllers.fetchInstructor);

export default router;
