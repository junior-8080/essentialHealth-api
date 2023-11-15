import mongoose from "mongoose";

const ShortSchema = new mongoose.Schema({
  resource: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
    default: Date.now,
  },
  created_by: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export default ShortSchema;
