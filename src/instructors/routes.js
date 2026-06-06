import express from "express";
import * as instructorControllers from "./controller.js";
import {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";
const router = express.Router();

router.post("/", routeAccess(permissions.can_create_instructors), instructorControllers.createInstructor);
router.get("/", routeAccess(permissions.can_update_instructors) ,instructorControllers.fetchInstructors);
router.get("/:instructorId", instructorControllers.fetchInstructor);
router.delete("/:instructorId",routeAccess(permissions.can_delete_instructors) ,instructorControllers.deleteInstructor);

export default router;
