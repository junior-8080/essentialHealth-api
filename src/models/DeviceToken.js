import mongoose from "mongoose";
import DeviceTokenSchema from "../schemas/DeviceTokenSchema.js";

export default mongoose.model("DeviceToken", DeviceTokenSchema);
