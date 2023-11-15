import mongoose from "mongoose";
import ShortSchema from "../schemas/ShortSchema.js";

export default mongoose.model("Short", ShortSchema);
