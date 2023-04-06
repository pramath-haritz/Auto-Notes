import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Counter() {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [sec, setSec] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      const finale = new Date("March 06, 2023 12:48:00");
      const current = new Date();
      const diff = finale.getTime() - current.getTime();
      if (diff < 0) {
        router.push("/");
      }
      setSec(Math.floor((diff / 1000) % 60));
      setMins(Math.floor((diff / 1000 / 60) % 60));
      setHours(Math.floor((diff / 1000 / 60 / 60) % 24));
      setDays(Math.floor(diff / 1000 / 60 / 60 / 24));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      style={{ height: "92vh" }}
      className="flex flex-col justify-center items-center"
    >
      <h1 className="text-3xl font-bold">
        The Minerva Website will be live in
      </h1>
      <p className="text-3xl font-bold">
        {days}:{hours}:{mins}:{sec}
      </p>
    </div>
  );
}
