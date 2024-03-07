import mongoose from "mongoose";

const LabSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  criteria: {
    min_age: {
      type: Number,
      required: true
    },
    max_age: {
      type: Number,
      required: true
    },
    gender: {
      type: [
        {
          type: String,
          enum: ["Male", "Female"]
        }
      ],
      required: true
    },
    duration_in_months: {
      type: Number
    }
  }
});

export default LabSchema;
