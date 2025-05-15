import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import {
  FacebookIcon,
  InstagramIcon,
  LetterIcon,
  LinkedInIcon,
  PhoneIcon,
  TwitterIcon,
} from "../../components/SvgIcon/SvgIcon";
import Subscribe from "../../components/Subscribe/Subscribe";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";

const Contact = () => {
  const router = useRouter();

  return (
    <div>
      <Navbar />
      <div className="max-w-[1400px] mx-auto p-4 text-[#322E29]">
        <div className="h-[15vh]"></div>

        <div className="lg:flex xl:pb-52">
          {/* Left Column */}
          <div className="flex-1">
            <div className="mt-16">
              <h1 className="text-[#1D5506] text-[40px] sm:text-[64px] font-black">
                Contact Us
              </h1>
              <p className="sm:max-w-[600px] font-medium text-lg sm:text-2xl">
                Whatever your investment needs are, get in touch – let’s help
                you work out suitable plans. Our customer support is available
                Monday–Friday, 8am–5pm.
              </p>

              <div className="mt-16 space-y-6">
                <div className="flex items-center space-x-5 sm:space-x-10">
                  <PhoneIcon />
                  <span className="font-medium text-xl sm:text-2xl">
                    <a href="tel:+2349164441444">+234 916 444 1444</a>
                  </span>
                </div>

                <div className="flex items-start space-x-5 sm:space-x-10">
                  <LetterIcon />
                  <span className="font-medium text-lg sm:text-2xl">
                    <a href="mailto:enquiries@dnamazcapital.com">
                      enquiries@dnamazcapital.com
                    </a>
                  </span>
                </div>

                <div className="flex space-x-4 pt-2">
                  <a
                    href="https://www.facebook.com/DnamazCapital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#1D5506] hover:text-white h-[60px] w-[60px] rounded-full flex justify-center items-center"
                  >
                    <FacebookIcon />
                  </a>
                  <a
                    href="https://www.instagram.com/dnamazcapital/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#1D5506] hover:text-white h-[60px] w-[60px] rounded-full flex justify-center items-center"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://twitter.com/dnamazcapital"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#1D5506] hover:text-white h-[60px] w-[60px] rounded-full flex justify-center items-center"
                  >
                    <TwitterIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/d-namaz-capital-limited/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:bg-[#1D5506] hover:text-white h-[60px] w-[60px] rounded-full flex justify-center items-center"
                  >
                    <LinkedInIcon />
                  </a>
                </div>
              </div>

              <button
                onClick={() => router.push("/open-account")}
                className="bg-[#1D5506] h-[70px] font-bold text-lg w-[220px] flex justify-center items-center text-white mt-6"
              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1">
            <div className="w-[80%] mx-auto lg:ml-auto mt-6 lg:mt-0">
              <img src="/images/Rukayyacopy.jpg" alt="Contact Visual" />
            </div>
          </div>
        </div>

        <Subscribe />
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
