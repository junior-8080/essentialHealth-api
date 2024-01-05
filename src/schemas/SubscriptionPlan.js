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
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default SubscriptionPlan;
