import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  mongoose.set("strictQuery", true);
  if (mongoose.connections[0].readyState) {
    return handler(req, res);
  } else {
    await mongoose.connect(
      process.env.MONGODB_URI + "?retryWrites=true&w=majority",
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    const result = await handler(req, res);
    return result;
  }
};

export default connectDB;
