import mongoose from "mongoose";
import MessageSchema from "../schemas/MessageSchema.js";

export default mongoose.model("Message", MessageSchema);
