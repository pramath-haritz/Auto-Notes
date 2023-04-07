import Chapter from "@/models/Chapters";
import connectDB from "@/lib/connect";

const validate = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);

    const chapter = await Chapter.findOne({
      chapter: req.body.chapter,
      subject: req.body.subject,
    });
    if (chapter == null) {
      res.json("null");
    } else {
      res.json(chapter);
    }
  }
};

export default connectDB(validate);
