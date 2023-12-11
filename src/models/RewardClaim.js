import mongoose from "mongoose";
import RewardClaimSchema from "../schemas/RewardClaimSchema.js";

export default mongoose.model("RewardClaim", RewardClaimSchema);
