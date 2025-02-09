import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import Subscribe from "../../../components/Subscribe/Subscribe";
import AOS from "aos";
import { motion } from "framer-motion";

const FundingProfiles = () => {
  const router = useRouter();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 700,
    });
  }, []);

  return (
    <div className="text-[#2C393F]">
      <Navbar />
      <div className="h-[20vh]"></div>
      <div className="max-w-[1200px] mx-auto p-4">
        <p className="sm:tracking-[8px] uppercase font-semibold sm:font-bold text-[#1D5506] overflow-x-hidden">
          about us {" > "} profiles
        </p>
        <h2 className="font-bold text-3xl sm:text-[45px] mt-3 uppercase">
          FUNDING PROFILES
        </h2>
        <div className="relative mt-6">
          <img src="/images/profile.png" alt="" />
          <h2 className="absolute bottom-6 right-6 md:bottom-10 md:right-20  text-white text-4xl md:text-[90px] font-bold">
            PROFILES
          </h2>
        </div>
        <div className="mt-14 mb-20" data-aos="fade-up">
          <h2 className="text-[#2C393F] font-bold text-2xl sm:text-[36px]">
            Professionalism
          </h2>
          <div className=" sm:text-xl mt-1">
            <p className="mt-3">
              Our primary funding profiles and business activities are focused
              on{" "}
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => router.push("/our-focus/portfolio")}
              >
                Shari’ah&#39;s permissible products
              </span>{" "}
               and do not include:
            </p>
            <div className="mt-5">
              <ul className="list-disc ml-5">
                <li className="mb-1">Alcohol</li>
                <li>Products that contain pork</li>
                <li>
                  Conventional Financial Services (banking, insurance, etc.)
                </li>
                <li>
                  Adult entertainment (betting, gambling and pornography related)
                </li>
              </ul>
              <div className="mt-2">
                Companies that do not comply with the principle of Shari’ah law
                may be removed as investment options, and the compliant
                companies are evaluated according to several financial ratio
                filters.
              </div>
            </div>
          </div>
          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <div
              className="bg-[#1D5506] text-white hover:bg-white hover:text-[#1D5506] hover:border hover:border-[#1D5506] mt-16 w-[228px] h-[70px] font-bold text-lg flex justify-center items-center"
              onClick={() => router.push("/open-account")}
            >
              Get Started
            </div>
          </motion.button>
        </div>
      </div>
      <Subscribe />
      <Footer />
    </div>
  );
};

export default FundingProfiles;
