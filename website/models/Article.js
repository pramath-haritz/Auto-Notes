import mongoose from "mongoose";

const dataSchema = new mongoose.Schema(
  {
    data: {
      required: true,
      type: String,
    },
    genre: {
      required: true,
      type: String,
    },
    title: { required: true, type: String },
    imageURL: { required: true, type: String },
    description: { required: true, type: String },
    writer: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
    editor: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);
const Test = mongoose.models.Article || mongoose.model("Article", dataSchema);

export default Test;
//module.exports = mongoose.model('User', dataSchema)
