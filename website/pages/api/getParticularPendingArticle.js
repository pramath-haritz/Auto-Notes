import connectDB from "@/lib/connect";
import pendingArticle from "../../models/pendingArticle.js";
import validateToken from "@/lib/validateToken";

const getParticularPendingArticle = async (req, res) => {
  if (req.method == "POST") {
    const user = await validateToken(
      req.headers["authorization"].split(" ")[1]
    );
    if (user.role == "Editor") {
      const article = await pendingArticle.findById(req.body.id);
      res.json(article);
    }
  }
};

export default connectDB(getParticularPendingArticle);
