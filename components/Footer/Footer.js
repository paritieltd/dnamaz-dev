import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";
import { FaArrowRight } from "react-icons/fa";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "../SvgIcon/SvgIcon";
import { FaXTwitter } from "react-icons/fa6";


const Footer = () => {
  const router = useRouter();
  return (
    <footer
      className="text-white -mt-12 py-40 bg-gradient-to-br from-[#2E9F00] to-[#F7BD01]"
      style={{
        backgroundImage: "url(/images/footer-bg.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="grid md:grid-cols-3 max-sm:grid-cols-1 gap-6  w-[90%]  mx-auto text-white">
      

        <img src="/images/NDPR.png" alt="" className="md:w-[100%] object-cover max-sm:w-[50%]"/>
        <div className=" w-[100%]">
          <h2 className="text-2xl font-extrabold font-lex mb-6">Head Office</h2>
          <p className="sm:w-4/5">
          6th Floor, Yobe Investment House, Plot 1332, Ralph Shodeinde Street, Central
            Business District, Fct-Abuja.
          </p>
          <span className="block my-2"><a href="mailto:enquiries@dnamazcapital.com">enquiries@dnamazcapital.com</a></span>

          <span className="block mb-2"><a href="tel:+234 916 444 1444">+234 916 444 1444</a></span>
          <span className="block mb-2"><a href="tel:+2349164441444">0916 444 1444</a></span>

         
        </div>
        {/* min-w-[300px] */}
        <div className=" w-[100%] ">
          <h2 className="text-2xl  mb-6 font-lex">Other Links</h2>
          <div className="flex flex-col space-y-6">
            <div
              className="cursor-pointer"
              onClick={() => router.push("/privacy")}
            >
              Privacy and Cookies Policy
            </div>
            <div className="cursor-pointer" onClick={() => router.push("/regulatory")}>Regulatory and Disclosures</div>
          </div>
        </div>
        <div className="">
          <h2 className="text-2xl mb-6">
            Follow us on Social Media
          </h2>
          <div className="flex space-x-4">
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="text-white"
                href="https://www.facebook.com/DnamazCapital"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon  className="text-sm lg:text-base xl:text-xl" />
              </a>
            </div>
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="underline"
                href="https://www.instagram.com/dnamazcapital/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon  className="text-sm lg:text-base xl:text-xl"/>
              </a>
            </div>
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="underline"
                href="https://twitter.com/dnamazcapital"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaXTwitter  className="text-sm lg:text-base xl:text-xl"/>

                <FaXTwitter />
              </a>
            </div>
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="underline"
                href="https://www.linkedin.com/company/d-namaz-capital-limited/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon  className="text-sm lg:text-base xl:text-xl"/>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto">
        <hr className="my-8" />
        <span className="block ">
          All rights Reserved. © 2022 Dnamaz Capital Limited.
        </span>
      </div>
    </footer>
  );
};

export default Footer;