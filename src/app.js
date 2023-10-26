import express, { response } from "express";
import cors from "cors";
// import http from "http";
import helmet from "helmet";
import morgan from "morgan";
// import passportConfig from "./config/passport.config.js";
import database from "./config/database.config.js";
// import router from "./router.js";
// import firebase from "./services/firebase.js";
// import { responseHandler } from "./utils/responseHandler.js";
import { codeMessages } from "./constants/codeMessages.js";
import responseHandler from "./utils/responseHandler.js";
// import paystack from "./services/paystack.js";
import userRouter from "./users/routes.js";
import authRouter from "./auth/routes.js";
import mediaRouter from "./media/routes.js";
import categoriesRouter from "./categories/routes.js";
import instructorsRouter from "./instructors/routes.js";
import contentsRouter from "./contents/routes.js";
import summariesRoute from "./summaries/routes.js";
import { createUser } from "./users/service.js";
import { codes } from "./constants/codes.js";
import { createUploadDirectories } from "./utils/helpers.js";
import authorize from "./utils/middlewares.js";

const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  exposedHeaders: ["Cross-Origin-Resource-Policy"],
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
app.use("/api/v1/instructors", authorize, instructorsRouter);
app.use("/api/v1/contents", contentsRouter);
app.use("/api/v1/summaries", summariesRoute);

app.use((request, response) => {
  const { responsePayload } = response.locals;
  return responseHandler(responsePayload, response, codeMessages);
});

database
  .connect()
  .then(() => {
    createUploadDirectories();
    app.listen(process.env.PORT || 3003, () => {
      console.log(`${codeMessages.API_START_UP} on port:${process.env.PORT} date:${new Date().toISOString()}`);
    });
  })
  .then(() => {
    const AdminData = {
      firstName: process.env.ADMIN_NAME.split(",")[0],
      lastName: process.env.ADMIN_NAME.split(",")[1],
      email: process.env.ADMIN_EMAIL,
      phoneNumber: process.env.ADMIN_NUMBER,
      role: "Admin",
    };
    return createUser(AdminData);
  })
  .then((responsePayload) => {
    console.log("Admin Created");
  })
  .catch((error) => {
    switch (error.code) {
      case codes.RESOURCE_EXISTS:
        console.log("Admin Created");
        break;
      default:
        console.log("Error connecting to database.");
        break;
    }
  });

/*
Senior Thomas Setup
 passportConfig.setup();
firebase.setup();
firebase.sendNotificationToMemberById("565");
 paystack.getPaymentLink();
 */
