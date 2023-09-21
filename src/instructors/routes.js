import express from "express";
import * as instructorControllers from "./controller.js";
const router = express.Router();

router.post("/", instructorControllers.createInstructor);
router.get("/", instructorControllers.fetchInstructors);
router.get("/:instructor_id", instructorControllers.fetchInstructor);

export default router;
