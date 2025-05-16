import React from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

const privacy = () => {
  return (
    <div className="text-[#2C393F]">
      <Navbar />
      <div className="max-w-[1440px] mx-auto p-4">
        <div className="mt-[250px]">
          <strong className="block text-center mb-8 text-xl !font-bold font-Lex">PRIVACY & COOKIES POLICY</strong>
          {/* <h4 className="text-center mb-8 !font-bold">PRIVACY & COOKIES POLICY</h4> */}
          {/* <h1 className="mb-10">You can download it <a className="text-primary" href="forms/DATA PRIVACY POLICY DOCUMENTS - D'NAMAZ CAPITAL LIMITED.pdf" download={"DATA PRIVACY POLICY DOCUMENTS - D'NAMAZ CAPITAL LIMITED"}>here</a> </h1> */}
            {/* className="flex items-center justify-center mx-auto font-semibold border hover:bg-custom-primary max-sm:px-4 md:w-[60%] text-custom-primary  h-16  hover:text-white transition-all duration-500 border-custom-primary" */}
<a href="forms/DATA PRIVACY POLICY DOCUMENTS - D'NAMAZ CAPITAL LIMITED.pdf" download={"DATA PRIVACY POLICY DOCUMENTS - D'NAMAZ CAPITAL LIMITED"}
            className="flex items-center justify-center  mx-auto mb-5 font-semibold border hover:bg-custom-primary max-sm:px-4 md:w-[30%] text-custom-primary  h-16  hover:text-white transition-all duration-500 border-custom-primary"
> Download here</a>
         <div className="md:w-[60%] mx-auto bg-slate-600">
         <img src="/images/privacyPic.jpeg" alt="" className="w-full object-cover" />
         </div>
        </div> 
      </div>
      <Footer />
    </div>
  );
};

export default privacy;
