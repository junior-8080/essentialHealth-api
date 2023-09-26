import express from "express";
import * as contentControllers from "./controller.js";
import authorize from "../utils/middlewares.js";
const router = express.Router();

router.post("/", authorize, contentControllers.createContent);
router.put("/:content_id", authorize, contentControllers.updateContent);
router.get("/", contentControllers.fetchContents);
router.get("/:content_id", contentControllers.fetchContent);

export default router;
