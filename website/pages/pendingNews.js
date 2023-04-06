import Headers from "@/components/Header";
import NewsCard from "@/components/NewsCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function PendingNews() {
  const router = useRouter();
  const [pendingNews, setPendingNews] = useState([]);
  const [newArticle, setNewArticle] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    initState();
  }, []);
  async function initState() {
    setOpen(true);
    const response = await axios.get("/api/pendingArticles", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setOpen(false);
    setPendingNews([...response.data.article]);
    if (response.data.role == "Content") {
      setNewArticle(true);
    }
  }
  return (
    <div className="bg-opacity-10 bg-orange-900 min-h-screen">
      <Headers />
      <div className="px-0 sm:px-48 mt-8">
        <div className="flex flex-row w-full justify-between items-center px-8 mb-8 sm:px-0">
          <h1 className="text-3xl font-bold">
            {newArticle == false
              ? "Articles pending approval"
              : "Your Articles"}
          </h1>
          {newArticle ? (
            <button
              class="x-6 my-8 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-gray-800 to-blackButton py-3 px-8 text-beigeText"
              type="submit"
              onClick={async () => {
                router.push("/create/content");
              }}
            >
              <span className="text-xl">New Article</span>
            </button>
          ) : (
            <div></div>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {pendingNews.map((val, i) => {
            return (
              <NewsCard
                key={i}
                imageURL={`${val.imageURL}`}
                headline={`${val.title}`}
                genre={`${val.genre}`}
                date={`${val.createdAt}`}
                desc={`${val.description}`}
                id={`${val._id}`}
                newArticle={newArticle}
              />
            );
          })}
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
