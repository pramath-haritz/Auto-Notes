import Student from "@/models/Student.js";
import connectDB from "@/lib/connect";
import Teacher from "@/models/Teacher.js";

const getParticularArticle = async (req, res) => {
  if (req.method == "POST") {
    var article;
    if (req.body.type == "Student") {
      article = await Student.findById(req.body.id);
    } else {
      article = await Teacher.findById(req.body.id);
    }
    res.json(article);
  }
};

export default connectDB(getParticularArticle);
