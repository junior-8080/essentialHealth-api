import express from "express";
import * as tagControllers from "./controller.js";
import authorize, {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";

const router = express.Router();

router.post("/", authorize, routeAccess(permissions.can_create_shorts), tagControllers.createTag);
router.put("/:tagId", authorize, routeAccess(permissions.can_update_shorts), tagControllers.updateTag);
router.get("/", tagControllers.fetchTags);
router.get("/:tagId", tagControllers.fetchTag);
router.delete("/:tagId",authorize, routeAccess(permissions.can_delete_shorts),tagControllers.deleteTag);

export default router;
