import express from "express";
import * as contentControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", contentControllers.createContent);
router.put("/:contentId", contentControllers.updateContent);
router.get("/", contentControllers.fetchContents);
router.get("/:contentId", contentControllers.fetchContent);
router.get("/:contentId/sections", contentControllers.fetchContentSections);

export default router;
