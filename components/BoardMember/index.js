import React, { useEffect } from "react";
import { useRouter } from "next/router";
import AOS from "aos";

const BoardMember = ({ imgUrl, name, title, description, url }) => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 700,
    });
  }, []);
  return (
    <div className="grid gap-8  lg:grid-cols-2 mt-14 overflow-x-hidden" data-aos="fade-up">
      <div>
      <img className="mx-auto" src={imgUrl} alt={name} />
      </div>
      <div className="flex flex-col justify-center lg:max-w-[470px]">
        <p className="text-xl">{name} </p>
        <p className="text-lg font-bold uppercase mt-2 mb-7">{title}</p>
        <p className="leading-6 text-[#322E29B2] text-justify">{description}</p>
        <button
          onClick={() => router.push(url)}
          className="bg-[#1D5506] hover:bg-white hover:text-[#1D5506] hover:border hover:border-[#1D5506] hover:scale-105 mt-7 px-10 py-3 w-fit text-white"
        >
          See More
        </button>
      </div>
    </div>
  );
};

export default BoardMember;
