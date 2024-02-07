import mongoose from "mongoose";

const DeviceTokenSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "User" // Reference to the Category model
  },
  deviceToken: {
    type: String,
    required: true
  }
});

export default DeviceTokenSchema;
