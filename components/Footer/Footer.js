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
      className="text-white -mt-12 py-20 bg-gradient-to-br from-[#2E9F00] to-[#F7BD01]"
      style={{
        backgroundImage: "url(/images/footer-bg.png)",
        backgroundSize: "cover",
      }}
    >
      <div className="flex space-y-2 flex-wrap w-[90%]  mx-auto text-white">
        <div className="flex-1  min-w-[300px]">
          <h2 className="text-2xl font-extrabold mb-6">Head Office</h2>
          <p className="sm:w-4/5">
          6th Floor, Yobe Investment House, Plot 1332, Ralph Shodeinde Street, Central
            Business District, Fct-Abuja.
          </p>
          <span className="block my-2"><a href="mailto:enquiries@dnamazcapital.com">enquiries@dnamazcapital.com</a></span>
          <span className="block mb-2"><a href="tel:+234 916 444 1444">+234 916 444 1444</a></span>
         
        </div>
        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-extrabold mb-6">Other Links</h2>
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
        <div className="flex-1">
          <h2 className="text-2xl font-extrabold mb-6">
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
                <FacebookIcon />
              </a>
            </div>
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="underline"
                href="https://www.instagram.com/dnamazcapital/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
            </div>
            <div className="hover:bg-[#1D5506] h-[60px] w-[60px] rounded-full flex justify-center items-center">
              <a
                className="underline"
                href="https://twitter.com/dnamazcapital"
                target="_blank"
                rel="noopener noreferrer"
              >
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
                <LinkedInIcon />
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
