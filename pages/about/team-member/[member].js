import { useContext, useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import Subscribe from "../../../components/Subscribe/Subscribe";
import { CgFacebook } from "react-icons/cg";
import { FaLinkedin, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";
import AOS from "aos";

import { MembersContext } from "../../_app";

const Member = () => {
  const router = useRouter();
  const { teamMembers } = useContext(MembersContext);
  const memberName = router.query.member;
  const memberObj = teamMembers?.find((item) => item.id === memberName);

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 1500,
    });
  }, [])

  return (
    <div className="bg-[#F5F5F5]">
      <Navbar />
      <div className="h-[20vh]"></div>
      <section className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-20 mt-10 sm:pb-16 overflow-x-hidden">
        <p className="text-sm text-green-900 uppercase font-semibold mb-3 tracking-[6px]">{`About us > Team Members`}</p>
        <p className="text-lg sm:text-2xl font-semibold uppercase tracking-wide">
          Meet the awesome people behind the scene
        </p>
        <div className="grid gap-8 lg:gap-0 xl:grid-cols-2 mt-14 place-items-center xl:place-items-start ">
          <div data-aos="zoom-out">
            <img
              className="sm:max-w-[500px]"
              src={memberObj?.imgUrl}
              alt="muhammed"
            />
            <div className="flex gap-7 items-center mt-7">
              <CgFacebook className="cursor-pointer" color="green" size={24} />
              <FaTwitter className="cursor-pointer" color="green" size={24} />
              <FaLinkedin className="cursor-pointer" color="green" size={24} />
            </div>
          </div>
          <div className="flex flex-col justify-center xl:max-w-[520px]">
            <p className="text-xl tracking-widest">{memberObj?.name} </p>
            <p className="text-lg font-bold uppercase mt-2 mb-7 tracking-wider">
              {memberObj?.title}
            </p>
            <div className="leading-7 text-[#322E29B2] text-justify">
              {memberObj?.longDescription.map((desc, i) => (
                <p className="mb-3" key={i}>{desc}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section>
        <Subscribe />
      </section>
      <Footer />
    </div>
  );
};
export default Member;
