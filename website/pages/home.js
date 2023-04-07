import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { subjects } from "@/models/subjects";
export default function Home() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({});
  const [notes, setNotes] = useState([0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    initializer();
  }, []);
  async function initializer() {
    const response = await axios.post("/api/userInfo", {
      type: localStorage.getItem("type"),
      id: localStorage.getItem("userInfo"),
    });
    setUserInfo(response.data);
  }
  return (
    <div>
      <div className="bg-purple-100" style={{ height: "100vh" }}>
        <div className="flex flex-row justify-between items-center pt-4 px-12">
          <h1 className="font-head text-7xl">EdTech</h1>
          <div className="flex flex-row items-center">
            <button
              class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
              type="submit"
              onClick={() => {
                localStorage.setItem("userInfo", "");
                localStorage.setItem("type", "");
                router.push("/");
              }}
            >
              <div className="flex flex-row items-center">
                <span className="text-xl">Logout</span>
              </div>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 ">
          <h3
            className="pt-4 px-20 font-head text-9xl text-indigo-900 font-bold align-middle"
            style={{ paddingTop: "13vh" }}
          >
            Welcome back, {userInfo.name}!
          </h3>
          <div className="flex justify-center">
            {" "}
            <img src="https://cdn3d.iconscout.com/3d/premium/thumb/school-equipment-5831843-4884506.png?f=webp"></img>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-5xl font-small text-black mt-12 ml-24">Subjects</h1>
        <div className="overflow-x-auto flex flex-row px-24 py-12">
          {subjects.map((v) => {
            return (
              <div
                style={{ width: "240px" }}
                onClick={() => {
                  console.log(v.link);
                  router.push(v.link);
                }}
                className="rounded-md  mx-8 drop-shadow-xl font-small  bg-gradient-to-r from-purple-400 to-purple-500 px-8 text-white py-16  flex flex-col justify-center items-center"
              >
                <span className=" text-xl font-small w-90 text-justify">
                  {v.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-5xl font-small text-black mt-12 ml-24">My Notes</h1>
        <div className="overflow-x-auto flex flex-row px-24 py-12">
          {notes.map((v) => {
            return (
              <div
                style={{ width: "240px" }}
                className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16  flex flex-col justify-center items-center"
              >
                <span className="mt-8 text-xl font-small w-90 text-justify">
                  Note Title
                </span>
                <span className="mt-8 text-xl font-small w-90 text-justify">
                  A couple of pointers description
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
