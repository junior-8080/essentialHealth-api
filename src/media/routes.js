import express from "express";
import * as userControllers from "./controller.js";
import uploadStorage from "../config/multer.config.js";
import multer from "multer";
const router = express.Router();
const upload = multer({ storage: uploadStorage });

router.post("/", upload.single("file"), userControllers.createMedia);
router.get("/", userControllers.fetchAllMedia);
router.get("/:media_id", userControllers.fetchMedia);

export default router;
