import express from "express";
import * as contentControllers from "./controller.js";
import authorize from "../utils/middlewares.js";
const router = express.Router();

router.get("/:summaryType", contentControllers.summaries);

export default router;
