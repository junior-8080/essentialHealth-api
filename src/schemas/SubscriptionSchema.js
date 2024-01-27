import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubscriptionSchema = new Schema({
  billing_reference: {
    type: String,
    ref: "SubscriptionPlan",
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  subscriptionPlan_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubscriptionPlan",
    required: true
  },
  start_date: {
    type: Date,
    default: Date.now
  },
  expiry_date: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default SubscriptionSchema;
