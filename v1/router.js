import express from "express";
import passport from "passport";
import AdminRoutes from "./routes/admin.js";
import FileRoutes from "./routes/file.js";
import AuthRoutes from "./routes/auth.js";
import USSDRoutes from "./routes/ussd.js";
import WebHookRoutes from "./routes/webhooks.js";

const router = express.Router();

// Main routes
router.use("/auth", AuthRoutes);
router.use("/ussd", USSDRoutes);
router.use("/webhooks", WebHookRoutes);
router.use(
  "/admins",
  passport.authenticate("jwt", { session: false }),
  AdminRoutes
);
router.use(
  "/photos",
  passport.authenticate("jwt", { session: false }),
  FileRoutes
);

// Home
router.get("/", (request, response, next) => {
  response.status(200).send(`API Version (${process.env.API_VERSION})`);
});

// 404
router.use((request, response) => {
  response.status(404).json({ message: "404 Path Not Found" });
});

export default router;
