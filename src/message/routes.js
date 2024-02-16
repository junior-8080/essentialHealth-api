import express from "express";
import * as messageControllers from "./controller.js";
const router = express.Router();

router.post("/messages", messageControllers.createMessage);
router.get("/messages", messageControllers.fetchMessages);
router.get("", messageControllers.fetchMessageChats);
router.get("messages/:messageId", messageControllers.fetchMessage);
router.delete("/:messageId", messageControllers.deleteMessage);

export default router;
