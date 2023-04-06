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
    parentName: { type: String },
    parentEmail: { type: String },
    password: { type: String },
    age: { type: String },
    disorder: { type: String },
    school: { type: String },
    long: { type: String },
    lat: { type: String },
    class: { type: String },
  },
  { timestamps: true }
);
const Test = mongoose.models.Student || mongoose.model("Student", dataSchema);

export default Test;
