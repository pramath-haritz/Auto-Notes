import { useEffect, useState } from "react";
import md from "markdown-it";
import Headers from "@/components/Header";
import axios from "axios";
import { useRouter } from "next/router";
import { Alert } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
export default function CreateArticle() {
  const router = useRouter();
  const date = new Date();
  const { id } = router.query;
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [invalid, setInvalid] = useState("");
  const [openLoad, setOpenLoad] = useState(false);
  const genreList = [
    "AI/ Machine Learning",
    "Biotechnology",
    "Business",
    "Design",
    "Fasion",
    "History",
    "Life Skills",
    "Psych",
    "Science",
    "Sorts",
  ];
  useEffect(() => {
    initState();
  }, []);
  async function initState() {
    if (id != "content") {
      setOpenLoad(true);
      const response = await axios.post(
        "/api/getParticularPendingArticle",
        { id: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setOpenLoad(false);
      console.log(response.data);
      setData({ ...response.data });
    }
  }
  const changed = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setData({ ...data, ...d });
    console.log(data);
  };

  const publish = async () => {
    try {
      const response = await axios.post("/api/createArticle", data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setInvalid("false");
    } catch (e) {
      setInvalid("true");
    }
  };

  return (
    <div className="bg-opacity-10 bg-orange-900 min-h-screen">
      <Headers />
      <div className="px-0 mt-24 pb-24">
        <div className="sm:px-24">
          <h1 className="text-3xl px-24 font-bold">Publish a new Article:</h1>
          <div className="rounded-xl bg-white w-full my-12 pt-8 drop-shadow-2xl">
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3">
              <div class="text-left flex justify-center items-center">
                <div>
                  <button
                    type="button"
                    class="inline-flex ml-12 w-60 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => {
                      open == false ? setOpen(true) : setOpen(false);
                    }}
                  >
                    {data["genre"] != null ? data["genre"] : "Genre"}
                    <svg
                      class="-mr-1 h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </div>

                <div
                  class={`overflow-y-auto h-32 absolute left-0 ml-72 mt-20 z-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    open == false ? "hidden" : " "
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabindex="-1"
                >
                  <div class="py-1" role="none">
                    {genreList.map((val, i) => {
                      return (
                        <a
                          key={i}
                          class="text-gray-700 block px-4 py-2 text-sm"
                          role="menuitem"
                          tabindex="-1"
                          id="menu-item-0"
                          onClick={(e) => {
                            var d = {};
                            d["genre"] = e.target.firstChild.data;
                            setData({ ...data, ...d });
                            setOpen(false);
                          }}
                        >
                          {val}
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="px-4">
                <input
                  placeholder="Title"
                  onChange={changed("title")}
                  value={`${data.title == undefined ? "" : data.title}`}
                  className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-black focus:border-black focus:ring-1"
                ></input>
              </div>
              <div className="px-4">
                <input
                  placeholder="Image URL"
                  onChange={changed("imageURL")}
                  value={`${data.imageURL == undefined ? "" : data.imageURL}`}
                  className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-black focus:border-black focus:ring-1"
                ></input>
              </div>
            </div>
            <div className="px-4">
              <textarea
                placeholder="Small description"
                onChange={changed("description")}
                value={`${
                  data.description == undefined ? "" : data.description
                }`}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-black focus:border-black focus:ring-1"
              ></textarea>
            </div>
            <div className="px-4">
              <textarea
                rows={10}
                placeholder="Article in markdown format"
                onChange={changed("data")}
                value={`${data.data == undefined ? "" : data.data}`}
                className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-black focus:border-black focus:ring-1"
              ></textarea>
            </div>
            <div className="flex w-full pr-8 justify-end">
              <button
                class="x-6 my-8 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-gray-800 to-blackButton py-3 px-8 text-beigeText"
                type="submit"
                onClick={() => {
                  publish();
                }}
              >
                <span className="text-xl">Publish</span>
              </button>
            </div>
            {invalid != "" ? (
              <div className="flex justify-center">
                {invalid == "true" ? (
                  <Alert severity="error">Error Publishing. Try Again</Alert>
                ) : (
                  <Alert severity="success">Published successfully</Alert>
                )}
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        {data["data"] != null && data["data"] != "" ? (
          <div>
            <div className="px-24 py-8">
              <h1 className="text-3xl mb-8 font-bold">
                Rendered on the website as:
              </h1>
            </div>
            <div className=" bg-opacity-5 bg-orange-900 w-screen py-4 flex justify-center">
              <h1 className="font-semibold text-3xl">
                {data == undefined ? "" : data.title}
              </h1>
            </div>
            <div className="px-24 sm:px-48 py-8">
              <h1>
                {data.genre == undefined ? "" : data.genre} |{" "}
                {date.toISOString()}
              </h1>
              <article className="prose max-w-full">
                <div
                  dangerouslySetInnerHTML={{
                    __html: md({ html: true }).render(data["data"]),
                  }}
                />
              </article>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
