import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";

const downloadreupload = () => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [file, setFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const handleDownload = () => {
    setIsDownloaded(true);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      setErrorMsg("❌ Only PDF files are allowed!");
      // alert("❌ Only PDF files are allowed!");
      return;
    }

    setFile(selectedFile);
    // setFile(event.target.files[0]);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!file) {
      setErrorMsg("Please upload a file before submitting!");
      return;
    }
    alert("Form submitted successfully!");
  };
  return (
    <div>
      <Navbar />
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
      <div className="max-w-lg mx-auto p-6 flex flex-col gap-8 items-center text-center border rounded-lg shadow-md mt-10">
        {" "}
        <h2 className="text-2xl text-primary font-bold mb-4">
          Download & Upload Form
        </h2>
        {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        <a
          href="/forms/DHFIF APPLICATION FORM.pdf"
          download="DHFIF APPLICATION FORM"
          onClick={handleDownload}
          //   className="bg-blue-500 text-primary px-4 py-2 rounded-md hover:bg-blue-600"
          className="hover:bg-custom-primary py-5 hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
        >
          {" "}
          Download Form
        </a>
        {isDownloaded && (
          <div className="mt-4">
            <label className="block font-semibold mb-2 py-5">
              Upload File:
            </label>

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Custom Styled Button */}
            <label
              htmlFor="fileInput"
              className="cursor-pointer hover:bg-custom-primary py-5 hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
            >
              📤 Choose File
            </label>

            {/* Show Selected File Name */}
            {file && (
              <p className="mt-2 text-green-600 font-medium">✅ {file.name}</p>
            )}
          </div>
        )}
        {/* Submit Button (Enabled only if file is uploaded) */}{" "}
        <button
          onClick={handleSubmit}
          disabled={!file}
          className={`mt-4 px-4 py-2 rounded-md text-white ${
            file
              ? "hover:bg-custom-primary hover:text-white transition-all duration-500 text-custom-primary font-semibold border border-custom-primary h-16 w-full sm:w-[unset] sm:px-20 "
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {" "}
          Submit{" "}
        </button>{" "}
      </div>
      <div className="py-10"></div>

      <Footer />
    </div>
  );
};

export default downloadreupload;
