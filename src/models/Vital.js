import mongoose from "mongoose";
import VitalTagSchema from "../schemas/VitalSchema.js";
import VitalSchema from "../schemas/VitalSchema.js";

export default mongoose.model("Vital", VitalSchema);
