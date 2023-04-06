import { MdAdd } from "react-icons/md";
import Expandible from "@/components/Expandible";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
export default function Teacher() {
  const router = useRouter();
  const [data, setData] = useState({});

  const changed = (props) => (e) => {
    var d = {};
    d[props] = e.target.value;
    setData({ ...data, ...d });
    console.log(data);
  };
  const signUpClick = async () => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      const { latitude, longitude } = coords;
      var d = {};
      d["long"] = longitude;
      d["lat"] = latitude;
      const newData = {
        data: { ...data, ...d },
        type: "Teacher",
      };
      console.log(newData);
      const response = await axios.post("/api/newUser", newData);
      router.push("/login");
    });
  };
  return (
    <div>
      <div className="w-full px-20 pt-24 pb-12"></div>
      <Expandible name="Personal Info">
        <div className="pt-4 grid grid-cols-3">
          <div className="px-4">
            <input
              placeholder="Name"
              onChange={changed("name")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
          <div className="px-4">
            <input
              placeholder="Age"
              onChange={changed("age")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
          <div className="px-4">
            <input
              placeholder="Subject"
              onChange={changed("subject")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
        </div>
        <div className="px-4">
          <input
            placeholder="Email"
            onChange={changed("email")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
        </div>
        <div className="px-4">
          <input
            placeholder="Password"
            onChange={changed("password")}
            className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
          ></input>
        </div>
      </Expandible>
      <Expandible name="Eduation Info">
        <div className="pt-4 grid grid-cols-3">
          <div className="px-4">
            <input
              onChange={changed("school")}
              placeholder="School Name"
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>

          <div className="px-4">
            <input
              placeholder="Class"
              onChange={changed("class")}
              className="w-full my-4 px-4 py-2 text-base border border-gray-300 rounded outline-none focus:ring-purple-500 focus:border-purple-500 focus:ring-1"
            ></input>
          </div>
        </div>
      </Expandible>

      <div className="flex w-full pr-8 justify-end">
        <button
          class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
          type="submit"
          onClick={() => {
            signUpClick();
          }}
        >
          <span className="text-xl">Sign Up</span>
        </button>
      </div>
    </div>
  );
}
