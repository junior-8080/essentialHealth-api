import mongoose from "mongoose";

const ContentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  content_type: {
    type: String,
    enum: ["main", "part"]
  },
  cover: {
    type: String,
    required: true
  },
  sections: {
    type: [String],
    default: []
  },
  intro: String,
  source: {
    type: {
      type: String,
      enum: ["audio", "video", "image", "session", "article"]
    },
    body: String
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "Category" // Reference to the Category model
  },
  tags: {
    type: [String]
  },
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId, // Define as ObjectId type
    ref: "Instructor" // Reference to the Category model
  },
  subscriptionPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: ""
  },
  publish_date: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  }
});

export default ContentSchema;
