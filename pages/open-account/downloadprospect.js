import React,{useState} from 'react'
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
// import Prospectus from ''
import { MdKeyboardBackspace } from "react-icons/md";
const downloadprospect = () => {
  return (
    <div>
      <Navbar/>
      <div className="h-40 w-full"></div>
      <div
        onClick={() => {
          router.push("/open-account");
        }}
        className="ml-5 flex items-center gap-2 cursor-pointer sm:w-full max-w-[1200px] mx-auto"
      >
        <div className="w-7 h-7 flex items-center justify-center rounded-full bg-custom-primary">
          <MdKeyboardBackspace color="white" />
        </div>
        <p>Back</p>
      </div>
       
        
        <a
          href="/forms/DNAMAZ HALAL FUND PROSPECTUS.pdf"
          download="DNAMAZ HALAL FUND PROSPECTUS FORM"
          //   className="bg-blue-500 text-primary px-4 py-2 rounded-md hover:bg-blue-600"
          className="hover:bg-custom-primary py-5 hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
        >
          {" "}
          Download Document
        </a>

      <div className="py-10"></div>
      <Footer/>
    </div>
  )
}

export default downloadprospect
