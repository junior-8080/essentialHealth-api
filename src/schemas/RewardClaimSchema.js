import mongoose from "mongoose";

const RewardClaimSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  reward_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Reward"
  },
  status: {
    type: String,
    default: "Not Fulfilled"
  },

  created_at: {
    type: Date,
    default: Date.now
  }
});

export default RewardClaimSchema;
