import connectDB from "@/lib/connect";
import pendingArticle from "../../models/pendingArticle.js";
import validateToken from "@/lib/validateToken";
import Article from "../../models/Article.js";
const getPendingArticles = async (req, res) => {
  if (req.method == "GET") {
    console.log(req.headers["authorization"].split(" ")[1]);
    const user = await validateToken(
      req.headers["authorization"].split(" ")[1]
    );
    if (user.role == "Editor") {
      const articles = await pendingArticle.find();
      res.json({ article: articles, role: user.role });
    } else {
      const contentArticles = await Article.find({ writer: user._id });
      res.json({ article: contentArticles, role: user.role });
    }
  }
};

export default connectDB(getPendingArticles);
