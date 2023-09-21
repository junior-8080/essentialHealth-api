import mongoose from "mongoose";
import { codeMessages } from "../constants/codeMessages.js";

const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    // mongoose.set("useCreateIndex", true);
    console.log(codeMessages.DB_CONNECTED);
  } catch (error) {
    console.log("🚀 ~ file: database.config.js:13 ~ connect ~ error:", error);
    throw error;
  }
};

export default { connect };
