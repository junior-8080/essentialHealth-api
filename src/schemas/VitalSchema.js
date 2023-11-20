import mongoose from "mongoose";

const VitalTargetSchema = new mongoose.Schema({
  blood_pressure: {
    progress: { type: Number },
    target: { type: Number },
    unit: { type: String },
  },
  sugar_level: {
    progress: { type: Number },
    target: { type: Number },
    unit: { type: String },
  },
  steps: {
    progress: { type: Number },
    target: { type: Number },
    unit: { type: String },
  },
  water_cups: {
    progress: { type: Number },
    target: { type: Number },
    unit: { type: String },
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "User", // Reference to the Category model
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default VitalTargetSchema;
