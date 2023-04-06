import connectDB from "@/lib/connect";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

const validate = async (req, res) => {
  if (req.method == "POST") {
    console.log(process.env.NEXT_PUBLIC_API);
    const user = await User.findOne({ email: req.body.email });
    if (user.password == req.body.password) {
      const token = jwt.sign({ _id: user._id }, process.env.NEXT_PUBLIC_API, {
        expiresIn: "1d",
      });
      res.json({ token: token });
    } else {
      res.json({ token: "" });
    }
  }
};

export default connectDB(validate);
