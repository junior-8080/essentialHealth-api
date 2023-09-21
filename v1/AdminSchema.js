import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
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
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: false,
    },
    organizationID: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
      default: "Active",
    },
    permissions: Array,
  },
  { versionKey: false }
);

// Pre-hook for hashing password before save
AdminSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

// Schema method to check for password match
AdminSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
};

export default AdminSchema;
