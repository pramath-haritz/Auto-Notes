import { useRouter } from "next/router";

export default function NewsCard(props) {
  const router = useRouter();
  return (
    <div
      className="p-8 "
      onClick={() => {
        if (props.newArticle) {
          router.push("/news/" + props.id);
        } else {
          router.push("/create/" + props.id);
        }
      }}
    >
      <div
        className="bg-cardBackground rounded-md min-h-full shadow-orange-900/20 shadow-lg hover:shadow-orange-900/20 hover:shadow-xl hover:scale-105 transition duration-50 ease-linear"
        style={{
          backgroundImage:
            "url('https://img.freepik.com/premium-photo/cardboard-sheet-paper-abstract-texture-background_7182-2191.jpg')",
          backgroundPosition: "center",
        }}
      >
        <img
          className=" rounded-t-md"
          style={{ height: "250px", width: "100%" }}
          src={`${props.imageURL}`}
        ></img>
        <div className="p-8">
          <h1 className="font-bold text-2xl font-merriweather">
            {props.headline}
          </h1>
          <p className="text-greySubtitle my-1 font-typewriter">
            {props.genre} | {props.date}
          </p>
          <p className="font-typewriter">{props.desc}</p>
        </div>
      </div>
    </div>
  );
}
