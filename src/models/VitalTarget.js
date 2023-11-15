import mongoose from "mongoose";
import VitalTagSchema from "../schemas/VitalTargetSchema.js";

export default mongoose.model("VitalTarget", VitalTagSchema);
