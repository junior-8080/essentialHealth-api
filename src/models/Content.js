import mongoose from "mongoose";
import ContentSchema from "../schemas/ContentSchema.js";

export default mongoose.model("Content", ContentSchema);
