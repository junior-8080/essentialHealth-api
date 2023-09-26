import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    unique: false,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  imageURL: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "User",
  },
  state: {
    type: String,
    required: false,
    default: "Active",
  },
  subscription_type: {
    type: String,
    enum: ["standard", "premium"],
    default: "standard",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

// Pre-hook for hashing password before save
// AdminSchema.pre("save", async function (next) {
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// Schema method to check for password match
// AdminSchema.methods.isValidPassword = async function (password) {
//   const compare = await bcrypt.compare(password, this.password);
//   return compare;
// };

export default UserSchema;
