export default function AnimatedHeading(props) {
  return (
    <div className="max-w-fit mx-8 my-8">
      <p
        id="featuringPES"
        className="peer max-w-fit transform hover:-translate-y-4 transition duration-500 ease-linear text-3xl font-bold font-merriweather"
      >
        {props.children}
      </p>
      <div className="w-full bg-opacity-30 bg-orange-900 peer-hover:h-1 peer-hover:scale-125 transition duration-500 ease-linear"></div>
    </div>
  );
}
