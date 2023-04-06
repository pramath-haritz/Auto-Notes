import Student from "@/models/Student";
import Teacher from "@/models/Teacher";
import connectDB from "@/lib/connect";

const validate = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    var data;
    if (req.body.type == "Student") {
      data = new Student(req.body.data);
    } else {
      data = new Teacher(req.body.data);
    }
    const dataToSave = await data.save();
    res.json(dataToSave);
  }
};

export default connectDB(validate);
