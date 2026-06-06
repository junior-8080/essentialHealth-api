import express from "express";
import * as contentControllers from "./controller.js";
import authorize, {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";
const router = express.Router();

router.post("/", routeAccess(permissions.can_create_content) ,contentControllers.createContent);
router.put("/:contentId",routeAccess(permissions.can_update_content) ,contentControllers.updateContent);
router.get("/", contentControllers.fetchContents);
router.get("/:contentId", contentControllers.fetchContent);
router.get("/:contentId/sections", contentControllers.fetchContentSections);
router.delete("/:contentId", routeAccess(permissions.can_delete_content), contentControllers.deleteContent);
export default router;
