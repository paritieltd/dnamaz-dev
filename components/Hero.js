"use client"
import Button from "./Button";
// import CashWallet from "../public/images/cash.png"
// import HalalStamp from "../public/images/halal.png"
import { FaFacebook, FaInstagramSquare, FaLinkedinIn, FaTwitter } from "react-icons/fa"
import { useRouter } from "next/router";
import Image from "next/image";

const  Hero = () => {
  const router = useRouter();
  console.log("This component is working");
  
    return (
      <div id="home">
        <div className="flex justify-center text-center z-10 h-full px-10 lg:px-0">
          <div>
            <p className="text-2xl md:text-7xl text-gray-800 font-lato font-bold leading-snug mt-44">
              <span>
                Earn More... <br />
              </span>{" "}
              <span>The </span>
              <span className="text-primary">Ethical & Halal</span>{" "}
              <span>More.</span>
            </p>
            <p className="mt-4 md:mt-8 max-w-xl mx-auto text-lg md:text-2xl">
              Tailored to every investor's current and future wealth aspiration.
            </p>
            <a href="/open-account" className="mt-10 flex justify-center">
              <Button text="Get Started" />
            </a>
          </div>
        </div>
        <div className="flex justify-between relative w-full">
          <div className="w-[30%]">
            <Image
              src="/images/cash.png"
              alt="cash"
              layout="fill"
              // width={"100%"} 
              className="w-[100%] h-fit z-10"
            />
          </div>
          <div className="mt-10 lg:mt-44 xl:mt-88">
            <p className="font-normal text-center font-Lex text-sm md:font-medium md:text-sm lg:text-sm xl:text-sm mb-1 text-[#322E29]/30">
              Follow us for more
            </p>
            <div className="flex justify-between space-x-4 text-[#1D5506]/60 ">
              <a href="https://www.facebook.com/DnamazCapital">
                <FaFacebook className="text-sm lg:text-base xl:text-xl hover:text-primary" />
              </a>
              <a href="https://www.instagram.com/dnamazcapital/">
                <FaInstagramSquare className="text-sm lg:text-base xl:text-xl hover:text-primary" />
              </a>
              <a href="https://twitter.com/d_namazcapital">
                <FaTwitter className="text-sm lg:text-base xl:text-xl hover:text-primary" />
              </a>
              <a href="https://www.linkedin.com/company/d-namaz-capital-limited/">
                <FaLinkedinIn className="text-sm lg:text-base xl:text-xl hover:text-primary" />
              </a>
            </div>
          </div>
          <div className="w-[30%] relative">
            <Image
              src="/images/halalstamp.png"
              alt="stamp"
              layout="fill"
              className="w-[80%] h-fit z-10 absolute right-0"
            />
          </div>
        </div>
      </div>
    );
}

export default Hero;