import connectDB from "@/lib/connect";
import validateToken from "@/lib/validateToken";
import pendingArticle from "../../models/pendingArticle.js";
import Article from "../../models/Article.js";

const createArticle = async (req, res) => {
  if (req.method == "POST") {
    const user = await validateToken(
      req.headers["authorization"].split(" ")[1]
    );
    console.log(user.role);
    if (user.role == "Editor") {
      console.log(req.body);
      const finalArticle = new Article({
        ...req.body,
        editor: user._id,
      });
      const finalData = await finalArticle.save();
      const finalPendingArticle = await pendingArticle.findByIdAndRemove(
        req.body._id
      );
      res.send(finalData);
    } else {
      const article = new pendingArticle({
        ...req.body,
        Role: user.role,
        writer: user._id,
      });
      const data = await article.save();
      console.log(data);
      res.json(data);
    }
  }
};

export default connectDB(createArticle);
