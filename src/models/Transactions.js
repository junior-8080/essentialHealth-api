import mongoose from "mongoose";
import TransactionSchema from "../schemas/TransactionSchema.js";

export default mongoose.model("Transactions", TransactionSchema);
