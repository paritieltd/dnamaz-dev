// "use client"
import React from "react";
import { useRouter } from "next/router";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import Button from "./Button";


const Footer = () => {
  const router = useRouter();
  return (
    <footer className="">
      <div id="contact">
        <div className="relative text-gray-200">
          <div className="h-10 bg-primary" />
          <img
            src="images/rukayya.png"
            alt="woman"
            className="relative hidden md:flex"
            
          />
          <div className="relative bg-footer md:bg-transparent md:absolute md:inset-x-0 py-5 md:py-0 px-5 md:px-0 md:top-5 md:left-40 lg:left-52 max-w-full h-full md:max-w-2xl">
            <p className="text-4xl lg:text-5xl xl:text-6xl leading-tight font-bold font-lex md:mt-5 lg:mt-20">
              Subscribe to Our <br />
              Newsletter
            </p>
            <p className="mt-2 md:mt-5 lg:mt-10 mb-2 md:mb-5 lg:mb-10">
              Get updates on our promotions by subscribing to our <br /> monthly
              newsletter.
            </p>
            <div>
              <input
                placeholder="Email"
                className="border-b-2 pb-5 bg-transparent w-5/6 mb-2 md:mb-5 lg:mb-10 focus:outline-none"
              />
              <Button text="Subscribe" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-[#2E9F00] to-[#F7BD01] h-8" />
      <div className=" pt-20 pb-10 px-5 md:px-20 bg-footer">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 text-white pb-12">
          <div className="">
            <h2 className="text-xl font-bold mb-6 font-lex">Head Office</h2>
            <p className="">
              6th Floor, Yobe Investment House, <br /> Plot 1332, Ralph
              Shodeinde Street, <br />
              Central Business District, Fct-Abuja.
            </p>
            <span className="block my-2"><a href="mailto:enquiries@dnamazcapital.com">enquiries@dnamazcapital.com</a></span>
            <span className="block mb-2"><a href="tel:+234 9164441444">0916 444 1444</a></span>
          </div>
          <div className="">
            <h2 className="text-xl font-bold mb-6 font-lex">Other Links</h2>
            <div className="flex flex-col space-y-6">
              <div
                className="cursor-pointer"
                onClick={() => router.push("/privacy")}
              >
                Privacy and Cookies Policy
              </div>
              <div
                className="cursor-pointer"
                onClick={() => router.push("/regulatory")}
              >
                Regulatory and Disclosures
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-6 font-lex">
              Follow us on Social Media
            </h2>
            <div className="flex space-x-10">
              <div className="">
                <a href="https://www.facebook.com/DnamazCapital">
                  <FaFacebook className="text-sm lg:text-base xl:text-xl" />
                </a>
              </div>
              <div className="">
                <a href="https://www.instagram.com/dnamazcapital/">
                  <FaInstagramSquare className="text-sm lg:text-base xl:text-xl" />
                </a>
              </div>
              <div className="">
                <a href="https://twitter.com/dnamazcapital">
                  <FaXTwitter className="text-sm lg:text-base xl:text-xl" />
                </a>
              </div>
              <div className="">
                <a href="https://www.linkedin.com/company/d-namaz-capital-limited/">
                  <FaLinkedinIn className="text-sm lg:text-base xl:text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="pt-7 text-white">
          <span>All rights Reserved. © 2022 Dnamaz Capital Limited.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
