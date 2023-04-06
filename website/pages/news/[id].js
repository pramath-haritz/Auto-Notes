import Footer from "@/components/Footer";
import Headers from "@/components/Header";
import { Avatar } from "@mui/material";
import { useRouter } from "next/router";
import md from "markdown-it";
import axios from "axios";
import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    initState();
  }, []);

  async function initState() {
    setOpen(true);
    const response = await axios.post("/api/getParticularArticle", { id: id });
    setOpen(false);
    console.log(response.data);
    setData({ ...response.data });
  }
  return (
    <div className="bg-opacity-10 bg-orange-900 min-h-screen">
      <Headers />
      <div className=" bg-opacity-5 bg-orange-900 w-screen py-4 flex justify-center">
        <h1 className="font-semibold text-3xl">
          {data.article == undefined ? "" : data.article.title}
        </h1>
      </div>
      <div className="px-8 sm:px-48 mt-8">
        <h1>
          {data.article == undefined ? "" : data.article.genre} |{" "}
          {data.article == undefined ? "" : data.article.createdAt}
        </h1>
        <div className="flex flex-row mt-2 mb-8 items-center">
          <Avatar src={`${data.profileURL}`}></Avatar>
          <h1 className="ml-2">{data.writerName}</h1>
        </div>
        <article className="prose max-w-full">
          <div
            dangerouslySetInnerHTML={{
              __html: md({ html: true }).render(
                data.article == undefined ? "" : data.article.data
              ),
            }}
          />
        </article>
      </div>
      <div className="pt-8">
        <Footer />
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
