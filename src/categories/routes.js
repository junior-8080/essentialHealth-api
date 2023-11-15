import express from "express";
import * as categoryControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, categoryControllers.createCategory);
router.put("/:categoryId", authorize, categoryControllers.updateCategory);
router.get("/", categoryControllers.fetchCategories);
router.get("/:categoryId", categoryControllers.fetchCategory);

export default router;
