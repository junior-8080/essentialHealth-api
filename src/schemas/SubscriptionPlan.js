import mongoose from "mongoose";

const SubscriptionPlan = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  duration_in_months: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default SubscriptionPlan;
