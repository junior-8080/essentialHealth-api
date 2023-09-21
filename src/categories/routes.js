import express from "express";
import * as categoryControllers from "./controller.js";
const router = express.Router();

router.post("/", categoryControllers.createCategory);
router.get("/", categoryControllers.fetchCategories);
router.get("/:category_id", categoryControllers.fetchCategory);

export default router;
