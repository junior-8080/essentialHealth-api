import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema({
  name: String,
  descriptions: String,
  fileUrl: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isMedia: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

export default MediaSchema;
