import Expandible from "@/components/Expandible";
import { useState } from "react";
import Student from "@/components/Student";
import Teacher from "@/components/Teacher";

export default function SignUp() {
  const [role, setRole] = useState("Student");
  const selected =
    "p-20 bg-gradient-to-r from-purple-400 to-purple-500 text-white font-small text-lg rounded-lg";
  const notSelected =
    "p-20 border-solid border-2 border-purple-500 text-black font-small text-lg rounded-lg";
  const roleClicked = (option) => {
    setRole(option);
  };

  return (
    <div className="w-screen bg-purple-100  flex items-center justify-center">
      <div className="rounded-xl bg-white w-5/6 my-24 drop-shadow-2xl">
        <h1 className="font-head text-7xl text-center m-24">Sign Up</h1>
        <div className="flex flex-row justify-around">
          <div
            className={role == "Student" ? selected : notSelected}
            onClick={() => {
              roleClicked("Student");
            }}
          >
            Student
          </div>
          <div
            className={role == "Teacher" ? selected : notSelected}
            onClick={() => {
              roleClicked("Teacher");
            }}
          >
            Teacher
          </div>
        </div>
        {role == "Student" ? (
          <Student />
        ) : role == "Teacher" ? (
          <Teacher />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
