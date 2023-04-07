import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    chapter: {
      required: true,
      type: String,
    },
    subject: {
      required: true,
      type: String,
    },
    note: { type: String },
  },
  { timestamps: true }
);
const Test = mongoose.models.Chapter || mongoose.model("Chapter", dataSchema);

export default Test;
