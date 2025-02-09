import React, { useEffect } from "react";
import Footer from "../../../components/Footer/Footer";
import Navbar from "../../../components/Navbar/Navbar";
import Subscribe from "../../../components/Subscribe/Subscribe";

import AOS from "aos";

const OurValues = () => {
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
        <p className="sm:tracking-[8px] uppercase font-semibold sm:font-bold text-[#1D5506]">
          about us {" > "} our values
        </p>
        <h2 className="font-bold text-4xl sm:text-[45px] mt-3 uppercase">
          our values
        </h2>
        <div className="relative mt-6">
          <img src="/images/values.png" alt="" />
          {/* <h2 className="absolute top-6 left-6 md:top-10 md:left-10 text-[#D6DCE8B2] text-4xl md:text-[140px] font-bold">
            Values
          </h2> */}
        </div>
        <div className="mt-14">
          <h2 className="text-[#2C393F] font-bold text-2xl sm:text-[36px]">
            Professionalism
          </h2>
          <p className="sm:text-xl mt-1 text-justify">
            Professionalism is key in our approach to service delivery. We
            strive to maintain integrity and hold ourselves to the highest moral
            and ethical standards. We take responsibility for our words and
            actions and strive to be independent and avoid conflicts of
            interest. We avail our clients with opportunities and access to
            trusted, objective and fair investment advice.{" "}
          </p>
        </div>
        <div className="mt-14">
          <h2 className="text-[#2C393F] font-bold text-xl sm:text-[36px]">
            Transparency
          </h2>
          <p className="sm:text-xl mt-1 text-justify">
            We are open, honest and consistent in our communications and
            day-to-day dealings both inside and outside of our work. People are
            assured of accurate and transparent information at all times through
            an open process that helps them make informed investment decisions.
          </p>
        </div>
        <div className="mt-14">
          <h2 className="text-[#2C393F] font-bold text-xl sm:text-[36px]">
            Security
          </h2>
          <p className="sm:text-xl mt-1 text-justify">
            Security is about assurance of safety and a sense of protection. We
            are licensed as Fund/Portfolio Managers and so, your investment is
            safe with us. We create an environment where investors feel safe and
            secure to realize their full wealth potentials.
          </p>
        </div>
        <div className="mt-14 mb-10">
          <h2 className="text-[#2C393F] font-bold text-xl sm:text-[36px]">
            People
          </h2>
          <p className="sm:text-xl mt-1 text-justify">
          D&apos;namaz Capital Limited is people-centric, we consider our clients and personnel as our
            biggest assets; we encourage creativity of our people and embrace
            diverse opinions. We also strive to build a strong culture that will
            ensure client&#39;s satisfaction by maintaining an effective communication
            channel with our clients and investors.
          </p>
          <button
          className="bg-[#1D5506] text-white hover:bg-white hover:text-[#1D5506] hover:border hover:border-[#1D5506] hover:scale-105 mt-16 w-[228px] h-[70px] font-bold text-lg flex justify-center items-center"
          onClick={() => router.push("/open-account")}
        >
          Get Started
        </button>
        </div>
        <Subscribe />
      </div>
      <Footer />
    </div>
  );
};

export default OurValues;
