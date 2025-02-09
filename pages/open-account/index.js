import React from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { useRouter } from "next/router";
// import singleInvestor from '../../public/forms/Single Investor Account Opening Form (Corporate) - Finished.pdf'

const OpenAccount = () => {
  const accountTypes = [
    {
      name: `single investor`,
      href: "./forms/Single Investor Account Opening Form (Corporate) - Finished.pdf",
    },
    {
      name: `single investee`,
      href: "./forms/Single Investee Account Opening Form (Corporate) - Finished.pdf",
    },
    {
      name: "joint investor",
      href: "./forms/Investor Account Opening Form (individual or Joint) - Finished.pdf",
    },
    // {
    //   name: "Corporate investor",
    //   href: "./Single Investee Account Opening Form (Corporate).pdf"
    // },
    {
      name: "joint investee account",
      href: "./forms/Investee Account Opening Form (Individual or Joint) - Finished.pdf",
    },
  ];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f5f5f5] ">
      <Navbar />
      <div className="h-40"></div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between  max-w-[1400px]">
          <div
            onClick={() => router.push("/")}
            className="flex items-center ml-5 lg:ml-20  gap-2 cursor-pointer max-w-[1200px] mx-auto"
          >
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
              <MdKeyboardBackspace color="white" />
            </div>
            <p>Back</p>
          </div>
        </div>
        <section className="max-w-[1100px] mt-10 sm:mt-5 mx-auto px-5 sm:px-10 text-base md:text-xl pb-16">
          <h4 className="text-[36px] text-center my-5 mb-10 font-bold text-custom-primary">
          Account Opening Form Guide
          </h4>
          <div>
            <p className="mb-10">
              This information will let us know more about you and will take not
              more than 5 minutes to complete. Kindly complete for online or
              offline
            </p>
            <p className="my-14">
              Note: You will be required to upload the documents below to
              complete the registration process.
            </p>
            <p>
              A means of Identification (International passport, National
              Identity card) Utility bill e.g Electricity, Water or Waste Bill
              (Utility bill uploaded should not be older than 3 months from the
              date of upload).
            </p>
          </div>
          <h5 className="font-semibold mt-28">
            Select interested account opening form to fill the online form
          </h5>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 mt-5 items-center">
            <button
              // disabled
              onClick={() => {
                router.push("open-account/single-investor")
                // console.log("hey");
              }}
              className="hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              Single Investor
            </button>
            <button
              // disabled
              onClick={() => router.push("open-account/corporate-investor")}
              className="hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              Corporate Investor
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-10 mt-5 items-center">
            <button
              // disabled
              onClick={() => router.push("open-account/single-investee")}
              className="hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              Single Investee
            </button>
            <button
              // disabled
              onClick={() => router.push("open-account/corporate-investee")}
              className="hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              Corporate Investee
            </button>
          </div>
          {/* <div className="mt-28">
            <h3 className="text-xl font-bold mb-2">DOWNLOADABLE FORMS</h3>
            <p>
              Kindly download and fill any of the below listed form in line with
              your preferred investmet options and send the completed forms with
              all required documentation through our email’s platform.
            </p>
          </div> */}
          {/* <div className="mt-6 grid gap-x-5 md:gap-x-10 gap-y-6 sm:grid-cols-2 xl:grid-cols-3">
            {accountTypes.map((accType, idx) => (
              <a
                download
                
                href="#"
                className="capitalize font-medium border border-custom-primary min-h-[52px]  flex justify-center bg-[#eaeaea] items-center gap-5"
                key={idx}
              >
                <div className="grid text-center">
                  <p>{accType.name}</p>
                  
                  <p>
                    {accType.name === "single investor" || accType.name === 'single investee' ? '(Corporate)' : ""}
                  </p>
                </div>
                <img
                  className="w-4"
                  src="/images/download.png"
                  alt="download"
                />
              </a>
            ))}
          </div> */}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default OpenAccount;
