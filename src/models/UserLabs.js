import mongoose from "mongoose";
import UserLabSchema from "../schemas/UserLabSchema.js";

export default mongoose.model("UserLabs", UserLabSchema);
