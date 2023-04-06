import { BsInstagram, BsYoutube, BsLinkedin, BsTwitter } from "react-icons/bs";
export default function Footer() {
  return (
    <div className="w-full bg-footerBackground flex flex-col items-center py-8">
      <div className="flex flex-row pb-4">
        <div className="bg-beigeText p-4 mx-2 rounded-full hover:bg-hoverbeigeText">
          <BsInstagram color="#3C3635" />
        </div>
        <div className="bg-beigeText p-4 mx-2 rounded-full hover:bg-hoverbeigeText">
          <BsYoutube color="#3C3635" />
        </div>
        <div className="bg-beigeText p-4 mx-2 rounded-full hover:bg-hoverbeigeText">
          <BsLinkedin color="#3C3635" />
        </div>
        <div className="bg-beigeText p-4 mx-2 rounded-full hover:bg-hoverbeigeText">
          <BsTwitter color="#3C3635" />
        </div>
      </div>
      <h1 className="text-beigeText font-thin">
        MINERVA 2022 - All rights reserved
      </h1>
      <h1 className="text-beigeText font-thin">
        {"Made with <3 by Web Dev Team"}
      </h1>
    </div>
  );
}
