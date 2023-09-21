import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
  title: String,
  fileUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default mediaSchema;
