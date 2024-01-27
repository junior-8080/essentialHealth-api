import mongoose from "mongoose";
import SubscriptionSchema from "../schemas/SubscriptionSchema.js";

export default mongoose.model("Subscription", SubscriptionSchema);
