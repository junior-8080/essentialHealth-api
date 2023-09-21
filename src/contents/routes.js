import express from "express";
import * as contentControllers from "./controller.js";
const router = express.Router();

router.post("/", contentControllers.createContent);
router.get("/", contentControllers.fetchContents);
router.get("/:content_id", contentControllers.fetchContent);

export default router;
