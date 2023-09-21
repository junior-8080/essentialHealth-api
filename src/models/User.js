import mongoose from "mongoose";
import UserSchema from "../schemas/UserSchema.js";

export default mongoose.model("User", UserSchema);
