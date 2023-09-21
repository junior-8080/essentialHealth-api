import mongoose from "mongoose";
import CategorySchema from "../schemas/CategorySchema.js";

export default mongoose.model("Category", CategorySchema);
