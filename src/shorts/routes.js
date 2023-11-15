import express from "express";
import * as shortControllers from "./controller.js";
import authorize from "../utils/middleware.js";
const router = express.Router();

router.post("/", authorize, shortControllers.createShort);
router.put("/:shortId", authorize, shortControllers.updateShort);
router.get("/", shortControllers.fetchShorts);
router.get("/:shortId", shortControllers.fetchShort);

export default router;
