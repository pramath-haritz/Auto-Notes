import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
    role: { required: true, type: String },
    profileURL: { required: true, type: String },
    password: { required: true, type: String },
  },
  { timestamps: true }
);
const Test = mongoose.models.User || mongoose.model("User", dataSchema);

export default Test;
//module.exports = mongoose.model('User', dataSchema)
