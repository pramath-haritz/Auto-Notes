import { useRouter } from "next/router";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Latex from "react-latex-next";
import { Avatar, Dialog, DialogTitle } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import md from "markdown-it";
import mk from "@iktakahiro/markdown-it-katex";
import { useEffect, useState } from "react";
import { BsFillCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { HiSpeakerphone } from "react-icons/hi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { subjects } from "@/models/subjects";
//import { entirenote } from "@/models/notes";
import Head from "next/head";
import Script from "next/script";
export default function Article() {
  const router = useRouter();
  const { id } = router.query;
  const [sopen, setSopen] = useState(false);
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [substate, setSubstate] = useState(0);
  const [noofnotes, setNoOfNotes] = useState(0);
  const [image, setImage] = useState("");
  const [details, setDetails] = useState("");
  const [entirenote, setEntireNote] = useState("");
  const [pause, setPause] = useState(0);
  const [notes, setNotes] = useState([
    {
      title: String.raw`\begin{enumerate}
\item Evolution of a gas: $\mathrm{CaCO_3} \rightarrow \mathrm{CaO} + \mathrm{CO_2}$
\item Change in colour: $\mathrm{FeSO_4} + \mathrm{Cu} \rightarrow \mathrm{FeSO_4} + \mathrm{CuSO_4}$
\item Change in state: $\mathrm{H_2O} \rightarrow \mathrm{Ice}$
\item Formation of a precipitate: $\mathrm{Na_2SO_4} + \mathrm{BaCl_2} \rightarrow \mathrm{2NaCl} + \mathrm{BaSO_4}$
\end{enumerate}`,
      clicked: false,
    },
    { title: "Note 1", clicked: false },
    { title: "Note 1", clicked: false },
  ]);

  var chapter = [
    {
      title: "Acids, Bases and Salts",
    },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
    { title: "Acids, Bases and Salts" },
  ];
  const handleClose = (value) => {
    setSopen(false);
  };
  useEffect(() => {
    setTimeout(function () {
      initState();
    }, 10000);
  }, []);

  // More API functions here:
  // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/image

  // the link to your model provided by Teachable Machine export panel
  const URL = "https://teachablemachine.withgoogle.com/models/WOmQ1_JFt/";

  let model, webcam, labelContainer, maxPredictions;

  // Load the image model and setup the webcam
  async function initState() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
    // or files from your local hard drive
    // Note: the pose library adds "tmImage" object to your window (window.tmImage)

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    while (true) {
      try {
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();
        webcam = new tmImage.Webcam(200, 200, flip);
      } catch (e) {
        continue;
      }
      break;
    }
    // width, height, flip
    await webcam.setup(); // request access to the webcam
    await webcam.play();
    window.requestAnimationFrame(loop);

    // append elements to the DOM
    if (document.getElementById("webcam-container").childNodes.length == 0) {
      document.getElementById("webcam-container").appendChild(webcam.canvas);
    }
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
      // and class labels
      labelContainer.appendChild(document.createElement("div"));
    }
  }

  async function loop() {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  // run the webcam image through the image model
  async function predict() {
    // predict can take in an image, video or canvas html element
    const prediction = await model.predict(webcam.canvas);
    print(prediction[0].probability.toFixed(2));
    if (prediction[0].probability.toFixed(2) >= 0.8) {
      // router.push("/subject/Mathematics");
    }
    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ": " + prediction[i].probability.toFixed(2);
      labelContainer.childNodes[i].innerHTML = classPrediction;
    }
  }

  return (
    <div className="bg-purple-100 min-h-screen">
      <div id="webcam-container"></div>
      <div id="label-container"></div>
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></Script>

      <div className="flex flex-row justify-around py-8">
        <MdKeyboardArrowLeft
          size={32}
          onClick={() => {
            var lsubjects = substate == 0 ? subjects : chapter;
            var lid = substate == 0 ? id : chapter[substate - 1].title;
            let index;
            for (index = 0; index < lsubjects.length; index++) {
              const element = lsubjects[index];
              console.log(element.title);
              console.log(lid);
              if (element.title == lid) {
                if (index == 0) {
                  index = lsubjects.length - 1;
                } else {
                  index--;
                }
                router.push(lsubjects[index].link);
                break;
              }
            }
          }}
        />
        <h1 className="text-3xl font-bold">
          {substate == 0 ? id.toUpperCase() : "Chapter " + substate}
        </h1>
        <MdKeyboardArrowRight
          size={32}
          onClick={() => {
            var lsubjects = substate == 0 ? subjects : chapter;
            console.log(lsubjects);
            let index;
            for (index = 0; index < lsubjects.length; index++) {
              const element = lsubjects[index];
              console.log(element.title);
              console.log(id);
              if (element.title == id) {
                if (index == lsubjects.length) {
                  index = 0;
                } else {
                  index++;
                }
                router.push(lsubjects[index].link);
              }
            }
          }}
        />
      </div>
      {substate == 0 ? (
        <div className="grid grid-cols-4 py-20 px-24">
          {chapter.map((v, i) => {
            return (
              <div
                onClick={async () => {
                  setOpen(true);
                  const beforeResponse = await axios.post("/api/findChapter", {
                    chapter: (i + 1).toString(),
                    subject: id,
                  });
                  console.log(beforeResponse);
                  var response;
                  if (beforeResponse.data == "null") {
                    console.log("If");
                    response = await axios.post("http://127.0.0.1:8080/", {
                      search:
                        `Could you please parse Chapter ` +
                        (i + 1).toString() +
                        ` of the ncert grade 10 ` +
                        id +
                        ` textbook by CBSE and follow the given instructions to generate a response:
1) analyze the chapter and hierarchically categorize each section and subsection.
2) for each section and subsection bifurcation, understand the topic or subtopic and give a minimum of 8 points to explain it in great detail.
3) if there are any equations or formulae in the mentioned chapter, parse them and add them under their respective subheadings or headings .
4)All formulae generated in the response have to be in KaTeX code only.
5)make sure all the remaining text generated is in text format.`,
                    });
                    const afterResponse = await axios.post(
                      "/api/createChapter",
                      {
                        chapter: (i + 1).toString(),
                        subject: id,
                        note: response.d,
                      }
                    );
                    setEntireNote(String.raw`${response.data}`);
                  } else {
                    console.log("Else");
                    response = beforeResponse;
                    setEntireNote(String.raw`${beforeResponse.data.note}`);
                  }

                  setOpen(false);
                  setSubstate(i + 1);
                }}
                style={{ width: "240px" }}
                className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16 mt-8  flex flex-col justify-center items-center"
              >
                <span className="mt-8 text-xl font-small w-90 text-justify">
                  Chapter {i + 1}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-md drop-shadow-2xl mx-8 bg-purple-50 py-16">
          <div className="flex justify-end">
            <button
              onClick={() => {
                if (pause == 1) {
                  speechSynthesis.pause();
                  setPause(2);
                } else if (pause == 2) {
                  speechSynthesis.resume();
                  setPause(1);
                } else {
                  let utterance = new SpeechSynthesisUtterance(entirenote);
                  console.log(speechSynthesis.getVoices());
                  utterance.voice = speechSynthesis
                    .getVoices()
                    .find((voice) => voice.name === "Alex");
                  speechSynthesis.speak(utterance);
                  setPause(1);
                }
              }}
            >
              <HiSpeakerphone
                size={32}
                className="text-purple-400 mb-12 mr-24"
              />
            </button>
          </div>
          <div className="flex flex-row items-center py-3 px-12">
            <span>
              {entirenote.split("\n").map((innerv) => {
                return (
                  <article className="prose max-w-full">
                    <div
                      onClick={async () => {
                        console.log(innerv);
                        var response = await axios.post(
                          "http://127.0.0.1:8080/image",
                          { search: innerv }
                        );
                        var resp = await axios.post(
                          "http://127.0.0.1:8080/description",
                          { text: innerv }
                        );

                        setDetails(resp.data);
                        console.log(response.data);
                        setImage(String.raw`${response.data}`);
                        setSopen(true);
                      }}
                      dangerouslySetInnerHTML={{
                        __html: md({ html: true }).use(mk).render(innerv),
                      }}
                    />
                  </article>
                );
              })}
            </span>
          </div>
          <button
            class="x-6 m-12 drop-shadow-xl font-small rounded-md bg-gradient-to-r from-purple-400 to-purple-500 py-3 px-8 text-white"
            type="submit"
            onClick={() => {
              localStorage.setItem("quiz", `${substate} ${id}`);
              router.push("/quiz");
            }}
          >
            <div className="flex flex-row items-center">
              <span className="text-xl">Answer Quiz</span>
            </div>
          </button>
        </div>
      )}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Dialog onClose={handleClose} open={sopen}>
        <div className="w-screen flex flex-col">
          <DialogTitle>{details}</DialogTitle>
          {
            <img
              src={`data:image/jpg;base64,${image}`}
              width={480}
              height={480}
            />
          }
        </div>
      </Dialog>
      <Script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest/dist/tf.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/@teachablemachine/image@latest/dist/teachablemachine-image.min.js"></Script>
    </div>
  );
}
