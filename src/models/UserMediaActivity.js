import mongoose from "mongoose";
import UserMediaActivitySchema from "../schemas/UserMediaActivitySchema.js";

export default mongoose.model("User_Media_Activity", UserMediaActivitySchema);
