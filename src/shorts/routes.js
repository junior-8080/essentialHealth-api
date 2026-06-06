import express from "express";
import * as shortControllers from "./controller.js";
import authorize, {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";
const router = express.Router();

router.post("/", authorize,routeAccess(permissions.can_create_shorts), shortControllers.createShort);
router.put("/:shortId", authorize,routeAccess(permissions.can_update_shorts) ,shortControllers.updateShort);
router.get("/", shortControllers.fetchShorts);
router.get("/:shortId", shortControllers.fetchShort);
router.delete("/:shortId", shortControllers.deleteShort);

export default router;
