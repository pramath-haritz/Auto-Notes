import jwt from "jsonwebtoken";
import User from "../models/User.js";

export default async function validateToken(token) {
  const userid = jwt.verify(token, process.env.NEXT_PUBLIC_API);
  const user = User.findById(userid);
  return user;
}
