import mongoose from "mongoose";
import RewardSchema from "../schemas/RewardSchema.js";

export default mongoose.model("Reward", RewardSchema);
