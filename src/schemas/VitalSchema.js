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
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default VitalTargetSchema;
