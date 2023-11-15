import mongoose from "mongoose";
import TagSchema from "../schemas/TagSchema.js";

export default mongoose.model("Tag", TagSchema);
