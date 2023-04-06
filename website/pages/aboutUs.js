import AnimatedHeading from "@/animatedComponents/Heading";
import Footer from "@/components/Footer";
import Headers from "@/components/Header";

export default function AboutUs() {
  return (
    <div className=" bg-opacity-10 bg-orange-900">
      <Headers />
      <AnimatedHeading>About Us</AnimatedHeading>
      <h4 className="font-bold text-lg pb-4 mx-8 font-typewriter">
        PES University weekly publication. Bangalore{"'"}s first student-run
        college newspaper. We are a group of thinkers that challenge people
        through good journalism. We strive to provide the required tools and
        knowledge to develop skills and Inspire Change. Click below to know
        more. ~ Minerva (thy Serva)
      </h4>
      <p className="mx-8 font-typewriter">
        What do we do?<br></br> A<br></br> 1. Weekly Newspaper Highlighting
        major events across the world<br></br> 2. Weekly Podcast series<br></br>{" "}
        3. The {'"'}extra{'"'} you deserve<br></br> B<br></br> 1. Workshops on
        storytelling, mass communication, and networking<br></br> 2.
        Collaboration with news houses and marketing agencies<br></br> 3.
        Hands-on exposure through fun events<br></br> C<br></br> 1. Online News
        Cards<br></br> 2. Special Investigative Piece every fourth week<br></br>{" "}
        3. Bi-weekly Arts section featuring in-house creativity
      </p>
      <Footer />
    </div>
  );
}
