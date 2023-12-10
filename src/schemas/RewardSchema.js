import mongoose from "mongoose";

// Define the Mongoose schema
const RewardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  redeem_procedure: {
    type: String,
  },
  points: {
    type: Number,
    required: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default RewardSchema;
