import mongoose from "mongoose";
import MediaSchema from "../schemas/MediaSchema.js";

export default mongoose.model("Media", MediaSchema);
