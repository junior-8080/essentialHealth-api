import mongoose from "mongoose";

const InstructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phoneNumber: {
    type: String,
    unique: true,
  },
  imageURL: {
    type: String,
  },
  introUrl: {
    type: String,
  },
  state: {
    type: String,
    default: "Active",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export default InstructorSchema;
