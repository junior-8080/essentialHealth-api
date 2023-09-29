import express from "express";
import * as categoryControllers from "./controller.js";
import authorize from "../utils/middlewares.js";
const router = express.Router();

router.post("/", authorize, categoryControllers.createCategory);
router.put("/:category_id", authorize, categoryControllers.updateCategory);
router.get("/", categoryControllers.fetchCategories);
router.get("/:category_id", categoryControllers.fetchCategory);

export default router;
