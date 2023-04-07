import Chapter from "@/models/Chapters";
import connectDB from "@/lib/connect";

const validate = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    var data;
    const chapter = Chapter.findOne({
      chapter: req.body.chapter,
      subject: req.body.subject,
    });
    if (chapter == null) {
      data = new Chapter(req.body);
      const dataToSave = await data.save();
      res.json(dataToSave);
    } else {
      res.json(chapter);
    }
  }
};

export default connectDB(validate);
