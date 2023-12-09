import mongoose from "mongoose";

const UserMediaActivitySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "User", // Reference to the Category model
  },
  content_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "Content", // Reference to the Category model
  },
  points: {
    type: Number,
    default: 0,
  },
  isChallenge: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default UserMediaActivitySchema;
