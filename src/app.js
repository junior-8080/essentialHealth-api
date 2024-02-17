import express, { response } from "express";
import cors from "cors";
// import http from "http";
import helmet from "helmet";
import morgan from "morgan";
import database from "./config/database.config.js";
import firebase from "./utils/firebase.js";
import { codeMessages } from "./constants/codeMessages.js";
import responseHandler from "./utils/responseHandler.js";
import userRouter from "./users/routes.js";
import authRouter from "./auth/routes.js";
import mediaRouter from "./media/routes.js";
import categoriesRouter from "./categories/routes.js";
import tagsRouter from "./tags/routes.js";
import instructorsRouter from "./instructors/routes.js";
import contentsRouter from "./contents/routes.js";
import shortsRouter from "./shorts/routes.js";
import rewardsRouter from "./rewards/routes.js";
import rewardClaimsRouter from "./rewardClaims/routes.js";
import summariesRoute from "./summaries/routes.js";
import vitalsRoute from "./vitals/routes.js";
import subscriptionPlanRoute from "./subscriptionPlans/routes.js";
import subscriptionRoute from "./subscriptions/routes.js";
import billingRoute from "./billing/routes.js";
import messageRoute from "./messages/routes.js";
import { createUploadDirectories } from "./utils/helpers.js";
import authorize from "./utils/middleware.js";
import { createAdmin } from "./utils/common.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["Cross-Origin-Resource-Policy"]
};

app.use(cors(corsOptions));
const base = process.env.NODE_ENV === "development" ? "/Users/abdulmukhsinahmed" : "";
app.use(helmet());
app.use(morgan("combined"));
app.use("/api/v1/uploads", express.static(`${base}/${process.env.FILE_UPLOAD_DIR}`));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (request, response) =>
  response.status(200).json({ message: codeMessages.API_START_UP, data: { version: process.env.API_VERSION } })
);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authorize, userRouter);
app.use("/api/v1/media", authorize, mediaRouter);
app.use("/api/v1/categories", categoriesRouter);
app.use("/api/v1/tags", tagsRouter);
app.use("/api/v1/instructors", authorize, instructorsRouter);
app.use("/api/v1/contents", authorize, contentsRouter);
app.use("/api/v1/shorts", authorize, shortsRouter);
app.use("/api/v1/rewards", authorize, rewardsRouter);
app.use("/api/v1/reward-claims", authorize, rewardClaimsRouter);
app.use("/api/v1/summaries", summariesRoute);
app.use("/api/v1/vitals", vitalsRoute);
app.use("/api/v1/subscription-plans", subscriptionPlanRoute);
app.use("/api/v1/subscriptions", authorize, subscriptionRoute);
app.use("/api/v1/billing", billingRoute);
app.use("/api/v1/chats", authorize, messageRoute);

app.use((request, response) => {
  const { responsePayload } = response.locals;
  console.log("🚀 ~ app.use ~ responsePayload:", responsePayload);
  return responseHandler(responsePayload, response, codeMessages);
});

const appSetUp = async () => {
  try {
    const AdminData = {
      firstName: process.env.ADMIN_NAME.split(",")[0],
      lastName: process.env.ADMIN_NAME.split(",")[1],
      email: process.env.ADMIN_EMAIL,
      phoneNumber: process.env.ADMIN_NUMBER,
      role: "Admin"
    };
    await database.connect();
    await createAdmin(AdminData);
    firebase.setup();
    createUploadDirectories();
    app.listen(process.env.PORT || 3003, () => {
      console.log(`${codeMessages.API_START_UP} on port:${process.env.PORT} date:${new Date().toISOString()}`);
    });
  } catch (error) {
    console.log("🚀 ~ appSetUp ~ error:", error);
    console.log("Error connecting to database.");
  }
};
appSetUp();

/*
Senior Thomas Setup
 passportConfig.setup();
firebase.setup();
firebase.sendNotificationToMemberById("565");
 paystack.getPaymentLink();
 */
