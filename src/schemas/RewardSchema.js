import mongoose from "mongoose";

// Define the Mongoose schema
const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  type: {
    type: Number,
    required: true,
  },
  points: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
  image: {
    type: String,
  },
  voucher_code: {
    type: String,
    require: true,
  },
  location: {
    type: String,
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
