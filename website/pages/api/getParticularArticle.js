import connectDB from "@/lib/connect";
import Article from "../../models/Article.js";
import User from "../../models/User.js";

const getParticularArticle = async (req, res) => {
  if (req.method == "POST") {
    const article = await Article.findById(req.body.id);
    const writer = await User.findById(article.writer);
    res.json({
      article: article,
      profileURL: writer.profileURL,
      writerName: writer.name,
    });
  }
};

export default connectDB(getParticularArticle);
