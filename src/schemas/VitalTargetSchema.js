import mongoose from "mongoose";

const VitalTargetSchema = new mongoose.Schema({
  vitals: {
    blood_pressure: {
      type: Number,
    },
    sugar_level: {
      type: Number,
    },
    steps: {
      type: Number,
    },
    water_cups: {
      type: Number,
    },
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

export default VitalTargetSchema;
