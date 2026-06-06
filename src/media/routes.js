import express from "express";
import * as medialControllers from "./controller.js";
import uploadStorage from "../config/multer.config.js";
import multer from "multer";
import {routeAccess} from "../utils/middleware.js";
import {permissions} from "../utils/permissions.js";
const router = express.Router();
const upload = multer({ storage: uploadStorage });

router.post("/",upload.single("file"), medialControllers.createMedia);
router.get("/", medialControllers.fetchAllMedia);
router.get("/:mediaId", medialControllers.fetchMedia);
router.delete("/:mediaId", medialControllers.deleteMedia);

export default router;
