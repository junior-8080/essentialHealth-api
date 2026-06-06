import mongoose from "mongoose";
import VitalTypeSchema from "../schemas/VitalTypeSchema.js";

export default mongoose.model("VitalType", VitalTypeSchema);
