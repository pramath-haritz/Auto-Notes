import Head from "next/head";
import Image from "next/image";
import logo from "../public/assets/logo.png";
import styles from "@/styles/Home.module.css";
import Counter from "@/components/Counter";
import HomeComponent from "@/components/Home";
import Headers from "@/components/Header";
import { useRouter } from "next/router";
import TypewriterComponent from "typewriter-effect";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen bg-gradient-to-t from-purple-50 to-purple-100">
      <div className="flex flex-row justify-between items-center pt-4 px-12">
        <h1 className="font-head text-7xl">EdTech</h1>
        <button
          class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
          type="submit"
          onClick={() => {
            router.push("/login");
          }}
        >
          <div className="flex flex-row items-center">
            <span className="text-xl">Login</span>
          </div>
        </button>
      </div>
      <div className="grid grid-cols-2 pt-24">
        <div className=" pl-16">
          <div className="mt-24">
            <TypewriterComponent
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    "<h1 style='font-size:40px;font-weight: 600;font-family: 'League Gothic', sans-serif;'>EdTech platform for Neurodivergent people</h1"
                  )
                  .pauseFor(2000)
                  .deleteAll()
                  .typeString(
                    "<h1 style='font-size:40px;font-weight: 600;font-family: 'League Gothic', sans-serif;'>Introducing EdTech. The all in one solution to help everyone learn and focus on their studies easily</h1"
                  )
                  .start();
              }}
            ></TypewriterComponent>
          </div>
          <button
            class="x-6 drop-shadow-xl font-small rounded-md bg-purple-500 mt-8 py-5 px-8 text-white"
            type="submit"
            onClick={() => {
              router.push("/signUp");
            }}
          >
            <div className="flex flex-row items-center">
              <span className="text-xl">Sign Up</span>
            </div>
          </button>
        </div>
        <div className="flex justify-center ">
          <img src="https://cdn3d.iconscout.com/3d/premium/thumb/school-bag-4035958-3342383.png?f=webp"></img>
        </div>
      </div>
    </div>
  );
}
