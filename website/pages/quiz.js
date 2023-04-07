import Expandible from "@/components/Expandible";
import axios from "axios";
import { useEffect, useState } from "react";

export default function QuizPage() {
  const [listofquestions, setListOfQuestions] = useState([
    {
      question: "Some question?",
      options: ["18", "8", "7", "6"],

      answer: "B",
    },
    {
      question: "Some question?",
      options: ["18", "8", "7", "6"],

      answer: "B",
    },
  ]);
  useEffect(() => {
    initializer();
  }, []);
  async function initializer() {
    const response = await axios.post("http://127.0.0.1:8080/questions", {
      chapter: localStorage.getItem("quiz").split(" ")[0],
      subject: localStorage.getItem("quiz").split(" ")[1],
    });
    console.log(response.data);
    setListOfQuestions([...JSON.parse(response.data)]);
  }
  return (
    <div className="bg-purple-100 min-h-screen">
      <h1 className="text-3xl font-bold py-8 px-16">Take the Quiz</h1>
      <div className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 px-12 py-16">
        {listofquestions.map((v, i) => {
          return (
            <div className="px-24">
              <p>
                Q{i + 1}. {v[Object.keys(v)[0]]}
              </p>
              {v.options == undefined
                ? ""
                : v[Object.keys(v)[1]].map((vi, vii) => {
                    return (
                      <p>
                        {vii + 1}. {vi}
                      </p>
                    );
                  })}
            </div>
          );
        })}
        <Expandible name="Answers">
          {listofquestions.map((v, i) => {
            return (
              <p>
                {i + 1}. {v[Object.keys(v)[2]]}
              </p>
            );
          })}
        </Expandible>
      </div>
    </div>
  );
}
