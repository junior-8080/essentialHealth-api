import mongoose from "mongoose";
import InstructorSchema from "../schemas/InstructorSchema.js";

export default mongoose.model("Instructor", InstructorSchema);
