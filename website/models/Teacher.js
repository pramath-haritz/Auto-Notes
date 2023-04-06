import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: { type: String },
    age: { type: String },
    school: { type: String },
    long: { type: String },
    lat: { type: String },
    class: { type: String },
    subject: { type: String },
  },
  { timestamps: true }
);
const Test = mongoose.models.Teachers || mongoose.model("Teachers", dataSchema);

export default Test;
