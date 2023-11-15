import mongoose from "mongoose";
import VitalTagSchema from "../schemas/VitalSchema.js";

export default mongoose.model("Vital", VitalTagSchema);
