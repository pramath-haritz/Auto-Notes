import connectDB from "@/lib/connect";
import pendingArticle from "../../models/pendingArticle.js";
import Article from "../../models/Article.js";

async function articles(req, res) {
  if (req.method == "POST") {
    if (req.body.selectedGenres.length == 0) {
      if (req.body.limit == undefined) {
        var allarticles = await Article.find().sort({ _id: -1 });
      } else {
        var allarticles = await Article.find()
          .sort({ _id: -1 })
          .limit(req.body.limit);
      }
      res.json(allarticles);
    } else {
      const selectedArticles = [];
      for (const key in req.body.selectedGenres) {
        console.log(key);
        const article = await Article.find({
          genre: req.body.selectedGenres[key],
        });
        selectedArticles.push(...article);
      }
      res.json(selectedArticles);
    }
  }
}

export default connectDB(articles);
