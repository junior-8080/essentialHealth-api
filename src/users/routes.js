import express from "express";
import * as userControllers from "./controller.js";
const router = express.Router();

router.post("/", userControllers.createUser);
router.get("/", userControllers.fetchUsers);
router.get("/:user_id", userControllers.fetchUser);
router.put("/", userControllers.updateUser);
// router.get("/:user_id");

export default router;
