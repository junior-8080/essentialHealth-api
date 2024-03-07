import mongoose from "mongoose";
import LabSchema from "../schemas/LabSchema.js";

export default mongoose.model("Lab", LabSchema);
