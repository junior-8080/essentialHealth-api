import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  message: {
    type: String,
    required: true
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default MessageSchema;
