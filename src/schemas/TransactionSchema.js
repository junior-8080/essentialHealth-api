import mongoose from "mongoose";
// Define the schema
const TransactionSchema = new mongoose.Schema({
  reference: {
    type: String,
  },
  amount: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Pending",
  },
  metadata: {
    subscriptionPlanId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    username: String,
    phoneNumber: String,
  },
});
export default TransactionSchema;
