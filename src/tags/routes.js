import express from "express";
import * as tagControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, tagControllers.createTag);
router.put("/:tagId", authorize, tagControllers.updateTag);
router.get("/", tagControllers.fetchTags);
router.get("/:tagId", tagControllers.fetchTag);
router.delete("/:tagId", tagControllers.deleteTag);
export default router;
