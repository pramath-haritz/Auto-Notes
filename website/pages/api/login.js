import connectDB from "@/lib/connect";
import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import jwt from "jsonwebtoken";

const validate = async (req, res) => {
  if (req.method == "POST") {
    const student = await Student.findOne({ email: req.body.email });
    if (student.password == req.body.password) {
      res.json({ token: student._id, type: "Student" });
    } else {
      const teacher = await Teacher.findOne({ email: req.body.email });
      if (teacher.password == req.body.password) {
        res.json({ token: student._id, type: "Teacher" });
      }
      res.json({ token: "" });
    }
  }
};

export default connectDB(validate);
